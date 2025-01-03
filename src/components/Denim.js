import React from 'react';
import './Denim.css'; // External stylesheet for styles
import Navbar from './Navbar';
const Denim = () => (
  <div>
    <Navbar />
    <div className='dnm'>
    <div className="headerd">
      DENIM, DENIM!
      <span>The seasonless staple for all styles</span>
    </div>

    <div className="sectiond">
      <div className="circled">
        <img src="denim11.png" alt="Normcore Denim" />
      </div>
      <div className="sectiond-text">
        <h2>Normcore with Denim</h2>
        <p>Blending "normal" and "hardcore", normcore denim offers a laid-back, effortless vibe. Whether paired with an oversized jacket or street-style layers, it's a go-to trend for a chic yet casual look.</p>
        <button className="btnd">Discover More</button>
      </div>
    </div>

    <div className="sectiond">
      <div className="sectiond-text">
        <h2>Indigo Denim</h2>
        <p>Deep and rich, indigo denim brings out a retro 70s flair. Styled with modern cuts or minimalist layers, this denim is perfect for a fresh take on a timeless classic.</p>
        <button className="btnd">Explore Indigo</button>
      </div>
      <div className="circled">
        <img src="denim2.jpg" alt="Indigo Denim" />
      </div>
    </div>

    <div className="sectiond">
      <div className="circled">
        <img src="denim6.png" alt="Double Denim" />
      </div>
      <div className="sectiond-text">
        <h2>Double Denim, Denim on Denim</h2>
        <p>Pairing denim tops with denim bottoms creates a bold statement. The secret to pulling off double denim? Mix textures and washes for a play on depth and dimension.</p>
        <button className="btnd">See the Looks</button>
      </div>
    </div>

    <div className="sectiond">
      <div className="sectiond-text">
        <h2>Light Denim</h2>
        <p>Light denim, with its airy and laid-back feel, works perfectly for a variety of casual outfits. Distressed or clean-cut, it's a wardrobe staple for any trendsetter.</p>
        <button className="btnd">Shop Light Denim</button>
      </div>
      <div className="circled">
        <img src="denim4.jpg" alt="Light Denim" />
      </div>
    </div>

    <footer>
      <p>
        Follow us on <a href="#">Instagram</a>, <a href="#">Facebook</a>, <a href="#">Pinterest</a>
      </p>
    </footer>
  </div></div>
);

export default Denim;
