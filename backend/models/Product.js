const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Phones', 'Laptops', 'Audio', 'Wearables', 'Tablets']
  },
  image: {
    type: String,
    default: '📱'
  },
  chip: {
    type: String,
    default: 'Unknown'
  },
  chipNode: {
    type: String,
    default: 'Unknown'
  },
  badge: {
    type: String,
    default: '⭐ New'
  },
  rating: {
    type: Number,
    default: 0
  },
  reviews: {
    type: Number,
    default: 0
  },
  inStock: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    enum: ['Just Launched', 'Coming Soon'],
    default: 'Just Launched'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Product', productSchema)