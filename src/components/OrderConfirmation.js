import React from "react";
import { useNavigate } from "react-router-dom";
import "./OrderConfirmation.css";

const OrderConfirmation = () => {
  const navigate = useNavigate();  // Initialize useNavigate hook

  // Handle button click to navigate to /home
  const handleContinueShopping = () => {
    navigate("/home");
  };

  return (
    <div className="confirmationp-container">
      <h1>Thanks for shopping with us!</h1>
      <h2>Your order will be delivered soon. 😊</h2>
      <button className="bts" onClick={handleContinueShopping}>
        Continue shopping
      </button>
    </div>
  );
};

export default OrderConfirmation;

