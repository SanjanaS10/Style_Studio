import React from 'react';
import { useParams } from 'react-router-dom';
import './Product.css'
import Navbar from './Navbar';
import { Link } from "react-router-dom";
import cartIcon from './cart-removebg-preview (1).png';
import { useCart } from "./CartContext";

const products = [
  {
    id: 'floral-long-kurti',
    name: 'Floral Long Kurti', 
    price: '₹ 699.00 INR', 
    color: 'White,Blue', 
    image: '/w5.jpeg',
    type:'womens',
    description: 'A light blue floral kurti with a front slit, layered over white pants. A breezy, stylish choice for daytime wear or casual outings.',
    features: ['Machine washable', 'Fit type: Regular','Material: 100% Cotton'],
    sizes: ['S', 'M', 'L', 'XL'],
    ratings: '⭐⭐⭐⭐⭐ (122 reviews)',
    deliveryInfo: 'Free delivery on orders over ₹2500. Estimated delivery: 3-5 business days.',
  },
  {
    id: 'casual-white-button-down',
    name: 'Casual White Button-Down with Jeans', 
    price: '₹819.00', 
    color: 'White', 
    image: '/w7.jpeg',
    type:'womens',
    description: 'A casual white button-down shirt paired with ripped jeans. An effortless look for relaxed, everyday style.',
    features: ['Machine washable', 'Fit type: Regular'],
    sizes: ['S', 'M', 'L', 'XL'],
    ratings: '⭐⭐⭐⭐☆ (129 reviews)',
    deliveryInfo: 'Free delivery on orders over ₹2500. Estimated delivery: 3-5 business days.',
},
{
  id: 'traditional-lehenga-choli',
  name: 'Traditional Lehenga Choli Set', 
  price: '₹1899.00', 
  color: 'Red, Green, Cream', 
  image: '/w9.jpeg',
  type:'womens',
  description: 'A traditional lehenga set in red, green, and cream, featuring intricate designs and embellishments. Perfect for weddings or festive celebrations.',
  features: ['Machine washable', 'Fit type: Regular'],
  sizes: ['S', 'M', 'L', 'XL'],
  ratings: '⭐⭐⭐⭐☆ (101 reviews)',
  deliveryInfo: 'Free delivery on orders over ₹2500. Estimated delivery: 3-5 business days.',
},
{
  id: 'white-puff-sleeve-shirt',
  name: 'White Puff Sleeve Shirt', 
  price: '₹999.00', 
  color: 'White', 
  type:'womens',
  image: '/w11.jpeg',
  description: 'A chic white shirt with puff sleeves and a broad collar, perfect for adding a touch of sophistication to any outfit. Ideal for both work and casual settings.',
  features: ['Machine washable', 'Fit type: Regular'],
  sizes: ['S', 'M', 'L', 'XL'],
  ratings: '⭐⭐⭐⭐⭐ (144 reviews)',
  deliveryInfo: 'Free delivery on orders over ₹2500. Estimated delivery: 3-5 business days.',
},

{
  id: 'blue-striped-button-down',
  name: 'Blue Striped Button-Down', 
  price: '₹799.00', 
  color: 'Blue', 
  image: '/w8.jpeg',
  type:'womens',
  description: 'A relaxed-fit blue striped shirt with rolled-up sleeves. This casual top pairs well with jeans for an effortlessly stylish look.',
  features: ['Machine washable', 'Fit type: Regular'],
  sizes: ['S', 'M', 'L', 'XL'],
  ratings: '⭐⭐⭐⭐☆ (113 reviews)',
  deliveryInfo: 'Free delivery on orders over ₹2500. Estimated delivery: 3-5 business days.',
},
{
  id: 'navy-peplum-top',
  name: 'Navy Peplum Top with Embroidery', 
  price: '₹399.00', 
  color: 'Navy', 
  image: '/w12.jpeg',
  type :'womens',
  description: 'A navy peplum top with intricate embroidery along the hem. This top combines elegance and comfort, suitable for festive occasions.',
  features: ['Material: 100% Cotton', 'Machine washable', 'Fit type: Regular'],
  sizes: ['S', 'M', 'L', 'XL'],
  ratings: '⭐⭐⭐⭐☆ (115 reviews)',
  deliveryInfo: 'Free delivery on orders over ₹2500. Estimated delivery: 3-5 business days.',
},

{
  id: 'grey-graphic-tee',
  name: 'Grey Graphic Tee', 
  price: '₹799.00', 
  color: 'Grey', 
  image: '/m2.jpeg',
  type :'mens',
  description: 'Street-ready style with an urban edge. A modern classic for everyday ease.',
  features: ['Material: 100% Cotton', 'Machine washable', 'Fit type: Regular'],
  sizes: ['S', 'M', 'L', 'XL'],
  ratings: '⭐⭐⭐⭐☆ (120 reviews)',
  deliveryInfo: 'Free delivery on orders over ₹2500. Estimated delivery: 3-5 business days.',
},
{
  id: 'white-linen-button-down-shirt',
  name: 'White Linen Button-Down Shirt', 
  price: '₹999.00', 
  color: 'White', 
  image: '/m4.jpeg',
  type :'mens',
  description: 'Effortlessly cool with a touch of earthy elegance. Perfect for a laid-back, classy vibe. High-quality fabric.',
  features: ['Material: 100% Cotton', 'Machine washable', 'Fit type: Regular'],
  sizes: ['S', 'M', 'L', 'XL'],
  ratings: '⭐⭐⭐⭐☆ (120 reviews)',
  deliveryInfo: 'Free delivery on orders over ₹2500. Estimated delivery: 3-5 business days.',
},

{
  id: 'beige-graphic-tee',
  name: 'Beige Graphic Tee', 
  price: '₹699.00', 
  color: 'Beige', 
  image: '/m7.jpeg',
  type :'mens',
  description: 'Elevate your formal game with sleek, neutral tones and a pop of color. Refined and refreshing.',
  features: ['Material: 100% Cotton', 'Machine washable', 'Fit type: Regular'],
  sizes: ['S', 'M', 'L', 'XL'],
  ratings: '⭐⭐⭐⭐☆ (120 reviews)',
  deliveryInfo: 'Free delivery on orders over ₹2500. Estimated delivery: 3-5 business days.',
},
{
  id: 'beige-suit-teal-shirt',
  name: 'Beige Suit with Teal Shirt',
  price: '₹4250.00',
  color: 'Beige',
  image: '/m9.jpeg',
  type :'mens',
  description: 'Soft tones and a tropical touch for effortless style.',
  features: ['Material: 100% Cotton', 'Machine washable', 'Fit type: Regular'],
  sizes: ['S', 'M', 'L', 'XL'],
  ratings: '⭐⭐⭐⭐☆ (120 reviews)',
  deliveryInfo: 'Free delivery on orders over ₹2500. Estimated delivery: 3-5 business days.',
},
{
  id: 'mens-casual-cargo-pant',
  name: 'Men\'s Casual Cargo Pant',
  price: '₹1199.00',
  color: 'Grey',
  image: '/m10.jpeg',
  type :'mens',
  description: 'A perfect blend of comfort and style, these men\'s casual cargo pants are ideal for everyday wear.',
  features: ['Material: 100% Cotton','Machine washable','Fit type: Regular'],
  sizes: ["S", "M", "L", "XL"],
  ratings: '⭐⭐⭐⭐☆ (120 reviews)',
  deliveryInfo: 'Free delivery on orders over ₹50. Estimated delivery: 3-5 business days.'
},
{
  id: 'striped-button-down',
  name: 'Striped Button-Down', 
  price: '₹1199.00', 
 type :'mens',
  image: '/m11.jpeg',
  description: 'Stripes that speak volumes! Casual yet bold, this shirt is made for sunlit strolls and breezy vibes.',
  features: ['Material: 100% Cotton', 'Machine washable', 'Fit type: Regular'],
  sizes: ['S', 'M', 'L', 'XL'],
  ratings: '⭐⭐⭐⭐☆ (115 reviews)',
  deliveryInfo: 'Free delivery on orders over ₹2500. Estimated delivery: 3-5 business days.',
},
{
  id: 'floral-leaf-necklace',
  name: 'Floral Leaf Necklace', 
  price: '₹899', 
  color: 'Rose Gold', 
  image: '/j1.jpeg',
  sizes: ['NA'],
  description: 'A delicate floral leaf necklace that adds a hint of elegance, ideal for complementing both formal and casual attire.',
  features: ['Material: 100% Cotton', 'Machine washable', 'Fit type: Regular'],
  type : 'accessory',
  ratings: '⭐⭐⭐⭐☆ (120 reviews)',
  deliveryInfo: 'Free delivery on orders over $50. Estimated delivery: 3-5 business days.',
},
{
  id: 'traditional-jhumka-earrings',
  name: 'Traditional Jhumka Earrings', 
  price: '₹1499', 
  color: 'Gold', 
  image: '/j2.jpeg',
  sizes: ['NA'],
  description: 'A pair of ornate jhumka earrings with turquoise accents, perfect for adding a cultural touch to your ensemble.',
  features: ['Material: 100% Cotton', 'Machine washable', 'Fit type: Regular'],
  type : 'accessory',
  ratings: '⭐⭐⭐⭐☆ (120 reviews)',
  deliveryInfo: 'Free delivery on orders over $50. Estimated delivery: 3-5 business days.',
},
{
  id: 'leaf-ear-cuff',
  name: 'Leaf Ear Cuff', 
  price: '₹999', 
  color: 'Rose Gold', 
  image: '/j.jpeg',
  sizes: ['NA'],
  description: 'A stylish ear cuff in a leaf pattern, perfect for adding a bit of edge to your look without needing an extra piercing.',
  features: ['Material: 100% Cotton', 'Machine washable', 'Fit type: Regular'],
  type : 'accessory',
  ratings: '⭐⭐⭐⭐☆ (120 reviews)',
  deliveryInfo: 'Free delivery on orders over $50. Estimated delivery: 3-5 business days.',
},
{
  id: 'rose-gold-elegance',
  name: 'Rose gold elegance', 
  price: '₹899', 
  color: 'Rose Gold', 
  image: '/j42.jpeg',
  sizes: ['NA'],
  description: 'Complete your look with this stunning rose gold bracelet set!',
  features: ['Material: 100% Cotton', 'Machine washable', 'Fit type: Regular'],
  type : 'accessory',
  ratings: '⭐⭐⭐⭐☆ (120 reviews)',
  deliveryInfo: 'Free delivery on orders over $50. Estimated delivery: 3-5 business days.',
},
{
  id: 'set-of-stackable-rings',
  name: 'Set of Stackable Rings', 
  price: '₹899', 
  color: 'Gold', 
  image: '/j5.jpeg',
  sizes: ['NA'],
  description: 'A collection of 10 delicate rings, perfect for stacking or wearing individually. These pieces add a subtle glam to any outfit.',
  features: ['Material: 100% Cotton', 'Machine washable', 'Fit type: Regular'],
  type : 'accessory',
  ratings: '⭐⭐⭐⭐☆ (120 reviews)',
  deliveryInfo: 'Free delivery on orders over $50. Estimated delivery: 3-5 business days.',
},
{
  id: 'gold-chain-necklace-with-layered-jewelry',
  name: 'Gold Chain Necklace with Layered Jewelry',
  price: '₹1799',
  color: 'Gold',
  image: '/j6.jpeg',
  sizes: ['NA'],
  description: 'A layered necklace set in gold, including chains and pendants, for a chic, modern accessory that complements a variety of outfits.',
  features: ['Material: 100% Cotton', 'Machine washable', 'Fit type: Regular'],
  type : 'accessory',
  ratings: '⭐⭐⭐⭐☆ (120 reviews)',
  deliveryInfo: 'Free delivery on orders over $50. Estimated delivery: 3-5 business days.',
}
];
const ProductDetails = () => {
  const { productId } = useParams();
  const { cart, dispatch } = useCart(); // This should no longer throw an error
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return <p>Product not found!</p>;
  }

  const handleAddToCart = () => {
    const size = document.getElementById("size").value;
    const quantity = parseInt(document.getElementById("quantity").value, 10);
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, size, quantity },
    });
    alert(`${product.name} added to the cart!`);
  };

  return (
    <main>
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
              <img src="/cart-removebg-preview (1).png"  alt="Cart Icon" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
      
      <div className='pro'>
      
      <div className="producte-container">
        <div className="producte-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="producte-details">
          <h2 className="producte-title">{product.name}</h2>
          <p className="producte-price">{product.price}</p>
          <p className="producte-rating">{product.ratings}</p>
          <p className="producte-description">{product.description}</p>
          <ul className="producte-features">
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <div className="producte-options">
  <div className="producte-option">
    <label htmlFor="size">Size : </label>
    <select id="size">
      {product.sizes.map((size, index) => (
        <option value={size} key={index}>
          {size}
        </option>
        ))}
      </select>
    </div>
 
</div>

          <div className="producte-quantity">
            <label htmlFor="quantitye">Quantity : </label>
            <input
              type="number"
              id="quantity"
              className="quantity-input"
              defaultValue="1"
              min="1"
            />
          </div>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
          <div className="deliverye-info">
            <p>{product.deliveryInfo}</p>
          </div>
        </div>
      </div>
      <footer>
        <p>&copy; 2023 STYLE STUDIO. All rights reserved. | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
    </footer>
    </div>
    </main>
    
  );
  
};

export default ProductDetails;
