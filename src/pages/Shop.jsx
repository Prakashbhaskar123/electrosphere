import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './Shop.css'

const products = [
  {
    id: 1,
    name: "Apple iPhone 17 Pro",
    category: "Phones",
    price: 134900,
    rating: 4.8,
    reviews: 2341,
    image: "📱",
    badge: "🔥 Bestseller",
    chip: "Apple A19 Pro",
    description: "Revolutionary camera system with titanium design.",
    inStock: true
  },
  {
    id: 2,
    name: "Samsung Galaxy S25 Ultra",
    category: "Phones",
    price: 129999,
    rating: 4.7,
    reviews: 1892,
    image: "📱",
    badge: "⭐ Top Rated",
    chip: "Snapdragon 8 Elite",
    description: "200MP camera with S Pen and AI features.",
    inStock: true
  },
  {
    id: 3,
    name: "MacBook Pro M4",
    category: "Laptops",
    price: 249900,
    rating: 4.9,
    reviews: 3210,
    image: "💻",
    badge: "🚀 Most Powerful",
    chip: "Apple M4 Pro",
    description: "Fastest Mac ever with 22-hour battery life.",
    inStock: true
  },
  {
    id: 4,
    name: "ASUS ROG Zephyrus G16",
    category: "Laptops",
    price: 289990,
    rating: 4.6,
    reviews: 987,
    image: "💻",
    badge: "🎮 Gaming Beast",
    chip: "RTX 5080",
    description: "Ultimate gaming laptop with OLED display.",
    inStock: true
  },
  {
    id: 5,
    name: "Sony WH-1000XM6",
    category: "Audio",
    price: 34990,
    rating: 4.8,
    reviews: 5432,
    image: "🎧",
    badge: "🎵 Best Audio",
    chip: "Sony QN3",
    description: "Industry leading noise cancellation headphones.",
    inStock: true
  },
  {
    id: 6,
    name: "Apple AirPods Pro 3",
    category: "Audio",
    price: 24900,
    rating: 4.7,
    reviews: 4321,
    image: "🎧",
    badge: "🍎 Apple Pick",
    chip: "Apple H3",
    description: "Adaptive audio with hearing health features.",
    inStock: true
  },
  {
    id: 7,
    name: "Apple Watch Ultra 3",
    category: "Wearables",
    price: 89900,
    rating: 4.8,
    reviews: 1234,
    image: "⌚",
    badge: "💪 Rugged",
    chip: "Apple S10",
    description: "Most capable Apple Watch for extreme athletes.",
    inStock: true
  },
  {
    id: 8,
    name: "Samsung Galaxy Ring",
    category: "Wearables",
    price: 29999,
    rating: 4.5,
    reviews: 876,
    image: "💍",
    badge: "💡 Innovative",
    chip: "Exynos W1000",
    description: "Health tracking ring with 10-day battery.",
    inStock: false
  },
  {
    id: 9,
    name: "iPad Pro M4",
    category: "Tablets",
    price: 109900,
    rating: 4.8,
    reviews: 2109,
    image: "📱",
    badge: "✏️ Creative",
    chip: "Apple M4",
    description: "Thinnest Apple product ever with OLED display.",
    inStock: true
  },
  {
    id: 10,
    name: "Google Pixel 9 Pro",
    category: "Phones",
    price: 106999,
    rating: 4.6,
    reviews: 1543,
    image: "📱",
    badge: "🤖 AI First",
    chip: "Google Tensor G4",
    description: "Best AI camera phone with 7 years of updates.",
    inStock: true
  },
]

const categories = ["All", "Phones", "Laptops", "Audio", "Wearables", "Tablets"]

function Shop() {
  const [active, setActive] = useState("All")
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("default")
  const [showCart, setShowCart] = useState(false)
  const navigate = useNavigate()

  // FILTER
  let filtered = active === "All"
    ? products
    : products.filter(p => p.category === active)

  // SEARCH
  if (search) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
  }

  // SORT
  if (sort === "low") filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (sort === "high") filtered = [...filtered].sort((a, b) => b.price - a.price)
  if (sort === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating)

  // CART FUNCTIONS
  const addToCart = (product) => {
    const exists = cart.find(i => i.id === product.id)
    if (exists) {
      setCart(cart.map(i =>
        i.id === product.id
          ? { ...i, qty: i.qty + 1 }
          : i
      ))
    } else {
      setCart([...cart, { ...product, qty: 1 }])
    }
  }

  const removeFromCart = (id) => {
    setCart(cart.filter(i => i.id !== id))
  }

  const toggleWishlist = (id) => {
    setWishlist(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    )
  }

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0)
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)

  return (
    <div className="shop">

      {/* NAVBAR */}
      <nav className="shop-navbar">
        <div className="nav-logo" onClick={() => navigate('/')}>
          ⚡ <span>Electro</span>Sphere
        </div>
        <div className="nav-links">
  <span className="nav-link"
    onClick={() => navigate('/explore')}>
    🔭 Explore
  </span>
  <span className="nav-link active">🛒 Shop</span>
</div>

{localStorage.getItem('token') ? (
  <button
    className="logout-btn"
    onClick={() => {
      localStorage.clear()
      window.location.reload()
    }}
  >
    Logout
  </button>
) : (
  <button
    className="login-nav-btn"
    onClick={() => navigate('/login')}
  >
    Login
  </button>
)}

<button
  className="cart-icon"
  onClick={() => setShowCart(true)}
>
          🛒 Cart
          {cartCount > 0 && (
            <span className="cart-count">{cartCount}</span>
          )}
        </button>
      </nav>

      {/* HERO */}
      <motion.div
        className="shop-hero"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Shop the Latest <span>Electronics</span></h1>
        <p>Premium gadgets at the best prices — fast delivery across India</p>

        {/* SEARCH */}
        <div className="search-bar">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search phones, laptops, audio..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button onClick={() => setSearch("")}>✕</button>
          )}
        </div>
      </motion.div>

      {/* FILTERS ROW */}
      <div className="filters-row">
        <div className="categories">
          {categories.map(cat => (
            <button
              key={cat}
              className={`cat-btn ${active === cat ? 'cat-active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <select
          className="sort-select"
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* RESULTS COUNT */}
      <div className="results-count">
        Showing {filtered.length} products
        {search && ` for "${search}"`}
      </div>

      {/* PRODUCTS GRID */}
      <div className="shop-grid">
        {filtered.length === 0 ? (
          <div className="no-results">
            <div style={{ fontSize: '3rem' }}>🔍</div>
            <p>No products found for "{search}"</p>
            <button onClick={() => setSearch("")}>Clear Search</button>
          </div>
        ) : (
          filtered.map((product, i) => (
            <motion.div
              key={product.id}
              className="shop-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
            >
              {/* BADGE */}
              <div className="shop-badge">{product.badge}</div>

              {/* WISHLIST */}
              <button
                className="wishlist-btn"
                onClick={() => toggleWishlist(product.id)}
              >
                {wishlist.includes(product.id) ? '❤️' : '🤍'}
              </button>

              {/* IMAGE */}
              <div className="shop-image">{product.image}</div>

              {/* BODY */}
              <div className="shop-body">
                <div className="shop-category">{product.category}</div>
                <h3 className="shop-name">{product.name}</h3>
                <p className="shop-desc">{product.description}</p>

                {/* CHIP TAG */}
                <div className="shop-chip">⚡ {product.chip}</div>

                {/* RATING */}
                <div className="shop-rating">
                  <span className="stars">
                    {"★".repeat(Math.floor(product.rating))}
                    {"☆".repeat(5 - Math.floor(product.rating))}
                  </span>
                  <span className="rating-num">{product.rating}</span>
                  <span className="reviews">({product.reviews})</span>
                </div>

                {/* PRICE + BUTTON */}
                <div className="shop-footer">
                  <div className="shop-price">
                    ₹{product.price.toLocaleString()}
                  </div>
                  {product.inStock ? (
                    <button
                      className="add-cart-btn"
                      onClick={() => addToCart(product)}
                    >
                      + Add to Cart
                    </button>
                  ) : (
                    <button className="out-of-stock-btn" disabled>
                      Out of Stock
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* CART SIDEBAR */}
      {showCart && (
        <div className="cart-overlay" onClick={() => setShowCart(false)}>
          <motion.div
            className="cart-sidebar"
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="cart-header">
              <h2>🛒 Your Cart ({cartCount})</h2>
              <button onClick={() => setShowCart(false)}>✕</button>
            </div>

            {cart.length === 0 ? (
              <div className="cart-empty">
                <div style={{ fontSize: '3rem' }}>🛒</div>
                <p>Your cart is empty!</p>
                <button onClick={() => setShowCart(false)}>
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-image">{item.image}</div>
                      <div className="cart-item-info">
                        <div className="cart-item-name">{item.name}</div>
                        <div className="cart-item-price">
                          ₹{(item.price * item.qty).toLocaleString()}
                        </div>
                        <div className="cart-item-qty">Qty: {item.qty}</div>
                      </div>
                      <button
                        className="cart-remove"
                        onClick={() => removeFromCart(item.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
                <div className="cart-total">
                  <div className="total-row">
                    <span>Total</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <button className="checkout-btn"
                    onClick={() => {
                      localStorage.setItem('cart', JSON.stringify(cart));
                      navigate('/checkout');
                    }}>
                    Proceed to Checkout →
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}

    </div>
  )
}

export default Shop