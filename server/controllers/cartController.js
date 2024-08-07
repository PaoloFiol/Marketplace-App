// server/controllers/cartController.js

const Product = require('../models/Product');
const User = require('../models/User');
const Cart = require('../models/Cart');

// Add item to cart
const addItemToCart = async (req, res) => {
    try {
      const { productId } = req.body;
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      const user = await User.findById(req.user._id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      let cart = await Cart.findOne({ user: req.user._id });
  
      if (cart) {
        // Check if product already exists in the cart
        const productIndex = cart.items.findIndex(
          (item) => item.product.toString() === product._id.toString()
        );
  
        if (productIndex > -1) {
          // Product exists in the cart, send an error message
          return res.status(400).json({ message: 'Product is already in your shopping cart.' });
        } else {
          // Add new product to the cart
          cart.items.push({
            product: product._id,
            name: product.name,
            quantity: 1,
          });
  
          await cart.save();
          return res.status(200).json(cart);
        }
      } else {
        // No cart exists, create a new one
        const newCart = await Cart.create({
          user: req.user._id,
          username: user.username,
          items: [
            {
              product: product._id,
              name: product.name,
              quantity: 1,
            },
          ],
        });
  
        return res.status(201).json(newCart);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
// Get cart items
const getCartItems = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove item from cart
const removeItemFromCart = async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.user._id });
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === req.params.productId
      );
  
      if (itemIndex > -1) {
        cart.items.splice(itemIndex, 1);
        await cart.save();
        res.status(200).json(cart);
      } else {
        res.status(404).json({ message: 'Item not found in cart' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

// Export the functions
module.exports = {
  addItemToCart,
  getCartItems,
  removeItemFromCart,
};
