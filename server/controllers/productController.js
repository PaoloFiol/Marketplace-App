// server/controllers/productController.js
const Product = require('../models/Product');
const cloudinary = require('cloudinary').v2;

// Add a new product
const addProduct = async (req, res) => {
  const { name, description, price, quantity } = req.body;  // Include quantity
  const { files } = req;
  try {
    if (files.length < 1) {
      return res.status(400).json({ message: 'At least one image is required' });
    }
    const imageUrls = await Promise.all(
      files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, { folder: 'products' });
        return result.secure_url;
      })
    );
    const product = new Product({
      name,
      description,
      price,
      quantity,  // Save quantity
      images: imageUrls,
      addedBy: req.user.id,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('addedBy', 'username');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a product by ID
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id).populate('addedBy', 'username');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity } = req.body;  // Include quantity
  const { files } = req;

  console.log('Request Body:', req.body);
  console.log('Files:', files);

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.addedBy.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const existingImages = JSON.parse(req.body.existingImages || '[]');
    console.log('Existing Images:', existingImages);

    const newImageUrls = files && files.length ? await Promise.all(
      files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, { folder: 'products' });
        return result.secure_url;
      })
    ) : [];

    console.log('New Image URLs:', newImageUrls);

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.quantity = quantity || product.quantity;  // Update quantity

    if (newImageUrls.length > 0 || existingImages.length > 0) {
      product.images = [...existingImages, ...newImageUrls];
    }

    const updatedProduct = await product.save();
    console.log('Updated Product:', updatedProduct);
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.addedBy.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Product.findByIdAndDelete(id);

    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get products added by the logged-in user
const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ addedBy: req.user.id }).populate('addedBy', 'username');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addProduct, getProducts, getProductById, updateProduct, deleteProduct, getMyProducts };
