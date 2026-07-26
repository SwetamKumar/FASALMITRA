import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import {
  adminGetStats, adminGetUsers, adminToggleUser,
  adminDeleteUser, adminGetAllOrders
} from '../../api/services'
import OrderStatusBadge from '../../components/common/OrderStatusBadge'
import toast from 'react-hot-toast'
import './AdminDashboard.css'

const StatCard = ({ label, value, icon }) => (
  <div className="admin-stat-card">
    <div className="admin-stat-icon">{icon}</div>
    <div className="admin-stat-val">{value}</div>
    <div className="admin-stat-label">{label}</div>
  </div>
)

const AdminDashboard = () => {
  const { user } = useAuth()
  const [tab, setTab]       = useState('users')
  const [stats, setStats]   = useState(null)
  const [users, setUsers]   = useState([])
  const [orders, setOrders] = useState([])
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('ALL')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAll()
  }, [])

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [sRes, uRes, oRes] = await Promise.all([
        adminGetStats(),
        adminGetUsers(),
        adminGetAllOrders()
      ])
      setStats(sRes.data.data)
      setUsers(uRes.data.data)
      setOrders(oRes.data.data)
    } catch {
      toast.error('Failed to load admin data')
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = async (userId, name, currentlyEnabled) => {
    try {
      await adminToggleUser(userId)
      toast.success(`${name} ${currentlyEnabled ? 'disabled' : 'enabled'}`)
      fetchAll()
    } catch {
      toast.error('Failed to update user')
    }
  }

  const handleDelete = async (userId, name) => {
    if (!window.confirm(`Delete user "${name}"? This cannot be undone.`)) return
    try {
      await adminDeleteUser(userId)
      toast.success(`${name} deleted`)
      fetchAll()
    } catch {
      toast.error('Failed to delete user')
    }
  }

  const filteredUsers = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
                        u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole   = roleFilter === 'ALL' || u.role === roleFilter
    return matchSearch && matchRole
  })

  const filteredOrders = orders.filter(o =>
    o.buyerName.toLowerCase().includes(search.toLowerCase()) ||
    o.productName.toLowerCase().includes(search.toLowerCase()) ||
    o.farmerName.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <div className="admin-loading">Loading admin data...</div>

  return (
    <div className="admin-page container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>

      {/* Header */}
      <div className="page-header">
        <div>
          <h2>🛡️ Admin Dashboard</h2>
          <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', marginTop: '2px' }}>
            Logged in as {user.name}
          </p>
        </div>
        <button className="btn btn-secondary" onClick={fetchAll}>↻ Refresh</button>
      </div>

      {/* Stats Row */}
      {stats && (
        <div className="admin-stats-row">
          <StatCard label="Total Users"   value={stats.totalUsers}   icon="👥" />
          <StatCard label="Farmers"       value={stats.totalFarmers} icon="🧑‍🌾" />
          <StatCard label="Buyers"        value={stats.totalBuyers}  icon="🛒" />
          <StatCard label="Total Orders"  value={stats.totalOrders}  icon="📦" />
        </div>
      )}

      {/* Tabs */}
      <div className="dash-tabs">
        <button className={`dash-tab ${tab === 'users'  ? 'active' : ''}`} onClick={() => { setTab('users');  setSearch('') }}>
          Users ({users.length})
        </button>
        <button className={`dash-tab ${tab === 'orders' ? 'active' : ''}`} onClick={() => { setTab('orders'); setSearch('') }}>
          All Orders ({orders.length})
        </button>
      </div>

      {/* Search + Filter bar */}
      <div className="admin-toolbar">
        <input
          className="form-control"
          placeholder={tab === 'users' ? 'Search by name or email...' : 'Search by buyer, product, farmer...'}
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ maxWidth: '340px' }}
        />
        {tab === 'users' && (
          <select className="form-control" value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            style={{ width: '160px' }}>
            <option value="ALL">All Roles</option>
            <option value="ROLE_FARMER">Farmers</option>
            <option value="ROLE_BUYER">Buyers</option>
            <option value="ROLE_ADMIN">Admins</option>
          </select>
        )}
      </div>

      {/* ── Users Tab ──────────────────────────────────────── */}
      {tab === 'users' && (
        <div className="admin-table-wrap card">
          {filteredUsers.length === 0 ? (
            <div className="empty-state">No users found.</div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(u => (
                  <tr key={u.id} className={!u.enabled ? 'row-disabled' : ''}>
                    <td><strong>{u.name}</strong></td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-mid)' }}>{u.email}</td>
                    <td style={{ fontSize: '0.82rem' }}>{u.phone || '—'}</td>
                    <td>
                      <span className={`role-badge role-${u.role.replace('ROLE_','').toLowerCase()}`}>
                        {u.role.replace('ROLE_', '')}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-light)' }}>
                      {u.district && u.state ? `${u.district}, ${u.state}` : '—'}
                    </td>
                    <td>
                      <span className={`status-badge ${u.enabled ? 'status-active' : 'status-inactive'}`}>
                        {u.enabled ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          className={`btn btn-sm ${u.enabled ? 'btn-amber' : 'btn-secondary'}`}
                          onClick={() => handleToggle(u.id, u.name, u.enabled)}>
                          {u.enabled ? 'Disable' : 'Enable'}
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(u.id, u.name)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* ── Orders Tab ─────────────────────────────────────── */}
      {tab === 'orders' && (
        <div className="admin-table-wrap card">
          {filteredOrders.length === 0 ? (
            <div className="empty-state">No orders found.</div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Buyer</th>
                  <th>Farmer</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(o => (
                  <tr key={o.id}>
                    <td style={{ color: 'var(--text-light)', fontSize: '0.8rem' }}>#{o.id}</td>
                    <td><strong>{o.productName}</strong></td>
                    <td style={{ fontSize: '0.82rem' }}>{o.buyerName}</td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-mid)' }}>{o.farmerName}</td>
                    <td style={{ fontSize: '0.82rem' }}>{o.quantity} {o.unit}</td>
                    <td style={{ fontWeight: 600, color: 'var(--green-primary)' }}>₹{o.totalPrice}</td>
                    <td><OrderStatusBadge status={o.status} /></td>
                    <td style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>
                      {o.orderedAt ? new Date(o.orderedAt).toLocaleDateString('en-IN') : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
