// server/routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { addItemToCart, getCartItems, removeItemFromCart } = require('../controllers/cartController');

// Route to add an item to the cart
router.post('/add', protect, addItemToCart);

// Route to get all items in the user's cart
router.get('/', protect, getCartItems);

// Route to remove an item from the cart by product ID
router.put('/remove/:productId', protect, removeItemFromCart);

module.exports = router;
