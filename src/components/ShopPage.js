// src/components/ShopPage.js
import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import Navbar from './Navbar';            // Import Navbar
import './ShopPage.css';                  // Include your CSS

const ShopPage = () => {
  return (
    <div>
      <Navbar />
      <div className ='sp'>
      {/* Shop page sections */}
      <Link to="/women" style={{ textDecoration: 'none' }}>
        <section style={{ cursor: 'pointer' }} id="w" className="womens">
          <h2>Womens Wear</h2>
        </section>
      </Link>
      
      <Link to="/men" style={{ textDecoration: 'none' }}>
        <section id="m" className="mens">
          <h2>Mens Wear</h2>
        </section>
      </Link>
      
      <Link to="/accessories" style={{ textDecoration: 'none' }}>
        <section id="a" className="accessoriess">
          <h2>Accessories</h2>
        </section>
      </Link>
      
      <Link to="/denim" style={{ textDecoration: 'none' }}>
        <section id="d" className="denims">
          <h2>Denim</h2>
        </section>
      </Link>
      
      <footer>
        <p>Follow us on <a href="#">Instagram</a>, <a href="#">Facebook</a>, <a href="#">Pinterest</a></p>
      </footer>
      </div>
    </div>
  );
};

export default ShopPage;
