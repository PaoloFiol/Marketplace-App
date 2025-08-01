// client/src/pages/MyProductsPage.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../config/axios';
import { useNavigate } from 'react-router-dom';

function MyProductsPage() {
  const [myProducts, setMyProducts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        console.log('Fetching my products...');
        const token = localStorage.getItem('authToken');
        console.log('Token:', token ? 'exists' : 'missing');
        
        const { data } = await axiosInstance.get('/api/products/my-products');
        console.log('Products data:', data);
        setMyProducts(data);
      } catch (error) {
        console.error('Error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
        setError('Error fetching my products');
      }
    };
    fetchMyProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axiosInstance.delete(`/api/products/${productId}`);
        setMyProducts(myProducts.filter((product) => product._id !== productId));
      } catch (error) {
        console.error('Error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
        setError('Error deleting product');
      }
    }
  };

  const handleEdit = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Products</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {myProducts.length === 0 ? (
        <p>You have no products listed.</p>
      ) : (
        <div className="row">
          {myProducts.map((product) => (
            <div key={product._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">${product.price}</p>
                  <p className="card-text">Available Quantity: {product.quantity}</p>
                  <button
                    onClick={() => handleEdit(product._id)}
                    className="btn btn-primary mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn btn-danger"
                  >
                    Delete
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

export default MyProductsPage;
