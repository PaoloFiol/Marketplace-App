// server/routes/productRoutes.js
const express = require('express');
const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getMyProducts,
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get('/', getProducts);
router.get('/my-products', protect, getMyProducts);
router.post('/', protect, upload.array('images', 5), addProduct);
router.get('/:id', getProductById);
router.put('/:id', protect, upload.array('images', 5), updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
