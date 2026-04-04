import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import Home from "./pages/Home";
import AboutPage from "./pages/About";
import CategoryDetail from "./pages/CategoryDetail";
import ProductDetail from "./pages/ProductDetail";
import ServicesPage from "./pages/Services";
import ContactPage from "./pages/ContactPage";
import InstagramPage from "./pages/InstagramPage";
import Products from "./components/Products";
import ProductCategories from "./components/ProductCategories";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import Checkout from "./pages/Checkout";
import TrackOrder from "./pages/TrackOrder";
import SparePartsDetail from "./pages/SparePartsDetail";
import CordlessTools from "./pages/CordlessTools";
import BrandDetail from "./pages/BrandDetail";
import Login from "./pages/Login";
import LatestNews from "./pages/LatestNews";

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <AuthProvider>
    <CartProvider>
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-industrial-red selection:text-white pb-16 md:pb-0">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="/categories/:categoryId"
              element={<CategoryDetail />}
            />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/instagram" element={<InstagramPage />} />
            <Route path="/cordless-tools" element={<CordlessTools />} />
            <Route path="/brand/:id" element={<BrandDetail />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cart" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/latest-news" element={<LatestNews />} />
            <Route path="/spare-parts/:id" element={<SparePartsDetail />} />
            <Route
              path="/products"
              element={
                <div className="pt-20">
                  <Products />
                </div>
              }
            />
            <Route
              path="/categories"
              element={
                <div className="pt-20">
                  <ProductCategories />
                </div>
              }
            />
            {/* We can add more routes later */}
          </Routes>
        </main>

        <Footer />
        <FloatingButtons />
      </div>
    </Router>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;
