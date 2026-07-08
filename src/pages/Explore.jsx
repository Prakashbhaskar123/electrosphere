import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './Explore.css'

const products = [
  {
    id: 1,
    name: "Apple iPhone 17 Pro",
    category: "Phones",
    status: "Just Launched",
    image: "📱",
    chip: "Apple A19 Pro",
    node: "3nm TSMC",
    price: "₹1,34,900",
    description: "Revolutionary camera system with 5x optical zoom and titanium design.",
    badge: "🔥 Hot"
  },
  {
    id: 2,
    name: "Samsung Galaxy S25 Ultra",
    category: "Phones",
    status: "Just Launched",
    image: "📱",
    chip: "Snapdragon 8 Elite",
    node: "3nm TSMC",
    price: "₹1,29,999",
    description: "200MP camera, S Pen included, AI-powered features.",
    badge: "⭐ Top Rated"
  },
  {
    id: 3,
    name: "MacBook Pro M4",
    category: "Laptops",
    status: "Just Launched",
    image: "💻",
    chip: "Apple M4 Pro",
    node: "3nm TSMC",
    price: "₹2,49,900",
    description: "Fastest Mac ever with 24-core GPU and 22-hour battery.",
    badge: "🚀 Powerful"
  },
  {
    id: 4,
    name: "Sony WH-1000XM6",
    category: "Audio",
    status: "Just Launched",
    image: "🎧",
    chip: "Sony HD Noise Processor QN3",
    node: "Custom Sony",
    price: "₹34,990",
    description: "Industry leading noise cancellation with 40hr battery.",
    badge: "🎵 Best Audio"
  },
  {
    id: 5,
    name: "Apple Vision Pro 2",
    category: "Wearables",
    status: "Coming Soon",
    image: "🥽",
    chip: "Apple M4 + R2",
    node: "3nm TSMC",
    price: "₹3,49,900",
    description: "Next gen spatial computing with lighter design.",
    badge: "👀 Upcoming"
  },
  {
    id: 6,
    name: "Samsung Galaxy Ring 2",
    category: "Wearables",
    status: "Coming Soon",
    image: "💍",
    chip: "Exynos W1000",
    node: "4nm Samsung",
    price: "₹29,999",
    description: "Health tracking ring with 10-day battery life.",
    badge: "💡 Innovative"
  },
  {
    id: 7,
    name: "ASUS ROG Zephyrus G16",
    category: "Laptops",
    status: "Just Launched",
    image: "💻",
    chip: "RTX 5080 + Ryzen AI 9",
    node: "4nm TSMC",
    price: "₹2,89,990",
    description: "Ultimate gaming laptop with OLED display.",
    badge: "🎮 Gaming"
  },
  {
    id: 8,
    name: "Google Pixel 9 Pro",
    category: "Phones",
    status: "Just Launched",
    image: "📱",
    chip: "Google Tensor G4",
    node: "4nm Samsung",
    price: "₹1,06,999",
    description: "Best AI camera phone with 7 years of updates.",
    badge: "🤖 AI First"
  },
]

const categories = ["All", "Phones", "Laptops", "Audio", "Wearables"]

function Explore() {
  const [active, setActive] = useState("All")
  const navigate = useNavigate()

  const filtered = active === "All"
    ? products
    : products.filter(p => p.category === active)

  const launched = filtered.filter(p => p.status === "Just Launched")
  const coming = filtered.filter(p => p.status === "Coming Soon")

  return (
    <div className="explore">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-logo" onClick={() => navigate('/')}>
          ⚡ <span>Electro</span>Sphere
        </div>
        <div className="nav-links">
          <span className="nav-link active">🔭 Explore</span>
          <span className="nav-link" onClick={() => navigate('/shop')}>🛒 Shop</span>
        </div>
      </nav>

      {/* HERO */}
      <motion.div
        className="explore-hero"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-badge">🌍 Live Tech Updates</div>
        <h1>Discover What's <span>Next in Tech</span></h1>
        <p>From just-launched gadgets to upcoming breakthroughs —
          stay ahead of the curve</p>
      </motion.div>

      {/* CATEGORIES */}
      <motion.div
        className="categories"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {categories.map(cat => (
          <button
            key={cat}
            className={`cat-btn ${active === cat ? 'cat-active' : ''}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* JUST LAUNCHED */}
      {launched.length > 0 && (
        <div className="section">
          <div className="section-header">
            <h2>🚀 Just Launched</h2>
            <p>Newest products available right now</p>
          </div>
          <div className="products-grid">
            {launched.map((product, i) => (
              <motion.div
                key={product.id}
                className="product-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="card-badge">{product.badge}</div>
                <div className="card-image">{product.image}</div>
                <div className="card-body">
                  <div className="card-category">{product.category}</div>
                  <h3 className="card-name">{product.name}</h3>
                  <p className="card-desc">{product.description}</p>

                  {/* CHIP INFO - YOUR VLSI TWIST! */}
                  <div className="chip-info">
                    <div className="chip-label">⚡ Chip Inside</div>
                    <div className="chip-name">{product.chip}</div>
                    <div className="chip-node">Node: {product.node}</div>
                  </div>

                  <div className="card-footer">
                    <div className="card-price">{product.price}</div>
                    <button
                      className="card-btn"
                      onClick={() => navigate('/shop')}
                    >
                      Buy Now →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* COMING SOON */}
      {coming.length > 0 && (
        <div className="section">
          <div className="section-header">
            <h2>👀 Coming Soon</h2>
            <p>Upcoming products to watch out for</p>
          </div>
          <div className="products-grid">
            {coming.map((product, i) => (
              <motion.div
                key={product.id}
                className="product-card coming"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="card-badge coming-badge">{product.badge}</div>
                <div className="card-image">{product.image}</div>
                <div className="card-body">
                  <div className="card-category">{product.category}</div>
                  <h3 className="card-name">{product.name}</h3>
                  <p className="card-desc">{product.description}</p>
                  <div className="chip-info">
                    <div className="chip-label">⚡ Chip Inside</div>
                    <div className="chip-name">{product.chip}</div>
                    <div className="chip-node">Node: {product.node}</div>
                  </div>
                  <div className="card-footer">
                    <div className="card-price">{product.price}</div>
                    <button className="card-btn-coming">
                      Notify Me 🔔
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

export default Explore