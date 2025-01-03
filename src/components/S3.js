import React from "react";
import { useCart } from "./CartContext";  // Import CartContext hook
import Navbar from "./Navbar";
import "./S.css"; 
import { Link } from 'react-router-dom';

const S3 = () => {
  const { dispatch } = useCart();  // Access dispatch from CartContext

  const handleAddToCart = () => {
    const size = document.getElementById("size").value;
    const quantity = parseInt(document.getElementById("quantity").value, 10);

    if (!size || isNaN(quantity) || quantity <= 0) {
      alert("Please select a valid size and quantity!");
      return;
    }

    const product = {
      name: " Fiery Red swimdress ",
      price: '₹ 899',
      image: "s3.jpg",
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
            <img src="s3.jpg" alt="Elegant Women's Dress" />
          </div>
          <div className="product1-details">
            <h2 className="product1-title">
              
Fiery Red floral swimdress

            </h2>
            
            {/* Product Description */}
            <p className="product1-description">
            Bright and bold, this red floral swim dress brings a fiery splash of colour to any beach day.
            </p>

            <p className="product1-price">₹899.00</p>
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
              <input type="number" id="quantity" className="quantity-input" defaultValue="1" min="1" />
            </div>

            {/* Add to Cart Button */}
            <button className="add1-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>

            {/* 3D Try-On Button */}
            <button className="try1-on-btn">
              <a href="/s2_3d.html">3D Model</a>
            </button>

            {/* Delivery Information */}
            <div className="delivery1-info">
              <p>Free delivery on orders over ₹2500. Estimated delivery: 3-5 business days.</p>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <p>
          &copy; 2023 STYLE STUDIO. All rights reserved. | <a href="#">Privacy Policy</a> |{" "}
          <a href="#">Terms of Service</a>
        </p>
      </footer>
    </div>
  );
};

export default S3;
