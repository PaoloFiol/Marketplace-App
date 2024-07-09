const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const authMiddleware = require('../middleware/authMiddleware');

// Add a new product
router.post('/', authMiddleware, async (req, res) => {
    const { name, description, price } = req.body;

    try {
        const product = new Product({
            name,
            description,
            price,
            user: req.user.id // Associate product with user
        });

        await product.save();
        console.log('Product saved:', product); // Debugging log
        res.send('Product added');
    } catch (err) {
        console.error('Error saving product:', err.message); // Debugging log
        res.status(500).send('Server error');
    }
});

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().populate('user', 'username name');
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('user', 'username name');
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update product
router.put('/:id', authMiddleware, async (req, res) => {
    const { name, description, price } = req.body;

    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        if (product.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        if (name) product.name = name;
        if (description) product.description = description;
        if (price) product.price = price;

        await product.save();

        product = await Product.findById(req.params.id).populate('user', 'username name');
        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete product
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        if (product.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await Product.deleteOne({ _id: req.params.id });
        res.json({ msg: 'Product removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;