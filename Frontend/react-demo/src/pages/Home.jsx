import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Home.css'

const Home = () => {
  const { user } = useAuth()

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1>🌾 FasalMitra</h1>
          <p className="hero-subtitle">India's Agricultural Marketplace</p>
          <p className="hero-desc">
            Connecting farmers directly with buyers — fresh produce, fair prices,
            zero middlemen.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary btn-lg">Browse Marketplace</Link>
            {!user && <Link to="/register" className="btn btn-secondary btn-lg">Join Now</Link>}
          </div>
        </div>
        <div className="hero-illustration">🌿🌾🥦🌽🍅</div>
      </section>

      {/* Features */}
      <section className="features container">
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Why FasalMitra?</h2>
        <div className="features-grid">
          {[
            { icon: '🧑‍🌾', title: 'For Farmers', desc: 'List your produce directly, manage orders, and get fair prices without middlemen.' },
            { icon: '🛒', title: 'For Buyers', desc: 'Buy fresh produce directly from verified farmers with complete order tracking.' },
            { icon: '🌤', title: 'Weather Insights', desc: 'Real-time weather data for farm locations to help plan your purchases smartly.' },
            { icon: '⭐', title: 'Ratings & Reviews', desc: 'Transparent review system so buyers can trust the quality of what they order.' },
          ].map(f => (
            <div key={f.title} className="feature-card card">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      {!user && (
        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to get started?</h2>
            <p>Join thousands of farmers and buyers across India.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem' }}>
              <Link to="/register" className="btn btn-primary btn-lg">Register as Farmer</Link>
              <Link to="/register" className="btn btn-secondary btn-lg">Register as Buyer</Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Home
