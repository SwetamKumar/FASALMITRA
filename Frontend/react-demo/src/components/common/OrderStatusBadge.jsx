const OrderStatusBadge = ({ status }) => {
  const map = {
    PLACED:    'badge-placed',
    CONFIRMED: 'badge-confirmed',
    SHIPPED:   'badge-shipped',
    DELIVERED: 'badge-delivered',
    CANCELLED: 'badge-cancelled',
  }
  return <span className={`badge ${map[status] || ''}`}>{status}</span>
}

export default OrderStatusBadge
