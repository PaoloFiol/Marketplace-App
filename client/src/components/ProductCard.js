// client/src/components/ProductCard.js
import React from 'react';

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
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">${product.price}</p>
        <a href={`/product/${product._id}`} className="btn btn-primary">
          View Details
        </a>
      </div>
    </div>
  );
}

export default ProductCard;
