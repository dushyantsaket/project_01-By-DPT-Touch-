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
import { InventoryProvider } from "./context/InventoryContext";

import Home from "./pages/Home";
import AboutPage, { BusinessPage, BusinessDetail } from "./pages/About";
import CategoryDetail from "./pages/CategoryDetail";
import ProductDetail from "./pages/ProductDetail";
import ServicesPage from "./pages/Services";
import ContactPage from "./pages/ContactPage";
import InstagramPage from "./pages/InstagramPage";
import ProductsNew from "./components/ProductsNew";
import ProductCategories from "./components/ProductCategories";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import EmployeeDashboard from "./pages/EmployeeWorkstation";
import CheckoutNew from "./pages/CheckoutNew";
import BrandCollaboration from "./pages/BrandCollaboration";
import Register from "./pages/Register";
import TrackOrder from "./pages/TrackOrder";
import SparePartsDetail from "./pages/SparePartsDetail";
import CordlessTools from "./pages/CordlessTools";
import BrandDetail from "./pages/BrandDetail";
import Login from "./pages/Login";
import DealerLogin from "./pages/DealerLogin";
import DealerRegister from "./pages/DealerRegister";
import ManagerDashboard from "./pages/ManagerDashboard";
// import PortalSelection from "./pages/PortalSelection";
import WarrantyClaim from "./pages/WarrantyClaim";
import LatestNews from "./pages/LatestNews";
import NewsDetailPage from "./pages/NewsDetailPage";
import SearchResults from "./pages/SearchResults";
import CustomerDashboard from "./pages/CustomerDashboard";
import DealerDashboard from "./pages/DealerDashboard";
import PortalSelection, { LoginPage } from "./pages/PortalSelection";
import GrinderSpareParts from "./pages/GrinderSpareParts";
// import PortalSelection from "./pages/PortalSelection";

// Policy & Info pages
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CompanyPolicies from "./pages/CompanyPolicies";
import TermsAndConditions from "./pages/TermsAndConditions";
import CancellationReturnPolicy from "./pages/CancellationReturnPolicy";
import ShippingDeliveryPolicy from "./pages/ShippingDeliveryPolicy";
import WarrantyPolicy from "./pages/WarrantyPolicy";
import Infrastructure from "./pages/Infrastructure";
import QualityPolicy from "./pages/QualityPolicy";
import CustomerSupport from "./pages/CustomerSupport";
import FAQ from "./pages/FAQ";
import VideoCommunity from "./pages/VideoCommunity";
import Reviews from "./pages/Reviews";
import BecomeDealer from "./pages/BecomeDealer";
import Franchise from "./pages/Franchise";
import ContactSupport from "./pages/ContactSupport";

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function AppContent() {
  const { pathname } = useLocation();
  const isVideoCommunity = pathname.startsWith("/video-community");

  return (
    <>
      <ScrollToTop />
      <div
        className={`min-h-screen bg-white font-sans text-gray-900 ${isVideoCommunity ? "" : "pb-16 md:pb-0"}`}
      >
        {!isVideoCommunity && <Navbar />}

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/about/business" element={<BusinessPage />}>
              <Route path=":id" element={<BusinessDetail />} />
            </Route>

            <Route
              path="/categories/:categoryId"
              element={<CategoryDetail />}
            />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/login/:role" element={<LoginPage />} />
            <Route path="/login" element={<PortalSelection />} />

            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/instagram" element={<InstagramPage />} />
            <Route path="/cordless-tools" element={<CordlessTools />} />
            <Route path="/brand/:id" element={<BrandDetail />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
            <Route path="/cart" element={<CheckoutNew />} />
            <Route path="/brands" element={<BrandCollaboration />} />
            <Route path="/login" element={<PortalSelection />} />
            <Route path="/customer-login" element={<Login />} />
            <Route path="/dealer-login" element={<DealerLogin />} />
            <Route path="/dealer-register" element={<DealerRegister />} />
            <Route path="/warranty-claim" element={<WarrantyClaim />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/latest-news" element={<LatestNews />} />
            <Route path="/latest-news/:newsId" element={<NewsDetailPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
            <Route path="/dealer-dashboard" element={<DealerDashboard />} />
            <Route path="/manager-dashboard" element={<ManagerDashboard />} />
            <Route path="/spare-parts/:id" element={<SparePartsDetail />} />
            <Route
              path="/grinder-spare-parts"
              element={<GrinderSpareParts />}
            />
            <Route
              path="/products"
              element={
                <div className="pt-20">
                  <ProductsNew />
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
            {/* Policy & info routes */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/company-policies" element={<CompanyPolicies />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route
              path="/cancellation-return"
              element={<CancellationReturnPolicy />}
            />
            <Route
              path="/shipping-delivery"
              element={<ShippingDeliveryPolicy />}
            />
            <Route path="/warranty-policy" element={<WarrantyPolicy />} />
            <Route path="/infrastructure" element={<Infrastructure />} />
            <Route path="/quality-policy" element={<QualityPolicy />} />
            <Route path="/customer-support" element={<CustomerSupport />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/video-community" element={<VideoCommunity />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/become-dealer" element={<BecomeDealer />} />
            <Route path="/franchise" element={<Franchise />} />
            <Route path="/contact-support" element={<ContactSupport />} />
            {/* We can add more routes later */}
          </Routes>
        </main>

        {!isVideoCommunity && <Footer />}
        {!isVideoCommunity && <FloatingButtons />}
      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <InventoryProvider>
          <Router>
            <AppContent />
          </Router>
        </InventoryProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
