const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const auth = require('../middleware/auth')

// GET ALL PRODUCTS
router.get('/', async (req, res) => {
  try {
    const { category, status, search } = req.query

    let filter = {}

    if (category) filter.category = category
    if (status) filter.status = status
    if (search) {
      filter.name = {
        $regex: search,
        $options: 'i'
      }
    }

    const products = await Product.find(filter)
      .sort({ createdAt: -1 })

    res.json(products)

  } catch (err) {
    res.status(500).json({ message: 'Server error!' })
  }
})

// GET SINGLE PRODUCT
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({
        message: 'Product not found!'
      })
    }
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: 'Server error!' })
  }
})

// ADD PRODUCT (Admin only)
router.post('/', auth, async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (err) {
    res.status(500).json({ message: 'Server error!' })
  }
})

// UPDATE PRODUCT (Admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: 'Server error!' })
  }
})

// DELETE PRODUCT (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.json({ message: 'Product deleted!' })
  } catch (err) {
    res.status(500).json({ message: 'Server error!' })
  }
})

module.exports = router