// client/src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../config/axios';
import ProductCard from '../components/ProductCard';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState('Most Recent'); // Default sort option

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axiosInstance.get('/api/products');
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Function to sort products based on selected option
  const sortProducts = (products) => {
    switch (sortOption) {
      case 'Price Low to High':
        return [...products].sort((a, b) => a.price - b.price);
      case 'Price High to Low':
        return [...products].sort((a, b) => b.price - a.price);
      case 'Most Recent':
        return [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      default:
        return products;
    }
  };

  const filteredProducts = sortProducts(
    products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Products For Sale</h2>
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="d-flex align-items-center">
            <input
              type="text"
              className="form-control mr-2"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="form-control"
              value={sortOption}
              onChange={handleSortChange}
              style={{
                background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E") no-repeat right 0.75rem center/8px 10px, linear-gradient(to bottom, #ffffff 0%,#e9ecef 100%)`,
              }}
            >
              <option value="" disabled hidden>
                Sort:
              </option>
              <option value="Most Recent">Sort: Most Recent</option>
              <option value="Price Low to High">Sort: Price: Low to High</option>
              <option value="Price High to Low">Sort: Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row">
        {filteredProducts.map((product) => (
          <div key={product._id} className="col-md-4 mb-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
