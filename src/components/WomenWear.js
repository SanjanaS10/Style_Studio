// src/components/WomenWear.js
import React from 'react';
import Wears from './Wears';
import './Wears.css';
const WomenWear = () => {
  const filters = {
    price: true,
    colors: ['Yellow', 'Black', 'Green', 'Pink', 'Blue', 'Beige', 'White'],
  };

  const products = [
    { name: 'Floral Long Kurti', price: '₹ 699.00 INR', color: 'White,Blue', image: '/w5.jpeg', link: '/product/floral-long-kurti' },
    { name: 'Casual White Button-Down with Jeans', price: '₹ 819.00 INR', color: 'White', image: '/w7.jpeg', link: '/product/casual-white-button-down' },
    { name: 'Traditional Lehenga Choli Set', price: '₹ 1899.00 INR', color: 'White,Pink,Green', image: '/w9.jpeg', link: '/product/traditional-lehenga-choli' },
    { name: 'White Puff Sleeve Shirt', price: '₹ 999.00 INR', color: 'White', image: '/w11.jpeg', link: '/product/white-puff-sleeve-shirt' },
    { name: 'Blue Striped Button-Down', price: '₹ 799.00 INR', color: 'Blue', image: '/w8.jpeg', link: '/product/blue-striped-button-down' },
    { name: 'Navy Peplum Top with Embroidery', price: '₹ 399.00 INR', color: 'Blue', image: '/w12.jpeg', link: '/product/navy-peplum-top' },
    
  ];

  return <Wears title="Women's Wear" filters={filters} products={products} />;
};

export default WomenWear;
