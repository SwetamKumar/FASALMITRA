import { Link } from 'react-router-dom'
import './ProductCard.css'

const renderStars = (rating) => {
  if (!rating) return <span style={{ color: '#aaa', fontSize: '0.8rem' }}>No reviews yet</span>
  return (
    <span className="stars">
      {'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}
      <span style={{ color: '#666', marginLeft: '4px', fontSize: '0.8rem' }}>
        ({rating.toFixed(1)})
      </span>
    </span>
  )
}

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-img">
        {product.imageUrl
          ? <img src={product.imageUrl} alt={product.name} />
          : <div className="img-placeholder">🌿</div>
        }
        <span className="product-category">{product.category || 'General'}</span>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-farmer">
          🧑‍🌾 {product.farmerName} · {product.farmerDistrict}, {product.farmerState}
        </p>
        <div className="product-rating">{renderStars(product.averageRating)}</div>
        <div className="product-footer">
          <div className="product-price">
            <span className="price">₹{product.pricePerUnit}</span>
            <span className="unit">/ {product.unit}</span>
          </div>
          <Link to={`/products/${product.id}`} className="btn btn-primary btn-sm">
            View
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
