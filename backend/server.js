const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

// MIDDLEWARE
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())

// TEST ENV
console.log('JWT_SECRET loaded:', process.env.JWT_SECRET ? 'YES' : 'NO')
console.log('PORT loaded:', process.env.PORT)

// ROUTES
const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/products')
const orderRoutes = require('./routes/orders')

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

// TEST ROUTE
app.get('/', (req, res) => {
  res.json({ message: '⚡ ElectroSphere Backend Running!' })
})

// CONNECT DATABASE
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected!')
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
    })
  })
  .catch((err) => {
    console.log('❌ Database connection failed:', err)
  })