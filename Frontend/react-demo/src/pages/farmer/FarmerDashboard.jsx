import { useState, useEffect } from 'react'
import { getMyProducts, addProduct, updateProduct, deleteProduct, getIncomingOrders, updateOrderStatus } from '../../api/services'
import { useAuth } from '../../context/AuthContext'
import OrderStatusBadge from '../../components/common/OrderStatusBadge'
import toast from 'react-hot-toast'
import './Dashboard.css'

const EMPTY_FORM = { name: '', description: '', pricePerUnit: '', unit: 'kg', quantityAvailable: '', category: '', imageUrl: '' }
const CATEGORIES = ['Vegetables','Fruits','Grains','Pulses','Dairy','Spices','Oilseeds','Other']
const UNITS = ['kg', 'quintal', 'dozen', 'piece', 'litre', 'gram']
const STATUS_FLOW = ['PLACED','CONFIRMED','SHIPPED','DELIVERED']

const FarmerDashboard = () => {
  const { user } = useAuth()
  const [tab, setTab] = useState('products')
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchProducts()
    fetchOrders()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await getMyProducts()
      setProducts(res.data.data)
    } catch { toast.error('Failed to load products') }
  }

  const fetchOrders = async () => {
    try {
      const res = await getIncomingOrders()
      setOrders(res.data.data)
    } catch { toast.error('Failed to load orders') }
  }

  const handleFormChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = { ...form, pricePerUnit: parseFloat(form.pricePerUnit), quantityAvailable: parseFloat(form.quantityAvailable) }
      if (editId) {
        await updateProduct(editId, payload)
        toast.success('Product updated!')
      } else {
        await addProduct(payload)
        toast.success('Product added!')
      }
      setForm(EMPTY_FORM); setEditId(null); setShowForm(false)
      fetchProducts()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save product')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (p) => {
    setForm({ name: p.name, description: p.description || '', pricePerUnit: p.pricePerUnit,
      unit: p.unit, quantityAvailable: p.quantityAvailable, category: p.category || '', imageUrl: p.imageUrl || '' })
    setEditId(p.id); setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return
    try { await deleteProduct(id); toast.success('Deleted'); fetchProducts() }
    catch { toast.error('Delete failed') }
  }

  const handleStatusUpdate = async (orderId, nextStatus) => {
    try {
      await updateOrderStatus(orderId, { status: nextStatus })
      toast.success(`Order marked as ${nextStatus}`)
      fetchOrders()
    } catch { toast.error('Status update failed') }
  }

  const nextStatus = (current) => {
    const idx = STATUS_FLOW.indexOf(current)
    return idx >= 0 && idx < STATUS_FLOW.length - 1 ? STATUS_FLOW[idx + 1] : null
  }

  return (
    <div className="dashboard-page container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <div className="page-header">
        <h2>🧑‍🌾 Farmer Dashboard — {user.name}</h2>
      </div>

      {/* Tabs */}
      <div className="dash-tabs">
        <button className={`dash-tab ${tab === 'products' ? 'active' : ''}`} onClick={() => setTab('products')}>
          My Products ({products.length})
        </button>
        <button className={`dash-tab ${tab === 'orders' ? 'active' : ''}`} onClick={() => setTab('orders')}>
          Incoming Orders ({orders.length})
        </button>
      </div>

      {/* ── Products Tab ─────────────────────────── */}
      {tab === 'products' && (
        <div>
          <div className="page-header" style={{ marginBottom: '1rem' }}>
            <span />
            <button className="btn btn-primary" onClick={() => { setShowForm(!showForm); setEditId(null); setForm(EMPTY_FORM) }}>
              {showForm ? '✕ Cancel' : '+ Add Product'}
            </button>
          </div>

          {showForm && (
            <form className="card product-form" onSubmit={handleSubmit}>
              <h3 style={{ marginBottom: '1rem' }}>{editId ? 'Edit Product' : 'Add New Product'}</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Product Name *</label>
                  <input className="form-control" name="name" value={form.name} onChange={handleFormChange} required />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select className="form-control" name="category" value={form.category} onChange={handleFormChange}>
                    <option value="">Select</option>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" name="description" value={form.description} onChange={handleFormChange} rows={2} />
              </div>
              <div className="form-row three-col">
                <div className="form-group">
                  <label>Price per Unit (₹) *</label>
                  <input className="form-control" type="number" name="pricePerUnit" value={form.pricePerUnit} onChange={handleFormChange} required />
                </div>
                <div className="form-group">
                  <label>Unit *</label>
                  <select className="form-control" name="unit" value={form.unit} onChange={handleFormChange}>
                    {UNITS.map(u => <option key={u}>{u}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Quantity Available *</label>
                  <input className="form-control" type="number" name="quantityAvailable" value={form.quantityAvailable} onChange={handleFormChange} required />
                </div>
              </div>
              <div className="form-group">
                <label>Image URL (optional)</label>
                <input className="form-control" name="imageUrl" value={form.imageUrl} onChange={handleFormChange} placeholder="https://..." />
              </div>
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? 'Saving...' : editId ? 'Update Product' : 'Add Product'}
              </button>
            </form>
          )}

          {products.length === 0 ? (
            <div className="empty-state">No products yet. Add your first product!</div>
          ) : (
            <div className="product-table card">
              <table>
                <thead>
                  <tr>
                    <th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id}>
                      <td><strong>{p.name}</strong></td>
                      <td>{p.category || '—'}</td>
                      <td>₹{p.pricePerUnit}/{p.unit}</td>
                      <td>{p.quantityAvailable} {p.unit}</td>
                      <td>
                        <button className="btn btn-amber btn-sm" onClick={() => handleEdit(p)}>Edit</button>
                        {' '}
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ── Orders Tab ───────────────────────────── */}
      {tab === 'orders' && (
        <div>
          {orders.length === 0 ? (
            <div className="empty-state">No orders received yet.</div>
          ) : (
            <div className="orders-list">
              {orders.map(o => (
                <div className="order-card card" key={o.id}>
                  <div className="order-meta">
                    <div>
                      <strong>{o.productName}</strong>
                      <p className="text-muted">Buyer: {o.buyerName} · Qty: {o.quantity} {o.unit}</p>
                      <p className="text-muted">Deliver to: {o.deliveryAddress}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className="order-price">₹{o.totalPrice}</div>
                      <OrderStatusBadge status={o.status} />
                    </div>
                  </div>
                  {nextStatus(o.status) && (
                    <button className="btn btn-primary btn-sm" style={{ marginTop: '0.75rem' }}
                      onClick={() => handleStatusUpdate(o.id, nextStatus(o.status))}>
                      Mark as {nextStatus(o.status)}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default FarmerDashboard
