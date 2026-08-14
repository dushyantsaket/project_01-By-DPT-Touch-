import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  BadgeIndianRupee,
  Box,
  ChevronRight,
  CreditCard,
  Heart,
  MessageCircle,
  Minus,
  PackageCheck,
  Play,
  Plus,
  RefreshCw,
  Send,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
  UserRound,
  WalletCards,
  X,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useInventory } from "../context/useInventory";
import { powerToolsData } from "../data/powerTools";
import { handToolsData } from "../data/handToolsData";
import { safetyData } from "../data/safetyData";
import { industrialExpansionData } from "../data/industrialExpansionData";
import { agricultureGardenData } from "../data/agricultureGardenData";
import { storageData } from "../data/storageData";
import { bladesData } from "../data/blades";
import { ingcoData } from "../data/ingcoData";
import { cordlessData } from "../data/cordlessData";
import { armatureData } from "../data/armatureData";
import { carbonBrushes } from "../data/carbonBrushesData";
import { allProductsEditionData } from "../data/allProductsEditionData";
import { xtraPowerData } from "../data/xtraPowerData";
import { tataAgricoData } from "../data/tataAgricoData";
import { akariSpecialOffersData } from "../data/akariSpecialOffersData";
import { akariAbrasivesData } from "../data/akariAbrasivesData";
import { newDiamondBlades } from "../data/newDiamondBlades";
import { polishingPadsData } from "../data/polishingPadsData";
import ToolsAPI from "../data/tools-api";
import { buildInitialCatalog } from "../utils/catalog/buildCatalog";
import "../styles/ProductDetail.css";

const API = "/api";

const bankLogos = [
  {
    name: "HDFC Bank",
    logo: "https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-gringotts/images/banks/HDFC.svg",
    monthly: 539,
    tenure: "3, 6, 9 months",
  },
  {
    name: "ICICI Bank",
    logo: "https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-gringotts/images/banks/ICICI.svg",
    monthly: 539,
    tenure: "3, 6, 12 months",
  },
  {
    name: "Kotak Bank",
    logo: "https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-gringotts/images/banks/KOTAK.svg",
    monthly: 539,
    tenure: "3, 6 months",
  },
  {
    name: "Federal Bank",
    logo: "https://static-assets-web.flixcart.com/apex-static/images/payments/banks/FederalBankV2.svg",
    monthly: 539,
    tenure: "6 months",
  },
  {
    name: "IDFC FIRST Bank",
    logo: "https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-gringotts/images/banks/IDFC.svg",
    monthly: 539,
    tenure: "3, 6, 9 months",
  },
  {
    name: "YES BANK",
    logo: "",
    monthly: 539,
    tenure: "3, 6 months",
  },
];

const walletOptions = [
  {
    name: "Google Pay",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg",
    href: "upi://pay?pa=dushyantpowertools@upi&pn=Dushyant%20Power%20Tools&cu=INR",
  },
  {
    name: "PhonePe",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg",
    href: "upi://pay?pa=dushyantpowertools@upi&pn=Dushyant%20Power%20Tools&cu=INR",
  },
  {
    name: "Paytm",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/42/Paytm_logo.png",
    href: "upi://pay?pa=dushyantpowertools@upi&pn=Dushyant%20Power%20Tools&cu=INR",
  },
  {
    name: "Amazon Pay",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/29/Amazon_Pay_logo.svg",
    href: "upi://pay?pa=dushyantpowertools@upi&pn=Dushyant%20Power%20Tools&cu=INR",
  },
];

const fallbackProduct = {
  id: "DPT-DEMO-001",
  _id: "DPT-DEMO-001",
  name: "SELF DRILLING SCREWS(TS)-DSS005",
  sku: "DSS005",
  brand: "Tata Agrico",
  price_inr: 1410,
  mrp_inr: 2070,
  stockStatus: "In Stock",
  image: "https://s7ap1.scene7.com/is/image/tatasteelltd/dss005-_self-drilling-screw?fmt=webp",
  description:
    "Self-drilling screw with hex washer flange head. It drills its own hole, holds firmly, and is suitable for metal sheet fastening, roofing, fabrication and industrial structures.",
  specs: {
    Material: "Premium zinc coated steel",
    Head: "Hex washer flange",
    Application: "Metal sheet and industrial fastening",
    Finish: "Corrosion resistant coating",
    Warranty: "Manufacturer warranty",
  },
};

const fallbackVideos = [
  {
    title: "Product Overview & Features",
    description: "Complete overview of product build, usage and safety.",
    duration: "01:45",
    thumbnail: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=700&auto=format&fit=crop",
    embed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    title: "How to Use This Product",
    description: "Step by step installation and daily use guide.",
    duration: "02:30",
    thumbnail: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=700&auto=format&fit=crop",
    embed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    title: "Safety Tips & Maintenance",
    description: "Maintenance and safe handling tips.",
    duration: "01:20",
    thumbnail: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=700&auto=format&fit=crop",
    embed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

const seedReviews = [
  {
    id: "r1",
    author: "Rajesh Pandey",
    verified: true,
    rating: 5,
    date: "20 May 2025",
    content: "Very good product in this price range. Build quality is solid and works perfectly for grinding and sharpening.",
    helpfulCount: 12,
    images: [
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=160&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=160&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=160&auto=format&fit=crop",
    ],
  },
  {
    id: "r2",
    author: "Amit Mishra",
    verified: true,
    rating: 5,
    date: "18 May 2025",
    content: "Motor is powerful and smooth. Safety guards and adjustable rests make it very safe to use.",
    helpfulCount: 8,
    images: ["https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=160&auto=format&fit=crop"],
  },
  {
    id: "r3",
    author: "Sunil Yadav",
    verified: true,
    rating: 4,
    date: "15 May 2025",
    content: "Good product. Rust resistant coating is great. Value for money.",
    helpfulCount: 6,
    images: ["https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=160&auto=format&fit=crop"],
  },
];

const findProductImage = (product) => {
  const image = product?.image || product?.image_url || product?.thumbnail || product?.images?.[0]?.url || product?.images?.[0];
  return image || fallbackProduct.image;
};

const formatPrice = (value) => `Rs ${Number(value || 0).toLocaleString("en-IN")}`;

function Stars({ value = 0, size = 16, interactive = false, onChange }) {
  return (
    <span className="pdp-stars">
      {[1, 2, 3, 4, 5].map((star) => {
        const active = star <= Number(value);
        if (interactive) {
          return (
            <button type="button" key={star} onClick={() => onChange(star)} className={active ? "active" : ""}>
              <Star size={size} fill={active ? "currentColor" : "none"} />
            </button>
          );
        }
        return <Star key={star} size={size} fill={active ? "currentColor" : "none"} className={active ? "active" : ""} />;
      })}
    </span>
  );
}

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products: inventoryProducts } = useInventory();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("details");
  const [activeVideo, setActiveVideo] = useState(fallbackVideos[0]);
  const [showEmiModal, setShowEmiModal] = useState(false);
  const [selectedBank, setSelectedBank] = useState(bankLogos[0].name);
  const [toast, setToast] = useState("");
  const [reviews, setReviews] = useState(seedReviews);
  const [reviewFilter, setReviewFilter] = useState("all");
  const [reviewFormOpen, setReviewFormOpen] = useState(false);
  const [newReview, setNewReview] = useState({ author: "", rating: 5, content: "" });

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      let found = null;

      try {
        const res = await fetch(`${API}/products/${productId}`);
        if (res.ok) found = await res.json();
      } catch {
        found = null;
      }

      const allLocal = [
        ...buildInitialCatalog(),
        ...(inventoryProducts || []),
        ...powerToolsData,
        ...handToolsData,
        ...safetyData,
        ...industrialExpansionData,
        ...agricultureGardenData,
        ...storageData,
        ...bladesData,
        ...ingcoData,
        ...(cordlessData.products || []),
        ...armatureData,
        ...carbonBrushes,
        ...allProductsEditionData,
        ...xtraPowerData,
        ...tataAgricoData,
        ...akariSpecialOffersData,
        ...akariAbrasivesData,
        ...newDiamondBlades,
        ...polishingPadsData,
        ...(Object.values(ToolsAPI.products.insulated) || []),
        ...(ToolsAPI.products.taparia.miniPliers || []),
      ];

      if (!found) {
        found = allLocal.find((item) =>
          [item.id, item._id, item.productId, item.sku, item.partNumber, item.partNo].some(
            (value) => String(value) === String(productId),
          ),
        );
      }

      const normalized = {
        ...fallbackProduct,
        ...(found || {}),
        id: found?.id || found?._id || found?.sku || fallbackProduct.id,
        _id: found?._id || found?.id || found?.sku || fallbackProduct._id,
        name: found?.name || found?.title || fallbackProduct.name,
        brand: found?.brand || fallbackProduct.brand,
        price_inr: Number(found?.price_inr || found?.price || fallbackProduct.price_inr),
        mrp_inr: Number(found?.mrp_inr || found?.regular_price || fallbackProduct.mrp_inr),
        sku: found?.sku || found?.partNo || found?.partNumber || fallbackProduct.sku,
        description: found?.description || fallbackProduct.description,
      };

      const image = findProductImage(normalized);
      const related = allLocal
        .filter((item) => String(item.id || item._id || item.sku) !== String(normalized.id))
        .slice(0, 6)
        .map((item) => ({
          ...item,
          id: item.id || item._id || item.sku,
          name: item.name || item.title || "Power Tool",
          image: findProductImage(item),
          price_inr: Number(item.price_inr || item.price || 890),
          mrp_inr: Number(item.mrp_inr || item.regular_price || 1080),
          rating: Number(item.rating || 4.5),
        }));

      setProduct({ ...normalized, image });
      setSelectedImage(image);
      setRelatedProducts(related);
      setLoading(false);
      window.scrollTo(0, 0);
    };

    loadProduct();
  }, [productId, inventoryProducts]);

  const galleryImages = useMemo(() => {
    const images = [product?.image, product?.image_url, ...(product?.images || [])]
      .map((item) => (typeof item === "string" ? item : item?.url))
      .filter(Boolean);
    return Array.from(new Set(images.length ? images : [fallbackProduct.image]));
  }, [product]);

  const price = product?.price_inr || fallbackProduct.price_inr;
  const mrp = product?.mrp_inr || fallbackProduct.mrp_inr;
  const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const emiAmount = Math.max(1, Math.ceil(price / 6));
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / Math.max(1, reviews.length);
  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((review) => review.rating === star).length,
  }));
  const filteredReviews =
    reviewFilter === "all" ? reviews : reviews.filter((review) => review.rating === Number(reviewFilter));

  const submitReview = (event) => {
    event.preventDefault();
    const review = {
      id: `local-${Date.now()}`,
      author: newReview.author || "Guest Customer",
      verified: false,
      rating: Number(newReview.rating),
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      content: newReview.content || "Good product.",
      helpfulCount: 0,
      images: [],
    };
    setReviews((prev) => [review, ...prev]);
    setNewReview({ author: "", rating: 5, content: "" });
    setReviewFormOpen(false);
    setToast("Review added and rating updated.");
    setTimeout(() => setToast(""), 2500);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setToast("Product added to cart.");
    setTimeout(() => setToast(""), 2500);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/cart");
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: product.name, text: product.description, url: shareUrl });
    } else {
      await navigator.clipboard?.writeText(shareUrl);
      setToast("Product link copied.");
      setTimeout(() => setToast(""), 2500);
    }
  };

  if (loading || !product) {
    return <div className="pdp-loading">Loading product details...</div>;
  }

  return (
    <main className="pdp-page">
      {toast && <div className="pdp-toast">{toast}</div>}

      <div className="pdp-shell">
        <nav className="pdp-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={13} />
          <Link to="/products">Power Tools</Link>
          <ChevronRight size={13} />
          <span>{product.name}</span>
        </nav>

        <section className="pdp-top-grid">
          <div className="pdp-media">
            <div className="pdp-gallery">
              <div className="pdp-thumbs">
                {galleryImages.slice(0, 4).map((image, index) => (
                  <button
                    type="button"
                    key={`${image}-${index}`}
                    className={selectedImage === image ? "active" : ""}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} />
                  </button>
                ))}
                {galleryImages.length > 4 && <button type="button">+{galleryImages.length - 4}</button>}
              </div>

              <div className="pdp-main-image">
                {discount > 0 && <span>{discount}% OFF</span>}
                <img src={selectedImage || product.image} alt={product.name} />
              </div>
            </div>

            <div className="pdp-trust-grid">
              <div>
                <Truck size={22} />
                <strong>Free Delivery</strong>
                <span>On orders above Rs 1999</span>
              </div>
              <div>
                <ShieldCheck size={22} />
                <strong>Top Brands</strong>
                <span>100% Original Products</span>
              </div>
              <div>
                <PackageCheck size={22} />
                <strong>Secure Payments</strong>
                <span>Safe encrypted transactions</span>
              </div>
              <div>
                <BadgeIndianRupee size={22} />
                <strong>GST Billing</strong>
                <span>Save input tax credit</span>
              </div>
            </div>
          </div>

          <aside className="pdp-info">
            <div className="pdp-side-actions">
              <button type="button" title="Wishlist">
                <Heart size={18} /> Wishlist
              </button>
              <button type="button" title="Share" onClick={handleShare}>
                <Share2 size={18} /> Share
              </button>
            </div>

            <span className="pdp-brand">{product.brand}</span>
            <h1>{product.name}</h1>
            <button className="pdp-rating-link" type="button" onClick={() => document.getElementById("product-reviews")?.scrollIntoView({ behavior: "smooth" })}>
              <strong>{averageRating.toFixed(1)}</strong>
              <Stars value={Math.round(averageRating)} />
              <span>({reviews.length} Reviews)</span>
              <i>258 Sold</i>
            </button>

            <div className="pdp-price-row">
              <strong>{formatPrice(price)}</strong>
              {mrp > price && <del>MRP {formatPrice(mrp)}</del>}
              {discount > 0 && <span>{discount}% OFF</span>}
            </div>
            <p className="pdp-tax">Exclusive of all taxes</p>

            <div className="pdp-stock-row">
              <span>{product.stockStatus || "In Stock"}</span>
              <b>SKU: {product.sku}</b>
            </div>

            <div className="pdp-description">
              <p>{product.description}</p>
              <ul>
                <li>Heavy duty build quality for professional and workshop usage.</li>
                <li>High quality finish with stable performance in daily operation.</li>
                <li>Suitable for construction, roofing, metal sheet and industrial applications.</li>
              </ul>
            </div>

            <div className="pdp-delivery">
              <Truck size={18} />
              <span>
                Delivery by <strong>Tomorrow</strong> - FREE delivery on orders above Rs 999
              </span>
            </div>

            <div className="pdp-buy-row">
              <div className="pdp-qty">
                <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>
                  <Minus size={16} />
                </button>
                <strong>{quantity}</strong>
                <button type="button" onClick={() => setQuantity((value) => value + 1)}>
                  <Plus size={16} />
                </button>
              </div>
              <button className="pdp-cart-btn" type="button" onClick={handleAddToCart}>
                <ShoppingCart size={18} /> Add to Cart
              </button>
              <button className="pdp-buy-btn" type="button" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>

            <button
              className="pdp-whatsapp"
              type="button"
              onClick={() =>
                window.open(
                  `https://wa.me/919754015503?text=${encodeURIComponent(`Hi, I want to buy ${product.name} SKU ${product.sku}`)}`,
                  "_blank",
                )
              }
            >
              <MessageCircle size={18} /> Chat on WhatsApp
            </button>
          </aside>
        </section>

        <section className="pdp-offer-grid">
          <div className="pdp-card">
            <h2>Available Offers</h2>
            {[
              ["Bank Offer", "10% instant discount on HDFC Bank Credit Cards."],
              ["Cashback Offer", "Flat Rs 150 cashback on orders above Rs 2000."],
              ["No Cost EMI", "Up to 6 months No Cost EMI on selected cards."],
              ["Exchange Offer", "Exchange old tools and get up to Rs 500 off."],
            ].map(([title, text]) => (
              <div className="pdp-offer" key={title}>
                <span>{title}</span>
                <p>{text} <button type="button">T&C</button></p>
              </div>
            ))}
            <button type="button" className="pdp-link-btn">
              View All Offers (5) <ChevronRight size={14} />
            </button>
          </div>

          <div className="pdp-card pdp-emi-card">
            <div className="pdp-card-head">
              <h2>EMI Options</h2>
              <button type="button" onClick={() => setShowEmiModal(true)}>
                View Plans
              </button>
            </div>
            <h3>{formatPrice(emiAmount)}/month. No Cost EMI available</h3>
            <p>Credit Cards</p>
            <div className="pdp-logo-row">
              {bankLogos.slice(0, 5).map((bank) => (
                <button type="button" key={bank.name} onClick={() => setSelectedBank(bank.name)} className={selectedBank === bank.name ? "active" : ""}>
                  {bank.logo ? <img src={bank.logo} alt={bank.name} /> : <span>{bank.name}</span>}
                </button>
              ))}
            </div>
            <p>UPI / Wallets</p>
            <div className="pdp-logo-row">
              {walletOptions.map((wallet) => (
                <a key={wallet.name} href={wallet.href}>
                  <img src={wallet.logo} alt={wallet.name} />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="pdp-tabs-card">
          <div className="pdp-tabs">
            {[
              ["details", "Product Details"],
              ["specs", "Specifications"],
              ["box", "What's in the Box"],
              ["shipping", "Shipping & Returns"],
              ["warranty", "Warranty"],
            ].map(([id, label]) => (
              <button key={id} type="button" className={activeTab === id ? "active" : ""} onClick={() => setActiveTab(id)}>
                {label}
              </button>
            ))}
          </div>
          <div className="pdp-tab-body">
            {activeTab === "details" && (
              <>
                <div>
                  <p>{product.description}</p>
                  <ul>
                    <li>Powerful performance for professional daily use.</li>
                    <li>Strong construction, long service life and stable handling.</li>
                    <li>Designed for accurate work and safer product handling.</li>
                  </ul>
                </div>
                <div className="pdp-feature-list">
                  <h3>Key Features</h3>
                  <p><ShieldCheck size={18} /> High strength material</p>
                  <p><RefreshCw size={18} /> Self-drilling / fast operation</p>
                  <p><PackageCheck size={18} /> Corrosion resistant finish</p>
                  <p><Box size={18} /> Wide application support</p>
                </div>
                <div className="pdp-feature-list">
                  <h3>Applications</h3>
                  <p>Construction</p>
                  <p>Roofing</p>
                  <p>Metal Sheet</p>
                  <p>Industrial Structures</p>
                  <p>DIY & Home Use</p>
                </div>
              </>
            )}
            {activeTab === "specs" && (
              <table className="pdp-spec-table">
                <tbody>
                  {Object.entries(product.specs || fallbackProduct.specs).map(([key, value]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {activeTab === "box" && <p>1 product unit, user guide, warranty card and invoice copy.</p>}
            {activeTab === "shipping" && <p>Fast dispatch from Dushyant Power Tools. Returns accepted for damaged or defective items as per policy.</p>}
            {activeTab === "warranty" && <p>Manufacturer warranty support is available with original invoice and product serial details.</p>}
          </div>
        </section>

        <section className="pdp-video-section">
          <div className="pdp-section-head">
            <h2>Product Videos & Description</h2>
            <Link to="/video-community">View All Videos (3) <ChevronRight size={15} /></Link>
          </div>
          <div className="pdp-video-grid">
            {fallbackVideos.map((video) => (
              <button type="button" key={video.title} onClick={() => setActiveVideo(video)} className={activeVideo.title === video.title ? "active" : ""}>
                <span>
                  <img src={video.thumbnail} alt={video.title} />
                  <i><Play size={26} fill="currentColor" /></i>
                  <b>{video.duration}</b>
                </span>
                <strong>{video.title}</strong>
                <small>{video.description}</small>
              </button>
            ))}
          </div>
          <div className="pdp-active-video">
            <iframe
              title={activeVideo.title}
              src={activeVideo.embed}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>

        <section className="pdp-reviews-box" id="product-reviews">
          <div className="pdp-section-head">
            <h2>Customer Reviews</h2>
            <button type="button" onClick={() => setReviewFormOpen((open) => !open)}>
              Write a Review
            </button>
          </div>

          <div className="pdp-review-summary">
            <div>
              <strong>{averageRating.toFixed(1)}</strong>
              <Stars value={Math.round(averageRating)} size={19} />
              <span>Based on {reviews.length} reviews</span>
            </div>
            <div className="pdp-rating-bars">
              {ratingCounts.map((item) => {
                const percent = Math.round((item.count / Math.max(1, reviews.length)) * 100);
                return (
                  <button key={item.star} type="button" onClick={() => setReviewFilter(String(item.star))}>
                    <span>{item.star}</span>
                    <i><b style={{ width: `${percent}%` }} /></i>
                    <em>{percent}%</em>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pdp-review-tabs">
            <button type="button" className={reviewFilter === "all" ? "active" : ""} onClick={() => setReviewFilter("all")}>
              All Reviews ({reviews.length})
            </button>
            {[5, 4, 3].map((star) => (
              <button type="button" key={star} onClick={() => setReviewFilter(String(star))}>
                {star} Star ({reviews.filter((review) => review.rating === star).length})
              </button>
            ))}
            <button type="button">With Images ({reviews.filter((review) => review.images?.length).length})</button>
            <button type="button">Verified Buyers</button>
          </div>

          {reviewFormOpen && (
            <form className="pdp-review-form" onSubmit={submitReview}>
              <input value={newReview.author} onChange={(e) => setNewReview((prev) => ({ ...prev, author: e.target.value }))} placeholder="Your name" />
              <Stars value={newReview.rating} interactive onChange={(rating) => setNewReview((prev) => ({ ...prev, rating }))} />
              <textarea value={newReview.content} onChange={(e) => setNewReview((prev) => ({ ...prev, content: e.target.value }))} placeholder="Write your review..." />
              <button type="submit"><Send size={15} /> Submit Review</button>
            </form>
          )}

          <div className="pdp-review-cards">
            {filteredReviews.map((review) => (
              <article key={review.id}>
                <div className="pdp-review-author">
                  <span>{review.author[0] || <UserRound size={16} />}</span>
                  <div>
                    <strong>{review.author}</strong>
                    {review.verified && <small>Verified Purchase</small>}
                  </div>
                  <time>{review.date}</time>
                </div>
                <Stars value={review.rating} />
                <p>{review.content}</p>
                {review.images?.length > 0 && (
                  <div className="pdp-review-images">
                    {review.images.map((image, index) => (
                      <img key={`${image}-${index}`} src={image} alt={`${review.author} review ${index + 1}`} />
                    ))}
                  </div>
                )}
                <div className="pdp-review-actions">
                  <button type="button" onClick={() => setReviews((prev) => prev.map((item) => item.id === review.id ? { ...item, helpfulCount: item.helpfulCount + 1 } : item))}>
                    Helpful ({review.helpfulCount})
                  </button>
                  <button type="button">Reply</button>
                  <button type="button">Report</button>
                </div>
              </article>
            ))}
          </div>

          <button className="pdp-view-all-reviews" type="button" onClick={() => navigate("/reviews")}>
            View All Reviews
          </button>
        </section>

        <section className="pdp-related">
          <div className="pdp-section-head">
            <h2>You May Also Like</h2>
            <Link to="/products">View All Products <ChevronRight size={15} /></Link>
          </div>
          <div className="pdp-related-grid-new">
            {relatedProducts.map((item) => {
              const itemMrp = Number(item.mrp_inr || item.price_inr * 1.2);
              const itemDiscount = itemMrp > item.price_inr ? Math.round(((itemMrp - item.price_inr) / itemMrp) * 100) : 0;
              return (
                <article key={item.id}>
                  {itemDiscount > 0 && <span>{itemDiscount}% OFF</span>}
                  <button type="button"><Heart size={16} /></button>
                  <img src={item.image} alt={item.name} />
                  <h3>{item.name}</h3>
                  <p>
                    <strong>{formatPrice(item.price_inr)}</strong>
                    <del>MRP {formatPrice(itemMrp)}</del>
                  </p>
                  <small><Star size={13} fill="currentColor" /> {item.rating || 4.5}</small>
                </article>
              );
            })}
          </div>
        </section>
      </div>

      {showEmiModal && (
        <div className="pdp-modal" role="dialog" aria-modal="true">
          <div className="pdp-modal-card">
            <button className="pdp-modal-close" type="button" onClick={() => setShowEmiModal(false)}>
              <X size={20} />
            </button>
            <h2>EMI Payment Options</h2>
            <p className="pdp-modal-sub">Choose EMI, card or UPI option. Same style as the payment option card you shared.</p>

            <section className="pdp-flip-emi">
              <label>
                <input type="radio" checked readOnly />
                <span>Credit Card EMI</span>
              </label>
              <div className="pdp-emi-bank-grid">
                {bankLogos.map((bank) => (
                  <button
                    key={bank.name}
                    type="button"
                    className={selectedBank === bank.name ? "active" : ""}
                    onClick={() => setSelectedBank(bank.name)}
                  >
                    <span>{bank.logo ? <img src={bank.logo} alt={bank.name} /> : <WalletCards size={20} />}</span>
                    <strong>{bank.name}</strong>
                    <small>No Cost EMI {formatPrice(bank.monthly)}/m</small>
                    <em>{bank.tenure}</em>
                  </button>
                ))}
              </div>
              <button className="pdp-see-all-options" type="button">
                See all Options <ChevronRight size={14} />
              </button>
            </section>

            <section className="pdp-upi-panel">
              <h3><CreditCard size={18} /> UPI / Wallet Links</h3>
              <div className="pdp-logo-row">
                {walletOptions.map((wallet) => (
                  <a key={wallet.name} href={wallet.href}>
                    <img src={wallet.logo} alt={wallet.name} />
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}
    </main>
  );
}
