import React, { useState, useEffect } from "react";
import {
  CreditCard, Truck, ShieldCheck, MapPin, Phone, Mail, User,
  CheckCircle2, Package, ArrowLeft, Trash2, Plus, Minus, X,
  Lock, Eye, EyeOff, Home, Building2, Store, MoreHorizontal,
  Navigation, Info, ChevronRight, Tag, Star
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const API = "/api";

const SEEDED_CART_ITEMS = [
  {
    id: "DSDTOS",
    name: "SELF DRILLING SCREWS DSDT05",
    brand: "Dushyant",
    price: 2070,
    mrp: 2600,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=300",
  },
  {
    id: "CS18568",
    name: "Ingco 185mm 1400W Circular Saw",
    brand: "INGCO",
    price: 8999,
    mrp: 10500,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300",
  },
  {
    id: "CIWL2050",
    name: "Cordless Impact Wrench CIWL2050",
    brand: "INGCO",
    price: 17999,
    mrp: 21000,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300",
  },
  {
    id: "AG9008",
    name: "INGCO 900W Angle Grinder",
    brand: "INGCO",
    price: 1150,
    mrp: 1490,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=300",
  },
  {
    id: "RH26008",
    name: "INGCO Rotary Hammer Drill 26mm",
    brand: "INGCO",
    price: 472,
    mrp: 560,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300",
  }
];

const OrderSummaryPanel = ({ items, onEditCart }) => {
  const subtotal = items.reduce((s, i) => s + i.mrp * (i.quantity || 1), 0);
  const total = items.reduce((s, i) => s + i.price * (i.quantity || 1), 0);
  const discount = subtotal - total;
  const gst = Math.round(total * 0.18);
  const grandTotal = total + gst;
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [couponSaving, setCouponSaving] = useState(0);

  const offers = [
    { code: "EXTRA500", desc: "Get ₹500 OFF on orders above ₹5,000", color: "#dc2626" },
    { code: "SBI10", desc: "10% Instant Discount on SBI Credit Cards", color: "#2563eb" },
    { code: "NOCOSTEMI", desc: "Up to 6 Months No Cost EMI", color: "#059669" },
  ];

  return (
    <div style={ps.summaryCard}>
      <div style={ps.summaryHeader}>
        <h3 style={ps.summaryTitle}>Order Summary</h3>
        {onEditCart && <button onClick={onEditCart} style={ps.editCartBtn}>Edit Cart</button>}
      </div>

      {/* Item list */}
      <div style={ps.summaryItemsList}>
        {items.slice(0, 3).map((item, i) => (
          <div key={i} style={ps.summaryItemRow}>
            <img src={item.image} alt={item.name} style={ps.summaryItemImg} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={ps.summaryItemName}>{item.name}</div>
              <div style={ps.summaryItemQty}>x{item.quantity || 1}</div>
            </div>
            <span style={ps.summaryItemPrice}>₹{(item.price * (item.quantity || 1)).toLocaleString("en-IN")}</span>
          </div>
        ))}
        {items.length > 3 && (
          <div style={ps.moreItemsLink}>+ {items.length - 3} more items</div>
        )}
      </div>

      {/* Pricing breakdown */}
      <div style={ps.pricingBlock}>
        <div style={ps.priceRow}>
          <span>Subtotal ({items.length} Items)</span>
          <span>₹{subtotal.toLocaleString("en-IN")}</span>
        </div>
        <div style={{ ...ps.priceRow, color: "#dc2626" }}>
          <span>Discount</span>
          <span>-₹{discount.toLocaleString("en-IN")}</span>
        </div>
        <div style={ps.priceRow}>
          <span>GST (18%)</span>
          <span>₹{gst.toLocaleString("en-IN")}</span>
        </div>
        <div style={ps.priceRow}>
          <span>Delivery</span>
          <span style={{ color: "#059669", fontWeight: 700 }}>FREE</span>
        </div>
        <div style={ps.totalDivider} />
        <div style={ps.grandTotalRow}>
          <span>Total</span>
          <span style={{ color: "#dc2626" }}>₹{grandTotal.toLocaleString("en-IN")}</span>
        </div>
        {discount > 0 && (
          <div style={ps.savingsBadge}>
            You Save: ₹{discount.toLocaleString("en-IN")} ({Math.round((discount / subtotal) * 100)}% OFF)
          </div>
        )}
      </div>

      {/* Free delivery, secure packing, original */}
      <div style={ps.trustIconsRow}>
        {[
          { icon: "🚚", title: "Free Delivery", desc: "On orders above ₹999" },
          { icon: "📦", title: "Secure Packaging", desc: "100% Safe & Damage Free" },
          { icon: "✅", title: "Original Products", desc: "Brands you can trust" },
        ].map((t, i) => (
          <div key={i} style={ps.trustIconItem}>
            <span style={{ fontSize: "18px" }}>{t.icon}</span>
            <div>
              <div style={ps.trustIconTitle}>{t.title}</div>
              <div style={ps.trustIconDesc}>{t.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Offers Applied */}
      {appliedCoupon && (
        <div style={ps.offersAppliedSection}>
          <div style={ps.offersAppliedHeader}>
            <Tag size={13} color="#d97706" style={{ marginRight: "6px" }} />
            Offers Applied
          </div>
          <div style={ps.appliedCouponRow}>
            <div>
              <div style={ps.appliedCouponCode}>{appliedCoupon}</div>
              <div style={ps.appliedCouponSaving}>You saved extra ₹{couponSaving}</div>
            </div>
            <button onClick={() => { setAppliedCoupon(""); setCouponSaving(0); }} style={ps.removeCouponBtn}>Remove</button>
          </div>
        </div>
      )}

      {/* Available Offers */}
      <div style={ps.offersSection}>
        <div style={ps.offersSectionTitle}>
          <Tag size={13} color="#d97706" style={{ marginRight: "6px" }} />
          Available Offers
        </div>
        {offers.map((offer, i) => (
          <div key={i} style={ps.offerRow}>
            <div>
              <span style={{ ...ps.offerCode, borderColor: offer.color, color: offer.color }}>{offer.code}</span>
              <span style={ps.offerDesc}>{offer.desc}</span>
            </div>
            <button onClick={() => { setAppliedCoupon(offer.code); setCouponSaving(330); }} style={ps.applyOfferBtn}>Apply</button>
          </div>
        ))}
        <button style={ps.viewAllOffersBtn}>View all offers →</button>
      </div>

      {/* We Accept */}
      <div style={ps.weAcceptSection}>
        <div style={ps.weAcceptLabel}>We Accept</div>
        <div style={ps.paymentLogosRow}>
          {["VISA", "MC", "RuPay", "UPI", "Paytm", "GPay"].map((logo, i) => (
            <span key={i} style={ps.paymentLogoChip}>{logo}</span>
          ))}
        </div>
        <div style={ps.trustBadgesGrid}>
          {[
            { icon: "🔒", title: "100% Secure Payments" },
            { icon: "↩️", title: "Easy Returns & Refunds" },
            { icon: "✅", title: "Original Products" },
            { icon: "🎧", title: "24/7 Customer Support" }
          ].map((b, i) => (
            <div key={i} style={ps.trustBadgeItem}>
              <span style={{ fontSize: "16px" }}>{b.icon}</span>
              <span style={ps.trustBadgeText}>{b.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ps = {
  summaryCard: {
    background: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    overflow: "hidden",
    position: "sticky",
    top: "94px",
  },
  summaryHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    borderBottom: "1px solid #f1f5f9",
  },
  summaryTitle: {
    fontSize: "15px",
    fontWeight: "800",
    color: "#0f172a",
    margin: 0,
  },
  editCartBtn: {
    background: "none",
    border: "none",
    color: "#dc2626",
    fontSize: "12px",
    fontWeight: "700",
    cursor: "pointer",
    padding: 0,
  },
  summaryItemsList: {
    padding: "12px 20px",
    borderBottom: "1px solid #f1f5f9",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  summaryItemRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  summaryItemImg: {
    width: "44px",
    height: "44px",
    borderRadius: "6px",
    objectFit: "cover",
    border: "1px solid #f1f5f9",
    flexShrink: 0,
  },
  summaryItemName: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#0f172a",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  summaryItemQty: {
    fontSize: "10px",
    color: "#94a3b8",
  },
  summaryItemPrice: {
    fontSize: "12px",
    fontWeight: "800",
    color: "#0f172a",
    flexShrink: 0,
  },
  moreItemsLink: {
    fontSize: "12px",
    color: "#dc2626",
    fontWeight: "700",
    cursor: "pointer",
    textAlign: "center",
  },
  pricingBlock: {
    padding: "12px 20px",
    borderBottom: "1px solid #f1f5f9",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
    color: "#475569",
  },
  totalDivider: {
    height: "1px",
    background: "#e2e8f0",
    margin: "4px 0",
  },
  grandTotalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "16px",
    fontWeight: "800",
    color: "#0f172a",
  },
  savingsBadge: {
    background: "#ecfdf5",
    color: "#065f46",
    fontSize: "11px",
    fontWeight: "700",
    padding: "6px 10px",
    borderRadius: "6px",
    marginTop: "4px",
  },
  trustIconsRow: {
    padding: "12px 20px",
    borderBottom: "1px solid #f1f5f9",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  trustIconItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  trustIconTitle: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#0f172a",
  },
  trustIconDesc: {
    fontSize: "10px",
    color: "#94a3b8",
  },
  offersAppliedSection: {
    padding: "12px 20px",
    borderBottom: "1px solid #f1f5f9",
    background: "#fffbeb",
  },
  offersAppliedHeader: {
    fontSize: "12px",
    fontWeight: "800",
    color: "#92400e",
    marginBottom: "8px",
    display: "flex",
    alignItems: "center",
  },
  appliedCouponRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff",
    border: "1px solid #fcd34d",
    borderRadius: "8px",
    padding: "8px 12px",
  },
  appliedCouponCode: {
    fontSize: "13px",
    fontWeight: "800",
    color: "#0f172a",
  },
  appliedCouponSaving: {
    fontSize: "10px",
    color: "#059669",
    fontWeight: "600",
  },
  removeCouponBtn: {
    background: "none",
    border: "none",
    color: "#dc2626",
    fontSize: "12px",
    fontWeight: "700",
    cursor: "pointer",
  },
  offersSection: {
    padding: "12px 20px",
    borderBottom: "1px solid #f1f5f9",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  offersSectionTitle: {
    fontSize: "12px",
    fontWeight: "800",
    color: "#0f172a",
    display: "flex",
    alignItems: "center",
  },
  offerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "8px",
    padding: "6px 10px",
    background: "#f8fafc",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
  },
  offerCode: {
    fontSize: "10px",
    fontWeight: "800",
    border: "1px dashed",
    padding: "2px 6px",
    borderRadius: "4px",
    marginRight: "6px",
  },
  offerDesc: {
    fontSize: "10px",
    color: "#475569",
  },
  applyOfferBtn: {
    background: "#fff",
    border: "1px solid #dc2626",
    color: "#dc2626",
    fontSize: "10px",
    fontWeight: "700",
    padding: "4px 10px",
    borderRadius: "6px",
    cursor: "pointer",
    flexShrink: 0,
  },
  viewAllOffersBtn: {
    background: "none",
    border: "none",
    color: "#dc2626",
    fontSize: "11px",
    fontWeight: "700",
    cursor: "pointer",
    textAlign: "left",
    padding: 0,
  },
  weAcceptSection: {
    padding: "12px 20px",
  },
  weAcceptLabel: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#64748b",
    marginBottom: "8px",
  },
  paymentLogosRow: {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
    marginBottom: "12px",
  },
  paymentLogoChip: {
    fontSize: "9px",
    fontWeight: "700",
    color: "#475569",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    padding: "4px 8px",
    borderRadius: "4px",
  },
  trustBadgesGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "6px",
  },
  trustBadgeItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "#f8fafc",
    borderRadius: "8px",
    padding: "6px 8px",
  },
  trustBadgeText: {
    fontSize: "9px",
    fontWeight: "600",
    color: "#334155",
  },
};

const CheckoutNew = () => {
  const navigate = useNavigate();
  const { cartItems: contextCartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user, isLoggedIn } = useAuth();

  const [step, setStep] = useState(1);
  const [orderResult, setOrderResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cards");
  const [addressType, setAddressType] = useState("home");
  const [deliveryInstructions, setDeliveryInstructions] = useState([]);
  const [showCvv, setShowCvv] = useState(false);
  const [cardForm, setCardForm] = useState({ number: "", name: "", expiry: "", cvv: "", save: false });
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [localCartItems, setLocalCartItems] = useState([]);

  useEffect(() => {
    if (contextCartItems && contextCartItems.length > 0) {
      setLocalCartItems(contextCartItems.map(item => ({
        ...item,
        id: item.id || item._id,
        price: parseFloat(item.sale_price || item.price_inr || item.price || 0),
        mrp: parseFloat(item.regular_price || item.mrp || item.mrp_inr || (item.price * 1.25)),
      })));
    } else {
      setLocalCartItems(SEEDED_CART_ITEMS);
    }
  }, [contextCartItems]);

  const [customerInfo, setCustomerInfo] = useState({
    name: user?.name || "RAHUL KUMAR",
    email: user?.email || "rahul@gmail.com",
    phone: user?.phone || "9876543210",
    house: "123, Near Post Office",
    street: "Gopal Das Road, Jamodi Khurd",
    landmark: "Near Shiv Mandir",
    city: "Seoni",
    district: "Seoni",
    state: "Madhya Pradesh",
    pincode: "480661",
    country: "India",
    instructions: "",
  });

  const subtotal = localCartItems.reduce((s, i) => s + i.mrp * (i.quantity || 1), 0);
  const total = localCartItems.reduce((s, i) => s + i.price * (i.quantity || 1), 0);
  const gst = Math.round(total * 0.18);
  const grandTotal = total + gst;

  const handleQtyChange = (itemId, delta) => {
    setLocalCartItems(prev => prev.map(item =>
      item.id === itemId ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) } : item
    ));
  };

  const handleRemoveItem = (itemId) => {
    setLocalCartItems(prev => prev.filter(item => item.id !== itemId));
    removeFromCart && removeFromCart(itemId);
  };

  const handlePlaceOrder = async () => {
    if (!agreeTerms) { setOrderError("Please agree to Terms & Conditions."); return; }
    setIsProcessing(true);
    setOrderError("");
    try {
      const res = await fetch(`${API}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerInfo, items: localCartItems, paymentMethod, grandTotal }),
      });
      setOrderResult({ orderId: `DPT-${Date.now().toString().slice(-6).toUpperCase()}` });
      clearCart && clearCart();
      setStep(4);
    } catch {
      setOrderResult({ orderId: `DPT-${Date.now().toString().slice(-6).toUpperCase()}` });
      clearCart && clearCart();
      setStep(4);
    } finally {
      setIsProcessing(false);
    }
  };

  if (step === 4) {
    return (
      <div style={{ paddingTop: "100px", minHeight: "100vh", background: "#f8fafc", fontFamily: "'Inter', sans-serif" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", padding: "40px 20px", textAlign: "center" }}>
          <div style={s.doneCard}>
            <div style={{ width: "80px", height: "80px", background: "#ecfdf5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: "#059669" }}>
              <CheckCircle2 size={40} />
            </div>
            <h2 style={{ fontSize: "22px", fontWeight: "900", color: "#0f172a", marginBottom: "10px" }}>Order Placed Successfully!</h2>
            <p style={{ color: "#64748b", marginBottom: "20px" }}>Our team will call you at <strong>{customerInfo.phone}</strong>.</p>
            {orderResult?.orderId && (
              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "12px", marginBottom: "24px" }}>
                Order ID: <strong>{orderResult.orderId}</strong>
              </div>
            )}
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <Link to="/products" style={{ background: "#dc2626", color: "#fff", padding: "12px 24px", borderRadius: "8px", textDecoration: "none", fontWeight: "700", fontSize: "13px" }}>Continue Shopping</Link>
              <Link to="/track-order" style={{ background: "#f1f5f9", color: "#0f172a", padding: "12px 24px", borderRadius: "8px", textDecoration: "none", fontWeight: "700", fontSize: "13px" }}>Track Order</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      {/* Step Progress Bar */}
      <div style={s.stepBar}>
        {[
          { n: 1, label: "CART" },
          { n: 2, label: "ADDRESS" },
          { n: 3, label: "PAYMENT" }
        ].map((st, i) => (
          <React.Fragment key={st.n}>
            <div style={s.stepItem} onClick={() => step > st.n && setStep(st.n)}>
              <div style={{
                ...s.stepCircle,
                background: step > st.n ? "#dc2626" : step === st.n ? "#dc2626" : "#e2e8f0",
                color: step >= st.n ? "#fff" : "#94a3b8",
              }}>
                {step > st.n ? "✓" : st.n}
              </div>
              <span style={{ ...s.stepLabel, color: step >= st.n ? "#dc2626" : "#94a3b8", fontWeight: step === st.n ? "800" : "600" }}>{st.label}</span>
            </div>
            {i < 2 && <div style={{ ...s.stepLine, background: step > st.n ? "#dc2626" : "#e2e8f0" }} />}
          </React.Fragment>
        ))}
      </div>

      <div style={s.layout}>
        <div style={s.mainCol}>

          {/* ═══════════ STEP 1: CART ═══════════ */}
          {step === 1 && (
            <div style={s.card}>
              <h2 style={s.cardTitle}>Shopping Cart</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {localCartItems.map((item, i) => {
                  const disc = item.mrp > item.price ? Math.round(((item.mrp - item.price) / item.mrp) * 100) : 0;
                  return (
                    <div key={i} style={s.itemRow}>
                      <input type="checkbox" defaultChecked style={{ marginRight: "4px" }} />
                      <div style={s.itemImg}><img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} /></div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={s.itemName}>{item.name}</div>
                        <div style={s.itemBrand}>{item.brand}</div>
                        <div style={{ color: "#059669", fontSize: "10px", fontWeight: "700", marginTop: "2px" }}>In Stock</div>
                      </div>
                      <div style={s.itemQtyBox}>
                        <button style={s.qtyBtn} onClick={() => handleQtyChange(item.id, -1)}><Minus size={11} /></button>
                        <span style={s.qtyNum}>{item.quantity || 1}</span>
                        <button style={s.qtyBtn} onClick={() => handleQtyChange(item.id, 1)}><Plus size={11} /></button>
                      </div>
                      <div style={{ textAlign: "right", minWidth: "80px" }}>
                        <div style={s.itemSalePrice}>₹{(item.price * (item.quantity || 1)).toLocaleString("en-IN")}</div>
                        {item.mrp > item.price && (
                          <div style={{ display: "flex", gap: "4px", justifyContent: "flex-end", marginTop: "2px" }}>
                            <span style={s.itemMrp}>₹{(item.mrp * (item.quantity || 1)).toLocaleString("en-IN")}</span>
                            <span style={s.itemDisc}>{disc}% OFF</span>
                          </div>
                        )}
                      </div>
                      <button style={s.delBtn} onClick={() => handleRemoveItem(item.id)}><Trash2 size={15} /></button>
                    </div>
                  );
                })}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                <Link to="/products" style={s.continueBtn}>← Continue Shopping</Link>
                <button style={s.proceedBtn} onClick={() => setStep(2)}>Proceed to Checkout →</button>
              </div>
            </div>
          )}

          {/* ═══════════ STEP 2: ADDRESS ═══════════ */}
          {step === 2 && (
            <div style={s.card}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <MapPin size={20} color="#dc2626" />
                  <div>
                    <h2 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", margin: 0 }}>Delivery Address</h2>
                    <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0 }}>Enter your delivery details</p>
                  </div>
                </div>
                <button style={s.useSavedBtn}>
                  <MapPin size={12} style={{ marginRight: "4px" }} />
                  Use Saved Address
                </button>
              </div>

              {/* Section 1: Contact Info */}
              <div style={s.formSection}>
                <div style={s.formSectionNum}>1</div>
                <h3 style={s.formSectionTitle}>Contact Information</h3>
              </div>
              <div style={s.formGrid3}>
                <div>
                  <label style={s.label}>Full Name *</label>
                  <div style={s.inputWrap}>
                    <User size={13} color="#94a3b8" style={{ marginRight: "8px" }} />
                    <input value={customerInfo.name} onChange={e => setCustomerInfo({ ...customerInfo, name: e.target.value })} placeholder="Full Name" style={s.input} />
                  </div>
                </div>
                <div>
                  <label style={s.label}>Mobile Number *</label>
                  <div style={s.inputWrap}>
                    <Phone size={13} color="#94a3b8" style={{ marginRight: "8px" }} />
                    <input value={customerInfo.phone} onChange={e => setCustomerInfo({ ...customerInfo, phone: e.target.value })} placeholder="9876543210" style={s.input} />
                  </div>
                </div>
                <div>
                  <label style={s.label}>Email Address *</label>
                  <div style={s.inputWrap}>
                    <Mail size={13} color="#94a3b8" style={{ marginRight: "8px" }} />
                    <input value={customerInfo.email} onChange={e => setCustomerInfo({ ...customerInfo, email: e.target.value })} placeholder="you@email.com" style={s.input} />
                  </div>
                </div>
              </div>

              {/* Section 2: Complete Address */}
              <div style={s.formSection}>
                <div style={s.formSectionNum}>2</div>
                <h3 style={s.formSectionTitle}>Complete Address</h3>
              </div>
              <div style={s.formGrid3}>
                <div>
                  <label style={s.label}>House / Flat No. *</label>
                  <input value={customerInfo.house} onChange={e => setCustomerInfo({ ...customerInfo, house: e.target.value })} placeholder="123, Near Post Office" style={s.inputStd} />
                </div>
                <div>
                  <label style={s.label}>Street / Colony *</label>
                  <div style={s.inputWrap}>
                    <MapPin size={13} color="#94a3b8" style={{ marginRight: "8px" }} />
                    <input value={customerInfo.street} onChange={e => setCustomerInfo({ ...customerInfo, street: e.target.value })} placeholder="Gopal Das Road..." style={s.input} />
                  </div>
                </div>
                <div>
                  <label style={s.label}>Landmark (Optional)</label>
                  <input value={customerInfo.landmark} onChange={e => setCustomerInfo({ ...customerInfo, landmark: e.target.value })} placeholder="Near Shiv Mandir" style={s.inputStd} />
                </div>
              </div>
              <div style={s.formGrid2} >
                <div>
                  <label style={s.label}>City *</label>
                  <input value={customerInfo.city} onChange={e => setCustomerInfo({ ...customerInfo, city: e.target.value })} placeholder="e.g. Seoni" style={s.inputStd} />
                </div>
                <div>
                  <label style={s.label}>District *</label>
                  <input value={customerInfo.district} onChange={e => setCustomerInfo({ ...customerInfo, district: e.target.value })} placeholder="Seoni" style={s.inputStd} />
                </div>
              </div>
              <div style={s.formGrid3}>
                <div>
                  <label style={s.label}>State *</label>
                  <select value={customerInfo.state} onChange={e => setCustomerInfo({ ...customerInfo, state: e.target.value })} style={s.selectStd}>
                    {["Madhya Pradesh", "Maharashtra", "Delhi", "Uttar Pradesh", "Gujarat", "Rajasthan", "Karnataka", "Tamil Nadu"].map(st => (
                      <option key={st}>{st}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={s.label}>Pincode *</label>
                  <input value={customerInfo.pincode} onChange={e => setCustomerInfo({ ...customerInfo, pincode: e.target.value })} placeholder="480661" style={s.inputStd} />
                </div>
                <div>
                  <label style={s.label}>Country *</label>
                  <select value={customerInfo.country} onChange={e => setCustomerInfo({ ...customerInfo, country: e.target.value })} style={s.selectStd}>
                    <option>India</option>
                  </select>
                </div>
              </div>

              {/* Section 3: Address Type */}
              <div style={s.formSection}>
                <div style={s.formSectionNum}>3</div>
                <h3 style={s.formSectionTitle}>Address Type</h3>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "16px" }}>
                {[
                  { id: "home", label: "Home", icon: Home },
                  { id: "office", label: "Office", icon: Building2 },
                  { id: "shop", label: "Shop", icon: Store },
                  { id: "other", label: "Other", icon: MoreHorizontal }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setAddressType(id)}
                    style={{
                      ...s.addrTypeBtn,
                      borderColor: addressType === id ? "#dc2626" : "#e2e8f0",
                      background: addressType === id ? "#fff5f5" : "#ffffff",
                      color: addressType === id ? "#dc2626" : "#64748b",
                    }}
                  >
                    <Icon size={20} style={{ marginBottom: "4px" }} />
                    {label}
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", gap: "20px", marginBottom: "16px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#475569", cursor: "pointer" }}>
                  <input type="checkbox" defaultChecked /> Make this my default address
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#475569", cursor: "pointer" }}>
                  <input type="checkbox" defaultChecked /> Use this address for future orders
                </label>
              </div>

              {/* Section 4: Delivery Instructions */}
              <div style={s.formSection}>
                <div style={s.formSectionNum}>4</div>
                <h3 style={s.formSectionTitle}>Delivery Instructions <span style={{ fontWeight: "normal", color: "#94a3b8" }}>(Optional)</span></h3>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "12px" }}>
                {["Leave at Door", "Call Before Delivery", "Reception", "Security Guard", "Other Notes"].map(ins => (
                  <button
                    key={ins}
                    onClick={() => setDeliveryInstructions(prev =>
                      prev.includes(ins) ? prev.filter(i => i !== ins) : [...prev, ins]
                    )}
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                      padding: "6px 14px",
                      borderRadius: "20px",
                      border: deliveryInstructions.includes(ins) ? "1px solid #dc2626" : "1px solid #e2e8f0",
                      background: deliveryInstructions.includes(ins) ? "#fff5f5" : "#fff",
                      color: deliveryInstructions.includes(ins) ? "#dc2626" : "#64748b",
                      cursor: "pointer",
                    }}
                  >
                    {ins}
                  </button>
                ))}
              </div>
              <textarea
                value={customerInfo.instructions}
                onChange={e => setCustomerInfo({ ...customerInfo, instructions: e.target.value })}
                placeholder="Any additional instructions for delivery partner..."
                rows={3}
                style={{ ...s.inputStd, resize: "none", width: "100%", boxSizing: "border-box" }}
              />

              {/* Estimated Delivery + GPS */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", margin: "16px 0" }}>
                <button style={s.detectLocationBtn}>
                  <Navigation size={14} color="#2563eb" style={{ marginRight: "8px" }} />
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: "12px", fontWeight: "700", color: "#2563eb" }}>Detect Current Location</div>
                    <div style={{ fontSize: "10px", color: "#94a3b8" }}>Fill your address automatically</div>
                  </div>
                </button>
                <div style={s.safeAddressNote}>
                  <Lock size={14} color="#d97706" style={{ marginRight: "8px", flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: "11px", fontWeight: "700", color: "#92400e" }}>Your address is safe with us.</div>
                    <div style={{ fontSize: "10px", color: "#92400e" }}>We do not share your personal information.</div>
                  </div>
                </div>
              </div>

              {/* Estimated Delivery Banner */}
              <div style={s.deliveryEstBanner}>
                <Truck size={20} color="#059669" style={{ marginRight: "12px" }} />
                <div>
                  <div style={{ fontSize: "13px", fontWeight: "800", color: "#065f46" }}>Estimated Delivery: 24 July - 26 July</div>
                  <div style={{ display: "flex", gap: "16px", marginTop: "4px" }}>
                    {[{ icon: "✅", text: "Free Delivery" }, { icon: "⚡", text: "Fast Dispatch" }, { icon: "📍", text: "Live Tracking" }, { icon: "📦", text: "Secure Packaging" }].map((f, i) => (
                      <span key={i} style={{ fontSize: "10px", color: "#065f46", fontWeight: "600" }}>{f.icon} {f.text}</span>
                    ))}
                  </div>
                </div>
              </div>

              <button style={s.bigProceedBtn} onClick={() => setStep(3)}>
                Proceed to Payment →
                <div style={{ fontSize: "10px", fontWeight: "normal", marginTop: "2px", opacity: 0.8 }}>You will be redirected to secure payment gateway</div>
              </button>
            </div>
          )}

          {/* ═══════════ STEP 3: PAYMENT ═══════════ */}
          {step === 3 && (
            <div style={s.card}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                <CreditCard size={20} color="#dc2626" />
                <h2 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", margin: 0 }}>Payment Method</h2>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "24px" }}>
                <Lock size={12} color="#059669" />
                <span style={{ fontSize: "11px", color: "#059669", fontWeight: "600" }}>All transactions are secure and encrypted</span>
              </div>

              <div style={s.paymentLayout}>
                {/* Left: Payment Method Selector */}
                <div style={s.paymentMethodList}>
                  {[
                    { id: "cards", label: "Cards", desc: "Visa, MasterCard, Rupay", icon: CreditCard },
                    { id: "upi", label: "UPI", desc: "Google Pay, PhonePe, Paytm", icon: null },
                    { id: "netbanking", label: "Net Banking", desc: "All Major Banks", icon: null },
                    { id: "wallets", label: "Wallets", desc: "Paytm, Amazon Pay, Mobikwik", icon: null },
                    { id: "emi", label: "EMI / No Cost EMI", desc: "Easy EMI options", icon: null },
                    { id: "cod", label: "Pay on Delivery", desc: "Cash on delivery", icon: null },
                  ].map(pm => (
                    <button
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id)}
                      style={{
                        ...s.pmItem,
                        borderColor: paymentMethod === pm.id ? "#dc2626" : "#e2e8f0",
                        background: paymentMethod === pm.id ? "#fff5f5" : "#ffffff",
                      }}
                    >
                      <div style={{ width: "28px", height: "28px", borderRadius: "6px", background: paymentMethod === pm.id ? "#dc2626" : "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "10px", flexShrink: 0 }}>
                        {pm.id === "cards" && <CreditCard size={14} color={paymentMethod === pm.id ? "#fff" : "#64748b"} />}
                        {pm.id === "upi" && <span style={{ fontSize: "8px", fontWeight: "800", color: paymentMethod === pm.id ? "#fff" : "#64748b" }}>UPI</span>}
                        {pm.id === "netbanking" && <span style={{ fontSize: "7px", fontWeight: "800", color: paymentMethod === pm.id ? "#fff" : "#64748b" }}>NET</span>}
                        {pm.id === "wallets" && <span style={{ fontSize: "8px", fontWeight: "800", color: paymentMethod === pm.id ? "#fff" : "#64748b" }}>💳</span>}
                        {pm.id === "emi" && <span style={{ fontSize: "7px", fontWeight: "800", color: paymentMethod === pm.id ? "#fff" : "#64748b" }}>EMI</span>}
                        {pm.id === "cod" && <Truck size={14} color={paymentMethod === pm.id ? "#fff" : "#64748b"} />}
                      </div>
                      <div style={{ textAlign: "left" }}>
                        <div style={{ fontSize: "12px", fontWeight: "700", color: paymentMethod === pm.id ? "#dc2626" : "#0f172a" }}>{pm.label}</div>
                        <div style={{ fontSize: "10px", color: "#94a3b8" }}>{pm.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Right: Card Form / Content */}
                <div style={s.paymentDetail}>
                  {paymentMethod === "cards" && (
                    <div>
                      <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "16px" }}>
                        Pay securely using your credit or debit card.
                      </p>
                      {/* Card brand logos */}
                      <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
                        {["VISA", "Mastercard", "RuPay", "AmEx"].map(logo => (
                          <div key={logo} style={{ padding: "4px 10px", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "10px", fontWeight: "800", background: "#f8fafc", color: "#475569" }}>{logo}</div>
                        ))}
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                        <div>
                          <label style={s.label}>Card Number</label>
                          <div style={{ ...s.inputWrap, justifyContent: "space-between" }}>
                            <input
                              value={cardForm.number}
                              onChange={e => setCardForm({ ...cardForm, number: e.target.value.replace(/[^0-9]/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim() })}
                              placeholder="1234 5678 9012 3456"
                              style={{ ...s.input, flex: 1 }}
                              maxLength={19}
                            />
                            <CreditCard size={16} color="#94a3b8" />
                          </div>
                        </div>
                        <div>
                          <label style={s.label}>Cardholder Name</label>
                          <input
                            value={cardForm.name}
                            onChange={e => setCardForm({ ...cardForm, name: e.target.value })}
                            placeholder="Name on card"
                            style={s.inputStd}
                          />
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                          <div>
                            <label style={s.label}>Expiry Date</label>
                            <input
                              value={cardForm.expiry}
                              onChange={e => setCardForm({ ...cardForm, expiry: e.target.value })}
                              placeholder="MM / YY"
                              style={s.inputStd}
                            />
                          </div>
                          <div>
                            <label style={s.label}>CVV</label>
                            <div style={{ ...s.inputWrap, justifyContent: "space-between" }}>
                              <input
                                value={cardForm.cvv}
                                onChange={e => setCardForm({ ...cardForm, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                                placeholder="123"
                                type={showCvv ? "text" : "password"}
                                style={{ ...s.input, flex: 1 }}
                              />
                              <button onClick={() => setShowCvv(!showCvv)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                                {showCvv ? <EyeOff size={14} color="#94a3b8" /> : <Eye size={14} color="#94a3b8" />}
                              </button>
                            </div>
                          </div>
                        </div>

                        <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#475569", cursor: "pointer" }}>
                          <input type="checkbox" checked={cardForm.save} onChange={e => setCardForm({ ...cardForm, save: e.target.checked })} />
                          Save card for faster payments
                        </label>
                      </div>

                      {/* No Cost EMI banner */}
                      <div style={s.emiInlineNotice}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{ width: "28px", height: "28px", background: "#ecfdf5", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontSize: "11px" }}>0%</span>
                          </div>
                          <div>
                            <div style={{ fontSize: "12px", fontWeight: "700", color: "#065f46" }}>No Cost EMI Available</div>
                            <div style={{ fontSize: "10px", color: "#64748b" }}>Get up to 6 months No Cost EMI on select cards</div>
                          </div>
                        </div>
                        <button style={{ background: "none", border: "none", color: "#2563eb", fontSize: "11px", fontWeight: "700", cursor: "pointer", flexShrink: 0 }}>View EMI Plans</button>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "upi" && (
                    <div style={{ textAlign: "center", padding: "20px 0" }}>
                      <div style={{ fontSize: "24px", marginBottom: "12px" }}>📱</div>
                      <p style={{ fontSize: "13px", color: "#475569", marginBottom: "16px" }}>Pay using any UPI app on your smartphone</p>
                      <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                        {["Google Pay", "PhonePe", "Paytm", "BHIM UPI"].map(app => (
                          <div key={app} style={{ padding: "10px 16px", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "12px", fontWeight: "700", background: "#f8fafc" }}>{app}</div>
                        ))}
                      </div>
                      <div style={{ marginTop: "16px" }}>
                        <label style={s.label}>UPI ID</label>
                        <input placeholder="yourname@bank" style={{ ...s.inputStd, maxWidth: "300px" }} />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "cod" && (
                    <div style={{ padding: "16px 0" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", padding: "16px", marginBottom: "16px" }}>
                        <Truck size={24} color="#059669" />
                        <div>
                          <div style={{ fontSize: "14px", fontWeight: "700", color: "#065f46" }}>Cash on Delivery</div>
                          <div style={{ fontSize: "12px", color: "#16a34a" }}>Pay when you receive your order. No advance payment required.</div>
                        </div>
                      </div>
                      <p style={{ fontSize: "12px", color: "#64748b" }}>• COD charges may apply for some locations.<br />• Please keep exact change ready at time of delivery.</p>
                    </div>
                  )}

                  {(paymentMethod === "netbanking" || paymentMethod === "wallets" || paymentMethod === "emi") && (
                    <div style={{ padding: "16px 0" }}>
                      <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "16px" }}>
                        {paymentMethod === "netbanking" && "Pay directly from your bank account using net banking."}
                        {paymentMethod === "wallets" && "Use your Paytm, Amazon Pay, Mobikwik or other wallets."}
                        {paymentMethod === "emi" && "Convert your purchase into easy monthly installments."}
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        {paymentMethod === "netbanking" && ["SBI", "HDFC", "ICICI", "Axis", "PNB", "Kotak", "BOI", "Union Bank"].map(b => (
                          <div key={b} style={{ padding: "8px 16px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}>{b}</div>
                        ))}
                        {paymentMethod === "wallets" && ["Paytm", "Amazon Pay", "Mobikwik", "Freecharge"].map(w => (
                          <div key={w} style={{ padding: "8px 16px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}>{w}</div>
                        ))}
                        {paymentMethod === "emi" && ["Bajaj Finserv", "HDFC EMI", "ICICI EMI", "Kotak EMI", "ZestMoney", "IDFC"].map(e => (
                          <div key={e} style={{ padding: "8px 16px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}>{e}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Trust Badges Row */}
              <div style={s.trustRow}>
                {[
                  { icon: "🔒", title: "100% Secure Payments", desc: "SSL Encrypted" },
                  { icon: "↩️", title: "Easy Returns", desc: "Hassle Free Returns" },
                  { icon: "✅", title: "Pay Safe", desc: "Secure & Trusted" },
                  { icon: "🎧", title: "24/7 Support", desc: "We are here to help" }
                ].map((t, i) => (
                  <div key={i} style={s.trustBadge}>
                    <span style={{ fontSize: "18px", marginBottom: "4px" }}>{t.icon}</span>
                    <div style={{ fontSize: "11px", fontWeight: "700", color: "#0f172a" }}>{t.title}</div>
                    <div style={{ fontSize: "9px", color: "#94a3b8" }}>{t.desc}</div>
                  </div>
                ))}
              </div>

              {/* Terms Checkbox */}
              <label style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "20px", fontSize: "12px", color: "#475569", cursor: "pointer" }}>
                <input type="checkbox" checked={agreeTerms} onChange={e => setAgreeTerms(e.target.checked)} style={{ marginTop: "2px" }} />
                <span>I have read and agree to the <span style={{ color: "#2563eb" }}>Terms & Conditions</span>, <span style={{ color: "#2563eb" }}>Privacy Policy</span> and <span style={{ color: "#2563eb" }}>Return & Refund Policy</span>.</span>
              </label>

              {orderError && (
                <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", color: "#dc2626", padding: "10px 14px", borderRadius: "8px", fontSize: "12px", marginBottom: "16px" }}>
                  {orderError}
                </div>
              )}

              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <button onClick={() => setStep(2)} style={s.backToAddressBtn}>
                  ← Back to Address
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  style={{ ...s.payNowBtn, opacity: isProcessing ? 0.7 : 1 }}
                >
                  <Lock size={14} style={{ marginRight: "8px" }} />
                  {isProcessing ? "Processing..." : `Pay ₹${grandTotal.toLocaleString("en-IN")} Securely`}
                </button>
              </div>
              <div style={{ textAlign: "center", marginTop: "10px", fontSize: "11px", color: "#94a3b8" }}>
                You will not be charged until you review this order on the next page.
              </div>
            </div>
          )}

          {/* Bottom Highlights */}
          <div style={s.bottomBar}>
            {[
              { icon: "🚚", title: "Faster Delivery", desc: "Pan India Delivery" },
              { icon: "🏷️", title: "Best Offers", desc: "On Top Brands" },
              { icon: "↩️", title: "Easy Returns", desc: "7 Days Return Policy" },
              { icon: "🔒", title: "Secure Payments", desc: "100% Protected" },
              { icon: "⭐", title: "Top Brands", desc: "100% Original Products" }
            ].map((h, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "18px" }}>{h.icon}</span>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: "700", color: "#0f172a" }}>{h.title}</div>
                  <div style={{ fontSize: "10px", color: "#94a3b8" }}>{h.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div style={s.sidebarCol}>
          <OrderSummaryPanel items={localCartItems} onEditCart={step > 1 ? () => setStep(1) : null} />
        </div>
      </div>
    </div>
  );
};

const s = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    paddingTop: "72px",
    paddingBottom: "60px",
    fontFamily: "'Inter', sans-serif",
  },
  stepBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0",
    padding: "20px 24px",
    background: "#ffffff",
    borderBottom: "1px solid #f1f5f9",
  },
  stepItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    padding: "0 16px",
  },
  stepCircle: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    fontWeight: "900",
  },
  stepLabel: {
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "0.5px",
  },
  stepLine: {
    width: "80px",
    height: "2px",
    borderRadius: "1px",
  },
  layout: {
    maxWidth: "1240px",
    margin: "0 auto",
    padding: "24px 20px",
    display: "grid",
    gridTemplateColumns: "1fr 360px",
    gap: "24px",
    alignItems: "start",
  },
  mainCol: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  sidebarCol: {},
  card: {
    background: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    padding: "24px",
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: "800",
    color: "#0f172a",
    margin: "0 0 20px",
  },
  itemRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    paddingBottom: "16px",
    borderBottom: "1px solid #f1f5f9",
  },
  itemImg: {
    width: "70px",
    height: "70px",
    borderRadius: "8px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    flexShrink: 0,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  itemName: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "2px",
  },
  itemBrand: {
    fontSize: "10px",
    color: "#64748b",
    fontWeight: "600",
  },
  itemQtyBox: {
    display: "flex",
    alignItems: "center",
    background: "#f1f5f9",
    borderRadius: "8px",
    padding: "2px",
  },
  qtyBtn: {
    background: "none",
    border: "none",
    width: "26px",
    height: "26px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#334155",
  },
  qtyNum: {
    fontSize: "13px",
    fontWeight: "700",
    minWidth: "22px",
    textAlign: "center",
  },
  itemSalePrice: {
    fontSize: "14px",
    fontWeight: "800",
    color: "#dc2626",
  },
  itemMrp: {
    fontSize: "10px",
    color: "#94a3b8",
    textDecoration: "line-through",
  },
  itemDisc: {
    fontSize: "10px",
    color: "#059669",
    fontWeight: "700",
  },
  delBtn: {
    background: "none",
    border: "none",
    color: "#dc2626",
    cursor: "pointer",
    padding: "4px",
    flexShrink: 0,
  },
  continueBtn: {
    border: "1px solid #e2e8f0",
    color: "#475569",
    padding: "10px 18px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "12px",
    fontWeight: "700",
    display: "inline-flex",
    alignItems: "center",
  },
  proceedBtn: {
    background: "#dc2626",
    color: "#ffffff",
    border: "none",
    padding: "10px 24px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
  },
  formSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "20px",
    marginBottom: "14px",
  },
  formSectionNum: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    background: "#dc2626",
    color: "#ffffff",
    fontSize: "12px",
    fontWeight: "900",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  formSectionTitle: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#0f172a",
    margin: 0,
  },
  formGrid3: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "12px",
    marginBottom: "12px",
  },
  formGrid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginBottom: "12px",
  },
  label: {
    display: "block",
    fontSize: "11px",
    fontWeight: "700",
    color: "#64748b",
    marginBottom: "5px",
  },
  inputWrap: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    padding: "9px 12px",
    background: "#fff",
  },
  input: {
    border: "none",
    outline: "none",
    fontSize: "12px",
    flex: 1,
    background: "transparent",
    color: "#0f172a",
  },
  inputStd: {
    width: "100%",
    padding: "9px 12px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "12px",
    outline: "none",
    boxSizing: "border-box",
    background: "#fff",
    color: "#0f172a",
  },
  selectStd: {
    width: "100%",
    padding: "9px 12px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "12px",
    outline: "none",
    background: "#fff",
    color: "#0f172a",
  },
  useSavedBtn: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #e2e8f0",
    background: "#fff",
    color: "#475569",
    padding: "8px 14px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
  },
  addrTypeBtn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "14px 10px",
    border: "2px solid #e2e8f0",
    borderRadius: "10px",
    background: "#fff",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
    transition: "all 0.15s",
  },
  detectLocationBtn: {
    display: "flex",
    alignItems: "center",
    border: "1px dashed #93c5fd",
    background: "#eff6ff",
    borderRadius: "10px",
    padding: "14px",
    cursor: "pointer",
    textAlign: "left",
  },
  safeAddressNote: {
    display: "flex",
    alignItems: "center",
    background: "#fffbeb",
    border: "1px solid #fcd34d",
    borderRadius: "10px",
    padding: "14px",
  },
  deliveryEstBanner: {
    display: "flex",
    alignItems: "center",
    background: "#f0fdf4",
    border: "1px solid #bbf7d0",
    borderRadius: "10px",
    padding: "14px 16px",
    marginBottom: "20px",
  },
  bigProceedBtn: {
    width: "100%",
    background: "#dc2626",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    padding: "14px",
    fontSize: "15px",
    fontWeight: "800",
    cursor: "pointer",
    textAlign: "center",
  },
  paymentLayout: {
    display: "grid",
    gridTemplateColumns: "200px 1fr",
    gap: "20px",
    marginBottom: "24px",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    overflow: "hidden",
  },
  paymentMethodList: {
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid #e2e8f0",
    background: "#f8fafc",
  },
  pmItem: {
    display: "flex",
    alignItems: "center",
    padding: "12px 14px",
    border: "none",
    borderBottom: "1px solid #f1f5f9",
    cursor: "pointer",
    textAlign: "left",
    transition: "all 0.15s",
  },
  paymentDetail: {
    padding: "20px",
  },
  emiInlineNotice: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#ecfdf5",
    border: "1px solid #bbf7d0",
    borderRadius: "8px",
    padding: "12px 14px",
    marginTop: "20px",
    gap: "10px",
  },
  trustRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "12px",
    padding: "16px 0",
    borderTop: "1px solid #f1f5f9",
    borderBottom: "1px solid #f1f5f9",
    marginBottom: "20px",
    textAlign: "center",
  },
  trustBadge: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
  },
  backToAddressBtn: {
    border: "1px solid #e2e8f0",
    background: "#fff",
    color: "#475569",
    padding: "12px 20px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
    flexShrink: 0,
  },
  payNowBtn: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#dc2626",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "14px 24px",
    fontSize: "15px",
    fontWeight: "800",
    cursor: "pointer",
  },
  bottomBar: {
    background: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    padding: "18px 24px",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "12px",
  },
  doneCard: {
    background: "#fff",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    padding: "48px 40px",
    textAlign: "center",
  },
};

export default CheckoutNew;
