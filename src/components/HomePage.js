// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'; // Assuming Navbar.js is already created
import './HomePage.css';

const HomePage = () => {
  return (
    <div className='homeh'>
      <Navbar />

      <section className="heroh">
        <h1>Welcome to Style Studio</h1>
        <Link to="/shop">
          <button>Shop Now</button>
        </Link>
      </section>

      <section className="welcomeh-section">
        <h2>Welcome</h2>
        <p>
        Welcome to Style Studio, your ultimate destination for fashion innovation! We are thrilled to introduce our cutting-edge 3D Try-On feature, designed to revolutionize your online shopping experience
        </p>
      </section>

      <section className="producth-grid">
        <div className="producth">
          <img src="m4.jpeg" alt="Product Image" />
          <h3>White Linen Button-Down Shirt</h3>
          <p>₹ 999.00 INR</p>
        </div>
        <div className="producth">
          <img src="w5.jpeg" alt="Product Image" />
          <h3>Floral Long Kurti</h3>
          <p>₹ 699.00 INR</p>
        </div>
        <div className="producth">
          <img src="j6.jpeg" alt="Product Image" />
          <h3>Gold Chain Necklace with Layered Jewelry</h3>
          <p>₹ 1799.00 INR</p>
        </div><Link to ='/swimwear'>
        <div className="producth newh-product" >
          <img src="/swimdressmainpage.jpeg" alt="New Collection" />
          <h3>New Collection of Swimdresses with 3D try on feature</h3>
        </div></Link>
      </section>

      <section className="saleh-banner">
        <h2>So many deals!</h2>
        <button>Shop Now</button>
      </section>

      <footer>
        <p>
          Follow us on <a href="#">Instagram</a>, <a href="#">Facebook</a>, <a href="#">Pinterest</a>
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
