// client/src/pages/ProductDetailsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1); // State for quantity

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details', error);
      }
    };

    const fetchCurrentUser = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const { data } = await axios.get('/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCurrentUser(data);
      } catch (error) {
        console.error('Error fetching current user', error);
      }
    };

    fetchProduct();
    fetchCurrentUser();
  }, [id]);

  const addToCart = async () => {
    const token = localStorage.getItem('authToken');
    try {
      await axios.post(
        '/api/cart/add',
        { productId: product._id, quantity }, // Send quantity with the request
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Product added to cart');
      // Update product quantity in the state to reflect the change
      setProduct({ ...product, quantity: product.quantity - quantity });
      setQuantity(1); // Reset quantity input
    } catch (error) {
      setError(error.response.data.message || 'Error adding product to cart');
    }
  };

  if (!product) return <p>Loading...</p>;

  const isProductOwner = currentUser && product.addedBy._id === currentUser._id;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <div className="row">
            {product.images.map((image, index) => (
              <div key={index} className="col-12 col-md-6 mb-4">
                <img
                  src={image}
                  alt={`Product ${index}`}
                  className="img-fluid rounded shadow-sm"
                  style={{
                    height: '250px',
                    width: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <h2 className="product-details-text">{product.name}</h2>
          <p className="product-details-text">
            <strong>Description:</strong> {product.description}
          </p>
          <p>
            <strong>Price:</strong> ${product.price}
          </p>
          <p>
            <strong>Available Quantity:</strong> {product.quantity > 0 ? product.quantity : 'Sold Out'}
          </p>
          <p>
            <strong>Listed By:</strong> {product.addedBy.username}
          </p>
          {!isProductOwner && product.quantity > 0 && (
            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.min(product.quantity, Math.max(1, e.target.value)))
                } // Ensure quantity is within the available stock
                min="1"
                max={product.quantity}
              />
            </div>
          )}
          {isProductOwner ? (
            <button
              className="btn btn-secondary mt-3"
              onClick={() => navigate(`/edit-product/${product._id}`)}
            >
              Edit Product
            </button>
          ) : product.quantity > 0 ? (
            <button className="btn btn-primary mt-3" onClick={addToCart}>
              Add to Cart
            </button>
          ) : (
            <button className="btn btn-danger mt-3" disabled>
              Sold Out
            </button>
          )}
          {error && <p className="text-danger mt-3">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
