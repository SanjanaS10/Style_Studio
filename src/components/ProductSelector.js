import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Product.css';

const ProductSelector = () => {
  const navigate = useNavigate();

  const products = [
    {
      name: 'Wide leg high waist jeans',
      price: '₹ 899.00 INR',
      color: 'White,Blue',
      image: '/w5.jpeg',
      link: '/product/wide-leg-high-waist-jeans',
      description: 'A comfortable pair of wide-leg jeans...',
      features: ['Machine washable', 'Regular fit'],
      sizes: ['S', 'M', 'L', 'XL'],
      deliveryInfo: 'Free delivery on orders over ₹50.',
    },
    {
      name: 'Denim Jacket and wide leg Jeans Set',
      price: '₹1499.00',
      image: '/d11.png',
      description: 'A stylish denim set for any outing...',
      features: ['100% Cotton', 'Machine washable', 'Regular fit'],
      sizes: ['S', 'M', 'L', 'XL'],
      deliveryInfo: 'Free delivery on orders over ₹50.',
      link: '/product/denim-jacket-jeans-set',
    },
  ];

  return (
    <div>
      <h1>Women's Wear</h1>
      <div className="producte-list">
        {products.map((product, index) => (
          <div
            key={index}
            className="producte-item"
            onClick={() => navigate(product.link)}
          >
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSelector;
