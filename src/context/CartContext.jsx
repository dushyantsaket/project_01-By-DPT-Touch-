// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useMemo,
// } from "react";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   // ---------- Core State ----------
//   const [cartItems, setCartItems] = useState([]);
//   const [savedForLater, setSavedForLater] = useState([]);
//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddressId, setSelectedAddressId] = useState(null);
//   const [coupon, setCoupon] = useState(null); // { code, type: 'percentage'|'fixed', value }
//   const [gstRate] = useState(0.18); // 18% GST (adjustable)
//   const [shippingCharge, setShippingCharge] = useState(0);
//   const [freeShippingThreshold] = useState(5000); // free shipping above ₹5000
//   const [codAvailablePincodes] = useState(["486661"]); // Sidhi pincodes

//   // ---------- Persist to localStorage ----------
//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) setCartItems(JSON.parse(savedCart));
//     const savedLater = localStorage.getItem("savedForLater");
//     if (savedLater) setSavedForLater(JSON.parse(savedLater));
//     const savedAddresses = localStorage.getItem("addresses");
//     if (savedAddresses) setAddresses(JSON.parse(savedAddresses));
//     const savedSelectedAddress = localStorage.getItem("selectedAddressId");
//     if (savedSelectedAddress) setSelectedAddressId(savedSelectedAddress);
//     const savedCoupon = localStorage.getItem("coupon");
//     if (savedCoupon) setCoupon(JSON.parse(savedCoupon));
//   }, []);

//   const saveToLocal = (key, data) => {
//     localStorage.setItem(key, JSON.stringify(data));
//   };

//   // ---------- Helper Functions ----------
//   const getCleanPrice = (rawPrice) => {
//     if (typeof rawPrice === "string") {
//       return parseFloat(rawPrice.replace(/[^\d.]/g, "")) || 0;
//     }
//     return rawPrice || 0;
//   };

//   const getProductPrice = (item) => {
//     return getCleanPrice(
//       item.sale_price || item.regular_price || item.price_inr || 0,
//     );
//   };

//   const getItemTotal = (item) => {
//     return getProductPrice(item) * item.quantity;
//   };

//   // ---------- Core Cart Actions ----------
//   const saveCart = (items) => {
//     setCartItems(items);
//     saveToLocal("cart", items);
//   };

//   const addToCart = (product, quantity = 1) => {
//     if (!product || product.stockStatus === "Out of Stock") return;

//     const existingItem = cartItems.find((item) => item.id === product.id);
//     const newQuantity = existingItem
//       ? existingItem.quantity + quantity
//       : quantity;
//     if (
//       Number(product.stock_quantity || 0) > 0 &&
//       newQuantity > Number(product.stock_quantity || 0)
//     ) {
//       return; // stock limit exceeded
//     }

//     if (existingItem) {
//       const updated = cartItems.map((item) =>
//         item.id === product.id
//           ? { ...item, quantity: item.quantity + quantity }
//           : item,
//       );
//       saveCart(updated);
//     } else {
//       saveCart([...cartItems, { ...product, quantity }]);
//     }
//   };

//   const removeFromCart = (productId) => {
//     saveCart(cartItems.filter((item) => item.id !== productId));
//   };

//   const updateQuantity = (productId, quantity) => {
//     if (quantity < 1) return;
//     const updated = cartItems.map((item) =>
//       item.id === productId ? { ...item, quantity } : item,
//     );
//     saveCart(updated);
//   };

//   const clearCart = () => {
//     saveCart([]);
//   };

//   // ---------- Saved for Later ----------
//   const moveToSavedForLater = (productId) => {
//     const item = cartItems.find((i) => i.id === productId);
//     if (!item) return;
//     removeFromCart(productId);
//     const updatedLater = [...savedForLater, { ...item, quantity: 1 }];
//     setSavedForLater(updatedLater);
//     saveToLocal("savedForLater", updatedLater);
//   };

//   const moveToCartFromSaved = (productId) => {
//     const item = savedForLater.find((i) => i.id === productId);
//     if (!item) return;
//     setSavedForLater(savedForLater.filter((i) => i.id !== productId));
//     saveToLocal(
//       "savedForLater",
//       savedForLater.filter((i) => i.id !== productId),
//     );
//     addToCart(item, 1);
//   };

//   const removeSavedItem = (productId) => {
//     const updated = savedForLater.filter((i) => i.id !== productId);
//     setSavedForLater(updated);
//     saveToLocal("savedForLater", updated);
//   };

//   // ---------- Buy Now (skip cart, go to checkout) ----------
//   const buyNow = (product, quantity = 1) => {
//     // Clear cart and add only this product
//     saveCart([]);
//     addToCart(product, quantity);
//     // The calling component can then navigate to checkout
//     // We can set a flag if needed
//     return true;
//   };

//   // ---------- Coupon Handling ----------
//   const applyCoupon = (code, type, value) => {
//     // In real app, verify coupon via backend
//     setCoupon({ code, type, value });
//     saveToLocal("coupon", { code, type, value });
//   };

//   const removeCoupon = () => {
//     setCoupon(null);
//     saveToLocal("coupon", null);
//   };

//   // ---------- Address Management ----------
//   const addAddress = (address) => {
//     const newAddress = { ...address, id: Date.now() };
//     const updated = [...addresses, newAddress];
//     setAddresses(updated);
//     saveToLocal("addresses", updated);
//     if (!selectedAddressId) {
//       setSelectedAddressId(newAddress.id);
//       saveToLocal("selectedAddressId", newAddress.id);
//     }
//   };

//   const removeAddress = (addressId) => {
//     const updated = addresses.filter((a) => a.id !== addressId);
//     setAddresses(updated);
//     saveToLocal("addresses", updated);
//     if (selectedAddressId === addressId) {
//       setSelectedAddressId(updated.length > 0 ? updated[0].id : null);
//       saveToLocal(
//         "selectedAddressId",
//         updated.length > 0 ? updated[0].id : null,
//       );
//     }
//   };

//   const selectAddress = (addressId) => {
//     setSelectedAddressId(addressId);
//     saveToLocal("selectedAddressId", addressId);
//   };

//   // ---------- Delivery & Shipping ----------
//   const checkDeliveryAvailability = (pincode) => {
//     // Mock: you would call an API
//     const available = true; // assume available
//     const codAvailable = codAvailablePincodes.includes(pincode);
//     return { available, codAvailable, deliveryDays: 2 };
//   };

//   const calculateShipping = (subtotal) => {
//     if (subtotal >= freeShippingThreshold) {
//       setShippingCharge(0);
//       return 0;
//     } else {
//       setShippingCharge(100); // default ₹100
//       return 100;
//     }
//   };

//   // ---------- Computed Values ----------
//   const subtotal = useMemo(() => {
//     return cartItems.reduce((sum, item) => sum + getItemTotal(item), 0);
//   }, [cartItems]);

//   const discountAmount = useMemo(() => {
//     if (!coupon) return 0;
//     if (coupon.type === "percentage") {
//       return (subtotal * coupon.value) / 100;
//     } else if (coupon.type === "fixed") {
//       return Math.min(coupon.value, subtotal);
//     }
//     return 0;
//   }, [coupon, subtotal]);

//   const gstAmount = useMemo(() => {
//     const taxable = subtotal - discountAmount;
//     return taxable * gstRate;
//   }, [subtotal, discountAmount, gstRate]);

//   const grandTotal = useMemo(() => {
//     return subtotal - discountAmount + gstAmount + shippingCharge;
//   }, [subtotal, discountAmount, gstAmount, shippingCharge]);

//   // Recalculate shipping when subtotal changes
//   useEffect(() => {
//     calculateShipping(subtotal);
//   }, [subtotal]);

//   // ---------- Order Review (for checkout) ----------
//   const getOrderReview = () => {
//     const selectedAddress = addresses.find((a) => a.id === selectedAddressId);
//     return {
//       items: cartItems.map((item) => ({
//         ...item,
//         unitPrice: getProductPrice(item),
//         total: getItemTotal(item),
//       })),
//       subtotal,
//       discount: discountAmount,
//       coupon: coupon,
//       gst: gstAmount,
//       shipping: shippingCharge,
//       grandTotal,
//       address: selectedAddress,
//       paymentMethod: null, // set later
//     };
//   };

//   // ---------- Request a Quote (B2B) ----------
//   const requestQuote = (product, message = "") => {
//     // In real app, send to backend lead manager
//     console.log("Quote requested for:", product, "Message:", message);
//     // Optionally add to a quote list
//     // Could also clear cart or leave as is
//     return true;
//   };

//   // ---------- Context Value ----------
//   const value = {
//     // State
//     cartItems,
//     savedForLater,
//     addresses,
//     selectedAddressId,
//     coupon,
//     gstRate,
//     shippingCharge,
//     freeShippingThreshold,
//     // Computed totals
//     subtotal,
//     discountAmount,
//     gstAmount,
//     grandTotal,
//     // Actions
//     addToCart,
//     removeFromCart,
//     updateQuantity,
//     clearCart,
//     moveToSavedForLater,
//     moveToCartFromSaved,
//     removeSavedItem,
//     buyNow,
//     applyCoupon,
//     removeCoupon,
//     addAddress,
//     removeAddress,
//     selectAddress,
//     checkDeliveryAvailability,
//     calculateShipping,
//     getOrderReview,
//     requestQuote,
//   };

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };

// export const useCart = () => useContext(CartContext);

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const CART_API = "/cart";

const getCartSessionId = () => {
  const existing = localStorage.getItem("cartSessionId");
  if (existing) return existing;
  const next = `dpt-cart-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  localStorage.setItem("cartSessionId", next);
  return next;
};

// ---------- Cart Context ----------
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Core State
  const [cartItems, setCartItems] = useState([]);
  const [savedForLater, setSavedForLater] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [coupon, setCoupon] = useState(null);
  const [gstRate] = useState(0.18);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [freeShippingThreshold] = useState(5000);
  const [codAvailablePincodes] = useState(["486661"]);

  // Persistence
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCartItems(JSON.parse(savedCart));
    const savedLater = localStorage.getItem("savedForLater");
    if (savedLater) setSavedForLater(JSON.parse(savedLater));
    const savedAddresses = localStorage.getItem("addresses");
    if (savedAddresses) setAddresses(JSON.parse(savedAddresses));
    const savedSelected = localStorage.getItem("selectedAddressId");
    if (savedSelected) setSelectedAddressId(JSON.parse(savedSelected));
    const savedCoupon = localStorage.getItem("coupon");
    if (savedCoupon) setCoupon(JSON.parse(savedCoupon));
  }, []);

  const saveToLocal = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Helpers
  const getCleanPrice = (rawPrice) => {
    if (typeof rawPrice === "string") {
      return parseFloat(rawPrice.replace(/[^\d.]/g, "")) || 0;
    }
    return rawPrice || 0;
  };

  const getProductPrice = (item) => {
    return getCleanPrice(
      item.sale_price || item.regular_price || item.price_inr || 0,
    );
  };

  const getItemTotal = (item) => {
    return getProductPrice(item) * item.quantity;
  };

  // Cart actions
  const saveCart = (items) => {
    setCartItems(items);
    saveToLocal("cart", items);
  };

  const addToCart = (product, quantity = 1) => {
    const stockQuantity = Number(product?.stock_quantity ?? product?.stock ?? 1);
    const outOfStock =
      !product ||
      product.stockStatus === "Out of Stock" ||
      product.stockStatus === "OUT OF STOCK" ||
      stockQuantity <= 0;
    if (outOfStock) return false;
    const existingItem = cartItems.find((item) => item.id === product.id);
    const newQuantity = existingItem
      ? existingItem.quantity + quantity
      : quantity;
    if (newQuantity > stockQuantity) return false;

    if (existingItem) {
      const updated = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      );
      saveCart(updated);
    } else {
      saveCart([...cartItems, { ...product, quantity }]);
    }

    fetch(`${CART_API}/add-to-cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: product._id || product.id || product.productId,
        quantity,
        sessionId: getCartSessionId(),
      }),
    }).catch(() => {});

    return true;
  };

  const removeFromCart = (productId) => {
    saveCart(cartItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    const updated = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity } : item,
    );
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  // Saved for later
  const moveToSavedForLater = (productId) => {
    const item = cartItems.find((i) => i.id === productId);
    if (!item) return;
    removeFromCart(productId);
    const updatedLater = [...savedForLater, { ...item, quantity: 1 }];
    setSavedForLater(updatedLater);
    saveToLocal("savedForLater", updatedLater);
  };

  const moveToCartFromSaved = (productId) => {
    const item = savedForLater.find((i) => i.id === productId);
    if (!item) return;
    setSavedForLater(savedForLater.filter((i) => i.id !== productId));
    saveToLocal(
      "savedForLater",
      savedForLater.filter((i) => i.id !== productId),
    );
    addToCart(item, 1);
  };

  const removeSavedItem = (productId) => {
    const updated = savedForLater.filter((i) => i.id !== productId);
    setSavedForLater(updated);
    saveToLocal("savedForLater", updated);
  };

  // Buy Now
  const buyNow = (product, quantity = 1) => {
    saveCart([]);
    return addToCart(product, quantity);
  };

  // Coupon
  const applyCoupon = (code, type, value) => {
    setCoupon({ code, type, value });
    saveToLocal("coupon", { code, type, value });
  };

  const removeCoupon = () => {
    setCoupon(null);
    saveToLocal("coupon", null);
  };

  // Address
  const addAddress = (address) => {
    const newAddress = { ...address, id: Date.now() };
    const updated = [...addresses, newAddress];
    setAddresses(updated);
    saveToLocal("addresses", updated);
    if (!selectedAddressId) {
      setSelectedAddressId(newAddress.id);
      saveToLocal("selectedAddressId", newAddress.id);
    }
  };

  const removeAddress = (addressId) => {
    const updated = addresses.filter((a) => a.id !== addressId);
    setAddresses(updated);
    saveToLocal("addresses", updated);
    if (selectedAddressId === addressId) {
      setSelectedAddressId(updated.length > 0 ? updated[0].id : null);
      saveToLocal(
        "selectedAddressId",
        updated.length > 0 ? updated[0].id : null,
      );
    }
  };

  const selectAddress = (addressId) => {
    setSelectedAddressId(addressId);
    saveToLocal("selectedAddressId", addressId);
  };

  // Delivery
  const checkDeliveryAvailability = (pincode) => {
    const available = true;
    const codAvailable = codAvailablePincodes.includes(pincode);
    return { available, codAvailable, deliveryDays: 2 };
  };

  const calculateShipping = (subtotal) => {
    if (subtotal >= freeShippingThreshold) {
      setShippingCharge(0);
      return 0;
    } else {
      setShippingCharge(100);
      return 100;
    }
  };

  // Computed
  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + getItemTotal(item), 0);
  }, [cartItems]);

  const discountAmount = useMemo(() => {
    if (!coupon) return 0;
    if (coupon.type === "percentage") {
      return (subtotal * coupon.value) / 100;
    } else if (coupon.type === "fixed") {
      return Math.min(coupon.value, subtotal);
    }
    return 0;
  }, [coupon, subtotal]);

  const gstAmount = useMemo(() => {
    const taxable = subtotal - discountAmount;
    return taxable * gstRate;
  }, [subtotal, discountAmount, gstRate]);

  const grandTotal = useMemo(() => {
    return subtotal - discountAmount + gstAmount + shippingCharge;
  }, [subtotal, discountAmount, gstAmount, shippingCharge]);

  useEffect(() => {
    calculateShipping(subtotal);
  }, [subtotal]);

  const getOrderReview = () => {
    const selectedAddress = addresses.find((a) => a.id === selectedAddressId);
    return {
      items: cartItems.map((item) => ({
        ...item,
        unitPrice: getProductPrice(item),
        total: getItemTotal(item),
      })),
      subtotal,
      discount: discountAmount,
      coupon,
      gst: gstAmount,
      shipping: shippingCharge,
      grandTotal,
      address: selectedAddress,
      paymentMethod: null,
    };
  };

  const requestQuote = (product, message = "") => {
    console.log("Quote requested for:", product, "Message:", message);
    return true;
  };

  const value = {
    cartItems,
    savedForLater,
    addresses,
    selectedAddressId,
    coupon,
    gstRate,
    shippingCharge,
    freeShippingThreshold,
    subtotal,
    discountAmount,
    gstAmount,
    grandTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    moveToSavedForLater,
    moveToCartFromSaved,
    removeSavedItem,
    buyNow,
    applyCoupon,
    removeCoupon,
    addAddress,
    removeAddress,
    selectAddress,
    checkDeliveryAvailability,
    calculateShipping,
    getOrderReview,
    requestQuote,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// const useCart = () => useContext(CartContext);
export const useCart = () => useContext(CartContext);
// ---------- Helper: Format Price ----------
const formatPrice = (value) => {
  const num = Number(value);
  if (isNaN(num)) return "₹0.00";
  return num.toLocaleString("en-IN", { style: "currency", currency: "INR" });
};

// ---------- Components ----------

// Product List
const ProductList = () => {
  const { addToCart, buyNow, requestQuote } = useCart();
  const products = [
    {
      id: 1,
      name: "Bosch GSB 450",
      regular_price: "₹3,999",
      sale_price: "₹3,499",
      stock_quantity: 10,
      stockStatus: "In Stock",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Drill Bit Set",
      regular_price: "₹899",
      stock_quantity: 5,
      stockStatus: "In Stock",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Safety Gloves",
      regular_price: "₹299",
      stock_quantity: 0,
      stockStatus: "Out of Stock",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        padding: "20px",
      }}
    >
      {products.map((product) => (
        <div
          key={product.id}
          style={{ border: "1px solid #ddd", padding: "15px", width: "200px" }}
        >
          <img src={product.image} alt={product.name} width="100%" />
          <h3>{product.name}</h3>
          <p>{product.sale_price || product.regular_price}</p>
          <p>{product.stockStatus}</p>
          {product.stockStatus !== "Out of Stock" && (
            <>
              <button onClick={() => addToCart(product, 1)}>Add to Cart</button>
              <button onClick={() => buyNow(product, 1)}>Buy Now</button>
            </>
          )}
          <button onClick={() => requestQuote(product, "Need bulk pricing")}>
            Request Quote
          </button>
        </div>
      ))}
    </div>
  );
};

// Cart Page
const CartPage = () => {
  const {
    cartItems,
    savedForLater,
    removeFromCart,
    updateQuantity,
    moveToSavedForLater,
    moveToCartFromSaved,
    removeSavedItem,
    subtotal,
    discountAmount,
    gstAmount,
    shippingCharge,
    grandTotal,
    coupon,
    applyCoupon,
    removeCoupon,
    clearCart,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");

  const handleApplyCoupon = () => {
    if (couponCode === "SAVE10") {
      applyCoupon("SAVE10", "percentage", 10);
    } else if (couponCode === "DISCOUNT100") {
      applyCoupon("DISCOUNT100", "fixed", 100);
    } else {
      alert("Invalid coupon");
    }
  };

  const getUnitPrice = (item) => {
    const raw = item.sale_price || item.regular_price || item.price_inr || 0;
    if (typeof raw === "string") {
      return parseFloat(raw.replace(/[^\d.]/g, "")) || 0;
    }
    return raw || 0;
  };

  if (cartItems.length === 0 && savedForLater.length === 0) {
    return <h2 style={{ padding: "20px" }}>Your cart is empty.</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>
      {cartItems.map((item) => (
        <div
          key={item.id}
          style={{
            borderBottom: "1px solid #ccc",
            padding: "10px 0",
            display: "flex",
            gap: "20px",
          }}
        >
          <img
            src={item.image || "https://via.placeholder.com/80"}
            alt={item.name}
            width="80"
          />
          <div>
            <h4>{item.name}</h4>
            <p>{formatPrice(getUnitPrice(item))}</p>
            <div>
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>
              <span style={{ margin: "0 10px" }}>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
            <p>Total: {formatPrice(getUnitPrice(item) * item.quantity)}</p>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
            <button onClick={() => moveToSavedForLater(item.id)}>
              Save for Later
            </button>
          </div>
        </div>
      ))}

      {savedForLater.length > 0 && (
        <div>
          <h3>Saved for Later</h3>
          {savedForLater.map((item) => (
            <div
              key={item.id}
              style={{ borderBottom: "1px solid #eee", padding: "5px 0" }}
            >
              <span>{item.name}</span>
              <button onClick={() => moveToCartFromSaved(item.id)}>
                Move to Cart
              </button>
              <button onClick={() => removeSavedItem(item.id)}>Remove</button>
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          marginTop: "20px",
          border: "1px solid #ddd",
          padding: "15px",
          maxWidth: "400px",
        }}
      >
        <h3>Order Summary</h3>
        <p>Subtotal: {formatPrice(subtotal)}</p>
        {coupon && (
          <p>
            Discount: -{formatPrice(discountAmount)}{" "}
            <button onClick={removeCoupon}>Remove</button>
          </p>
        )}
        <p>GST: {formatPrice(gstAmount)}</p>
        <p>Shipping: {formatPrice(shippingCharge)}</p>
        <h4>Grand Total: {formatPrice(grandTotal)}</h4>

        <div>
          <input
            type="text"
            placeholder="Coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <button onClick={handleApplyCoupon}>Apply</button>
        </div>
        <button onClick={clearCart}>Clear Cart</button>
        <Link to="/checkout">
          <button>Proceed to Checkout</button>
        </Link>
      </div>
    </div>
  );
};

// Checkout Page
const Checkout = () => {
  const {
    cartItems,
    grandTotal,
    subtotal,
    discountAmount,
    gstAmount,
    shippingCharge,
    coupon,
    selectedAddressId,
    addresses,
    clearCart,
    getOrderReview,
  } = useCart();

  if (cartItems.length === 0) {
    return <h2 style={{ padding: "20px" }}>Your cart is empty.</h2>;
  }

  const review = getOrderReview();
  const selectedAddress = addresses.find((a) => a.id === selectedAddressId);

  const handlePlaceOrder = () => {
    alert("Order placed! (mock)");
    clearCart();
    // navigate to success
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Order Review</h2>
      <div>
        <h3>Shipping Address</h3>
        {selectedAddress ? (
          <p>
            {selectedAddress.name}, {selectedAddress.phone}
            <br />
            {selectedAddress.address}, {selectedAddress.city},{" "}
            {selectedAddress.state} - {selectedAddress.pincode}
          </p>
        ) : (
          <p>No address selected.</p>
        )}
      </div>
      <div>
        <h3>Items</h3>
        {cartItems.map((item) => {
          const unitPrice = (() => {
            const raw =
              item.sale_price || item.regular_price || item.price_inr || 0;
            if (typeof raw === "string")
              return parseFloat(raw.replace(/[^\d.]/g, "")) || 0;
            return raw || 0;
          })();
          return (
            <div key={item.id} style={{ display: "flex", gap: "20px" }}>
              <span>{item.name}</span>
              <span>
                {item.quantity} × {formatPrice(unitPrice)}
              </span>
              <span>{formatPrice(unitPrice * item.quantity)}</span>
            </div>
          );
        })}
      </div>
      <div>
        <h3>Summary</h3>
        <p>Subtotal: {formatPrice(subtotal)}</p>
        {coupon && <p>Discount: -{formatPrice(discountAmount)}</p>}
        <p>GST: {formatPrice(gstAmount)}</p>
        <p>Shipping: {formatPrice(shippingCharge)}</p>
        <h4>Grand Total: {formatPrice(grandTotal)}</h4>
      </div>
      <div>
        <h3>Payment Method</h3>
        <select defaultValue="">
          <option value="">Select</option>
          <option value="razorpay">Razorpay (UPI/Card/NetBanking)</option>
          <option value="cod">Cash on Delivery</option>
        </select>
      </div>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

// Address Form
const AddressForm = () => {
  const {
    addresses,
    selectedAddressId,
    addAddress,
    removeAddress,
    selectAddress,
  } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    instructions: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    addAddress(formData);
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      instructions: "",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Manage Addresses</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="instructions"
          placeholder="Instructions"
          value={formData.instructions}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Add Address</button>
      </form>
      <div>
        <h4>Saved Addresses</h4>
        {addresses.map((addr) => (
          <div
            key={addr.id}
            style={{ border: "1px solid #ccc", margin: "5px", padding: "10px" }}
          >
            <p>
              {addr.name}, {addr.phone}
            </p>
            <p>
              {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
            </p>
            {addr.instructions && <p>Instructions: {addr.instructions}</p>}
            <button onClick={() => selectAddress(addr.id)}>
              {selectedAddressId === addr.id ? "Selected" : "Select"}
            </button>
            <button onClick={() => removeAddress(addr.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ---------- App with Routing ----------
function App() {
  return (
    <CartProvider>
      <Router>
        <nav
          style={{
            padding: "10px",
            background: "#f0f0f0",
            display: "flex",
            gap: "10px",
          }}
        >
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/checkout">Checkout</Link>
          <Link to="/address">Addresses</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/address" element={<AddressForm />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

// export const useCart = () => useContext(CartContext);
export default Checkout;
