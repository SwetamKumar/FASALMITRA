import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/common/ProtectedRoute'
import Navbar from './components/common/Navbar'

// Pages
import Home            from './pages/Home'
import Login           from './pages/auth/Login'
import Register        from './pages/auth/Register'
import Marketplace     from './pages/Marketplace'
import ProductDetail   from './pages/ProductDetails'
import FarmerDashboard from './pages/farmer/FarmerDashboard'
import BuyerDashboard  from './pages/buyer/BuyerDashboard'
import AdminDashboard  from './pages/admin/AdminDashboard'

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <Routes>
          {/* Public */}
          <Route path="/"             element={<Home />} />
          <Route path="/login"        element={<Login />} />
          <Route path="/register"     element={<Register />} />
          <Route path="/products"     element={<Marketplace />} />
          <Route path="/products/:id" element={<ProductDetail />} />

          {/* Farmer */}
          <Route path="/farmer/dashboard" element={
            <ProtectedRoute allowedRoles={['ROLE_FARMER']}>
              <FarmerDashboard />
            </ProtectedRoute>
          } />

          {/* Buyer */}
          <Route path="/buyer/dashboard" element={
            <ProtectedRoute allowedRoles={['ROLE_BUYER']}>
              <BuyerDashboard />
            </ProtectedRoute>
          } />

          {/* Admin */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
