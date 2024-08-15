import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ShoppingCartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
        setError('Failed to load cart items.');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemove = async (productId, removeQuantity) => {
    const token = localStorage.getItem('authToken');
    
    // Confirmation prompt
    const confirmRemove = window.confirm(`Are you sure you want to remove ${removeQuantity} of this item from your cart?`);
    
    if (confirmRemove) {
      try {
        console.log(`Removing ${removeQuantity} of product ${productId} from cart`);
        const response = await axios.put(
          `/api/cart/remove/${productId}`,
          { removeQuantity }, // Send the quantity to remove
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log('Remove response:', response.data);
  
        // Update the cart items locally
        setCartItems((prevItems) =>
          prevItems
            .map((item) => {
              if (item.product._id === productId) {
                return {
                  ...item,
                  quantity: item.quantity - removeQuantity,
                };
              }
              return item;
            })
            .filter((item) => item.quantity > 0) // Remove items with quantity 0
        );
      } catch (error) {
        console.error('Error removing cart item:', error);
        setError('Failed to remove item from cart.');
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Shopping Cart</h2>
      {error && <p className="text-danger">{error}</p>}
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
                  <p className="card-text">Price: ${item.product.price}</p>
                  <p className="card-text">Quantity in Cart: {item.quantity}</p>
                  <div className="form-group">
                    <label htmlFor={`remove-quantity-${item.product._id}`}>Remove Quantity</label>
                    <input
                      type="number"
                      id={`remove-quantity-${item.product._id}`}
                      className="form-control"
                      min="1"
                      max={item.quantity}
                      value={item.removeQuantity || 1}
                      onChange={(e) =>
                        setCartItems((prevItems) =>
                          prevItems.map((cartItem) =>
                            cartItem.product._id === item.product._id
                              ? {
                                  ...cartItem,
                                  removeQuantity: Math.min(
                                    item.quantity,
                                    Math.max(1, e.target.value)
                                  ),
                                }
                              : cartItem
                          )
                        )
                      }
                    />
                  </div>
                  <button
                    onClick={() => handleRemove(item.product._id, item.removeQuantity || 1)}
                    className="btn btn-danger mt-2"
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
