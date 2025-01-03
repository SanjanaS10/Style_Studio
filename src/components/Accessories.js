// src/components/Accessories.js
import React from 'react';
import Wears from './Wears';
import './Wears.css';

const Accessories = () => {
  const filters = {
    price: true,
    colors: ['Gold', 'Silver', 'Rose Gold'],
  };
  const products = [
    { name: 'Floral Leaf Necklace', price: '₹ 899.00 INR', color: 'Rose Gold', image: '/j1.jpeg', link: '/product/floral-leaf-necklace' },
    { name: 'Traditional Jhumka Earrings', price: '₹ 1499.00 INR', color: 'Gold', image: '/j2.jpeg', link: '/product/traditional-jhumka-earrings' },
    { name: 'Leaf Ear Cuff', price: '₹ 999.00 INR', color: 'Rose Gold', image: '/j3.jpeg', link: '/product/leaf-ear-cuff' },
    { name: 'Rose Gold Bracelet Set', price: '₹ 899.00 INR', color: 'Rose Gold', image: '/j42.jpeg', link: '/product/rose-gold-elegance' },
    { name: 'Set of Stackable Rings', price: '₹ 899.00 INR', color: 'Gold', image: '/j5.jpeg', link: '/product/set-of-stackable-rings' },
    { name: 'Gold Chain Necklace with Layered Jewelry', price: '₹ 1799.00 INR', color: 'Gold', image: '/j6.jpeg', link: '/product/gold-chain-necklace-with-layered-jewelry' }
];


  return <Wears title="Accessories" filters={filters} products={products} />;
};

export default Accessories;
