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

  const [inputStatus, setInputStatus] = useState({}); // Tracks which inputs have values

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the form data
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Mark input as filled if value is not empty
    setInputStatus((prev) => ({ ...prev, [name]: value !== "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, cart }),
      });

      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "CLEAR_CART" });
        navigate("/order-confirmation");
      } else {
        alert("Failed to place the order. Please try again.");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="checkout-container">
        <div className="checkout-form-section">
          <h1>Checkout</h1>
          <form className="checkout-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className={inputStatus.name ? "filled" : ""}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className={inputStatus.email ? "filled" : ""}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              className={inputStatus.address ? "filled" : ""}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
              className={inputStatus.city ? "filled" : ""}
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleInputChange}
              className={inputStatus.state ? "filled" : ""}
              required
            />
            <input
              type="text"
              name="zip"
              placeholder="ZIP Code"
              value={formData.zip}
              onChange={handleInputChange}
              className={inputStatus.zip ? "filled" : ""}
              required
            />

            <label>Payment Method:</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              className={inputStatus.paymentMethod ? "filled" : ""}
              required
            >
              <option value="Credit Card">Credit Card</option>
              <option value="Net Banking">Net Banking</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>

            {formData.paymentMethod === "Credit Card" && (
              <>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className={inputStatus.cardNumber ? "filled" : ""}
                  required
                />
                <input
                  type="text"
                  name="expiry"
                  placeholder="Expiry Date (MM/YY)"
                  value={formData.expiry}
                  onChange={handleInputChange}
                  className={inputStatus.expiry ? "filled" : ""}
                  required
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  className={inputStatus.cvv ? "filled" : ""}
                  required
                />
              </>
            )}

            {formData.paymentMethod === "Net Banking" && (
              <input
                type="text"
                name="upiId"
                placeholder="UPI ID"
                value={formData.upiId}
                onChange={handleInputChange}
                className={inputStatus.upiId ? "filled" : ""}
                required
              />
            )}

            <button type="submit">Place Order</button>
          </form>
        </div>
        <div className="checkout-summary-section">
          <h2>Order Summary</h2>
          {cart.map((item, index) => (
            <div key={index} className="summary-item">
              <img
                src={item.image || "https://via.placeholder.com/100"}
                alt={item.name}
              />
              <div className="summary-details">
                <p><strong>{item.name}</strong></p>
                <p>{item.price} x {item.quantity}</p>
              </div>
            </div>
          ))}
          <h3>
            Total: ₹
            {cart
              .reduce((sum, item) => {
                // Ensure price is a number by parsing it correctly
                const price = parseFloat(item.price.replace(/[^\d.-]/g, '')); // Removes non-numeric characters
                return sum + (price * item.quantity);
              }, 0)
              .toFixed(2)} {/* To round to 2 decimal places */}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
