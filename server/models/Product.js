// server/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String, required: true }],
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

// Pre-save hook to format price
productSchema.pre('save', function (next) {
    this.price = parseFloat(this.price.toFixed(2)); // Ensure price is rounded to two decimal places
    next();
  });
  
module.exports = mongoose.model('Product', productSchema);
