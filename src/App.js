import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ShopPage from './components/ShopPage';
import MenWear from './components/MenWear';
import WomenWear from './components/WomenWear';
import Accessories from './components/Accessories';
import Denim from './components/Denim';
import SwimWear from './components/SwimWear';
import About from './components/About';
import FAQ from './components/FAQ'; 
import Contact from './components/Contact'; 
import Cart from './components/Cart';
import AuthForm from './components/AuthForm';
// import ProductSelector from './components/ProductSelector';
import ProductDetails from './components/ProductDetails';
import S1 from './components/S1';
import S2 from './components/S2';
import S3 from './components/S3';
// import ThreeJSViewer  from './components/ThreeJSViewer';

// import ModelViewer from './components/ModelViewer';
// import S1_3D from './components/S1_3D';
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation";
 // Add FAQ here

function App() {
   const email = "user@example.com";
  return (
    
    <Router>
      <Routes>
      <Route path="/" element={<AuthForm />} />

        <Route path="/home" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/Faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/swimwear" element={<SwimWear />} />
        <Route path="/men" element={<MenWear />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/women" element={<WomenWear />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/denim" element={<Denim />} />
        <Route path="/s1" element={<S1/>} /> 
        <Route path="/s2" element={<S2/>} />
        <Route path="/s3" element={<S3/>} />
        <Route path="/product/:productId" element={<ProductDetails />} />
 
      </Routes>
    </Router>
  );
}

export default App;
