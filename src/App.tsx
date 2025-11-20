import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Toaster } from './components/ui/sonner';
import { ModernHeader } from './components/ModernHeader';
import { ModernFooter } from './components/ModernFooter';
import { OpeningSplash } from './components/OpeningSplash';
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // セッションストレージで初回アクセスかどうかを判定
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (hasVisited) {
      // 既に訪問済みの場合はスプラッシュをスキップ
      setIsLoading(false);
    } else {
      // 初回訪問の場合はスプラッシュを表示
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('hasVisited', 'true');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        {/* スプラッシュスクリーン */}
        <AnimatePresence mode="wait">
          {isLoading && (
            <OpeningSplash key="splash" onComplete={() => {}} />
          )}
        </AnimatePresence>

        <Routes>
          {/* Staff Routes - No Header/Footer */}
          <Route path="/staff/login" element={<StaffLogin />} />
          <Route path="/staff/dashboard" element={<StaffDashboard />} />
          
          {/* Public Routes - With Header/Footer */}
          <Route path="*" element={
            <>
              {/* ヘッダーに状態を渡す */}
              <ModernHeader isLoaded={!isLoading} />
              
              {/* コンテンツはフェードインで表示 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoading ? 0 : 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
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
              </motion.div>
            </>
          } />
        </Routes>
        <Toaster position="top-center" />
      </div>
    </Router>
  );
}
