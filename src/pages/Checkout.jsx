import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './Checkout.css'

function Checkout() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  })

  // Get cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handlePlaceOrder = async () => {
    setLoading(true)
    const token = localStorage.getItem('token')

    if (!token) {
      navigate('/login')
      return
    }

    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          items: cart,
          totalAmount: total,
          shippingAddress: form
        })
      })

      const data = await res.json()

      if (data.order) {
        localStorage.removeItem('cart')
        navigate('/order-success')
      }
    } catch (err) {
      console.log('Order error:', err)
    }
    setLoading(false)
  }

  return (
    <div className="checkout">

      {/* NAVBAR */}
      <nav className="checkout-nav">
        <div className="nav-logo" onClick={() => navigate('/')}>
          ⚡ <span>Electro</span>Sphere
        </div>
        <div className="checkout-steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            1. Address
          </div>
          <div className="step-line"></div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            2. Review
          </div>
          <div className="step-line"></div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            3. Payment
          </div>
        </div>
      </nav>

      <div className="checkout-body">

        {/* LEFT — FORM */}
        <div className="checkout-left">

          {/* STEP 1 — ADDRESS */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="checkout-card"
            >
              <h2>📍 Delivery Address</h2>
              <p className="card-sub">Where should we deliver?</p>

              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    name="fullName"
                    placeholder="Enter full name"
                    value={form.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    name="phone"
                    placeholder="Enter phone number"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Full Address</label>
                <textarea
                  name="address"
                  placeholder="House no, Street, Area..."
                  value={form.address}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input
                    name="state"
                    placeholder="State"
                    value={form.state}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Pincode</label>
                  <input
                    name="pincode"
                    placeholder="Pincode"
                    value={form.pincode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                className="next-btn"
                onClick={() => setStep(2)}
                disabled={!form.fullName || !form.phone || !form.address || !form.city}
              >
                Continue to Review →
              </button>
            </motion.div>
          )}

          {/* STEP 2 — REVIEW */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="checkout-card"
            >
              <h2>🛒 Review Your Order</h2>
              <p className="card-sub">Check your items before payment</p>

              <div className="review-items">
                {cart.map(item => (
                  <div key={item.id} className="review-item">
                    <div className="review-image">{item.image}</div>
                    <div className="review-info">
                      <div className="review-name">{item.name}</div>
                      <div className="review-qty">Qty: {item.qty}</div>
                    </div>
                    <div className="review-price">
                      ₹{(item.price * item.qty).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="review-address">
                <h3>📍 Delivering to:</h3>
                <p>{form.fullName}</p>
                <p>{form.address}</p>
                <p>{form.city}, {form.state} - {form.pincode}</p>
                <p>📞 {form.phone}</p>
              </div>

              <div className="review-buttons">
                <button
                  className="back-btn"
                  onClick={() => setStep(1)}
                >
                  ← Back
                </button>
                <button
                  className="next-btn"
                  onClick={() => setStep(3)}
                >
                  Continue to Payment →
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3 — PAYMENT */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="checkout-card"
            >
              <h2>💳 Payment</h2>
              <p className="card-sub">Choose your payment method</p>

              <div className="payment-options">
                <div className="payment-option selected">
                  <div className="payment-radio">●</div>
                  <div>
                    <div className="payment-name">
                      💳 Razorpay
                    </div>
                    <div className="payment-sub">
                      UPI, Cards, Net Banking, Wallets
                    </div>
                  </div>
                </div>

                <div className="payment-option">
                  <div className="payment-radio">○</div>
                  <div>
                    <div className="payment-name">
                      💵 Cash on Delivery
                    </div>
                    <div className="payment-sub">
                      Pay when you receive
                    </div>
                  </div>
                </div>
              </div>

              <div className="review-buttons">
                <button
                  className="back-btn"
                  onClick={() => setStep(2)}
                >
                  ← Back
                </button>
                <button
                  className="place-order-btn"
                  onClick={handlePlaceOrder}
                  disabled={loading}
                >
                  {loading ? 'Placing Order...' : `Place Order ₹${total.toLocaleString()} →`}
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* RIGHT — ORDER SUMMARY */}
        <div className="checkout-right">
          <div className="summary-card">
            <h3>Order Summary</h3>

            <div className="summary-items">
              {cart.map(item => (
                <div key={item.id} className="summary-item">
                  <span>{item.image} {item.name} x{item.qty}</span>
                  <span>₹{(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span className="free">FREE</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>

            <div className="summary-badges">
              <div className="badge">✅ Secure Payment</div>
              <div className="badge">🚚 Free Delivery</div>
              <div className="badge">↩️ Easy Returns</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Checkout