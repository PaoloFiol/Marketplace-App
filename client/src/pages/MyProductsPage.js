// client/src/pages/MyProductsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MyProductsPage() {
  const [myProducts, setMyProducts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyProducts = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const { data } = await axios.get('/api/products/my-products', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMyProducts(data);
      } catch (error) {
        setError('Error fetching my products');
        console.error('Error fetching my products', error);
      }
    };
    fetchMyProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const token = localStorage.getItem('authToken');
      try {
        await axios.delete(`/api/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMyProducts(myProducts.filter((product) => product._id !== productId));
      } catch (error) {
        setError('Error deleting product');
        console.error('Error deleting product', error);
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
    </div>
  );
}

export default MyProductsPage;
