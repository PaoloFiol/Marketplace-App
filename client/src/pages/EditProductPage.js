// client/src/pages/EditProductPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [error, setError] = useState(''); // Add state for error messages
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const { data } = await axios.get(`/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProduct(data);
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setExistingImages(data.images);
      } catch (error) {
        console.error('Error fetching product details', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleImageChange = (e) => {
    const selectedFiles = [...e.target.files];
    if (selectedFiles.length + existingImages.length > 5) {
      setError('You can only upload a maximum of 5 images.');
    } else {
      setError('');
      setNewImages(selectedFiles);
    }
  };

  const handleImageRemove = (index) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('existingImages', JSON.stringify(existingImages));
    newImages.forEach((image) => {
      formData.append('images', image);
    });

    try {
      await axios.put(`/api/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Product updated successfully');
      navigate('/my-products'); // Redirect to My Products page
    } catch (error) {
      console.error('Error updating product', error);
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
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
          <label>Existing Images</label>
          <div className="d-flex flex-wrap mb-3">
            {existingImages.map((image, index) => (
              <div key={index} className="position-relative mr-2">
                <img
                  src={image}
                  alt={`Product ${index}`}
                  className="img-thumbnail mb-2"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
                <button
                  type="button"
                  className="btn btn-danger btn-sm position-absolute"
                  style={{ top: '0', right: '0' }}
                  onClick={() => handleImageRemove(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="newImages">Add New Images (Up To 5 Maximum)</label>
          <input
            type="file"
            className="form-control-file"
            id="newImages"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          {error && <p className="text-danger mt-2">{error}</p>}
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProductPage;
