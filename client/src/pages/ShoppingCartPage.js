// client/src/pages/ShoppingCartPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ShoppingCartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true); // New loading state
  
    useEffect(() => {
      const fetchCartItems = async () => {
        const token = localStorage.getItem('authToken');
        try {
          const { data } = await axios.get('/api/cart', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCartItems(data.items);
        } catch (error) {
          console.error('Error fetching cart items:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCartItems();
    }, []);

  const handleRemove = async (productId) => {
    if (window.confirm('Are you sure you want to remove this item from the cart?')) {
      const token = localStorage.getItem('authToken');
      try {
        await axios.delete(`/api/cart/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems((prevItems) => prevItems.filter((item) => item.product._id !== productId));
      } catch (error) {
        console.error('Error removing cart item', error);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="row">
          {cartItems.map((item) => (
            <div key={item.product._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.product.name}</h5>
                  <p className="card-text">${item.product.price}</p>
                  <button
                    onClick={() => handleRemove(item.product._id)}
                    className="btn btn-danger"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShoppingCartPage;
