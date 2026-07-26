import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById, getProductReviews, addReview, placeOrder, getWeather } from "../api/services";
import { useAuth } from "../context/AuthContext";
import OrderStatusBadge from "../components/common/OrderStatusBadge";
import toast from 'react-hot-toast'
import './ProductDetails.css'

const renderStars = (rating) => rating
  ? '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating))
  : '☆☆☆☆☆'

const ProductDetail = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [product, setProduct]   = useState(null)
  const [reviews, setReviews]   = useState([])
  const [weather, setWeather]   = useState(null)
  const [loading, setLoading]   = useState(true)

  const [orderForm, setOrderForm] = useState({ quantity: 1, deliveryAddress: '' })
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => { fetchAll() }, [id])

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [pRes, rRes] = await Promise.all([getProductById(id), getProductReviews(id)])
      setProduct(pRes.data.data)
      setReviews(rRes.data.data)
      // Fetch weather for farmer's location
      const p = pRes.data.data
      if (p.farmerDistrict && p.farmerState) {
        try {
          const wRes = await getWeather(p.farmerDistrict, p.farmerState)
          const w = JSON.parse(wRes.data.data)
          setWeather(w)
        } catch { /* weather optional */ }
      }
    } catch {
      toast.error('Product not found')
      navigate('/products')
    } finally {
      setLoading(false)
    }
  }

  const handleOrder = async (e) => {
    e.preventDefault()
    if (!user) { navigate('/login'); return }
    if (user.role !== 'ROLE_BUYER') { toast.error('Only buyers can place orders'); return }
    setSubmitting(true)
    try {
      await placeOrder({ productId: product.id, ...orderForm })
      toast.success('Order placed successfully!')
      navigate('/buyer/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Order failed')
    } finally {
      setSubmitting(false)
    }
  }

  const handleReview = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await addReview({ productId: product.id, ...reviewForm })
      toast.success('Review submitted!')
      setReviewForm({ rating: 5, comment: '' })
      fetchAll()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Review failed')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="empty-state">Loading...</div>
  if (!product) return null

  const totalPrice = (product.pricePerUnit * orderForm.quantity).toFixed(2)

  return (
    <div className="product-detail-page container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <div className="detail-grid">

        {/* Left: Product Info */}
        <div>
          <div className="detail-img">
            {product.imageUrl
              ? <img src={product.imageUrl} alt={product.name} />
              : <div className="img-placeholder-lg">🌿</div>
            }
          </div>

          <div className="card detail-info">
            <span className="product-category">{product.category}</span>
            <h2 style={{ marginTop: '0.5rem' }}>{product.name}</h2>
            <p style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>{product.description}</p>

            <div className="info-row">
              <span>🧑‍🌾 Farmer:</span>
              <strong>{product.farmerName} · {product.farmerDistrict}, {product.farmerState}</strong>
            </div>
            <div className="info-row">
              <span>📦 Stock:</span>
              <strong>{product.quantityAvailable} {product.unit}</strong>
            </div>
            <div className="info-row">
              <span>⭐ Rating:</span>
              <strong className="stars">{renderStars(product.averageRating)}
                {product.averageRating ? ` (${product.averageRating.toFixed(1)})` : ' No reviews'}</strong>
            </div>
            <div className="price-big">
              ₹{product.pricePerUnit} <span>/ {product.unit}</span>
            </div>

            {/* Weather widget */}
            {weather && !weather.error && (
              <div className="weather-widget">
                <strong>🌤 Weather at farm location</strong>
                <div className="weather-details">
                  <span>{weather.weather?.[0]?.description}</span>
                  <span>🌡 {weather.main?.temp}°C</span>
                  <span>💧 {weather.main?.humidity}%</span>
                  <span>💨 {weather.wind?.speed} m/s</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Order + Reviews */}
        <div>
          {/* Order Form */}
          {product.available && user?.role === 'ROLE_BUYER' && (
            <div className="card" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>Place Order</h3>
              <form onSubmit={handleOrder}>
                <div className="form-group">
                  <label>Quantity ({product.unit})</label>
                  <input className="form-control" type="number" min="1"
                    max={product.quantityAvailable}
                    value={orderForm.quantity}
                    onChange={e => setOrderForm({ ...orderForm, quantity: parseFloat(e.target.value) })} />
                </div>
                <div className="form-group">
                  <label>Delivery Address</label>
                  <textarea className="form-control" rows={2} required
                    value={orderForm.deliveryAddress}
                    onChange={e => setOrderForm({ ...orderForm, deliveryAddress: e.target.value })}
                    placeholder="Village, District, State, PIN" />
                </div>
                <div className="order-total">
                  Total: <strong>₹{totalPrice}</strong>
                </div>
                <button className="btn btn-primary btn-block" type="submit" disabled={submitting}>
                  {submitting ? 'Placing...' : '🛒 Place Order'}
                </button>
              </form>
            </div>
          )}

          {!user && (
            <div className="card" style={{ textAlign: 'center', marginBottom: '1.5rem', padding: '2rem' }}>
              <p style={{ marginBottom: '1rem' }}>Login to place an order</p>
              <button className="btn btn-primary" onClick={() => navigate('/login')}>Login</button>
            </div>
          )}

          {/* Reviews */}
          <div className="card">
            <h3 style={{ marginBottom: '1rem' }}>Reviews ({reviews.length})</h3>

            {user?.role === 'ROLE_BUYER' && (
              <form onSubmit={handleReview} style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                <div className="form-group">
                  <label>Your Rating</label>
                  <div className="star-select">
                    {[1,2,3,4,5].map(n => (
                      <button key={n} type="button"
                        className={`star-btn ${reviewForm.rating >= n ? 'active' : ''}`}
                        onClick={() => setReviewForm({ ...reviewForm, rating: n })}>★</button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>Comment</label>
                  <textarea className="form-control" rows={2}
                    value={reviewForm.comment}
                    onChange={e => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    placeholder="Share your experience..." />
                </div>
                <button className="btn btn-secondary" type="submit" disabled={submitting}>
                  Submit Review
                </button>
              </form>
            )}

            {reviews.length === 0
              ? <p style={{ color: 'var(--text-light)' }}>No reviews yet. Be the first!</p>
              : reviews.map(r => (
                <div key={r.id} className="review-item">
                  <div className="review-header">
                    <strong>{r.buyerName}</strong>
                    <span className="stars">{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-mid)' }}>{r.comment}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
                    {new Date(r.createdAt).toLocaleDateString('en-IN')}
                  </p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
