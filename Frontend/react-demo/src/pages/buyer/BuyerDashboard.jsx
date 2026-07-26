import { useState, useEffect } from 'react'
import { getMyOrdersAsBuyer, updateOrderStatus } from '../../api/services'
import { useAuth } from '../../context/AuthContext'
import OrderStatusBadge from '../../components/common/OrderStatusBadge'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import './Dashboard.css'

const BuyerDashboard = () => {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchOrders() }, [])

  const fetchOrders = async () => {
    try {
      const res = await getMyOrdersAsBuyer()
      setOrders(res.data.data)
    } catch {
      toast.error('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async (orderId) => {
    const reason = window.prompt('Reason for cancellation (optional):')
    if (reason === null) return // user clicked Cancel on prompt
    try {
      await updateOrderStatus(orderId, { status: 'CANCELLED', cancelReason: reason })
      toast.success('Order cancelled')
      fetchOrders()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Cannot cancel this order')
    }
  }

  const stats = {
    total: orders.length,
    active: orders.filter(o => !['DELIVERED','CANCELLED'].includes(o.status)).length,
    delivered: orders.filter(o => o.status === 'DELIVERED').length,
    spent: orders.filter(o => o.status !== 'CANCELLED').reduce((s, o) => s + o.totalPrice, 0)
  }

  return (
    <div className="dashboard-page container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <div className="page-header">
        <h2>🛒 Buyer Dashboard — {user.name}</h2>
        <Link to="/products" className="btn btn-primary">Browse Marketplace</Link>
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card card">
          <div className="stat-val">{stats.total}</div>
          <div className="stat-label">Total Orders</div>
        </div>
        <div className="stat-card card">
          <div className="stat-val">{stats.active}</div>
          <div className="stat-label">Active Orders</div>
        </div>
        <div className="stat-card card">
          <div className="stat-val">{stats.delivered}</div>
          <div className="stat-label">Delivered</div>
        </div>
        <div className="stat-card card">
          <div className="stat-val">₹{stats.spent.toFixed(0)}</div>
          <div className="stat-label">Total Spent</div>
        </div>
      </div>

      <h3 style={{ marginBottom: '1rem', marginTop: '0.5rem' }}>My Orders</h3>

      {loading ? (
        <div className="empty-state">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="empty-state">
          <p>No orders yet. <Link to="/products" style={{ color: 'var(--green-primary)' }}>Shop now →</Link></p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(o => (
            <div className="order-card card" key={o.id}>
              <div className="order-meta">
                <div>
                  <strong>{o.productName}</strong>
                  <p className="text-muted">Farmer: {o.farmerName} · Qty: {o.quantity} {o.unit}</p>
                  <p className="text-muted">📍 {o.deliveryAddress}</p>
                  <p className="text-muted" style={{ fontSize: '0.78rem', marginTop: '2px' }}>
                    Ordered: {new Date(o.orderedAt).toLocaleDateString('en-IN')}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="order-price">₹{o.totalPrice}</div>
                  <OrderStatusBadge status={o.status} />
                  {o.cancelReason && (
                    <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '4px' }}>
                      Reason: {o.cancelReason}
                    </p>
                  )}
                </div>
              </div>
              {o.status === 'PLACED' && (
                <button className="btn btn-danger btn-sm" style={{ marginTop: '0.75rem' }}
                  onClick={() => handleCancel(o.id)}>
                  Cancel Order
                </button>
              )}
              {o.status === 'DELIVERED' && (
                <Link to={`/products/${o.productId}`} className="btn btn-secondary btn-sm"
                  style={{ marginTop: '0.75rem', display: 'inline-block' }}>
                  Leave a Review
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default BuyerDashboard
