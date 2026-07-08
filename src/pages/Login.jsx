import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../api'
import './Auth.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await loginUser({ email, password })

    if (res.token) {
      localStorage.setItem('token', res.token)
      localStorage.setItem('user', JSON.stringify(res.user))
      navigate('/shop')
    } else {
      setError(res.message || 'Login failed!')
    }
    setLoading(false)
  }

  return (
    <div className="auth-page">
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* LOGO */}
        <div className="auth-logo" onClick={() => navigate('/')}>
          ⚡ <span>Electro</span>Sphere
        </div>

        <h2 className="auth-title">Welcome Back!</h2>
        <p className="auth-sub">Login to your account</p>

        {/* ERROR */}
        {error && (
          <div className="auth-error">❌ {error}</div>
        )}

        {/* FORM */}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login →'}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{' '}
          <span onClick={() => navigate('/register')}>
            Register here
          </span>
        </p>
      </motion.div>
    </div>
  )
}

export default Login