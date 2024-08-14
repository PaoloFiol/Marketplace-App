// client/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import MyProductsPage from './pages/MyProductsPage';
import MyProfilePage from './pages/MyProfilePage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import ListProductPage from './pages/ListProductPage';
import EditProductPage from './pages/EditProductPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<RegisterPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/my-products" element={<MyProductsPage />} />
          <Route path="/profile" element={<MyProfilePage />} />
          <Route path="/cart" element={<ShoppingCartPage />} />
          <Route path="/list-product" element={<ListProductPage />} />
          <Route path="/edit-product/:id" element={<EditProductPage />} />
        </Routes>
        <Footer /> 
      </div>
    </Router>
  );
}

export default App;
