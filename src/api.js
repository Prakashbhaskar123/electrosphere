const BASE_URL = 'https://electrosphere-2.onrender.com/api'

const getToken = () => localStorage.getItem('token')

export const registerUser = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return res.json()
  } catch (err) {
    return { message: 'Cannot connect to server!' }
  }
}

export const loginUser = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return res.json()
  } catch (err) {
    return { message: 'Cannot connect to server!' }
  }
}

export const getProducts = async (filters = {}) => {
  try {
    const params = new URLSearchParams(filters)
    const res = await fetch(`${BASE_URL}/products?${params}`)
    return res.json()
  } catch (err) {
    return []
  }
}

export const getProduct = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`)
    return res.json()
  } catch (err) {
    return null
  }
}

export const placeOrder = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(data)
    })
    return res.json()
  } catch (err) {
    return { message: 'Cannot connect to server!' }
  }
}

export const getMyOrders = async () => {
  try {
    const res = await fetch(`${BASE_URL}/orders/myorders`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    })
    return res.json()
  } catch (err) {
    return []
  }
}