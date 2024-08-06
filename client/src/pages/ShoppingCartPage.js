// client/src/pages/ShoppingCartPage.js
import React, { useState, useEffect } from 'react';

function ShoppingCartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Mock data, replace with actual API call
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  const handleRemove = (productId) => {
    const updatedCart = cartItems.filter((item) => item._id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.map((item) => (
        <div key={item._id}>
          <h3>{item.name}</h3>
          <p>${item.price}</p>
          <button onClick={() => handleRemove(item._id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default ShoppingCartPage;
