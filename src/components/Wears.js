import React, { useState } from 'react';
import Navbar from './Navbar';
import './Wears.css';

const Wears = ({ title, filters = { colors: [], price: true }, products = [] }) => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    const productPrice = parseFloat(product.price.replace(/[^\d.]/g, '')); // Remove non-numeric symbols
    
    const isColorMatch = selectedColors.length === 0 || 
      selectedColors.some(color => (product.color || '').includes(color)); // Use empty string if color is undefined
    
    const isPriceMatch =
      (priceRange.min === '' || productPrice >= priceRange.min) &&
      (priceRange.max === '' || productPrice <= priceRange.max);
    
    return isColorMatch && isPriceMatch;
  });

  // Handle color filter change
  const handleColorChange = (color) => {
    setSelectedColors((prevSelected) =>
      prevSelected.includes(color) ? prevSelected.filter(c => c !== color) : [...prevSelected, color]
    );
  };

  // Handle price filter change
  const handlePriceChange = (e, type) => {
    const value = e.target.value;
    setPriceRange(prev => ({
      ...prev,
      [type]: value ? parseFloat(value) : '',
    }));
  };

  return (
    <div className="wearsc-page">
      <Navbar />

      <div className="mainc-content">
        <aside className="sidebarc">
          <h2>Filters</h2>

          {filters.price && (
            <div className="filterc-section">
              <label>Price Range</label>
              <div className="pricec-range">
                <input
                  type="number"
                  placeholder="Min"
                  min="0"
                  value={priceRange.min || ''}
                  onChange={(e) => handlePriceChange(e, 'min')}
                />
                <input
                  type="number"
                  placeholder="Max"
                  min="0"
                  value={priceRange.max || ''}
                  onChange={(e) => handlePriceChange(e, 'max')}
                />
              </div>
            </div>
          )}

          {filters.colors && (
            <div className="filterc-section">
              <label>Color</label>
              {filters.colors.map((color, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    checked={selectedColors.includes(color)}
                    onChange={() => handleColorChange(color)}
                  />
                  {color}
                </label>
              ))}
            </div>
          )}
        </aside>

        <section className="productc-grid">
          {filteredProducts.map((product, index) => (
            <div key={index} className="productc" data-price={product.price} data-color={product.color || ''}>
              <a href={product.link || '#'} target="_blank" rel="noopener noreferrer">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
              </a>
              <p>{product.price}</p>
            </div>
          ))}
        </section>
      </div>

      <footer>
        <p>Follow us on <a href="#">Instagram</a>, <a href="#">Facebook</a>, <a href="#">Pinterest</a></p>
      </footer>
    </div>
  );
};

export default Wears;
