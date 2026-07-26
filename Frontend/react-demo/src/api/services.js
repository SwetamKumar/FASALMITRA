import api from './axiosInstance'

// ─── Auth ────────────────────────────────────────────────────
export const registerUser  = (data) => api.post('/auth/register', data)
export const loginUser     = (data) => api.post('/auth/login', data)

// ─── Products ─────────────────────────────────────────────────
export const getPublicProducts = (params) => api.get('/products/public', { params })
export const getProductById    = (id)      => api.get(`/products/public/${id}`)
export const getMyProducts     = ()        => api.get('/products/farmer/my-products')
export const addProduct        = (data)    => api.post('/products/farmer', data)
export const updateProduct     = (id, data)=> api.put(`/products/farmer/${id}`, data)
export const deleteProduct     = (id)      => api.delete(`/products/farmer/${id}`)

// ─── Orders ──────────────────────────────────────────────────
export const placeOrder         = (data)    => api.post('/orders/buyer/place', data)
export const getMyOrdersAsBuyer = ()        => api.get('/orders/buyer/my-orders')
export const getIncomingOrders  = ()        => api.get('/orders/farmer/incoming')
export const updateOrderStatus  = (id, data)=> api.patch(`/orders/${id}/status`, data)

// ─── Reviews ─────────────────────────────────────────────────
export const addReview         = (data)       => api.post('/reviews', data)
export const getProductReviews = (productId)  => api.get(`/reviews/product/${productId}`)

// ─── Weather ─────────────────────────────────────────────────
export const getWeather = (district, state) =>
  api.get('/weather', { params: { district, state } })

// ─── Admin ───────────────────────────────────────────────────
export const adminGetStats      = ()        => api.get('/admin/stats')
export const adminGetUsers      = ()        => api.get('/admin/users')
export const adminToggleUser    = (id)      => api.patch(`/admin/users/${id}/toggle`)
export const adminDeleteUser    = (id)      => api.delete(`/admin/users/${id}`)
export const adminGetAllOrders  = ()        => api.get('/admin/orders')
