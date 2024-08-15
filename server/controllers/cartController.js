const Product = require('../models/Product');
const User = require('../models/User');
const Cart = require('../models/Cart');

// Add item to cart
const addItemToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient stock available' });
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
        // Product exists in the cart, update the quantity
        cart.items[productIndex].quantity += quantity;
      } else {
        // Add new product to the cart
        cart.items.push({
          product: product._id,
          name: product.name,
          quantity,
        });
      }
    } else {
      // No cart exists, create a new one
      cart = await Cart.create({
        user: req.user._id,
        username: user.username,
        items: [
          {
            product: product._id,
            name: product.name,
            quantity,
          },
        ],
      });
    }

    // Reduce the quantity from the product's stock
    product.quantity -= quantity;
    if (product.quantity === 0) {
      product.isSoldOut = true; // Add a flag to mark the product as sold out
    }
    await product.save();

    await cart.save();
    return res.status(200).json(cart);
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
  const { productId } = req.params;
  const { removeQuantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // Get the item to be removed
      const cartItem = cart.items[itemIndex];
      
      if (removeQuantity >= cartItem.quantity) {
        // If removeQuantity is equal to or more than the current quantity, remove the item entirely
        const removedQuantity = cartItem.quantity;
        cart.items.splice(itemIndex, 1);

        // Add the entire quantity back to the product's stock
        const product = await Product.findById(cartItem.product);
        if (product) {
          product.quantity += removedQuantity;
          await product.save();
        }
      } else {
        // If removeQuantity is less than the current quantity, just decrease the quantity
        cartItem.quantity -= removeQuantity;

        // Add the removed quantity back to the product's stock
        const product = await Product.findById(cartItem.product);
        if (product) {
          product.quantity += removeQuantity;
          await product.save();
        }
      }

      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  addItemToCart,
  getCartItems,
  removeItemFromCart,
};
