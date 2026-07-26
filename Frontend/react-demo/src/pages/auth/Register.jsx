import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../../api/services'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import './Auth.css'

const INDIAN_STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal'
]

const Register = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: '',
    state: '', district: '', village: '', role: 'ROLE_BUYER'
  })
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await registerUser(form)
      const { token, ...userData } = res.data.data
      login(userData, token)
      toast.success('Account created successfully!')
      if (userData.role === 'ROLE_FARMER') navigate('/farmer/dashboard')
      else navigate('/buyer/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card card" style={{ maxWidth: '520px' }}>
        <div className="auth-header">
          <span className="auth-icon">🌾</span>
          <h2>Create Account</h2>
          <p>Join FasalMitra as a Farmer or Buyer</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Role selector */}
          <div className="role-toggle">
            {['ROLE_FARMER','ROLE_BUYER'].map(r => (
              <button key={r} type="button"
                className={`role-btn ${form.role === r ? 'active' : ''}`}
                onClick={() => setForm({ ...form, role: r })}>
                {r === 'ROLE_FARMER' ? '🧑‍🌾 Farmer' : '🛒 Buyer'}
              </button>
            ))}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input className="form-control" name="name" value={form.name}
                onChange={handleChange} placeholder="Ramesh Kumar" required />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input className="form-control" name="phone" value={form.phone}
                onChange={handleChange} placeholder="9876543210" required />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input className="form-control" type="email" name="email" value={form.email}
              onChange={handleChange} placeholder="you@example.com" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input className="form-control" type="password" name="password" value={form.password}
              onChange={handleChange} placeholder="Min. 6 characters" required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>State</label>
              <select className="form-control" name="state" value={form.state} onChange={handleChange}>
                <option value="">Select State</option>
                {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>District</label>
              <input className="form-control" name="district" value={form.district}
                onChange={handleChange} placeholder="Muzaffarpur" />
            </div>
          </div>

          <div className="form-group">
            <label>Village / Area</label>
            <input className="form-control" name="village" value={form.village}
              onChange={handleChange} placeholder="Village or area name" />
          </div>

          <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
