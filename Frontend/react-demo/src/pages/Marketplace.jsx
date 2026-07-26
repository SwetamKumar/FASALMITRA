import { useState, useEffect } from 'react'
import { getPublicProducts } from '../api/services'
import ProductCard from "../components/common/ProductCard";
import toast from 'react-hot-toast'
import './Marketplace.css'

const CATEGORIES = ['Vegetables','Fruits','Grains','Pulses','Dairy','Spices','Oilseeds','Other']

const Marketplace = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ category: '', minPrice: '', maxPrice: '', search: '' })

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = {}
      if (filters.category) params.category = filters.category
      if (filters.minPrice)  params.minPrice  = filters.minPrice
      if (filters.maxPrice)  params.maxPrice  = filters.maxPrice
      if (filters.search)    params.search    = filters.search

      const res = await getPublicProducts(params)
      setProducts(res.data.data)
    } catch {
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProducts() }, [])

  const handleFilter = (e) => {
    e.preventDefault()
    fetchProducts()
  }

  const handleReset = () => {
    setFilters({ category: '', minPrice: '', maxPrice: '', search: '' })
    setTimeout(fetchProducts, 100)
  }

  return (
    <div className="marketplace-page container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>🛒 Marketplace</h2>

      {/* Filter Bar */}
      <form className="filter-bar card" onSubmit={handleFilter}>
        <input className="form-control" placeholder="Search products..."
          value={filters.search}
          onChange={e => setFilters({ ...filters, search: e.target.value })} />

        <select className="form-control" value={filters.category}
          onChange={e => setFilters({ ...filters, category: e.target.value })}>
          <option value="">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <input className="form-control" type="number" placeholder="Min ₹"
          value={filters.minPrice}
          onChange={e => setFilters({ ...filters, minPrice: e.target.value })} />

        <input className="form-control" type="number" placeholder="Max ₹"
          value={filters.maxPrice}
          onChange={e => setFilters({ ...filters, maxPrice: e.target.value })} />

        <button className="btn btn-primary" type="submit">Filter</button>
        <button className="btn btn-secondary" type="button" onClick={handleReset}>Reset</button>
      </form>

      {/* Product Grid */}
      {loading ? (
        <div className="loading-state">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <p>🌱 No products found. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}

export default Marketplace
