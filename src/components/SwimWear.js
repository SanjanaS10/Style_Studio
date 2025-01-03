// src/components/WomenWear.js
import React from 'react';
import Wears from './Wears';
import './Wears.css';
const SwimWear = () => {
  const filters = {
    price: true,
    colors: ['Yellow', 'Black', 'Green', 'Pink', 'Blue', 'Beige', 'White'],
  };

  const products = [
    { name: 'Galaxy Swimdress', price: '₹ 899.00 INR', color: 'purple', image: '/s2.jpg', link: '/s1' },
    { name: 'Earthy Sunset Dress', price: '₹ 899.00 INR', color: 'orange', image: '/s4.jpg', link: '/s2' },
    { name: 'Fiery Red floral swimdress', price: '₹ 899.00 INR', color: 'red', image: '/s3.jpg', link: '/s3' },

];


  return <Wears title="Swimwears" filters={filters} products={products} />;
};

export default SwimWear;
