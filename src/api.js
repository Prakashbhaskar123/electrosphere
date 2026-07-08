const BASE_URL = 'http://localhost:5000/api'

// Get token from localStorage
const getToken = () => localStorage.getItem('token')

// AUTH
export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}

export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}

// PRODUCTS
export const getProducts = async (filters = {}) => {
  const params = new URLSearchParams(filters)
  const res = await fetch(`${BASE_URL}/products?${params}`)
  return res.json()
}

export const getProduct = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`)
  return res.json()
}

// ORDERS
export const placeOrder = async (data) => {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(data)
  })
  return res.json()
}

export const getMyOrders = async () => {
  const res = await fetch(`${BASE_URL}/orders/myorders`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  })
  return res.json()
}