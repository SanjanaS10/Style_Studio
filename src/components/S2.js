import React from "react";
import { useDispatch } from "react-redux"; // Ensure Redux setup
import Navbar from "./Navbar";
import "./S.css"; // Import CSS for styling

const S2 = () => {
  const dispatch = useDispatch();

  // Function to handle adding product to cart
  const handleAddToCart = () => {
    const size = document.getElementById("size").value;
    const quantity = parseInt(document.getElementById("quantity").value, 10);

    if (!size || isNaN(quantity) || quantity <= 0) {
      alert("Please select a valid size and quantity!");
      return;
    }

    const product = {
      name: "Earthy Sunset Dress",
      price: '₹ 819',
      image: "s4.jpg",
      size,
      quantity,
    };

    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
    alert(`${product.name} added to the cart!`);
  };

  return (
    <div className="product1-page">
      <Navbar />

      <main>
        <div className="product1-container">
          <div className="product1-image">
            <img src="s4.jpg" alt="Earthy Sunset Dress" />
          </div>
          <div className="product1-details">
            <h2 className="product1-title">
              Earthy Sunset Swimdress
            </h2>

            {/* Product Description */}
            <p className="product1-description">
            A bold blend of earth tones and sunset-inspired colors, this swim
            dress channels the warmth of a summer evening.
            </p>

            <p className="product1-price">₹819.00</p>
            <p className="product1-rating">⭐⭐⭐⭐☆ (129 reviews)</p>
            <ul className="product1-features">
              <li>Machine washable</li>
              <li>Fit type: Regular</li>
            </ul>

            {/* Size Selection */}
            <div className="product1-options">
              <div className="product1-option">
                <label htmlFor="size">Size:</label>
                <select id="size">
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="product1-quantity">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                className="quantity-input"
                defaultValue="1"
                min="1"
              />
            </div>

            {/* Add to Cart Button */}
            <button className="add1-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>

            {/* 3D Try-On Button */}
            <button className="try1-on-btn">
              <a href="/s4_3d.html">3D Model</a>
            </button>

            {/* Delivery Information */}
            <div className="delivery1-info">
              <p>
                Free delivery on orders over ₹2500. Estimated delivery: 3-5
                business days.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <p>
          &copy; 2023 STYLE STUDIO. All rights reserved. |{" "}
          <a href="#">Privacy Policy</a> |{" "}
          <a href="#">Terms of Service</a>
        </p>
      </footer>
    </div>
  );
};

export default S2;
