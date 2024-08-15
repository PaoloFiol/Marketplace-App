// client/src/components/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="card h-100 shadow-sm">
      <img
        src={product.images[0]}
        alt={product.name}
        className="card-img-top"
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body">
        <h5 className="card-title" style={{ marginBottom: '0.5rem' }}>{product.name}</h5>
        <p className="card-text" style={{ marginBottom: '0.5rem', lineHeight: '1.2' }}>${product.price}</p>
        <p className="card-text" style={{ marginBottom: '0.5rem', lineHeight: '1.2' }}>Available Quantity: {product.quantity}</p> {/* Show quantity */}
        <Link to={`/product/${product._id}`} className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
