import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../api'
import './Auth.css'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await registerUser({ name, email, password })

    if (res.token) {
      localStorage.setItem('token', res.token)
      localStorage.setItem('user', JSON.stringify(res.user))
      navigate('/shop')
    } else {
      setError(res.message || 'Registration failed!')
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

        <h2 className="auth-title">Create Account</h2>
        <p className="auth-sub">Join ElectroSphere today!</p>

        {/* ERROR */}
        {error && (
          <div className="auth-error">❌ {error}</div>
        )}

        {/* FORM */}
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

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
              placeholder="Create a password"
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
            {loading ? 'Creating account...' : 'Register →'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{' '}
          <span onClick={() => navigate('/login')}>
            Login here
          </span>
        </p>
      </motion.div>
    </div>
  )
}

export default Register