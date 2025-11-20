import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { ModernHeader } from './components/ModernHeader';
import { ModernFooter } from './components/ModernFooter';
import { Home } from './pages/Home';
import { Order } from './pages/Order';
import { Products } from './pages/Products';
import { CategoryPage } from './pages/products/CategoryPage';
import { ProductDetail } from './pages/products/ProductDetail';
import { Company } from './pages/Company';
import { SDGs } from './pages/SDGs';
import { Contact } from './pages/Contact';
import { Recruitment } from './pages/Recruitment';
import { News } from './pages/News';
import { NewsDetail } from './pages/NewsDetail';
import { StaffLogin } from './pages/staff/Login';
import { StaffDashboard } from './pages/staff/Dashboard';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          {/* Staff Routes - No Header/Footer */}
          <Route path="/staff/login" element={<StaffLogin />} />
          <Route path="/staff/dashboard" element={<StaffDashboard />} />
          
          {/* Public Routes - With Header/Footer */}
          <Route path="*" element={
            <>
              <ModernHeader />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/order" element={<Order />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/categories/:categoryId" element={<CategoryPage />} />
                <Route path="/products/detail/:id" element={<ProductDetail />} />
                <Route path="/equipment" element={<Navigate to="/company" replace />} />
                <Route path="/company" element={<Company />} />
                <Route path="/sdgs" element={<SDGs />} />
                <Route path="/recruitment" element={<Recruitment />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:id" element={<NewsDetail />} />
              </Routes>
              <ModernFooter />
            </>
          } />
        </Routes>
        <Toaster position="top-center" />
      </div>
    </Router>
  );
}
