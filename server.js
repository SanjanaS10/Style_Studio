const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/userAuth', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// User schema
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    cart: [
        { 
            productId: String,
            name: String,
            price: String,
            quantity: Number
        }
    ]
});

const User = mongoose.model('User', userSchema);

// Order schema
const orderSchema = new mongoose.Schema({
    customerDetails: {
        name: String,
        email: String,
        address: String,
        city: String,
        state: String,
        zip: String,
        paymentMethod: String,
        upiId: String, // For Net Banking
    },
    items: [
        {
            productId: String,
            name: String,
            price: String,
            quantity: Number,
        }
    ],
    orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

// Signup route
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, cart: [] });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error registering user', error: err });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            res.status(200).json({ message: 'Login successful', email: user.email });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error during login', error: err });
    }
});

// Checkout route
app.post('/checkout', async (req, res) => {
    const { formData, cart } = req.body;
    const total = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

    try {
        const newOrder = new Order({
            customerDetails: {
                ...formData,
                upiId: formData.paymentMethod === "Net Banking" ? formData.upiId : null, // Include UPI ID only for Net Banking
            },
            items: cart,
        });
        await newOrder.save();

        res.status(201).json({
            message: 'Order placed successfully',
            customerDetails: formData,
            items: cart,
            total: total.toFixed(2),
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to place order', error: err });
    }
});

// Start server
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
