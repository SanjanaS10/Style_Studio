require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('MongoDB connected');
        await User.syncIndexes(); // Drops stale indexes and recreates them cleanly
        console.log('Indexes synced');
    })
    .catch(err => console.error('MongoDB connection error:', err));

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, lowercase: true, trim: true },
    password: String,
    cart: [{ productId: String, name: String, price: String, quantity: Number }]
});
const User = mongoose.model('User', userSchema);

const orderSchema = new mongoose.Schema({
    customerDetails: {
        name: String, email: String, address: String,
        city: String, state: String, zip: String,
        paymentMethod: String, upiId: String,
    },
    items: [{ productId: String, name: String, price: String, quantity: Number }],
    razorpayOrderId: String,
    razorpayPaymentId: String,
    paymentStatus: { type: String, default: 'pending' },
    orderDate: { type: Date, default: Date.now },
});
const Order = mongoose.model('Order', orderSchema);

// ─── AUTH MIDDLEWARE ────────────────────────────────────────────────────────
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token.' });
    }
};

// ─── SIGNUP ──────────────────────────────────────────────────────────────────
app.post('/signup', async (req, res) => {
    const { name, password } = req.body;

    if (!req.body.email || !password || !name) {
        return res.status(400).json({ message: 'Name, email and password are required.' });
    }

    const email = req.body.email.toLowerCase().trim();

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered. Please log in.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, cart: [] });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Signup error:', err);
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Email already registered. Please log in.' });
        }
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
});

// ─── LOGIN ───────────────────────────────────────────────────────────────────
app.post('/login', async (req, res) => {
    const { password } = req.body;

    if (!req.body.email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    const email = req.body.email.toLowerCase().trim();

    try {
        const user = await User.findOne({ email });

        if (!user) {
            // Deliberate vague message for security
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { email: user.email, userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({ message: 'Login successful', token, email: user.email });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Error during login', error: err.message });
    }
});

// ─── CHECKOUT (COD) ──────────────────────────────────────────────────────────
app.post('/checkout', async (req, res) => {
    const { formData, cart } = req.body;

    if (!formData || !cart || !cart.length) {
        return res.status(400).json({ message: 'Missing form data or cart items.' });
    }

    const total = cart.reduce(
        (sum, item) => sum + parseFloat(item.price.replace(/[^\d.-]/g, '')) * item.quantity,
        0
    );

    try {
        const newOrder = new Order({
            customerDetails: {
                ...formData,
                upiId: formData.paymentMethod === 'Net Banking' ? formData.upiId : null,
            },
            items: cart,
            paymentStatus: 'cod',
        });
        await newOrder.save();

        res.status(201).json({
            message: 'Order placed successfully',
            customerDetails: formData,
            items: cart,
            total: total.toFixed(2),
        });
    } catch (err) {
        console.error('Checkout error:', err);
        res.status(500).json({ message: 'Failed to place order', error: err.message });
    }
});

// ─── CREATE RAZORPAY ORDER ───────────────────────────────────────────────────
app.post('/create-order', async (req, res) => {
    const { amount } = req.body;

    if (!amount || isNaN(amount)) {
        return res.status(400).json({ message: 'Valid amount is required.' });
    }

    try {
        const order = await razorpay.orders.create({
            amount: Math.round(amount * 100),
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
        });
        res.status(200).json(order);
    } catch (err) {
        console.error('Razorpay order error:', err);
        res.status(500).json({ message: 'Error creating Razorpay order', error: err.message });
    }
});

// ─── VERIFY RAZORPAY PAYMENT ─────────────────────────────────────────────────
app.post('/verify-payment', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, formData, cart } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({ success: false, message: 'Missing payment details.' });
    }

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest('hex');

    if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({ success: false, message: 'Payment verification failed' });
    }

    try {
        const total = cart.reduce(
            (sum, item) => sum + parseFloat(item.price.replace(/[^\d.-]/g, '')) * item.quantity,
            0
        );

        const newOrder = new Order({
            customerDetails: formData,
            items: cart,
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            paymentStatus: 'paid',
        });
        await newOrder.save();

        res.status(200).json({
            success: true,
            message: 'Payment verified and order saved',
            total: total.toFixed(2),
        });
    } catch (err) {
        console.error('Verify payment error:', err);
        res.status(500).json({ success: false, message: 'Order saving failed', error: err.message });
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));