import React, { useState, useEffect } from 'react';
import axiosInstance from '../config/axios';

function ShoppingCartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalCost, setTotalCost] = useState(0); // State to hold total cost

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const { data } = await axiosInstance.get('/api/cart');
        const validItems = data.items.filter(item => item.product);
        setCartItems(validItems);
        const cost = data.items.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
        setTotalCost(cost);
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
    if (window.confirm('Are you sure you want to remove this item from the cart?')) {
      try {
        await axiosInstance.put(`/api/cart/remove/${productId}`, { removeQuantity });
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
        const newTotalCost = cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
        setTotalCost(newTotalCost);
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
        <>
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
                    <p className="card-text">Item Total: ${(item.quantity * item.product.price).toFixed(2)}</p> {/* Display item total cost */}
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
          <h3 className="mt-4">Total Cost: ${totalCost.toFixed(2)}</h3> {/* Display the total cost */}
        </>
      )}
    </div>
  );
}

export default ShoppingCartPage;
