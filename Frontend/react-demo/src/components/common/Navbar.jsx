import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import './Navbar.css'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/login')
  }

  const dashboardPath = () => {
    if (!user) return '/'
    if (user.role === 'ROLE_FARMER') return '/farmer/dashboard'
    if (user.role === 'ROLE_BUYER')  return '/buyer/dashboard'
    if (user.role === 'ROLE_ADMIN')  return '/admin/dashboard'
    return '/'
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <span className="brand-icon">🌾</span>
          <span className="brand-name">FasalMitra</span>
        </Link>
      </div>

      <div className="navbar-links">
        <Link to="/products" className="nav-link">Marketplace</Link>

        {user ? (
          <>
            <Link to={dashboardPath()} className="nav-link">Dashboard</Link>
            <div className="user-chip">
              <span className="user-name">👤 {user.name}</span>
              <span className="user-role">{user.role.replace('ROLE_', '')}</span>
            </div>
            <button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login"    className="btn btn-secondary">Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
