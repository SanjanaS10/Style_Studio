import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ShopPage from './components/ShopPage';
import MenWear from './components/MenWear';
import WomenWear from './components/WomenWear';
import Accessories from './components/Accessories';
import Denim from './components/Denim';
import DenimShop from './components/DenimShop';
import SwimWear from './components/SwimWear';
import About from './components/About';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Cart from './components/Cart';
import AuthForm from './components/AuthForm';
import ProductDetails from './components/ProductDetails';
import S1 from './components/S1';
import S2 from './components/S2';
import S3 from './components/S3';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<AuthForm />} />

        {/* Protected routes */}
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/shop" element={<ProtectedRoute><ShopPage /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/Faq" element={<ProtectedRoute><FAQ /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        <Route path="/swimwear" element={<ProtectedRoute><SwimWear /></ProtectedRoute>} />
        <Route path="/men" element={<ProtectedRoute><MenWear /></ProtectedRoute>} />
        <Route path="/women" element={<ProtectedRoute><WomenWear /></ProtectedRoute>} />
        <Route path="/accessories" element={<ProtectedRoute><Accessories /></ProtectedRoute>} />
        <Route path="/denim" element={<ProtectedRoute><Denim /></ProtectedRoute>} />
        <Route path="/denim-shop" element={<ProtectedRoute><DenimShop /></ProtectedRoute>} />
        <Route path="/s1" element={<ProtectedRoute><S1 /></ProtectedRoute>} />
        <Route path="/s2" element={<ProtectedRoute><S2 /></ProtectedRoute>} />
        <Route path="/s3" element={<ProtectedRoute><S3 /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/order-confirmation" element={<ProtectedRoute><OrderConfirmation /></ProtectedRoute>} />
        <Route path="/product/:productId" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;