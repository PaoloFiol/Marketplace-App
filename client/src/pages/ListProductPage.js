// client/src/pages/ListProductPage.js
import React, { useState } from 'react';
import axios from 'axios';

function ListProductPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(1); // Default quantity
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  const handleProductUpload = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('quantity', quantity); // Include quantity
    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      await axios.post('/api/products', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Product added');
      setName('');
      setDescription('');
      setPrice('');
      setQuantity(1); // Reset quantity
      setImages([]);
    } catch (error) {
      console.error('Error adding product', error);
    }
  };

  const handleImageChange = (e) => {
    const selectedFiles = [...e.target.files];
    if (selectedFiles.length > 5) {
      setError('You can only upload a maximum of 5 images.');
    } else {
      setError('');
      setImages(selectedFiles);
    }
  };

  return (
    <div className="container mt-4">
      <h2>List a New Product</h2>
      <form onSubmit={handleProductUpload}>
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            className="form-control"
            id="productName"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productDescription">Description</label>
          <textarea
            className="form-control"
            id="productDescription"
            rows="3"
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="productPrice">Price</label>
          <input
            type="number"
            className="form-control"
            id="productPrice"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productQuantity">Quantity</label>
          <input
            type="number"
            className="form-control"
            id="productQuantity"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            max="200"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productImages">Product Images (Select Up To 5 Maximum)</label>
          <input
            type="file"
            className="form-control-file"
            id="productImages"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            required
          />
          {error && <p className="text-danger mt-2">{error}</p>}
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default ListProductPage;
