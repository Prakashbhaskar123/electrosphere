const express = require('express')
const router = express.Router()
const Order = require('../models/Order')
const auth = require('../middleware/auth')

// PLACE ORDER
router.post('/', auth, async (req, res) => {
  try {
    const {
      items,
      totalAmount,
      shippingAddress
    } = req.body

    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
      shippingAddress
    })

    res.status(201).json({
      message: 'Order placed successfully!',
      order
    })

  } catch (err) {
    res.status(500).json({ message: 'Server error!' })
  }
})

// GET MY ORDERS
router.get('/myorders', auth, async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id
    }).sort({ createdAt: -1 })

    res.json(orders)

  } catch (err) {
    res.status(500).json({ message: 'Server error!' })
  }
})

// GET SINGLE ORDER
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')

    if (!order) {
      return res.status(404).json({
        message: 'Order not found!'
      })
    }

    res.json(order)

  } catch (err) {
    res.status(500).json({ message: 'Server error!' })
  }
})

// GET ALL ORDERS (Admin only)
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })

    res.json(orders)

  } catch (err) {
    res.status(500).json({ message: 'Server error!' })
  }
})

// UPDATE ORDER STATUS (Admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: req.body.orderStatus },
      { new: true }
    )

    res.json({
      message: 'Order updated!',
      order
    })

  } catch (err) {
    res.status(500).json({ message: 'Server error!' })
  }
})

module.exports = router