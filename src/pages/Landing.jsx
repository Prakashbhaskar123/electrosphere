import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './Landing.css'

function Landing() {
  const navigate = useNavigate()

  return (
    <div className="landing">

      {/* BACKGROUND PARTICLES */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`particle particle-${i}`}></div>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="landing-content">

        {/* LOGO */}
        <motion.div
          className="logo-wrap"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="logo-icon">⚡</div>
          <h1 className="logo-text">
            Electro<span>Sphere</span>
          </h1>
        </motion.div>

        {/* TAGLINE */}
        <motion.p
          className="tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Discover. Explore. Shop the Future.
        </motion.p>

        {/* SUBTITLE */}
        <motion.p
          className="subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Your universe of electronics — from today's bestsellers
          to tomorrow's breakthroughs.
        </motion.p>

        {/* TWO BUTTONS */}
        <motion.div
          className="buttons"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          {/* EXPLORE BUTTON */}
          <button
            className="btn-explore"
            onClick={() => navigate('/explore')}
          >
            <span className="btn-icon">🔭</span>
            <div>
              <div className="btn-title">Explore Now</div>
              <div className="btn-sub">Discover latest tech</div>
            </div>
          </button>

          {/* SHOP BUTTON */}
          <button
            className="btn-shop"
            onClick={() => navigate('/shop')}
          >
            <span className="btn-icon">🛒</span>
            <div>
              <div className="btn-title">Shop Now</div>
              <div className="btn-sub">Buy electronics</div>
            </div>
          </button>
        </motion.div>

        {/* SCROLL HINT */}
        <motion.div
          className="scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          ↓ Scroll to discover more
        </motion.div>

      </div>
    </div>
  )
}

export default Landing