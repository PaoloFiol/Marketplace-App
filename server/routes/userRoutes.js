// server/routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser, updateUserProfile, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile); // Add this line
router.put('/profile', protect, updateUserProfile);

module.exports = router;
