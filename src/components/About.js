import React from 'react';
import Navbar from './Navbar'; 
import './about.css'; // Assuming the CSS file is in the same directory

const About = () => {
  return (
    <div className ='abt'>
      <Navbar />
      <section className="about-section">
        <h2>About Style Studio</h2>
        <div className="about-content">
          <p>Welcome to Style Studio, where fashion meets passion! Our mission is to bring you the latest and greatest in stylish apparel and accessories, tailored to meet every fashion enthusiast's unique style. We believe in empowering individuals to express themselves confidently through the art of fashion.</p>
          <p>Since our inception, we’ve been dedicated to sourcing sustainable, high-quality fabrics and working closely with artisans who share our values of craftsmanship and creativity. With each collection, we aim to celebrate diversity, encourage creativity, and inspire individuality.</p>
        </div>
      </section>

      <section className="values-section">
        <h3>Our Values</h3>
        <div className="values-grid">
          <div className="value-item">
            <h4>Quality</h4>
            <p>We believe in delivering only the best in every product, crafted with care and precision to ensure longevity and comfort.</p>
          </div>
          <div className="value-item">
            <h4>Innovation</h4>
            <p>Our team is constantly exploring new trends, fabrics, and techniques to keep you ahead in style and sustainability.</p>
          </div>
          <div className="value-item">
            <h4>Sustainability</h4>
            <p>Style Studio is committed to reducing environmental impact by embracing sustainable materials and ethical practices.</p>
          </div>
          <div className="value-item">
            <h4>Customer Focus</h4>
            <p>Your satisfaction is our priority. We strive to provide an exceptional shopping experience and top-notch customer service.</p>
          </div>
        </div>
      </section>

      <footer>
        <p>Follow us on <a href="#">Instagram</a>, <a href="#">Facebook</a>, <a href="#">Pinterest</a></p>
      </footer>
    </div>
  );
};

export default About;
