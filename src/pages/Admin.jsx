import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import './Admin.css'

const BASE_URL = 'http://localhost:5000/api'

function Admin() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('dashboard')
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Phones',
    chip: '',
    chipNode: '',
    badge: '⭐ New',
    image: '📱',
    status: 'Just Launched',
    inStock: true
  })

  const token = localStorage.getItem('token')

  // CHECK IF ADMIN
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (!user || user.role !== 'admin') {
      alert('Access denied! Admins only.')
      navigate('/')
    }
    fetchProducts()
    fetchOrders()
  }, [])

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/products`)
      const data = await res.json()
      setProducts(Array.isArray(data) ? data : [])
    } catch (err) {
      console.log('Error:', err)
    }
    setLoading(false)
  }

  // FETCH ORDERS
  const fetchOrders = async () => {
    try {
      const res = await fetch(`${BASE_URL}/orders`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      setOrders(Array.isArray(data) ? data : [])
    } catch (err) {
      console.log('Error:', err)
    }
  }

  // ADD PRODUCT
  const handleAddProduct = async () => {
    try {
      const res = await fetch(`${BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...newProduct,
          price: Number(newProduct.price)
        })
      })
      const data = await res.json()
      if (data._id) {
        alert('Product added successfully!')
        setShowAddForm(false)
        fetchProducts()
        setNewProduct({
          name: '', description: '', price: '',
          category: 'Phones', chip: '', chipNode: '',
          badge: '⭐ New', image: '📱',
          status: 'Just Launched', inStock: true
        })
      }
    } catch (err) {
      console.log('Error:', err)
    }
  }

  // DELETE PRODUCT
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return
    try {
      await fetch(`${BASE_URL}/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      fetchProducts()
    } catch (err) {
      console.log('Error:', err)
    }
  }

  // UPDATE ORDER STATUS
  const handleOrderStatus = async (id, status) => {
    try {
      await fetch(`${BASE_URL}/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ orderStatus: status })
      })
      fetchOrders()
    } catch (err) {
      console.log('Error:', err)
    }
  }

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0)

  return (
    <div className="admin">

      {/* SIDEBAR */}
      <div className="admin-sidebar">
        <div className="admin-logo">
          ⚡ <span>Admin</span>
        </div>

        <nav className="admin-nav">
          {[
            { id: 'dashboard', icon: '📊', label: 'Dashboard' },
            { id: 'products', icon: '📦', label: 'Products' },
            { id: 'orders', icon: '🛒', label: 'Orders' },
          ].map(item => (
            <button
              key={item.id}
              className={`admin-nav-btn ${tab === item.id ? 'active' : ''}`}
              onClick={() => setTab(item.id)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <button
          className="admin-back-btn"
          onClick={() => navigate('/')}
        >
          ← Back to Site
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="admin-main">

        {/* DASHBOARD */}
        {tab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h1 className="admin-title">Dashboard</h1>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📦</div>
                <div className="stat-num">{products.length}</div>
                <div className="stat-label">Total Products</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🛒</div>
                <div className="stat-num">{orders.length}</div>
                <div className="stat-label">Total Orders</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-num">
                  ₹{totalRevenue.toLocaleString()}
                </div>
                <div className="stat-label">Total Revenue</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-num">
                  {orders.filter(o =>
                    o.orderStatus === 'delivered'
                  ).length}
                </div>
                <div className="stat-label">Delivered</div>
              </div>
            </div>

            {/* RECENT ORDERS */}
            <h2 className="section-title">Recent Orders</h2>
            <div className="table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map(order => (
                    <tr key={order._id}>
                      <td>#{order._id.slice(-6).toUpperCase()}</td>
                      <td>₹{order.totalAmount.toLocaleString()}</td>
                      <td>
                        <span className={`status-badge ${order.orderStatus}`}>
                          {order.orderStatus}
                        </span>
                      </td>
                      <td>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* PRODUCTS */}
        {tab === 'products' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="tab-header">
              <h1 className="admin-title">Products</h1>
              <button
                className="add-btn"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                + Add Product
              </button>
            </div>

            {/* ADD PRODUCT FORM */}
            {showAddForm && (
              <div className="add-form">
                <h3>Add New Product</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Product Name</label>
                    <input
                      placeholder="e.g. iPhone 17 Pro"
                      value={newProduct.name}
                      onChange={e => setNewProduct({
                        ...newProduct, name: e.target.value
                      })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Price (₹)</label>
                    <input
                      type="number"
                      placeholder="e.g. 129999"
                      value={newProduct.price}
                      onChange={e => setNewProduct({
                        ...newProduct, price: e.target.value
                      })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={newProduct.category}
                      onChange={e => setNewProduct({
                        ...newProduct, category: e.target.value
                      })}
                    >
                      <option>Phones</option>
                      <option>Laptops</option>
                      <option>Audio</option>
                      <option>Wearables</option>
                      <option>Tablets</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Chip Name</label>
                    <input
                      placeholder="e.g. Apple A19 Pro"
                      value={newProduct.chip}
                      onChange={e => setNewProduct({
                        ...newProduct, chip: e.target.value
                      })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Chip Node</label>
                    <input
                      placeholder="e.g. 3nm TSMC"
                      value={newProduct.chipNode}
                      onChange={e => setNewProduct({
                        ...newProduct, chipNode: e.target.value
                      })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Image Emoji</label>
                    <input
                      placeholder="e.g. 📱"
                      value={newProduct.image}
                      onChange={e => setNewProduct({
                        ...newProduct, image: e.target.value
                      })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      value={newProduct.status}
                      onChange={e => setNewProduct({
                        ...newProduct, status: e.target.value
                      })}
                    >
                      <option>Just Launched</option>
                      <option>Coming Soon</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Badge</label>
                    <input
                      placeholder="e.g. 🔥 Hot"
                      value={newProduct.badge}
                      onChange={e => setNewProduct({
                        ...newProduct, badge: e.target.value
                      })}
                    />
                  </div>
                </div>
                <div className="form-group full">
                  <label>Description</label>
                  <textarea
                    placeholder="Product description..."
                    value={newProduct.description}
                    onChange={e => setNewProduct({
                      ...newProduct, description: e.target.value
                    })}
                    rows={3}
                  />
                </div>
                <div className="form-actions">
                  <button
                    className="save-btn"
                    onClick={handleAddProduct}
                  >
                    Save Product ✅
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* PRODUCTS TABLE */}
            <div className="table-wrap">
              {loading ? (
                <div className="loading">Loading products...</div>
              ) : products.length === 0 ? (
                <div className="empty">
                  <p>No products yet!</p>
                  <p>Click "Add Product" to get started.</p>
                </div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Chip</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product._id}>
                        <td style={{ fontSize: '1.5rem' }}>
                          {product.image}
                        </td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>₹{product.price.toLocaleString()}</td>
                        <td>
                          <span className="chip-tag">
                            ⚡ {product.chip}
                          </span>
                        </td>
                        <td>
                          <span className={`status-badge ${product.status === 'Just Launched' ? 'delivered' : 'placed'}`}>
                            {product.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(product._id)}
                          >
                            🗑️ Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>
        )}

        {/* ORDERS */}
        {tab === 'orders' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h1 className="admin-title">Orders</h1>
            <div className="table-wrap">
              {orders.length === 0 ? (
                <div className="empty">
                  <p>No orders yet!</p>
                </div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Items</th>
                      <th>Amount</th>
                      <th>Address</th>
                      <th>Status</th>
                      <th>Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order._id}>
                        <td>#{order._id.slice(-6).toUpperCase()}</td>
                        <td>{order.items?.length || 0} items</td>
                        <td>₹{order.totalAmount.toLocaleString()}</td>
                        <td>
                          {order.shippingAddress?.city},
                          {order.shippingAddress?.state}
                        </td>
                        <td>
                          <span className={`status-badge ${order.orderStatus}`}>
                            {order.orderStatus}
                          </span>
                        </td>
                        <td>
                          <select
                            className="status-select"
                            value={order.orderStatus}
                            onChange={e => handleOrderStatus(
                              order._id, e.target.value
                            )}
                          >
                            <option value="placed">Placed</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </motion.div>
        )}

      </div>
    </div>
  )
}

export default Admin