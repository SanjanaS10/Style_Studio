import React from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import './Cart.css';
import Navbar from "./Navbar";

const Cart = () => {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate(); // Use the useNavigate hook for redirection

  // Remove item from cart
  const handleRemove = (id, size) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id, size } });
  };

  // Decrease item quantity
  const decreaseQuantity = (id) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: { id } });
  };

  // Increase item quantity
  const increaseQuantity = (id) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: { id } });
  };

  // Calculate total price
  const total = cart?.reduce(
    (sum, item) => {
      let price = item.price;

      // Check if price is a string (e.g., "$10.99" or "€10.99")
      if (typeof price === "string") {
        price = parseFloat(price.replace(/[^\d.-]/g, ""));  // Remove non-numeric characters
      }

      // If price is a number, use it directly
      if (typeof price === "number") {
        return sum + (price * item.quantity || 0);
      }

      // If price is neither a string nor a number, return sum unchanged
      return sum;
    },
    0
  );

  // Handle Checkout button click
  const handleCheckout = () => {
    navigate('/checkout'); // Redirect to /checkout page
  };

  // Handle Continue Shopping button click
  const handleContinueShopping = () => {
    navigate('/shop'); // Redirect to /shop page
  };

  return (
    <div>
      <Navbar />
      <div className="cartx-container">
        <h1>Your Cart</h1>

        {cart && cart.length > 0 ? (
          cart.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="cartx-item"
              id={`product-${item.id}`}
            >
              <img src={item.image || "https://via.placeholder.com/100"} alt="Product" />
              <div className="cartx-details">
                <h3>{item.name}</h3>
                <p>Size: {item.type !== "accessory" ? item.size : "N/A"}</p>
                <p>Color: {item.color}</p>
              </div>

              <div className="quantityx-control">
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.id)}>+</button>
              </div>

              <p className="cartx-price">
              ₹{(parseFloat(item.price.replace ? item.price.replace(/[^\d.-]/g, "") : item.price) * item.quantity).toFixed(2)}
              </p>
              <button
                className="removex-btn"
                onClick={() => handleRemove(item.id, item.size)}
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <div>
            <p>Your cart is empty!</p>
            <button className="continuex-shopping-btn" onClick={handleContinueShopping}>
              Continue Shopping
            </button>
          </div>
        )}

        <div className="cartx-summary">
          <p>
            Total: <span id="total-price">₹{total?.toFixed(2)}</span>
          </p>
          <button className="checkoutx-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>

      <footer>
        <p>
          Follow us on <a href="#">Instagram</a>, <a href="#">Facebook</a>, <a href="#">Pinterest</a>
        </p>
      </footer>
    </div>
  );
};

export default Cart;
