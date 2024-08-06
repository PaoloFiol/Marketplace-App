// client/src/pages/ProductDetailsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

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

  if (!product) return <p>Loading...</p>;

  const isProductOwner = currentUser && product.addedBy._id === currentUser._id;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <div className="row">
            {product.images.map((image, index) => (
              <div key={index} className="col-6 mb-4">
                <img
                  src={image}
                  alt={`Product ${index}`}
                  className="img-fluid rounded shadow-sm"
                  style={{ height: '300px', width: '100%', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>
            <strong>Price:</strong> ${product.price}
          </p>
          <p>
            <strong>Listed By:</strong> {product.addedBy.username}
          </p>
          {isProductOwner ? (
            <button
              className="btn btn-secondary mt-3"
              onClick={() => navigate(`/edit-product/${product._id}`)}
            >
              Edit Product
            </button>
          ) : (
            <button className="btn btn-primary mt-3">Add to Cart</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
