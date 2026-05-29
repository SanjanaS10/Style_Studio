import React from 'react';
import Wears from './Wears';
import './Wears.css';

const DenimShop = () => {
  const filters = {
    price: true,
    colors: ['Blue', 'Black', 'Light Blue', 'Navy', 'Dark Blue'],
  };

  const products = [
    { name: 'Wide Leg Flare Jeans', price: '₹ 1799.00 INR', color: 'Light Blue', image: '/d3.jpeg', link: '/product/wide-leg-flare-jeans' },
    { name: 'High Rise Straight Jeans', price: '₹ 1599.00 INR', color: 'Light Blue', image: '/d4.jpeg', link: '/product/high-rise-straight-jeans' },
    { name: 'Navy Wide Leg Trousers', price: '₹ 1899.00 INR', color: 'Navy', image: '/d5.jpeg', link: '/product/navy-wide-leg-trousers' },
    { name: 'Side Stripe Wide Leg Jeans', price: '₹ 1699.00 INR', color: 'Dark Blue', image: '/d6.jpeg', link: '/product/side-stripe-wide-leg-jeans' },
    { name: 'Men\'s Cargo Denim Jeans', price: '₹ 1499.00 INR', color: 'Light Blue', image: '/d7.jpeg', link: '/product/mens-cargo-denim-jeans' },
    { name: 'Classic Denim Jacket', price: '₹ 1999.00 INR', color: 'Blue', image: '/d8.jpeg', link: '/product/classic-denim-jacket' },
    { name: 'Denim Midi Skirt', price: '₹ 1299.00 INR', color: 'Dark Blue', image: '/d11.jpeg', link: '/product/denim-midi-skirt' },
    { name: 'Navy Denim Co-ord Set', price: '₹ 2499.00 INR', color: 'Navy', image: '/d12.jpeg', link: '/product/navy-denim-coord-set' },
    { name: 'Men\'s Navy Denim Jacket', price: '₹ 1999.00 INR', color: 'Navy', image: '/d14.jpeg', link: '/product/mens-navy-denim-jacket' },
    { name: 'Men\'s Navy Shirt', price: '₹ 999.00 INR', color: 'Navy', image: '/d15.jpeg', link: '/product/mens-navy-shirt' },
    { name: 'Men\'s Slim Fit Jeans', price: '₹ 1399.00 INR', color: 'Blue', image: '/d20.jpeg', link: '/product/mens-slim-fit-jeans' }
  ];
  return <Wears title="Denim Collection" filters={filters} products={products} />;
};

export default DenimShop;