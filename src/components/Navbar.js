import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import './Navbar.css'

const Navbar = () => {
  return (
    <header className='cnt'>
      <h1>STYLE STUDIO</h1>
      <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/About">About Us</Link></li> {/* Updated link */}
          <li><Link to="/faq">FAQ</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li>
            <Link to="/cart">
              <img src="cart-removebg-preview (1).png" alt="Cart Icon" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
