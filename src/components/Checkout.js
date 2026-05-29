import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import Navbar from "./Navbar";
import "./Checkout.css";

const Checkout = () => {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    paymentMethod: "Credit Card",
    cardNumber: "",
    expiry: "",
    cvv: "",
    upiId: "",
  });

  const [inputStatus, setInputStatus] = useState({});
  const [errors, setErrors] = useState({});       // field-level errors
  const [globalError, setGlobalError] = useState(""); // top-level error
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^\d.-]/g, ""));
    return sum + price * item.quantity;
  }, 0);

  // ─── VALIDATION ────────────────────────────────────────────────────────────
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.state.trim()) newErrors.state = "State is required.";
    if (!formData.zip.trim()) {
      newErrors.zip = "ZIP code is required.";
    } else if (!/^\d{6}$/.test(formData.zip)) {
      newErrors.zip = "Enter a valid 6-digit PIN code.";
    }

    if (formData.paymentMethod === "Credit Card") {
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = "Card number is required.";
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
        newErrors.cardNumber = "Enter a valid 16-digit card number.";
      }
      if (!formData.expiry.trim()) {
        newErrors.expiry = "Expiry date is required.";
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry)) {
        newErrors.expiry = "Use MM/YY format.";
      }
      if (!formData.cvv.trim()) {
        newErrors.cvv = "CVV is required.";
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = "Enter a valid 3 or 4 digit CVV.";
      }
    }

    if (formData.paymentMethod === "Net Banking") {
      if (!formData.upiId.trim()) {
        newErrors.upiId = "UPI ID is required.";
      } else if (!/^[\w.\-_]+@[\w]+$/.test(formData.upiId)) {
        newErrors.upiId = "Enter a valid UPI ID (e.g. name@upi).";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ─── HANDLERS ──────────────────────────────────────────────────────────────
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setInputStatus((prev) => ({ ...prev, [name]: value !== "" }));
    // Clear field error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    setGlobalError("");
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      setGlobalError("Razorpay failed to load. Check your internet connection.");
      setLoading(false);
      return;
    }

    let orderData;
    try {
      const orderRes = await fetch(`${process.env.REACT_APP_API_URL}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });
      orderData = await orderRes.json();
    } catch (err) {
      setGlobalError("Could not connect to payment server. Please try again.");
      setLoading(false);
      return;
    }

    if (!orderData.id) {
      setGlobalError("Failed to create payment order. Please try again.");
      setLoading(false);
      return;
    }

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: "INR",
      name: "Style Studio",
      description: "Fashion Purchase",
      order_id: orderData.id,
      handler: async (response) => {
        try {
          const verifyRes = await fetch(`${process.env.REACT_APP_API_URL}/verify-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              formData,
              cart,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            dispatch({ type: "CLEAR_CART" });
            navigate("/order-confirmation");
          } else {
            setGlobalError("Payment verification failed. Please contact support.");
          }
        } catch (err) {
          setGlobalError("Verification error. Please contact support.");
        } finally {
          setLoading(false);
        }
      },
      prefill: { name: formData.name, email: formData.email },
      theme: { color: "#f5c47a" },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", (response) => {
      setGlobalError(`Payment failed: ${response.error.description}`);
      setLoading(false);
    });
    rzp.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalError("");

    if (!validate()) return; // stop if validation fails

    setLoading(true);

    if (
      formData.paymentMethod === "Credit Card" ||
      formData.paymentMethod === "Net Banking"
    ) {
      await handleRazorpayPayment();
      return;
    }

    // Cash on Delivery
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, cart }),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "CLEAR_CART" });
        navigate("/order-confirmation");
      } else {
        setGlobalError(data.message || "Failed to place the order. Please try again.");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      setGlobalError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  // ─── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div>
      <Navbar />
      <div className="checkout-container">
        <div className="checkout-form-section">
          <h1>Checkout</h1>

          {/* Global error banner */}
          {globalError && (
            <div className="checkout-error-banner">
              {globalError}
            </div>
          )}

          <form className="checkout-form" onSubmit={handleSubmit} noValidate>

            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} className={inputStatus.name ? "filled" : ""} />
            {errors.name && <p className="field-error">{errors.name}</p>}

            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className={inputStatus.email ? "filled" : ""} />
            {errors.email && <p className="field-error">{errors.email}</p>}

            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} className={inputStatus.address ? "filled" : ""} />
            {errors.address && <p className="field-error">{errors.address}</p>}

            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} className={inputStatus.city ? "filled" : ""} />
            {errors.city && <p className="field-error">{errors.city}</p>}

            <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleInputChange} className={inputStatus.state ? "filled" : ""} />
            {errors.state && <p className="field-error">{errors.state}</p>}

            <input type="text" name="zip" placeholder="PIN Code" value={formData.zip} onChange={handleInputChange} className={inputStatus.zip ? "filled" : ""} maxLength={6} />
            {errors.zip && <p className="field-error">{errors.zip}</p>}

            <label>Payment Method:</label>
            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange} required>
              <option value="Credit Card">Credit Card</option>
              <option value="Net Banking">Net Banking</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>

            {formData.paymentMethod === "Credit Card" && (
              <>
                <input type="text" name="cardNumber" placeholder="Card Number (16 digits)" value={formData.cardNumber} onChange={handleInputChange} className={inputStatus.cardNumber ? "filled" : ""} maxLength={16} />
                {errors.cardNumber && <p className="field-error">{errors.cardNumber}</p>}

                <input type="text" name="expiry" placeholder="Expiry Date (MM/YY)" value={formData.expiry} onChange={handleInputChange} className={inputStatus.expiry ? "filled" : ""} maxLength={5} />
                {errors.expiry && <p className="field-error">{errors.expiry}</p>}

                <input type="text" name="cvv" placeholder="CVV" value={formData.cvv} onChange={handleInputChange} className={inputStatus.cvv ? "filled" : ""} maxLength={4} />
                {errors.cvv && <p className="field-error">{errors.cvv}</p>}
              </>
            )}

            {formData.paymentMethod === "Net Banking" && (
              <>
                <input type="text" name="upiId" placeholder="UPI ID (e.g. name@upi)" value={formData.upiId} onChange={handleInputChange} className={inputStatus.upiId ? "filled" : ""} />
                {errors.upiId && <p className="field-error">{errors.upiId}</p>}
              </>
            )}

            <button type="submit" disabled={loading}>
              {loading
                ? "Processing..."
                : formData.paymentMethod === "Cash on Delivery"
                ? "Place Order"
                : `Proceed to Pay ₹${total.toFixed(2)}`}
            </button>

          </form>
        </div>

        <div className="checkout-summary-section">
          <h2>Order Summary</h2>
          {cart.map((item, index) => (
            <div key={index} className="summary-item">
              <img src={item.image || "https://via.placeholder.com/100"} alt={item.name} />
              <div className="summary-details">
                <p><strong>{item.name}</strong></p>
                <p>{item.price} x {item.quantity}</p>
              </div>
            </div>
          ))}
          <h3>Total: ₹{total.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
};

export default Checkout;