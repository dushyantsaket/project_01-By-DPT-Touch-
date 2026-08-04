// // // import React, { useState } from "react";
// // // import {
// // //   CreditCard,
// // //   Truck,
// // //   ShieldCheck,
// // //   ChevronRight,
// // //   MapPin,
// // //   Phone,
// // //   Mail,
// // //   User,
// // //   CheckCircle2,
// // //   Package,
// // //   ArrowLeft,
// // //   Trash2,
// // //   Plus,
// // //   Minus,
// // //   ShoppingCart,
// // //   Send,
// // // } from "lucide-react";
// // // import { Link, useNavigate } from "react-router-dom";
// // // import { useCart } from "../context/CartContext";
// // // import { CardContent } from "@mui/material";

// // // const API = "/api";

// // // const Checkout = () => {
// // //   const [step, setStep] = useState(1);
// // //   const [isProcessing, setIsProcessing] = useState(false);
// // //   const [orderError, setOrderError] = useState("");
// // //   const [createdOrder, setCreatedOrder] = useState(null);
// // //   const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } =
// // //     useCart();
// // //   const [customerInfo, setCustomerInfo] = useState({
// // //     name: "",
// // //     email: "",
// // //     phone: "",
// // //     address: "",
// // //     city: "",
// // //     pincode: "",
// // //   });
// // //   const navigate = useNavigate();

// // //   const handleNext = () => setStep(step + 1);
// // //   const handleBack = () => setStep(step - 1);

// // //   const handleInputChange = (e) => {
// // //     setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
// // //   };

// // //   const handlePayment = async () => {
// // //     setIsProcessing(true);
// // //     setOrderError("");

// // //     try {
// // //       // 1. Prepare Lead/Order data
// // //       const leadData = {
// // //         customer: customerInfo.name,
// // //         email: customerInfo.email,
// // //         phone: customerInfo.phone,
// // //         address: `${customerInfo.address}, ${customerInfo.city} - ${customerInfo.pincode}`,
// // //         product: cartItems.map((i) => `${i.name} (x${i.quantity})`).join(", "),
// // //         type: "Order Request",
// // //         notes: `Total Amount: ₹${grandTotal.toLocaleString()}`,
// // //         status: "New",
// // //       };

// // //       const res = await fetch(`${API}/orders/request`, {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({
// // //           customerInfo,
// // //           items: cartItems,
// // //           paymentMethod: "COD",
// // //           pricing: {
// // //             subtotal: cartTotal,
// // //             taxAmount,
// // //             deliveryFee,
// // //             grandTotal,
// // //           },
// // //         }),
// // //       });
// // //       const data = await res.json();

// // //       if (!res.ok)
// // //         throw new Error(data.error || "Failed to register order on server");

// // //       setCreatedOrder(data.data);
// // //       setIsProcessing(false);
// // //       setStep(4);
// // //       clearCart();
// // //     } catch (err) {
// // //       console.error("Order error:", err);
// // //       setOrderError(
// // //         "Failed to send order request. Please try again or contact support.",
// // //       );
// // //       setIsProcessing(false);
// // //     }
// // //   };

// // //   const deliveryFee = cartTotal > 5000 ? 0 : 99;
// // //   const taxAmount = Math.round(cartTotal * 0.18);
// // //   const grandTotal = cartTotal + deliveryFee + taxAmount;

// // //   const cardStyle = {
// // //     background: "#fff",
// // //     borderRadius: "16px",
// // //     border: "1px solid #f0f0f0",
// // //     padding: "32px",
// // //     boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
// // //   };
// // //   const labelStyle = {
// // //     fontSize: "10px",
// // //     fontWeight: 900,
// // //     textTransform: "uppercase",
// // //     color: "#9ca3af",
// // //     marginBottom: "8px",
// // //     display: "flex",
// // //     alignItems: "center",
// // //     gap: "8px",
// // //   };
// // //   const inputStyle = {
// // //     width: "100%",
// // //     padding: "12px 16px",
// // //     borderRadius: "8px",
// // //     border: "1px solid #f0f0f0",
// // //     outline: "none",
// // //     fontSize: "14px",
// // //     fontWeight: 600,
// // //     background: "#f9fafb",
// // //   };

// // //   if (cartItems.length === 0 && step < 4) {
// // //     return (
// // //       <div
// // //         style={{
// // //           paddingTop: "120px",
// // //           paddingBottom: "80px",
// // //           textAlign: "center",
// // //           display: "flex",
// // //           flexDirection: "column",
// // //           alignItems: "center",
// // //           gap: "24px",
// // //         }}
// // //       >
// // //         <Package size={64} color="#d1d5db" />
// // //         <h2
// // //           style={{
// // //             fontSize: "24px",
// // //             fontWeight: 900,
// // //             textTransform: "uppercase",
// // //             color: "#111",
// // //           }}
// // //         >
// // //           Cart is Empty
// // //         </h2>
// // //         <p style={{ color: "#6b7280", fontWeight: 600 }}>
// // //           Your procurement list is currently empty.
// // //         </p>
// // //         <Link
// // //           to="/products"
// // //           style={{
// // //             background: "#dc2626",
// // //             color: "#fff",
// // //             padding: "12px 32px",
// // //             borderRadius: "8px",
// // //             textDecoration: "none",
// // //             fontSize: "11px",
// // //             fontWeight: 900,
// // //             textTransform: "uppercase",
// // //           }}
// // //         >
// // //           Browse Catalog
// // //         </Link>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div
// // //       style={{
// // //         paddingTop: "100px",
// // //         minHeight: "100vh",
// // //         background: "#f9fafb",
// // //         paddingBottom: "80px",
// // //       }}
// // //     >
// // //       <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
// // //         <div
// // //           style={{
// // //             display: "grid",
// // //             gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
// // //             gap: "32px",
// // //             alignItems: "start",
// // //           }}
// // //         >
// // //           {/* Left: Flow */}
// // //           <div
// // //             style={{ display: "flex", flexDirection: "column", gap: "24px" }}
// // //           >
// // //             {/* Steps Indicator */}
// // //             <div
// // //               style={{
// // //                 display: "flex",
// // //                 alignItems: "center",
// // //                 justifyContent: "center",
// // //                 gap: "16px",
// // //                 marginBottom: "20px",
// // //               }}
// // //             >
// // //               {[1, 2, 3].map((i) => (
// // //                 <div
// // //                   key={i}
// // //                   style={{ display: "flex", alignItems: "center", gap: "8px" }}
// // //                 >
// // //                   <div
// // //                     style={{
// // //                       width: "28px",
// // //                       height: "28px",
// // //                       borderRadius: "50%",
// // //                       background:
// // //                         step === i ? "#dc2626" : step > i ? "#111" : "#e5e7eb",
// // //                       color: "#fff",
// // //                       display: "flex",
// // //                       alignItems: "center",
// // //                       justifyContent: "center",
// // //                       fontSize: "12px",
// // //                       fontWeight: 900,
// // //                     }}
// // //                   >
// // //                     {step > i ? "✓" : i}
// // //                   </div>
// // //                   <span
// // //                     style={{
// // //                       fontSize: "10px",
// // //                       fontWeight: 800,
// // //                       textTransform: "uppercase",
// // //                       color: step >= i ? "#111" : "#9ca3af",
// // //                     }}
// // //                   >
// // //                     {i === 1 ? "Info" : i === 2 ? "Shipping" : "Payment"}
// // //                   </span>
// // //                   {i < 3 && (
// // //                     <div
// // //                       style={{
// // //                         width: "40px",
// // //                         height: "1px",
// // //                         background: "#e5e7eb",
// // //                       }}
// // //                     ></div>
// // //                   )}
// // //                 </div>
// // //               ))}
// // //             </div>

// // //             {step === 4 ? (
// // //               <div
// // //                 style={{
// // //                   ...cardStyle,
// // //                   textAlign: "center",
// // //                   padding: "64px 32px",
// // //                 }}
// // //               >
// // //                 <div
// // //                   style={{
// // //                     width: "64px",
// // //                     height: "64px",
// // //                     background: "#ecfdf5",
// // //                     color: "#059669",
// // //                     borderRadius: "50%",
// // //                     display: "flex",
// // //                     alignItems: "center",
// // //                     justifyContent: "center",
// // //                     margin: "0 auto 24px",
// // //                   }}
// // //                 >
// // //                   <CheckCircle2 size={32} />
// // //                 </div>
// // //                 <h2
// // //                   style={{
// // //                     fontSize: "24px",
// // //                     fontWeight: 900,
// // //                     color: "#111",
// // //                     textTransform: "uppercase",
// // //                     marginBottom: "12px",
// // //                   }}
// // //                 >
// // //                   Order Sent to Admin
// // //                 </h2>
// // //                 <p
// // //                   style={{
// // //                     color: "#6b7280",
// // //                     fontSize: "14px",
// // //                     fontWeight: 600,
// // //                     marginBottom: "14px",
// // //                   }}
// // //                 >
// // //                   Your procurement request has been successfully registered.
// // //                   Dushyant Power Tools team will contact you shortly.
// // //                 </p>
// // //                 {createdOrder && (
// // //                   <div
// // //                     style={{
// // //                       background: "#f9fafb",
// // //                       border: "1px solid #e5e7eb",
// // //                       borderRadius: "8px",
// // //                       padding: "14px",
// // //                       marginBottom: "24px",
// // //                       fontSize: "12px",
// // //                       fontWeight: 800,
// // //                       color: "#111",
// // //                     }}
// // //                   >
// // //                     <div>Order ID: {createdOrder.orderId}</div>
// // //                     <div>Tracking: {createdOrder.trackingNumber}</div>
// // //                     <div>Invoice: {createdOrder.invoice?.invoiceNo}</div>
// // //                   </div>
// // //                 )}
// // //                 <Link
// // //                   to="/"
// // //                   style={{
// // //                     display: "inline-block",
// // //                     background: "#111",
// // //                     color: "#fff",
// // //                     padding: "14px 40px",
// // //                     borderRadius: "8px",
// // //                     textDecoration: "none",
// // //                     fontSize: "11px",
// // //                     fontWeight: 900,
// // //                     textTransform: "uppercase",
// // //                   }}
// // //                 >
// // //                   Return to Home
// // //                 </Link>
// // //               </div>
// // //             ) : (
// // //               <div style={cardStyle}>
// // //                 {orderError && (
// // //                   <div
// // //                     style={{
// // //                       background: "#fef2f2",
// // //                       color: "#dc2626",
// // //                       padding: "12px",
// // //                       borderRadius: "8px",
// // //                       fontSize: "12px",
// // //                       fontWeight: 700,
// // //                       marginBottom: "20px",
// // //                     }}
// // //                   >
// // //                     ⚠️ {orderError}
// // //                   </div>
// // //                 )}

// // //                 {step === 1 && (
// // //                   <div
// // //                     style={{
// // //                       display: "flex",
// // //                       flexDirection: "column",
// // //                       gap: "24px",
// // //                     }}
// // //                   >
// // //                     <h3
// // //                       style={{
// // //                         fontSize: "18px",
// // //                         fontWeight: 900,
// // //                         color: "#111",
// // //                         textTransform: "uppercase",
// // //                       }}
// // //                     >
// // //                       Contact Details
// // //                     </h3>
// // //                     <div
// // //                       style={{
// // //                         display: "flex",
// // //                         flexDirection: "column",
// // //                         gap: "16px",
// // //                       }}
// // //                     >
// // //                       <div>
// // //                         <label style={labelStyle}>
// // //                           <User size={14} /> Full Name
// // //                         </label>
// // //                         <input
// // //                           name="name"
// // //                           style={inputStyle}
// // //                           value={customerInfo.name}
// // //                           onChange={handleInputChange}
// // //                           placeholder="Your Name"
// // //                         />
// // //                       </div>
// // //                       <div>
// // //                         <label style={labelStyle}>
// // //                           <Mail size={14} /> Email Address
// // //                         </label>
// // //                         <input
// // //                           name="email"
// // //                           type="email"
// // //                           style={inputStyle}
// // //                           value={customerInfo.email}
// // //                           onChange={handleInputChange}
// // //                           placeholder="your@email.com"
// // //                         />
// // //                       </div>
// // //                       <div>
// // //                         <label style={labelStyle}>
// // //                           <Phone size={14} /> Phone Number
// // //                         </label>
// // //                         <input
// // //                           name="phone"
// // //                           type="tel"
// // //                           style={inputStyle}
// // //                           value={customerInfo.phone}
// // //                           onChange={handleInputChange}
// // //                           placeholder="+91 XXXXX XXXXX"
// // //                         />
// // //                       </div>
// // //                     </div>
// // //                     <button
// // //                       onClick={handleNext}
// // //                       disabled={!customerInfo.name || !customerInfo.phone}
// // //                       style={{
// // //                         padding: "16px",
// // //                         background: "#dc2626",
// // //                         color: "#fff",
// // //                         border: "none",
// // //                         borderRadius: "8px",
// // //                         fontSize: "11px",
// // //                         fontWeight: 900,
// // //                         textTransform: "uppercase",
// // //                         cursor: "pointer",
// // //                         display: "flex",
// // //                         alignItems: "center",
// // //                         justifyContent: "center",
// // //                         gap: "10px",
// // //                       }}
// // //                     >
// // //                       Shipping Logistics <ChevronRight size={16} />
// // //                     </button>
// // //                   </div>
// // //                 )}

// // //                 {step === 2 && (
// // //                   <div
// // //                     style={{
// // //                       display: "flex",
// // //                       flexDirection: "column",
// // //                       gap: "24px",
// // //                     }}
// // //                   >
// // //                     <h3
// // //                       style={{
// // //                         fontSize: "18px",
// // //                         fontWeight: 900,
// // //                         color: "#111",
// // //                         textTransform: "uppercase",
// // //                       }}
// // //                     >
// // //                       Shipping Address
// // //                     </h3>
// // //                     <div
// // //                       style={{
// // //                         display: "flex",
// // //                         flexDirection: "column",
// // //                         gap: "16px",
// // //                       }}
// // //                     >
// // //                       <div>
// // //                         <label style={labelStyle}>
// // //                           <MapPin size={14} /> Street Address
// // //                         </label>
// // //                         <input
// // //                           name="address"
// // //                           style={inputStyle}
// // //                           value={customerInfo.address}
// // //                           onChange={handleInputChange}
// // //                           placeholder="Area, Landmark, Street"
// // //                         />
// // //                       </div>
// // //                       <div
// // //                         style={{
// // //                           display: "grid",
// // //                           gridTemplateColumns: "1fr 1fr",
// // //                           gap: "12px",
// // //                         }}
// // //                       >
// // //                         <div>
// // //                           <label style={labelStyle}>City</label>
// // //                           <input
// // //                             name="city"
// // //                             style={inputStyle}
// // //                             value={customerInfo.city}
// // //                             onChange={handleInputChange}
// // //                             placeholder="City"
// // //                           />
// // //                         </div>
// // //                         <div>
// // //                           <label style={labelStyle}>Pincode</label>
// // //                           <input
// // //                             name="pincode"
// // //                             style={inputStyle}
// // //                             value={customerInfo.pincode}
// // //                             onChange={handleInputChange}
// // //                             placeholder="486XXX"
// // //                           />
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                     <div
// // //                       style={{
// // //                         display: "grid",
// // //                         gridTemplateColumns: "120px 1fr",
// // //                         gap: "12px",
// // //                       }}
// // //                     >
// // //                       <button
// // //                         onClick={handleBack}
// // //                         style={{
// // //                           padding: "16px",
// // //                           background: "#f9fafb",
// // //                           border: "1px solid #f0f0f0",
// // //                           borderRadius: "8px",
// // //                           fontSize: "11px",
// // //                           fontWeight: 900,
// // //                           textTransform: "uppercase",
// // //                           cursor: "pointer",
// // //                         }}
// // //                       >
// // //                         Back
// // //                       </button>
// // //                       <button
// // //                         onClick={handleNext}
// // //                         disabled={!customerInfo.address || !customerInfo.city}
// // //                         style={{
// // //                           padding: "16px",
// // //                           background: "#dc2626",
// // //                           color: "#fff",
// // //                           border: "none",
// // //                           borderRadius: "8px",
// // //                           fontSize: "11px",
// // //                           fontWeight: 900,
// // //                           textTransform: "uppercase",
// // //                           cursor: "pointer",
// // //                         }}
// // //                       >
// // //                         Final Review
// // //                       </button>
// // //                     </div>
// // //                   </div>
// // //                 )}

// // //                 {step === 3 && (
// // //                   <div
// // //                     style={{
// // //                       display: "flex",
// // //                       flexDirection: "column",
// // //                       gap: "24px",
// // //                       textAlign: "center",
// // //                     }}
// // //                   >
// // //                     <h3
// // //                       style={{
// // //                         fontSize: "18px",
// // //                         fontWeight: 900,
// // //                         color: "#111",
// // //                         textTransform: "uppercase",
// // //                       }}
// // //                     >
// // //                       Order Authorization
// // //                     </h3>
// // //                     <div
// // //                       style={{
// // //                         padding: "32px",
// // //                         background: "#f9fafb",
// // //                         borderRadius: "12px",
// // //                         border: "1px solid #f0f0f0",
// // //                       }}
// // //                     >
// // //                       <Package
// // //                         size={48}
// // //                         color="#dc2626"
// // //                         style={{ margin: "0 auto 16px" }}
// // //                       />
// // //                       <p
// // //                         style={{
// // //                           fontSize: "10px",
// // //                           fontWeight: 800,
// // //                           textTransform: "uppercase",
// // //                           color: "#9ca3af",
// // //                           letterSpacing: "0.1em",
// // //                         }}
// // //                       >
// // //                         Procurement Total
// // //                       </p>
// // //                       <p
// // //                         style={{
// // //                           fontSize: "32px",
// // //                           fontWeight: 900,
// // //                           color: "#111",
// // //                         }}
// // //                       >
// // //                         ₹{grandTotal.toLocaleString()}
// // //                       </p>
// // //                     </div>
// // //                     <div
// // //                       style={{
// // //                         display: "grid",
// // //                         gridTemplateColumns: "120px 1fr",
// // //                         gap: "12px",
// // //                       }}
// // //                     >
// // //                       <button
// // //                         onClick={handleBack}
// // //                         style={{
// // //                           padding: "16px",
// // //                           background: "#f9fafb",
// // //                           border: "1px solid #f0f0f0",
// // //                           borderRadius: "8px",
// // //                           fontSize: "11px",
// // //                           fontWeight: 900,
// // //                           textTransform: "uppercase",
// // //                           cursor: "pointer",
// // //                         }}
// // //                       >
// // //                         Back
// // //                       </button>
// // //                       <button
// // //                         onClick={handlePayment}
// // //                         disabled={isProcessing}
// // //                         style={{
// // //                           padding: "16px",
// // //                           background: "#111",
// // //                           color: "#fff",
// // //                           border: "none",
// // //                           borderRadius: "8px",
// // //                           fontSize: "11px",
// // //                           fontWeight: 900,
// // //                           textTransform: "uppercase",
// // //                           cursor: "pointer",
// // //                           display: "flex",
// // //                           alignItems: "center",
// // //                           justifyContent: "center",
// // //                           gap: "10px",
// // //                         }}
// // //                       >
// // //                         {isProcessing
// // //                           ? "SENDING REQUEST..."
// // //                           : `SEND ORDER TO ADMIN`}
// // //                         {!isProcessing && <Send size={16} />}
// // //                       </button>
// // //                     </div>
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             )}
// // //           </div>

// // //           {/* Right: Summary */}
// // //           {step < 4 && (
// // //             <div style={{ position: "sticky", top: "120px" }}>
// // //               <div style={cardStyle}>
// // //                 <h3
// // //                   style={{
// // //                     fontSize: "14px",
// // //                     fontWeight: 900,
// // //                     textTransform: "uppercase",
// // //                     color: "#111",
// // //                     marginBottom: "24px",
// // //                     borderBottom: "1px solid #f0f0f0",
// // //                     paddingBottom: "16px",
// // //                   }}
// // //                 >
// // //                   Items to Order ({cartItems.length})
// // //                 </h3>

// // //                 <div
// // //                   style={{
// // //                     display: "flex",
// // //                     flexDirection: "column",
// // //                     gap: "16px",
// // //                     marginBottom: "24px",
// // //                   }}
// // //                 >
// // //                   {cartItems.map((item, idx) => (
// // //                     <div key={idx} style={{ display: "flex", gap: "12px" }}>
// // //                       <div
// // //                         style={{
// // //                           width: "48px",
// // //                           height: "48px",
// // //                           background: "#f9fafb",
// // //                           borderRadius: "8px",
// // //                           border: "1px solid #f0f0f0",
// // //                           display: "flex",
// // //                           alignItems: "center",
// // //                           justifyContent: "center",
// // //                           overflow: "hidden",
// // //                           flexShrink: 0,
// // //                         }}
// // //                       >
// // //                         <img
// // //                           src={item.image}
// // //                           alt=""
// // //                           style={{
// // //                             maxWidth: "80%",
// // //                             maxHeight: "80%",
// // //                             objectFit: "contain",
// // //                           }}
// // //                         />
// // //                       </div>
// // //                       <div style={{ flex: 1 }}>
// // //                         <p
// // //                           style={{
// // //                             fontSize: "12px",
// // //                             fontWeight: 800,
// // //                             color: "#111",
// // //                             lineHeight: 1.4,
// // //                           }}
// // //                         >
// // //                           {item.name}
// // //                         </p>
// // //                         <div
// // //                           style={{
// // //                             display: "flex",
// // //                             alignItems: "center",
// // //                             gap: "12px",
// // //                             marginTop: "6px",
// // //                           }}
// // //                         >
// // //                           <div
// // //                             style={{
// // //                               display: "flex",
// // //                               alignItems: "center",
// // //                               gap: "8px",
// // //                               background: "#f3f4f6",
// // //                               padding: "2px 8px",
// // //                               borderRadius: "4px",
// // //                             }}
// // //                           >
// // //                             <button
// // //                               onClick={() =>
// // //                                 updateQuantity(
// // //                                   item.id,
// // //                                   Math.max(1, item.quantity - 1),
// // //                                 )
// // //                               }
// // //                               style={{
// // //                                 background: "none",
// // //                                 border: "none",
// // //                                 padding: 0,
// // //                                 cursor: "pointer",
// // //                               }}
// // //                             >
// // //                               <Minus size={10} />
// // //                             </button>
// // //                             <span style={{ fontSize: "11px", fontWeight: 900 }}>
// // //                               {item.quantity}
// // //                             </span>
// // //                             <button
// // //                               onClick={() =>
// // //                                 updateQuantity(item.id, item.quantity + 1)
// // //                               }
// // //                               style={{
// // //                                 background: "none",
// // //                                 border: "none",
// // //                                 padding: 0,
// // //                                 cursor: "pointer",
// // //                               }}
// // //                             >
// // //                               <Plus size={10} />
// // //                             </button>
// // //                           </div>
// // //                           <button
// // //                             onClick={() => removeFromCart(item.id)}
// // //                             style={{
// // //                               background: "none",
// // //                               border: "none",
// // //                               color: "#dc2626",
// // //                               fontSize: "10px",
// // //                               fontWeight: 800,
// // //                               cursor: "pointer",
// // //                             }}
// // //                           >
// // //                             REMOVE
// // //                           </button>
// // //                         </div>
// // //                       </div>
// // //                       <p
// // //                         style={{
// // //                           fontSize: "12px",
// // //                           fontWeight: 900,
// // //                           color: "#111",
// // //                         }}
// // //                       >
// // //                         ₹
// // //                         {(
// // //                           (item.price_inr || 0) * item.quantity
// // //                         ).toLocaleString()}
// // //                       </p>
// // //                     </div>
// // //                   ))}
// // //                 </div>

// // //                 <div
// // //                   style={{
// // //                     borderTop: "1px solid #f0f0f0",
// // //                     paddingTop: "20px",
// // //                     display: "flex",
// // //                     flexDirection: "column",
// // //                     gap: "10px",
// // //                   }}
// // //                 >
// // //                   <div
// // //                     style={{
// // //                       display: "flex",
// // //                       justifyContent: "space-between",
// // //                       fontSize: "12px",
// // //                       fontWeight: 700,
// // //                       color: "#6b7280",
// // //                     }}
// // //                   >
// // //                     <span>Subtotal</span>
// // //                     <span>₹{cartTotal.toLocaleString()}</span>
// // //                   </div>
// // //                   <div
// // //                     style={{
// // //                       display: "flex",
// // //                       justifyContent: "space-between",
// // //                       fontSize: "12px",
// // //                       fontWeight: 700,
// // //                       color: "#6b7280",
// // //                     }}
// // //                   >
// // //                     <span>Tax (GST 18%)</span>
// // //                     <span>₹{taxAmount.toLocaleString()}</span>
// // //                   </div>
// // //                   <div
// // //                     style={{
// // //                       display: "flex",
// // //                       justifyContent: "space-between",
// // //                       fontSize: "12px",
// // //                       fontWeight: 700,
// // //                       color: "#6b7280",
// // //                     }}
// // //                   >
// // //                     <span>Delivery</span>
// // //                     <span
// // //                       style={{ color: deliveryFee === 0 ? "#22c55e" : "#111" }}
// // //                     >
// // //                       {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
// // //                     </span>
// // //                   </div>
// // //                   <div
// // //                     style={{
// // //                       display: "flex",
// // //                       justifyContent: "space-between",
// // //                       fontSize: "18px",
// // //                       fontWeight: 900,
// // //                       color: "#111",
// // //                       marginTop: "10px",
// // //                       paddingTop: "10px",
// // //                       borderTop: "2px solid #111",
// // //                     }}
// // //                   >
// // //                     <span>Grand Total</span>
// // //                     <span>₹{grandTotal.toLocaleString()}</span>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Checkout;

// // import React, { useState } from "react";
// // import {
// //   CreditCard,
// //   Truck,
// //   ShieldCheck,
// //   ChevronRight,
// //   MapPin,
// //   Phone,
// //   Mail,
// //   User,
// //   CheckCircle2,
// //   Package,
// //   ArrowLeft,
// //   Trash2,
// //   Plus,
// //   Minus,
// //   ShoppingCart,
// //   Send,
// // } from "lucide-react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { useCart } from "../context/CartContext";

// // const API = "/api";

// // const Checkout = () => {
// //   const [step, setStep] = useState(1);
// //   const [isProcessing, setIsProcessing] = useState(false);
// //   const [orderError, setOrderError] = useState("");
// //   const [createdOrder, setCreatedOrder] = useState(null);

// //   // Destructure cart context
// //   const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } =
// //     useCart();

// //   // ---- FIX: compute cartTotal from items as a fallback ----
// //   const computedCartTotal = cartItems.reduce(
// //     (sum, item) =>
// //       sum + (Number(item.price_inr) || 0) * (Number(item.quantity) || 1),
// //     0,
// //   );
// //   // Use context cartTotal if it's a number, otherwise use computed
// //   const safeCartTotal =
// //     typeof cartTotal === "number" && !isNaN(cartTotal)
// //       ? cartTotal
// //       : computedCartTotal;

// //   // State for customer info
// //   const [customerInfo, setCustomerInfo] = useState({
// //     name: "",
// //     email: "",
// //     phone: "",
// //     address: "",
// //     city: "",
// //     pincode: "",
// //   });
// //   const navigate = useNavigate();

// //   // ---- Derived values (using safeCartTotal) ----
// //   const deliveryFee = safeCartTotal > 5000 ? 0 : 99;
// //   const taxAmount = Math.round(safeCartTotal * 0.18);
// //   const grandTotal = safeCartTotal + deliveryFee + taxAmount;

// //   // ---- Handlers ----
// //   const handleNext = () => setStep(step + 1);
// //   const handleBack = () => setStep(step - 1);

// //   const handleInputChange = (e) => {
// //     setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
// //   };

// //   const handlePayment = async () => {
// //     setIsProcessing(true);
// //     setOrderError("");

// //     try {
// //       const res = await fetch(`${API}/orders/request`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           customerInfo,
// //           items: cartItems,
// //           paymentMethod: "COD",
// //           pricing: {
// //             subtotal: safeCartTotal,
// //             taxAmount,
// //             deliveryFee,
// //             grandTotal,
// //           },
// //         }),
// //       });
// //       const data = await res.json();

// //       if (!res.ok)
// //         throw new Error(data.error || "Failed to register order on server");

// //       setCreatedOrder(data.data);
// //       setIsProcessing(false);
// //       setStep(4);
// //       clearCart();
// //     } catch (err) {
// //       console.error("Order error:", err);
// //       setOrderError(
// //         "Failed to send order request. Please try again or contact support.",
// //       );
// //       setIsProcessing(false);
// //     }
// //   };

// //   // ---- Styles ----
// //   const cardStyle = {
// //     background: "#fff",
// //     borderRadius: "16px",
// //     border: "1px solid #f0f0f0",
// //     padding: "32px",
// //     boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
// //   };
// //   const labelStyle = {
// //     fontSize: "10px",
// //     fontWeight: 900,
// //     textTransform: "uppercase",
// //     color: "#9ca3af",
// //     marginBottom: "8px",
// //     display: "flex",
// //     alignItems: "center",
// //     gap: "8px",
// //   };
// //   const inputStyle = {
// //     width: "100%",
// //     padding: "12px 16px",
// //     borderRadius: "8px",
// //     border: "1px solid #f0f0f0",
// //     outline: "none",
// //     fontSize: "14px",
// //     fontWeight: 600,
// //     background: "#f9fafb",
// //   };

// //   // ---- Empty cart check ----
// //   if (cartItems.length === 0 && step < 4) {
// //     return (
// //       <div
// //         style={{
// //           paddingTop: "120px",
// //           paddingBottom: "80px",
// //           textAlign: "center",
// //           display: "flex",
// //           flexDirection: "column",
// //           alignItems: "center",
// //           gap: "24px",
// //         }}
// //       >
// //         <Package size={64} color="#d1d5db" />
// //         <h2
// //           style={{
// //             fontSize: "24px",
// //             fontWeight: 900,
// //             textTransform: "uppercase",
// //             color: "#111",
// //           }}
// //         >
// //           Cart is Empty
// //         </h2>
// //         <p style={{ color: "#6b7280", fontWeight: 600 }}>
// //           Your procurement list is currently empty.
// //         </p>
// //         <Link
// //           to="/products"
// //           style={{
// //             background: "#dc2626",
// //             color: "#fff",
// //             padding: "12px 32px",
// //             borderRadius: "8px",
// //             textDecoration: "none",
// //             fontSize: "11px",
// //             fontWeight: 900,
// //             textTransform: "uppercase",
// //           }}
// //         >
// //           Browse Catalog
// //         </Link>
// //       </div>
// //     );
// //   }

// //   // ---- Main render ----
// //   return (
// //     <div
// //       style={{
// //         paddingTop: "100px",
// //         minHeight: "100vh",
// //         background: "#f9fafb",
// //         paddingBottom: "80px",
// //       }}
// //     >
// //       <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
// //         <div
// //           style={{
// //             display: "grid",
// //             gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
// //             gap: "32px",
// //             alignItems: "start",
// //           }}
// //         >
// //           {/* Left: Flow */}
// //           <div
// //             style={{ display: "flex", flexDirection: "column", gap: "24px" }}
// //           >
// //             {/* Steps Indicator */}
// //             <div
// //               style={{
// //                 display: "flex",
// //                 alignItems: "center",
// //                 justifyContent: "center",
// //                 gap: "16px",
// //                 marginBottom: "20px",
// //               }}
// //             >
// //               {[1, 2, 3].map((i) => (
// //                 <div
// //                   key={i}
// //                   style={{ display: "flex", alignItems: "center", gap: "8px" }}
// //                 >
// //                   <div
// //                     style={{
// //                       width: "28px",
// //                       height: "28px",
// //                       borderRadius: "50%",
// //                       background:
// //                         step === i ? "#dc2626" : step > i ? "#111" : "#e5e7eb",
// //                       color: "#fff",
// //                       display: "flex",
// //                       alignItems: "center",
// //                       justifyContent: "center",
// //                       fontSize: "12px",
// //                       fontWeight: 900,
// //                     }}
// //                   >
// //                     {step > i ? "✓" : i}
// //                   </div>
// //                   <span
// //                     style={{
// //                       fontSize: "10px",
// //                       fontWeight: 800,
// //                       textTransform: "uppercase",
// //                       color: step >= i ? "#111" : "#9ca3af",
// //                     }}
// //                   >
// //                     {i === 1 ? "Info" : i === 2 ? "Shipping" : "Payment"}
// //                   </span>
// //                   {i < 3 && (
// //                     <div
// //                       style={{
// //                         width: "40px",
// //                         height: "1px",
// //                         background: "#e5e7eb",
// //                       }}
// //                     ></div>
// //                   )}
// //                 </div>
// //               ))}
// //             </div>

// //             {step === 4 ? (
// //               <div
// //                 style={{
// //                   ...cardStyle,
// //                   textAlign: "center",
// //                   padding: "64px 32px",
// //                 }}
// //               >
// //                 <div
// //                   style={{
// //                     width: "64px",
// //                     height: "64px",
// //                     background: "#ecfdf5",
// //                     color: "#059669",
// //                     borderRadius: "50%",
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "center",
// //                     margin: "0 auto 24px",
// //                   }}
// //                 >
// //                   <CheckCircle2 size={32} />
// //                 </div>
// //                 <h2
// //                   style={{
// //                     fontSize: "24px",
// //                     fontWeight: 900,
// //                     color: "#111",
// //                     textTransform: "uppercase",
// //                     marginBottom: "12px",
// //                   }}
// //                 >
// //                   Order Sent to Admin
// //                 </h2>
// //                 <p
// //                   style={{
// //                     color: "#6b7280",
// //                     fontSize: "14px",
// //                     fontWeight: 600,
// //                     marginBottom: "14px",
// //                   }}
// //                 >
// //                   Your procurement request has been successfully registered.
// //                   Dushyant Power Tools team will contact you shortly.
// //                 </p>
// //                 {createdOrder && (
// //                   <div
// //                     style={{
// //                       background: "#f9fafb",
// //                       border: "1px solid #e5e7eb",
// //                       borderRadius: "8px",
// //                       padding: "14px",
// //                       marginBottom: "24px",
// //                       fontSize: "12px",
// //                       fontWeight: 800,
// //                       color: "#111",
// //                     }}
// //                   >
// //                     <div>Order ID: {createdOrder.orderId}</div>
// //                     <div>Tracking: {createdOrder.trackingNumber}</div>
// //                     <div>Invoice: {createdOrder.invoice?.invoiceNo}</div>
// //                   </div>
// //                 )}
// //                 <Link
// //                   to="/"
// //                   style={{
// //                     display: "inline-block",
// //                     background: "#111",
// //                     color: "#fff",
// //                     padding: "14px 40px",
// //                     borderRadius: "8px",
// //                     textDecoration: "none",
// //                     fontSize: "11px",
// //                     fontWeight: 900,
// //                     textTransform: "uppercase",
// //                   }}
// //                 >
// //                   Return to Home
// //                 </Link>
// //               </div>
// //             ) : (
// //               <div style={cardStyle}>
// //                 {orderError && (
// //                   <div
// //                     style={{
// //                       background: "#fef2f2",
// //                       color: "#dc2626",
// //                       padding: "12px",
// //                       borderRadius: "8px",
// //                       fontSize: "12px",
// //                       fontWeight: 700,
// //                       marginBottom: "20px",
// //                     }}
// //                   >
// //                     ⚠️ {orderError}
// //                   </div>
// //                 )}

// //                 {step === 1 && (
// //                   <div
// //                     style={{
// //                       display: "flex",
// //                       flexDirection: "column",
// //                       gap: "24px",
// //                     }}
// //                   >
// //                     <h3
// //                       style={{
// //                         fontSize: "18px",
// //                         fontWeight: 900,
// //                         color: "#111",
// //                         textTransform: "uppercase",
// //                       }}
// //                     >
// //                       Contact Details
// //                     </h3>
// //                     <div
// //                       style={{
// //                         display: "flex",
// //                         flexDirection: "column",
// //                         gap: "16px",
// //                       }}
// //                     >
// //                       <div>
// //                         <label style={labelStyle}>
// //                           <User size={14} /> Full Name
// //                         </label>
// //                         <input
// //                           name="name"
// //                           style={inputStyle}
// //                           value={customerInfo.name}
// //                           onChange={handleInputChange}
// //                           placeholder="Your Name"
// //                         />
// //                       </div>
// //                       <div>
// //                         <label style={labelStyle}>
// //                           <Mail size={14} /> Email Address
// //                         </label>
// //                         <input
// //                           name="email"
// //                           type="email"
// //                           style={inputStyle}
// //                           value={customerInfo.email}
// //                           onChange={handleInputChange}
// //                           placeholder="your@email.com"
// //                         />
// //                       </div>
// //                       <div>
// //                         <label style={labelStyle}>
// //                           <Phone size={14} /> Phone Number
// //                         </label>
// //                         <input
// //                           name="phone"
// //                           type="tel"
// //                           style={inputStyle}
// //                           value={customerInfo.phone}
// //                           onChange={handleInputChange}
// //                           placeholder="+91 XXXXX XXXXX"
// //                         />
// //                       </div>
// //                     </div>
// //                     <button
// //                       onClick={handleNext}
// //                       disabled={!customerInfo.name || !customerInfo.phone}
// //                       style={{
// //                         padding: "16px",
// //                         background: "#dc2626",
// //                         color: "#fff",
// //                         border: "none",
// //                         borderRadius: "8px",
// //                         fontSize: "11px",
// //                         fontWeight: 900,
// //                         textTransform: "uppercase",
// //                         cursor: "pointer",
// //                         display: "flex",
// //                         alignItems: "center",
// //                         justifyContent: "center",
// //                         gap: "10px",
// //                         opacity:
// //                           !customerInfo.name || !customerInfo.phone ? 0.5 : 1,
// //                       }}
// //                     >
// //                       Shipping Logistics <ChevronRight size={16} />
// //                     </button>
// //                   </div>
// //                 )}

// //                 {step === 2 && (
// //                   <div
// //                     style={{
// //                       display: "flex",
// //                       flexDirection: "column",
// //                       gap: "24px",
// //                     }}
// //                   >
// //                     <h3
// //                       style={{
// //                         fontSize: "18px",
// //                         fontWeight: 900,
// //                         color: "#111",
// //                         textTransform: "uppercase",
// //                       }}
// //                     >
// //                       Shipping Address
// //                     </h3>
// //                     <div
// //                       style={{
// //                         display: "flex",
// //                         flexDirection: "column",
// //                         gap: "16px",
// //                       }}
// //                     >
// //                       <div>
// //                         <label style={labelStyle}>
// //                           <MapPin size={14} /> Street Address
// //                         </label>
// //                         <input
// //                           name="address"
// //                           style={inputStyle}
// //                           value={customerInfo.address}
// //                           onChange={handleInputChange}
// //                           placeholder="Area, Landmark, Street"
// //                         />
// //                       </div>
// //                       <div
// //                         style={{
// //                           display: "grid",
// //                           gridTemplateColumns: "1fr 1fr",
// //                           gap: "12px",
// //                         }}
// //                       >
// //                         <div>
// //                           <label style={labelStyle}>City</label>
// //                           <input
// //                             name="city"
// //                             style={inputStyle}
// //                             value={customerInfo.city}
// //                             onChange={handleInputChange}
// //                             placeholder="City"
// //                           />
// //                         </div>
// //                         <div>
// //                           <label style={labelStyle}>Pincode</label>
// //                           <input
// //                             name="pincode"
// //                             style={inputStyle}
// //                             value={customerInfo.pincode}
// //                             onChange={handleInputChange}
// //                             placeholder="486XXX"
// //                           />
// //                         </div>
// //                       </div>
// //                     </div>
// //                     <div
// //                       style={{
// //                         display: "grid",
// //                         gridTemplateColumns: "120px 1fr",
// //                         gap: "12px",
// //                       }}
// //                     >
// //                       <button
// //                         onClick={handleBack}
// //                         style={{
// //                           padding: "16px",
// //                           background: "#f9fafb",
// //                           border: "1px solid #f0f0f0",
// //                           borderRadius: "8px",
// //                           fontSize: "11px",
// //                           fontWeight: 900,
// //                           textTransform: "uppercase",
// //                           cursor: "pointer",
// //                         }}
// //                       >
// //                         Back
// //                       </button>
// //                       <button
// //                         onClick={handleNext}
// //                         disabled={!customerInfo.address || !customerInfo.city}
// //                         style={{
// //                           padding: "16px",
// //                           background: "#dc2626",
// //                           color: "#fff",
// //                           border: "none",
// //                           borderRadius: "8px",
// //                           fontSize: "11px",
// //                           fontWeight: 900,
// //                           textTransform: "uppercase",
// //                           cursor: "pointer",
// //                           opacity:
// //                             !customerInfo.address || !customerInfo.city
// //                               ? 0.5
// //                               : 1,
// //                         }}
// //                       >
// //                         Final Review
// //                       </button>
// //                     </div>
// //                   </div>
// //                 )}

// //                 {step === 3 && (
// //                   <div
// //                     style={{
// //                       display: "flex",
// //                       flexDirection: "column",
// //                       gap: "24px",
// //                       textAlign: "center",
// //                     }}
// //                   >
// //                     <h3
// //                       style={{
// //                         fontSize: "18px",
// //                         fontWeight: 900,
// //                         color: "#111",
// //                         textTransform: "uppercase",
// //                       }}
// //                     >
// //                       Order Authorization
// //                     </h3>
// //                     <div
// //                       style={{
// //                         padding: "32px",
// //                         background: "#f9fafb",
// //                         borderRadius: "12px",
// //                         border: "1px solid #f0f0f0",
// //                       }}
// //                     >
// //                       <Package
// //                         size={48}
// //                         color="#dc2626"
// //                         style={{ margin: "0 auto 16px" }}
// //                       />
// //                       <p
// //                         style={{
// //                           fontSize: "10px",
// //                           fontWeight: 800,
// //                           textTransform: "uppercase",
// //                           color: "#9ca3af",
// //                           letterSpacing: "0.1em",
// //                         }}
// //                       >
// //                         Procurement Total
// //                       </p>
// //                       <p
// //                         style={{
// //                           fontSize: "32px",
// //                           fontWeight: 900,
// //                           color: "#111",
// //                         }}
// //                       >
// //                         ₹{grandTotal.toLocaleString()}
// //                       </p>
// //                     </div>
// //                     <div
// //                       style={{
// //                         display: "grid",
// //                         gridTemplateColumns: "120px 1fr",
// //                         gap: "12px",
// //                       }}
// //                     >
// //                       <button
// //                         onClick={handleBack}
// //                         style={{
// //                           padding: "16px",
// //                           background: "#f9fafb",
// //                           border: "1px solid #f0f0f0",
// //                           borderRadius: "8px",
// //                           fontSize: "11px",
// //                           fontWeight: 900,
// //                           textTransform: "uppercase",
// //                           cursor: "pointer",
// //                         }}
// //                       >
// //                         Back
// //                       </button>
// //                       <button
// //                         onClick={handlePayment}
// //                         disabled={isProcessing}
// //                         style={{
// //                           padding: "16px",
// //                           background: "#111",
// //                           color: "#fff",
// //                           border: "none",
// //                           borderRadius: "8px",
// //                           fontSize: "11px",
// //                           fontWeight: 900,
// //                           textTransform: "uppercase",
// //                           cursor: "pointer",
// //                           display: "flex",
// //                           alignItems: "center",
// //                           justifyContent: "center",
// //                           gap: "10px",
// //                           opacity: isProcessing ? 0.6 : 1,
// //                         }}
// //                       >
// //                         {isProcessing
// //                           ? "SENDING REQUEST..."
// //                           : "SEND ORDER TO ADMIN"}
// //                         {!isProcessing && <Send size={16} />}
// //                       </button>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             )}
// //           </div>

// //           {/* Right: Summary */}
// //           {step < 4 && (
// //             <div style={{ position: "sticky", top: "120px" }}>
// //               <div style={cardStyle}>
// //                 <h3
// //                   style={{
// //                     fontSize: "14px",
// //                     fontWeight: 900,
// //                     textTransform: "uppercase",
// //                     color: "#111",
// //                     marginBottom: "24px",
// //                     borderBottom: "1px solid #f0f0f0",
// //                     paddingBottom: "16px",
// //                   }}
// //                 >
// //                   Items to Order ({cartItems.length})
// //                 </h3>

// //                 <div
// //                   style={{
// //                     display: "flex",
// //                     flexDirection: "column",
// //                     gap: "16px",
// //                     marginBottom: "24px",
// //                   }}
// //                 >
// //                   {cartItems.map((item, idx) => {
// //                     // ---- Ensure numbers ----
// //                     const price = Number(item.price_inr) || 0;
// //                     const qty = Number(item.quantity) || 1;
// //                     return (
// //                       <div key={idx} style={{ display: "flex", gap: "12px" }}>
// //                         <div
// //                           style={{
// //                             width: "48px",
// //                             height: "48px",
// //                             background: "#f9fafb",
// //                             borderRadius: "8px",
// //                             border: "1px solid #f0f0f0",
// //                             display: "flex",
// //                             alignItems: "center",
// //                             justifyContent: "center",
// //                             overflow: "hidden",
// //                             flexShrink: 0,
// //                           }}
// //                         >
// //                           <img
// //                             src={item.image}
// //                             alt=""
// //                             style={{
// //                               maxWidth: "80%",
// //                               maxHeight: "80%",
// //                               objectFit: "contain",
// //                             }}
// //                           />
// //                         </div>
// //                         <div style={{ flex: 1 }}>
// //                           <p
// //                             style={{
// //                               fontSize: "12px",
// //                               fontWeight: 800,
// //                               color: "#111",
// //                               lineHeight: 1.4,
// //                             }}
// //                           >
// //                             {item.name}
// //                           </p>
// //                           <div
// //                             style={{
// //                               display: "flex",
// //                               alignItems: "center",
// //                               gap: "12px",
// //                               marginTop: "6px",
// //                             }}
// //                           >
// //                             <div
// //                               style={{
// //                                 display: "flex",
// //                                 alignItems: "center",
// //                                 gap: "8px",
// //                                 background: "#f3f4f6",
// //                                 padding: "2px 8px",
// //                                 borderRadius: "4px",
// //                               }}
// //                             >
// //                               <button
// //                                 onClick={() =>
// //                                   updateQuantity(item.id, Math.max(1, qty - 1))
// //                                 }
// //                                 style={{
// //                                   background: "none",
// //                                   border: "none",
// //                                   padding: 0,
// //                                   cursor: "pointer",
// //                                 }}
// //                               >
// //                                 <Minus size={10} />
// //                               </button>
// //                               <span
// //                                 style={{ fontSize: "11px", fontWeight: 900 }}
// //                               >
// //                                 {qty}
// //                               </span>
// //                               <button
// //                                 onClick={() => updateQuantity(item.id, qty + 1)}
// //                                 style={{
// //                                   background: "none",
// //                                   border: "none",
// //                                   padding: 0,
// //                                   cursor: "pointer",
// //                                 }}
// //                               >
// //                                 <Plus size={10} />
// //                               </button>
// //                             </div>
// //                             <button
// //                               onClick={() => removeFromCart(item.id)}
// //                               style={{
// //                                 background: "none",
// //                                 border: "none",
// //                                 color: "#dc2626",
// //                                 fontSize: "10px",
// //                                 fontWeight: 800,
// //                                 cursor: "pointer",
// //                               }}
// //                             >
// //                               REMOVE
// //                             </button>
// //                           </div>
// //                         </div>
// //                         <p
// //                           style={{
// //                             fontSize: "12px",
// //                             fontWeight: 900,
// //                             color: "#111",
// //                           }}
// //                         >
// //                           ₹{(price * qty).toLocaleString()}
// //                         </p>
// //                       </div>
// //                     );
// //                   })}
// //                 </div>

// //                 <div
// //                   style={{
// //                     borderTop: "1px solid #f0f0f0",
// //                     paddingTop: "20px",
// //                     display: "flex",
// //                     flexDirection: "column",
// //                     gap: "10px",
// //                   }}
// //                 >
// //                   <div
// //                     style={{
// //                       display: "flex",
// //                       justifyContent: "space-between",
// //                       fontSize: "12px",
// //                       fontWeight: 700,
// //                       color: "#6b7280",
// //                     }}
// //                   >
// //                     <span>Subtotal</span>
// //                     <span>₹{safeCartTotal.toLocaleString()}</span>
// //                   </div>
// //                   <div
// //                     style={{
// //                       display: "flex",
// //                       justifyContent: "space-between",
// //                       fontSize: "12px",
// //                       fontWeight: 700,
// //                       color: "#6b7280",
// //                     }}
// //                   >
// //                     <span>Tax (GST 18%)</span>
// //                     <span>₹{taxAmount.toLocaleString()}</span>
// //                   </div>
// //                   <div
// //                     style={{
// //                       display: "flex",
// //                       justifyContent: "space-between",
// //                       fontSize: "12px",
// //                       fontWeight: 700,
// //                       color: "#6b7280",
// //                     }}
// //                   >
// //                     <span>Delivery</span>
// //                     <span
// //                       style={{ color: deliveryFee === 0 ? "#22c55e" : "#111" }}
// //                     >
// //                       {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
// //                     </span>
// //                   </div>
// //                   <div
// //                     style={{
// //                       display: "flex",
// //                       justifyContent: "space-between",
// //                       fontSize: "18px",
// //                       fontWeight: 900,
// //                       color: "#111",
// //                       marginTop: "10px",
// //                       paddingTop: "10px",
// //                       borderTop: "2px solid #111",
// //                     }}
// //                   >
// //                     <span>Grand Total</span>
// //                     <span>₹{grandTotal.toLocaleString()}</span>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Checkout;

// import React, { useState } from "react";
// import {
//   CreditCard,
//   Truck,
//   ShieldCheck,
//   ChevronRight,
//   MapPin,
//   Phone,
//   Mail,
//   User,
//   CheckCircle2,
//   Package,
//   ArrowLeft,
//   Trash2,
//   Plus,
//   Minus,
//   ShoppingCart,
//   Send,
// } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";

// const API = "/api";

// const Checkout = () => {
//   const [step, setStep] = useState(1);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [orderError, setOrderError] = useState("");
//   const [createdOrder, setCreatedOrder] = useState(null);

//   const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } =
//     useCart();

//   // ---- FIX: compute cartTotal from items as fallback ----
//   const computedCartTotal = cartItems.reduce(
//     (sum, item) =>
//       sum + (Number(item.price_inr) || 0) * (Number(item.quantity) || 1),
//     0,
//   );
//   const safeCartTotal =
//     typeof cartTotal === "number" && !isNaN(cartTotal)
//       ? cartTotal
//       : computedCartTotal;

//   const [customerInfo, setCustomerInfo] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     pincode: "",
//   });
//   const navigate = useNavigate();

//   // ---- Derived values ----
//   const deliveryFee = safeCartTotal > 5000 ? 0 : 99;
//   const taxAmount = Math.round(safeCartTotal * 0.18);
//   const grandTotal = safeCartTotal + deliveryFee + taxAmount;

//   // ---- Handlers ----
//   const handleNext = () => setStep(step + 1);
//   const handleBack = () => setStep(step - 1);

//   const handleInputChange = (e) => {
//     setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
//   };

//   const handlePayment = async () => {
//     setIsProcessing(true);
//     setOrderError("");

//     try {
//       const res = await fetch(`${API}/orders/request`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           customerInfo,
//           items: cartItems,
//           paymentMethod: "COD",
//           pricing: {
//             subtotal: safeCartTotal,
//             taxAmount,
//             deliveryFee,
//             grandTotal,
//           },
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         // ---- Extract detailed error message ----
//         let errorMsg = data.error || "Failed to register order on server";
//         // Check for duplicate key error
//         if (errorMsg.includes("E11000") || errorMsg.includes("duplicate key")) {
//           errorMsg =
//             "One of the products already exists in the catalog. Please contact support for assistance.";
//         }
//         throw new Error(errorMsg);
//       }

//       setCreatedOrder(data.data);
//       setIsProcessing(false);
//       setStep(4);
//       clearCart();
//     } catch (err) {
//       console.error("Order error:", err);
//       setOrderError(
//         err.message ||
//           "Failed to send order request. Please try again or contact support.",
//       );
//       setIsProcessing(false);
//     }
//   };

//   // ---- Styles ----
//   const cardStyle = {
//     background: "#fff",
//     borderRadius: "16px",
//     border: "1px solid #f0f0f0",
//     padding: "32px",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
//   };
//   const labelStyle = {
//     fontSize: "10px",
//     fontWeight: 900,
//     textTransform: "uppercase",
//     color: "#9ca3af",
//     marginBottom: "8px",
//     display: "flex",
//     alignItems: "center",
//     gap: "8px",
//   };
//   const inputStyle = {
//     width: "100%",
//     padding: "12px 16px",
//     borderRadius: "8px",
//     border: "1px solid #f0f0f0",
//     outline: "none",
//     fontSize: "14px",
//     fontWeight: 600,
//     background: "#f9fafb",
//   };

//   // ---- Empty cart check ----
//   if (cartItems.length === 0 && step < 4) {
//     return (
//       <div
//         style={{
//           paddingTop: "120px",
//           paddingBottom: "80px",
//           textAlign: "center",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           gap: "24px",
//         }}
//       >
//         <Package size={64} color="#d1d5db" />
//         <h2
//           style={{
//             fontSize: "24px",
//             fontWeight: 900,
//             textTransform: "uppercase",
//             color: "#111",
//           }}
//         >
//           Cart is Empty
//         </h2>
//         <p style={{ color: "#6b7280", fontWeight: 600 }}>
//           Your procurement list is currently empty.
//         </p>
//         <Link
//           to="/products"
//           style={{
//             background: "#dc2626",
//             color: "#fff",
//             padding: "12px 32px",
//             borderRadius: "8px",
//             textDecoration: "none",
//             fontSize: "11px",
//             fontWeight: 900,
//             textTransform: "uppercase",
//           }}
//         >
//           Browse Catalog
//         </Link>
//       </div>
//     );
//   }

//   // ---- Main render ----
//   return (
//     <div
//       style={{
//         paddingTop: "100px",
//         minHeight: "100vh",
//         background: "#f9fafb",
//         paddingBottom: "80px",
//       }}
//     >
//       <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//             gap: "32px",
//             alignItems: "start",
//           }}
//         >
//           {/* Left: Flow */}
//           <div
//             style={{ display: "flex", flexDirection: "column", gap: "24px" }}
//           >
//             {/* Steps Indicator */}
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: "16px",
//                 marginBottom: "20px",
//               }}
//             >
//               {[1, 2, 3].map((i) => (
//                 <div
//                   key={i}
//                   style={{ display: "flex", alignItems: "center", gap: "8px" }}
//                 >
//                   <div
//                     style={{
//                       width: "28px",
//                       height: "28px",
//                       borderRadius: "50%",
//                       background:
//                         step === i ? "#dc2626" : step > i ? "#111" : "#e5e7eb",
//                       color: "#fff",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: "12px",
//                       fontWeight: 900,
//                     }}
//                   >
//                     {step > i ? "✓" : i}
//                   </div>
//                   <span
//                     style={{
//                       fontSize: "10px",
//                       fontWeight: 800,
//                       textTransform: "uppercase",
//                       color: step >= i ? "#111" : "#9ca3af",
//                     }}
//                   >
//                     {i === 1 ? "Info" : i === 2 ? "Shipping" : "Payment"}
//                   </span>
//                   {i < 3 && (
//                     <div
//                       style={{
//                         width: "40px",
//                         height: "1px",
//                         background: "#e5e7eb",
//                       }}
//                     ></div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {step === 4 ? (
//               <div
//                 style={{
//                   ...cardStyle,
//                   textAlign: "center",
//                   padding: "64px 32px",
//                 }}
//               >
//                 <div
//                   style={{
//                     width: "64px",
//                     height: "64px",
//                     background: "#ecfdf5",
//                     color: "#059669",
//                     borderRadius: "50%",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     margin: "0 auto 24px",
//                   }}
//                 >
//                   <CheckCircle2 size={32} />
//                 </div>
//                 <h2
//                   style={{
//                     fontSize: "24px",
//                     fontWeight: 900,
//                     color: "#111",
//                     textTransform: "uppercase",
//                     marginBottom: "12px",
//                   }}
//                 >
//                   Order Sent to Admin
//                 </h2>
//                 <p
//                   style={{
//                     color: "#6b7280",
//                     fontSize: "14px",
//                     fontWeight: 600,
//                     marginBottom: "14px",
//                   }}
//                 >
//                   Your procurement request has been successfully registered.
//                   Dushyant Power Tools team will contact you shortly.
//                 </p>
//                 {createdOrder && (
//                   <div
//                     style={{
//                       background: "#f9fafb",
//                       border: "1px solid #e5e7eb",
//                       borderRadius: "8px",
//                       padding: "14px",
//                       marginBottom: "24px",
//                       fontSize: "12px",
//                       fontWeight: 800,
//                       color: "#111",
//                     }}
//                   >
//                     <div>Order ID: {createdOrder.orderId}</div>
//                     <div>Tracking: {createdOrder.trackingNumber}</div>
//                     <div>Invoice: {createdOrder.invoice?.invoiceNo}</div>
//                   </div>
//                 )}
//                 <Link
//                   to="/"
//                   style={{
//                     display: "inline-block",
//                     background: "#111",
//                     color: "#fff",
//                     padding: "14px 40px",
//                     borderRadius: "8px",
//                     textDecoration: "none",
//                     fontSize: "11px",
//                     fontWeight: 900,
//                     textTransform: "uppercase",
//                   }}
//                 >
//                   Return to Home
//                 </Link>
//               </div>
//             ) : (
//               <div style={cardStyle}>
//                 {orderError && (
//                   <div
//                     style={{
//                       background: "#fef2f2",
//                       color: "#dc2626",
//                       padding: "12px",
//                       borderRadius: "8px",
//                       fontSize: "12px",
//                       fontWeight: 700,
//                       marginBottom: "20px",
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "8px",
//                     }}
//                   >
//                     <span>⚠️</span> {orderError}
//                   </div>
//                 )}

//                 {step === 1 && (
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       gap: "24px",
//                     }}
//                   >
//                     <h3
//                       style={{
//                         fontSize: "18px",
//                         fontWeight: 900,
//                         color: "#111",
//                         textTransform: "uppercase",
//                       }}
//                     >
//                       Contact Details
//                     </h3>
//                     <div
//                       style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         gap: "16px",
//                       }}
//                     >
//                       <div>
//                         <label style={labelStyle}>
//                           <User size={14} /> Full Name
//                         </label>
//                         <input
//                           name="name"
//                           style={inputStyle}
//                           value={customerInfo.name}
//                           onChange={handleInputChange}
//                           placeholder="Your Name"
//                         />
//                       </div>
//                       <div>
//                         <label style={labelStyle}>
//                           <Mail size={14} /> Email Address
//                         </label>
//                         <input
//                           name="email"
//                           type="email"
//                           style={inputStyle}
//                           value={customerInfo.email}
//                           onChange={handleInputChange}
//                           placeholder="your@email.com"
//                         />
//                       </div>
//                       <div>
//                         <label style={labelStyle}>
//                           <Phone size={14} /> Phone Number
//                         </label>
//                         <input
//                           name="phone"
//                           type="tel"
//                           style={inputStyle}
//                           value={customerInfo.phone}
//                           onChange={handleInputChange}
//                           placeholder="+91 XXXXX XXXXX"
//                         />
//                       </div>
//                     </div>
//                     <button
//                       onClick={handleNext}
//                       disabled={!customerInfo.name || !customerInfo.phone}
//                       style={{
//                         padding: "16px",
//                         background: "#dc2626",
//                         color: "#fff",
//                         border: "none",
//                         borderRadius: "8px",
//                         fontSize: "11px",
//                         fontWeight: 900,
//                         textTransform: "uppercase",
//                         cursor: "pointer",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         gap: "10px",
//                         opacity:
//                           !customerInfo.name || !customerInfo.phone ? 0.5 : 1,
//                       }}
//                     >
//                       Shipping Logistics <ChevronRight size={16} />
//                     </button>
//                   </div>
//                 )}

//                 {step === 2 && (
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       gap: "24px",
//                     }}
//                   >
//                     <h3
//                       style={{
//                         fontSize: "18px",
//                         fontWeight: 900,
//                         color: "#111",
//                         textTransform: "uppercase",
//                       }}
//                     >
//                       Shipping Address
//                     </h3>
//                     <div
//                       style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         gap: "16px",
//                       }}
//                     >
//                       <div>
//                         <label style={labelStyle}>
//                           <MapPin size={14} /> Street Address
//                         </label>
//                         <input
//                           name="address"
//                           style={inputStyle}
//                           value={customerInfo.address}
//                           onChange={handleInputChange}
//                           placeholder="Area, Landmark, Street"
//                         />
//                       </div>
//                       <div
//                         style={{
//                           display: "grid",
//                           gridTemplateColumns: "1fr 1fr",
//                           gap: "12px",
//                         }}
//                       >
//                         <div>
//                           <label style={labelStyle}>City</label>
//                           <input
//                             name="city"
//                             style={inputStyle}
//                             value={customerInfo.city}
//                             onChange={handleInputChange}
//                             placeholder="City"
//                           />
//                         </div>
//                         <div>
//                           <label style={labelStyle}>Pincode</label>
//                           <input
//                             name="pincode"
//                             style={inputStyle}
//                             value={customerInfo.pincode}
//                             onChange={handleInputChange}
//                             placeholder="486XXX"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <div
//                       style={{
//                         display: "grid",
//                         gridTemplateColumns: "120px 1fr",
//                         gap: "12px",
//                       }}
//                     >
//                       <button
//                         onClick={handleBack}
//                         style={{
//                           padding: "16px",
//                           background: "#f9fafb",
//                           border: "1px solid #f0f0f0",
//                           borderRadius: "8px",
//                           fontSize: "11px",
//                           fontWeight: 900,
//                           textTransform: "uppercase",
//                           cursor: "pointer",
//                         }}
//                       >
//                         Back
//                       </button>
//                       <button
//                         onClick={handleNext}
//                         disabled={!customerInfo.address || !customerInfo.city}
//                         style={{
//                           padding: "16px",
//                           background: "#dc2626",
//                           color: "#fff",
//                           border: "none",
//                           borderRadius: "8px",
//                           fontSize: "11px",
//                           fontWeight: 900,
//                           textTransform: "uppercase",
//                           cursor: "pointer",
//                           opacity:
//                             !customerInfo.address || !customerInfo.city
//                               ? 0.5
//                               : 1,
//                         }}
//                       >
//                         Final Review
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {step === 3 && (
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       gap: "24px",
//                       textAlign: "center",
//                     }}
//                   >
//                     <h3
//                       style={{
//                         fontSize: "18px",
//                         fontWeight: 900,
//                         color: "#111",
//                         textTransform: "uppercase",
//                       }}
//                     >
//                       Order Authorization
//                     </h3>
//                     <div
//                       style={{
//                         padding: "32px",
//                         background: "#f9fafb",
//                         borderRadius: "12px",
//                         border: "1px solid #f0f0f0",
//                       }}
//                     >
//                       <Package
//                         size={48}
//                         color="#dc2626"
//                         style={{ margin: "0 auto 16px" }}
//                       />
//                       <p
//                         style={{
//                           fontSize: "10px",
//                           fontWeight: 800,
//                           textTransform: "uppercase",
//                           color: "#9ca3af",
//                           letterSpacing: "0.1em",
//                         }}
//                       >
//                         Procurement Total
//                       </p>
//                       <p
//                         style={{
//                           fontSize: "32px",
//                           fontWeight: 900,
//                           color: "#111",
//                         }}
//                       >
//                         ₹{grandTotal.toLocaleString()}
//                       </p>
//                     </div>
//                     <div
//                       style={{
//                         display: "grid",
//                         gridTemplateColumns: "120px 1fr",
//                         gap: "12px",
//                       }}
//                     >
//                       <button
//                         onClick={handleBack}
//                         style={{
//                           padding: "16px",
//                           background: "#f9fafb",
//                           border: "1px solid #f0f0f0",
//                           borderRadius: "8px",
//                           fontSize: "11px",
//                           fontWeight: 900,
//                           textTransform: "uppercase",
//                           cursor: "pointer",
//                         }}
//                       >
//                         Back
//                       </button>
//                       <button
//                         onClick={handlePayment}
//                         disabled={isProcessing}
//                         style={{
//                           padding: "16px",
//                           background: "#111",
//                           color: "#fff",
//                           border: "none",
//                           borderRadius: "8px",
//                           fontSize: "11px",
//                           fontWeight: 900,
//                           textTransform: "uppercase",
//                           cursor: "pointer",
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           gap: "10px",
//                           opacity: isProcessing ? 0.6 : 1,
//                         }}
//                       >
//                         {isProcessing
//                           ? "SENDING REQUEST..."
//                           : "SEND ORDER TO ADMIN"}
//                         {!isProcessing && <Send size={16} />}
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Right: Summary */}
//           {step < 4 && (
//             <div style={{ position: "sticky", top: "120px" }}>
//               <div style={cardStyle}>
//                 <h3
//                   style={{
//                     fontSize: "14px",
//                     fontWeight: 900,
//                     textTransform: "uppercase",
//                     color: "#111",
//                     marginBottom: "24px",
//                     borderBottom: "1px solid #f0f0f0",
//                     paddingBottom: "16px",
//                   }}
//                 >
//                   Items to Order ({cartItems.length})
//                 </h3>

//                 <div
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: "16px",
//                     marginBottom: "24px",
//                   }}
//                 >
//                   {cartItems.map((item, idx) => {
//                     const price = Number(item.price_inr) || 0;
//                     const qty = Number(item.quantity) || 1;
//                     return (
//                       <div key={idx} style={{ display: "flex", gap: "12px" }}>
//                         <div
//                           style={{
//                             width: "48px",
//                             height: "48px",
//                             background: "#f9fafb",
//                             borderRadius: "8px",
//                             border: "1px solid #f0f0f0",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             overflow: "hidden",
//                             flexShrink: 0,
//                           }}
//                         >
//                           <img
//                             src={item.image}
//                             alt=""
//                             style={{
//                               maxWidth: "80%",
//                               maxHeight: "80%",
//                               objectFit: "contain",
//                             }}
//                           />
//                         </div>
//                         <div style={{ flex: 1 }}>
//                           <p
//                             style={{
//                               fontSize: "12px",
//                               fontWeight: 800,
//                               color: "#111",
//                               lineHeight: 1.4,
//                             }}
//                           >
//                             {item.name}
//                           </p>
//                           <div
//                             style={{
//                               display: "flex",
//                               alignItems: "center",
//                               gap: "12px",
//                               marginTop: "6px",
//                             }}
//                           >
//                             <div
//                               style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "8px",
//                                 background: "#f3f4f6",
//                                 padding: "2px 8px",
//                                 borderRadius: "4px",
//                               }}
//                             >
//                               <button
//                                 onClick={() =>
//                                   updateQuantity(item.id, Math.max(1, qty - 1))
//                                 }
//                                 style={{
//                                   background: "none",
//                                   border: "none",
//                                   padding: 0,
//                                   cursor: "pointer",
//                                 }}
//                               >
//                                 <Minus size={10} />
//                               </button>
//                               <span
//                                 style={{ fontSize: "11px", fontWeight: 900 }}
//                               >
//                                 {qty}
//                               </span>
//                               <button
//                                 onClick={() => updateQuantity(item.id, qty + 1)}
//                                 style={{
//                                   background: "none",
//                                   border: "none",
//                                   padding: 0,
//                                   cursor: "pointer",
//                                 }}
//                               >
//                                 <Plus size={10} />
//                               </button>
//                             </div>
//                             <button
//                               onClick={() => removeFromCart(item.id)}
//                               style={{
//                                 background: "none",
//                                 border: "none",
//                                 color: "#dc2626",
//                                 fontSize: "10px",
//                                 fontWeight: 800,
//                                 cursor: "pointer",
//                               }}
//                             >
//                               REMOVE
//                             </button>
//                           </div>
//                         </div>
//                         <p
//                           style={{
//                             fontSize: "12px",
//                             fontWeight: 900,
//                             color: "#111",
//                           }}
//                         >
//                           ₹{(price * qty).toLocaleString()}
//                         </p>
//                       </div>
//                     );
//                   })}
//                 </div>

//                 <div
//                   style={{
//                     borderTop: "1px solid #f0f0f0",
//                     paddingTop: "20px",
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: "10px",
//                   }}
//                 >
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       fontSize: "12px",
//                       fontWeight: 700,
//                       color: "#6b7280",
//                     }}
//                   >
//                     <span>Subtotal</span>
//                     <span>₹{safeCartTotal.toLocaleString()}</span>
//                   </div>
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       fontSize: "12px",
//                       fontWeight: 700,
//                       color: "#6b7280",
//                     }}
//                   >
//                     <span>Tax (GST 18%)</span>
//                     <span>₹{taxAmount.toLocaleString()}</span>
//                   </div>
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       fontSize: "12px",
//                       fontWeight: 700,
//                       color: "#6b7280",
//                     }}
//                   >
//                     <span>Delivery</span>
//                     <span
//                       style={{ color: deliveryFee === 0 ? "#22c55e" : "#111" }}
//                     >
//                       {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
//                     </span>
//                   </div>
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       fontSize: "18px",
//                       fontWeight: 900,
//                       color: "#111",
//                       marginTop: "10px",
//                       paddingTop: "10px",
//                       borderTop: "2px solid #111",
//                     }}
//                   >
//                     <span>Grand Total</span>
//                     <span>₹{grandTotal.toLocaleString()}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

import React, { useState } from "react";
import {
  CreditCard,
  Truck,
  ShieldCheck,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  User,
  CheckCircle2,
  Package,
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  Send,
  Home,
  Map,
  Calendar,
  Clock,
  DollarSign,
  RefreshCw,
  UserCheck,
  PhoneCall,
  AlertCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const API = "/api";

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [createdOrder, setCreatedOrder] = useState(null);

  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } =
    useCart();

  // Fallback cart total
  const computedCartTotal = cartItems.reduce(
    (sum, item) =>
      sum + (Number(item.price_inr) || 0) * (Number(item.quantity) || 1),
    0,
  );
  const safeCartTotal =
    typeof cartTotal === "number" && !isNaN(cartTotal)
      ? cartTotal
      : computedCartTotal;

  // Customer (buyer) info
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    altPhone: "",
  });

  // Receiver (shipping) info
  const [receiverInfo, setReceiverInfo] = useState({
    name: "",
    phone: "",
    altPhone: "",
    address: "",
    city: "",
    pincode: "",
    landmark: "",
  });

  // Payment method: "cod" or "online"
  const [paymentMethod, setPaymentMethod] = useState("cod");
  // Check if any product does NOT support COD
  const codAvailable = cartItems.every((item) => item.codAvailable !== false);
  // If COD not available, force online payment
  React.useEffect(() => {
    if (!codAvailable) {
      setPaymentMethod("online");
    }
  }, [codAvailable]);

  // Location verified state
  const [locationVerified, setLocationVerified] = useState(false);

  const navigate = useNavigate();

  // Derived values
  const deliveryFee = safeCartTotal > 5000 ? 0 : 99;
  const taxAmount = Math.round(safeCartTotal * 0.18);
  const grandTotal = safeCartTotal + deliveryFee + taxAmount;

  // ---- Handlers ----
  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleCustomerChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handleReceiverChange = (e) => {
    setReceiverInfo({ ...receiverInfo, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    setOrderError("");

    try {
      const res = await fetch(`${API}/orders/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: customerInfo,
          receiver: receiverInfo,
          items: cartItems,
          paymentMethod,
          pricing: {
            subtotal: safeCartTotal,
            taxAmount,
            deliveryFee,
            grandTotal,
          },
          locationVerified,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        let errorMsg = data.error || "Failed to register order on server";
        if (errorMsg.includes("E11000") || errorMsg.includes("duplicate key")) {
          errorMsg =
            "One of the products already exists in the catalog. Please contact support.";
        }
        throw new Error(errorMsg);
      }

      setCreatedOrder(data.data);
      setIsProcessing(false);
      setStep(4);
      clearCart();
    } catch (err) {
      console.error("Order error:", err);
      setOrderError(
        err.message ||
          "Failed to send order request. Please try again or contact support.",
      );
      setIsProcessing(false);
    }
  };

  // ---- Styles ----
  const cardStyle = {
    background: "#fff",
    borderRadius: "16px",
    border: "1px solid #f0f0f0",
    padding: "32px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
  };
  const labelStyle = {
    fontSize: "10px",
    fontWeight: 900,
    textTransform: "uppercase",
    color: "#9ca3af",
    marginBottom: "8px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };
  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #f0f0f0",
    outline: "none",
    fontSize: "14px",
    fontWeight: 600,
    background: "#f9fafb",
    transition: "border 0.2s",
  };
  const inputGroupStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  };

  // ---- Empty cart ----
  if (cartItems.length === 0 && step < 4) {
    return (
      <div
        style={{
          paddingTop: "120px",
          paddingBottom: "80px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <Package size={64} color="#d1d5db" />
        <h2
          style={{
            fontSize: "24px",
            fontWeight: 900,
            textTransform: "uppercase",
            color: "#111",
          }}
        >
          Cart is Empty
        </h2>
        <p style={{ color: "#6b7280", fontWeight: 600 }}>
          Your procurement list is currently empty.
        </p>
        <Link
          to="/products"
          style={{
            background: "#dc2626",
            color: "#fff",
            padding: "12px 32px",
            borderRadius: "8px",
            textDecoration: "none",
            fontSize: "11px",
            fontWeight: 900,
            textTransform: "uppercase",
          }}
        >
          Browse Catalog
        </Link>
      </div>
    );
  }

  // ---- Main Render ----
  return (
    <div
      style={{
        paddingTop: "100px",
        minHeight: "100vh",
        background: "#f9fafb",
        paddingBottom: "80px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "32px",
            alignItems: "start",
          }}
        >
          {/* Left: Flow */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            {/* Steps Indicator */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                marginBottom: "20px",
              }}
            >
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background:
                        step === i ? "#dc2626" : step > i ? "#111" : "#e5e7eb",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: 900,
                    }}
                  >
                    {step > i ? "✓" : i}
                  </div>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      color: step >= i ? "#111" : "#9ca3af",
                    }}
                  >
                    {i === 1 ? "Contact" : i === 2 ? "Shipping" : "Payment"}
                  </span>
                  {i < 3 && (
                    <div
                      style={{
                        width: "40px",
                        height: "1px",
                        background: "#e5e7eb",
                      }}
                    ></div>
                  )}
                </div>
              ))}
            </div>

            {step === 4 ? (
              /* --- Order Success --- */
              <div
                style={{
                  ...cardStyle,
                  textAlign: "center",
                  padding: "64px 32px",
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    background: "#ecfdf5",
                    color: "#059669",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 24px",
                  }}
                >
                  <CheckCircle2 size={32} />
                </div>
                <h2
                  style={{
                    fontSize: "24px",
                    fontWeight: 900,
                    color: "#111",
                    textTransform: "uppercase",
                    marginBottom: "12px",
                  }}
                >
                  Order Placed Successfully!
                </h2>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "14px",
                    fontWeight: 600,
                    marginBottom: "14px",
                  }}
                >
                  Your procurement request has been registered. You will receive
                  a confirmation shortly.
                </p>
                {createdOrder && (
                  <div
                    style={{
                      background: "#f9fafb",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      padding: "14px",
                      marginBottom: "24px",
                      fontSize: "12px",
                      fontWeight: 800,
                      color: "#111",
                      textAlign: "left",
                    }}
                  >
                    <div>Order ID: {createdOrder.orderId}</div>
                    <div>Tracking: {createdOrder.trackingNumber}</div>
                    <div>Invoice: {createdOrder.invoice?.invoiceNo}</div>
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Link
                    to="/orders"
                    style={{
                      background: "#111",
                      color: "#fff",
                      padding: "12px 28px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      fontSize: "11px",
                      fontWeight: 900,
                      textTransform: "uppercase",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Calendar size={16} /> View Order History
                  </Link>
                  <Link
                    to="/profile"
                    style={{
                      background: "#dc2626",
                      color: "#fff",
                      padding: "12px 28px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      fontSize: "11px",
                      fontWeight: 900,
                      textTransform: "uppercase",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <User size={16} /> My Profile
                  </Link>
                  <Link
                    to="/"
                    style={{
                      background: "#f3f4f6",
                      color: "#111",
                      padding: "12px 28px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      fontSize: "11px",
                      fontWeight: 900,
                      textTransform: "uppercase",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Home size={16} /> Return Home
                  </Link>
                </div>
              </div>
            ) : (
              /* --- Main Form Steps --- */
              <div style={cardStyle}>
                {orderError && (
                  <div
                    style={{
                      background: "#fef2f2",
                      color: "#dc2626",
                      padding: "12px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 700,
                      marginBottom: "20px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <AlertCircle size={16} /> {orderError}
                  </div>
                )}

                {step === 1 && (
                  /* --- Step 1: Contact Details (Customer + Receiver) --- */
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "24px",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: 900,
                        color: "#111",
                        textTransform: "uppercase",
                      }}
                    >
                      <User size={18} style={{ verticalAlign: "middle" }} />{" "}
                      Contact Information
                    </h3>

                    <div>
                      <h4
                        style={{
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#4b5563",
                          marginBottom: "12px",
                        }}
                      >
                        Your Details (Buyer)
                      </h4>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                        }}
                      >
                        <input
                          name="name"
                          style={inputStyle}
                          value={customerInfo.name}
                          onChange={handleCustomerChange}
                          placeholder="Full Name *"
                        />
                        <input
                          name="email"
                          type="email"
                          style={inputStyle}
                          value={customerInfo.email}
                          onChange={handleCustomerChange}
                          placeholder="Email Address"
                        />
                        <div style={inputGroupStyle}>
                          <input
                            name="phone"
                            type="tel"
                            style={inputStyle}
                            value={customerInfo.phone}
                            onChange={handleCustomerChange}
                            placeholder="Phone Number *"
                          />
                          <input
                            name="altPhone"
                            type="tel"
                            style={inputStyle}
                            value={customerInfo.altPhone}
                            onChange={handleCustomerChange}
                            placeholder="Alternate Phone"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4
                        style={{
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#4b5563",
                          marginBottom: "12px",
                        }}
                      >
                        <UserCheck
                          size={14}
                          style={{ verticalAlign: "middle" }}
                        />{" "}
                        Receiver Details (Who receives the order?)
                      </h4>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                        }}
                      >
                        <input
                          name="name"
                          style={inputStyle}
                          value={receiverInfo.name}
                          onChange={handleReceiverChange}
                          placeholder="Receiver Full Name *"
                        />
                        <div style={inputGroupStyle}>
                          <input
                            name="phone"
                            type="tel"
                            style={inputStyle}
                            value={receiverInfo.phone}
                            onChange={handleReceiverChange}
                            placeholder="Receiver Phone *"
                          />
                          <input
                            name="altPhone"
                            type="tel"
                            style={inputStyle}
                            value={receiverInfo.altPhone}
                            onChange={handleReceiverChange}
                            placeholder="Receiver Alternate Phone"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleNext}
                      disabled={
                        !customerInfo.name ||
                        !customerInfo.phone ||
                        !receiverInfo.name ||
                        !receiverInfo.phone
                      }
                      style={{
                        padding: "16px",
                        background: "#dc2626",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "11px",
                        fontWeight: 900,
                        textTransform: "uppercase",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        opacity:
                          !customerInfo.name ||
                          !customerInfo.phone ||
                          !receiverInfo.name ||
                          !receiverInfo.phone
                            ? 0.5
                            : 1,
                      }}
                    >
                      Shipping Address <ChevronRight size={16} />
                    </button>
                  </div>
                )}

                {step === 2 && (
                  /* --- Step 2: Shipping Address & Location Verification --- */
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "24px",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: 900,
                        color: "#111",
                        textTransform: "uppercase",
                      }}
                    >
                      <MapPin size={18} style={{ verticalAlign: "middle" }} />{" "}
                      Shipping Address
                    </h3>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      <input
                        name="address"
                        style={inputStyle}
                        value={receiverInfo.address}
                        onChange={handleReceiverChange}
                        placeholder="Street Address, Area, Landmark *"
                      />
                      <input
                        name="landmark"
                        style={inputStyle}
                        value={receiverInfo.landmark}
                        onChange={handleReceiverChange}
                        placeholder="Landmark (optional)"
                      />
                      <div style={inputGroupStyle}>
                        <input
                          name="city"
                          style={inputStyle}
                          value={receiverInfo.city}
                          onChange={handleReceiverChange}
                          placeholder="City *"
                        />
                        <input
                          name="pincode"
                          style={inputStyle}
                          value={receiverInfo.pincode}
                          onChange={handleReceiverChange}
                          placeholder="Pincode *"
                        />
                      </div>
                    </div>

                    {/* Location Verification */}
                    <div
                      style={{
                        background: "#f3f4f6",
                        padding: "16px",
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          marginBottom: "12px",
                        }}
                      >
                        <Map size={20} color="#6b7280" />
                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: 700,
                            color: "#111",
                          }}
                        >
                          Verify Delivery Location
                        </span>
                      </div>
                      <div
                        style={{
                          height: "120px",
                          background: "#e5e7eb",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#6b7280",
                          fontSize: "12px",
                          marginBottom: "12px",
                        }}
                      >
                        <span>📍 Map placeholder – click to confirm</span>
                      </div>
                      <label
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                          cursor: "pointer",
                          fontSize: "12px",
                          fontWeight: 600,
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={locationVerified}
                          onChange={(e) =>
                            setLocationVerified(e.target.checked)
                          }
                        />
                        I confirm that the delivery address is correct and
                        accessible.
                      </label>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "120px 1fr",
                        gap: "12px",
                      }}
                    >
                      <button
                        onClick={handleBack}
                        style={{
                          padding: "16px",
                          background: "#f9fafb",
                          border: "1px solid #f0f0f0",
                          borderRadius: "8px",
                          fontSize: "11px",
                          fontWeight: 900,
                          textTransform: "uppercase",
                          cursor: "pointer",
                        }}
                      >
                        Back
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={
                          !receiverInfo.address ||
                          !receiverInfo.city ||
                          !receiverInfo.pincode ||
                          !locationVerified
                        }
                        style={{
                          padding: "16px",
                          background: "#dc2626",
                          color: "#fff",
                          border: "none",
                          borderRadius: "8px",
                          fontSize: "11px",
                          fontWeight: 900,
                          textTransform: "uppercase",
                          cursor: "pointer",
                          opacity:
                            !receiverInfo.address ||
                            !receiverInfo.city ||
                            !receiverInfo.pincode ||
                            !locationVerified
                              ? 0.5
                              : 1,
                        }}
                      >
                        Payment Options
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  /* --- Step 3: Payment Method & Order Review --- */
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "24px",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: 900,
                        color: "#111",
                        textTransform: "uppercase",
                      }}
                    >
                      <DollarSign
                        size={18}
                        style={{ verticalAlign: "middle" }}
                      />{" "}
                      Payment & Review
                    </h3>

                    {/* Payment Method Selection */}
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "#4b5563",
                          marginBottom: "12px",
                        }}
                      >
                        Choose Payment Method
                      </p>
                      <div
                        style={{
                          display: "flex",
                          gap: "16px",
                          flexWrap: "wrap",
                        }}
                      >
                        {codAvailable && (
                          <button
                            onClick={() => setPaymentMethod("cod")}
                            style={{
                              flex: 1,
                              padding: "14px 20px",
                              borderRadius: "8px",
                              border:
                                paymentMethod === "cod"
                                  ? "2px solid #dc2626"
                                  : "1px solid #e5e7eb",
                              background:
                                paymentMethod === "cod" ? "#fff" : "#f9fafb",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              fontWeight: 700,
                              fontSize: "13px",
                              color:
                                paymentMethod === "cod" ? "#dc2626" : "#111",
                            }}
                          >
                            <Truck size={18} />
                            Cash on Delivery
                          </button>
                        )}
                        <button
                          onClick={() => setPaymentMethod("online")}
                          style={{
                            flex: 1,
                            padding: "14px 20px",
                            borderRadius: "8px",
                            border:
                              paymentMethod === "online"
                                ? "2px solid #dc2626"
                                : "1px solid #e5e7eb",
                            background:
                              paymentMethod === "online" ? "#fff" : "#f9fafb",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            fontWeight: 700,
                            fontSize: "13px",
                            color:
                              paymentMethod === "online" ? "#dc2626" : "#111",
                          }}
                        >
                          <CreditCard size={18} />
                          Online Payment
                        </button>
                      </div>
                      {!codAvailable && (
                        <p
                          style={{
                            fontSize: "11px",
                            color: "#dc2626",
                            marginTop: "8px",
                            fontWeight: 600,
                          }}
                        >
                          ⚠️ Cash on Delivery is not available for some items.
                          Please choose Online Payment.
                        </p>
                      )}
                    </div>

                    {/* Order Summary for review */}
                    <div
                      style={{
                        background: "#f9fafb",
                        padding: "16px",
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 800,
                          color: "#4b5563",
                          textTransform: "uppercase",
                          marginBottom: "12px",
                        }}
                      >
                        Order Summary
                      </p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#111",
                          marginBottom: "6px",
                        }}
                      >
                        <span>Subtotal</span>
                        <span>₹{safeCartTotal.toLocaleString()}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#4b5563",
                          marginBottom: "6px",
                        }}
                      >
                        <span>Tax (GST 18%)</span>
                        <span>₹{taxAmount.toLocaleString()}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#4b5563",
                          marginBottom: "6px",
                        }}
                      >
                        <span>Delivery</span>
                        <span
                          style={{
                            color: deliveryFee === 0 ? "#22c55e" : "#111",
                          }}
                        >
                          {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "18px",
                          fontWeight: 900,
                          color: "#111",
                          borderTop: "2px solid #111",
                          paddingTop: "10px",
                          marginTop: "10px",
                        }}
                      >
                        <span>Grand Total</span>
                        <span>₹{grandTotal.toLocaleString()}</span>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "120px 1fr",
                        gap: "12px",
                      }}
                    >
                      <button
                        onClick={handleBack}
                        style={{
                          padding: "16px",
                          background: "#f9fafb",
                          border: "1px solid #f0f0f0",
                          borderRadius: "8px",
                          fontSize: "11px",
                          fontWeight: 900,
                          textTransform: "uppercase",
                          cursor: "pointer",
                        }}
                      >
                        Back
                      </button>
                      <button
                        onClick={handlePayment}
                        disabled={isProcessing}
                        style={{
                          padding: "16px",
                          background: "#111",
                          color: "#fff",
                          border: "none",
                          borderRadius: "8px",
                          fontSize: "11px",
                          fontWeight: 900,
                          textTransform: "uppercase",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "10px",
                          opacity: isProcessing ? 0.6 : 1,
                        }}
                      >
                        {isProcessing
                          ? "PLACING ORDER..."
                          : `PLACE ORDER (${paymentMethod === "cod" ? "COD" : "Online"})`}
                        {!isProcessing && <Send size={16} />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: Cart Summary with Reorder option */}
          {step < 4 && (
            <div style={{ position: "sticky", top: "120px" }}>
              <div style={cardStyle}>
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    color: "#111",
                    marginBottom: "24px",
                    borderBottom: "1px solid #f0f0f0",
                    paddingBottom: "16px",
                  }}
                >
                  Items to Order ({cartItems.length})
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    marginBottom: "24px",
                  }}
                >
                  {cartItems.map((item, idx) => {
                    const price = Number(item.price_inr) || 0;
                    const qty = Number(item.quantity) || 1;
                    const outOfStock = item.stockStatus === "Out of Stock";
                    return (
                      <div key={idx} style={{ display: "flex", gap: "12px" }}>
                        <div
                          style={{
                            width: "48px",
                            height: "48px",
                            background: "#f9fafb",
                            borderRadius: "8px",
                            border: "1px solid #f0f0f0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                            flexShrink: 0,
                          }}
                        >
                          <img
                            src={item.image}
                            alt=""
                            style={{
                              maxWidth: "80%",
                              maxHeight: "80%",
                              objectFit: "contain",
                            }}
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          <p
                            style={{
                              fontSize: "12px",
                              fontWeight: 800,
                              color: "#111",
                              lineHeight: 1.4,
                            }}
                          >
                            {item.name}
                          </p>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                              marginTop: "6px",
                              flexWrap: "wrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                background: "#f3f4f6",
                                padding: "2px 8px",
                                borderRadius: "4px",
                              }}
                            >
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, Math.max(1, qty - 1))
                                }
                                style={{
                                  background: "none",
                                  border: "none",
                                  padding: 0,
                                  cursor: "pointer",
                                }}
                              >
                                <Minus size={10} />
                              </button>
                              <span
                                style={{ fontSize: "11px", fontWeight: 900 }}
                              >
                                {qty}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, qty + 1)}
                                style={{
                                  background: "none",
                                  border: "none",
                                  padding: 0,
                                  cursor: "pointer",
                                }}
                              >
                                <Plus size={10} />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              style={{
                                background: "none",
                                border: "none",
                                color: "#dc2626",
                                fontSize: "10px",
                                fontWeight: 800,
                                cursor: "pointer",
                              }}
                            >
                              REMOVE
                            </button>
                            {/* Reorder button (only if product is in stock) */}
                            {!outOfStock && (
                              <button
                                onClick={() => {
                                  // Reorder: add same product again (maybe increase quantity)
                                  updateQuantity(item.id, qty + 1);
                                }}
                                style={{
                                  background: "#f3f4f6",
                                  border: "none",
                                  padding: "2px 8px",
                                  borderRadius: "4px",
                                  fontSize: "9px",
                                  fontWeight: 700,
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                }}
                              >
                                <RefreshCw size={10} /> Reorder
                              </button>
                            )}
                          </div>
                          {outOfStock && (
                            <span
                              style={{
                                fontSize: "9px",
                                color: "#dc2626",
                                fontWeight: 700,
                              }}
                            >
                              ⚠️ Out of Stock
                            </span>
                          )}
                        </div>
                        <p
                          style={{
                            fontSize: "12px",
                            fontWeight: 900,
                            color: "#111",
                          }}
                        >
                          ₹{(price * qty).toLocaleString()}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div
                  style={{
                    borderTop: "1px solid #f0f0f0",
                    paddingTop: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#6b7280",
                    }}
                  >
                    <span>Subtotal</span>
                    <span>₹{safeCartTotal.toLocaleString()}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#6b7280",
                    }}
                  >
                    <span>Tax (GST 18%)</span>
                    <span>₹{taxAmount.toLocaleString()}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#6b7280",
                    }}
                  >
                    <span>Delivery</span>
                    <span
                      style={{ color: deliveryFee === 0 ? "#22c55e" : "#111" }}
                    >
                      {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "18px",
                      fontWeight: 900,
                      color: "#111",
                      marginTop: "10px",
                      paddingTop: "10px",
                      borderTop: "2px solid #111",
                    }}
                  >
                    <span>Grand Total</span>
                    <span>₹{grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
