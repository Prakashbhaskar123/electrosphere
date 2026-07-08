import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

function OrderSuccess() {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100vh',
      background: '#020817',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          textAlign: 'center',
          maxWidth: '500px'
        }}
      >
        {/* SUCCESS ICON */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ fontSize: '5rem', marginBottom: '1.5rem' }}
        >
          ✅
        </motion.div>

        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#f1f5f9',
          marginBottom: '1rem'
        }}>
          Order Placed!
        </h1>

        <p style={{
          color: '#64748b',
          fontSize: '1.1rem',
          lineHeight: '1.8',
          marginBottom: '2rem'
        }}>
          Your order has been placed successfully!
          We'll deliver it to your address soon. 🚚
        </p>

        {/* ORDER ID */}
        <div style={{
          background: 'rgba(15,23,42,0.8)',
          border: '1px solid rgba(99,179,237,0.15)',
          borderRadius: '12px',
          padding: '1.25rem',
          marginBottom: '2rem'
        }}>
          <p style={{ color: '#475569', fontSize: '0.85rem' }}>
            Estimated Delivery
          </p>
          <p style={{
            color: '#34d399',
            fontWeight: '700',
            fontSize: '1.1rem',
            marginTop: '0.25rem'
          }}>
            3-5 Business Days 🚀
          </p>
        </div>

        {/* BUTTONS */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button
            onClick={() => navigate('/shop')}
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              color: '#fff',
              border: 'none',
              padding: '0.9rem 2rem',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            Continue Shopping →
          </button>

          <button
            onClick={() => navigate('/')}
            style={{
              background: 'transparent',
              color: '#64748b',
              border: '1px solid rgba(99,179,237,0.2)',
              padding: '0.9rem 2rem',
              borderRadius: '10px',
              fontSize: '1rem',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            Go Home
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default OrderSuccess