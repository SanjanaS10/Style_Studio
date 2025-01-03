// src/components/MenWear.js
import React from 'react';
import Wears from './Wears';
import './Wears.css';

const MenWear = () => {
  const filters = {
    price: true,
    colors: ['Teal', 'Grey', 'Beige', 'Black', 'White'],
  };

  const products = [
    { name: 'Graphic Grey Tee', price: '₹ 799.00 INR', color: 'Grey', image: '/m2.jpeg', link : '/product/grey-graphic-tee' },
    { name: 'Men\'s Casual Cargo Pants', price: '₹ 1199.00 INR', color: 'Grey', image: '/m10.jpeg', link : '/product/mens-casual-cargo-pant'},
    { name: 'White Linen Button-Down Shirt', price: '₹ 999.00 INR', color: 'White', image: '/m4.jpeg',link : '/product/white-linen-button-down-shirt'  },
    { name: 'Striped Button-Down', price: '₹ 1199.00 INR', color: 'Beige,Black,White', image: '/m11.jpeg',link : '/product/striped-button-down' },
    {  name: 'Beige Suit with Teal Shirt', price: '₹ 4250.00 INR', color: 'Teal,Beige', image: '/m9.jpeg', link : '/product/beige-suit-teal-shirt'},
    {  name: 'Beige Graphic Tee', price: '₹ 699.00 INR', color: 'Beige', image: '/m7.jpeg',link : '/product/beige-graphic-tee'  },
  ];

  return <Wears title="Men's Wear" filters={filters} products={products} />;
};

export default MenWear;
