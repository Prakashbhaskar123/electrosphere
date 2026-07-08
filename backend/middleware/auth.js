const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')
      ?.replace('Bearer ', '')

    // No token found
    if (!token) {
      return res.status(401).json({
        message: 'Access denied! Please login.'
      })
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    // Add user to request
    req.user = decoded

    // Continue to next step
    next()

  } catch (err) {
    res.status(401).json({
      message: 'Invalid token! Please login again.'
    })
  }
}

module.exports = auth