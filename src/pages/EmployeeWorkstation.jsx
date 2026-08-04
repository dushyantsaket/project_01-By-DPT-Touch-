// // ============================================================
// // LOGIN PAGE — Real backend auth + QR Code login (no face)
// // ============================================================
// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams, Link } from "react-router-dom";
// import {
//   ChevronRight,
//   Mail,
//   Lock,
//   Eye,
//   EyeOff,
//   CheckCircle,
//   AlertCircle,
//   Shield,
//   Loader2,
//   User,
//   ShieldCheck,
//   QrCode,
// } from "lucide-react";
// import { useAuth } from "../context/AuthContext";

// const API = "/api";

// const roleConfig = {
//   customer: {
//     title: "Customer Portal",
//     subtitle: "Personal Account",
//     icon: "https://cdn-icons-png.flaticon.com/128/17085/17085860.png",
//     color: "#2563eb",
//     fieldLabel: "Email Address",
//     fieldType: "email",
//     placeholder: "Enter your email",
//     showForgotPassword: true,
//     showRegister: true,
//     registerPath: "/register",
//     dashboardPath: "/customer-dashboard",
//     apiUsername: "email",
//   },
//   dealer: {
//     title: "Dealer Portal",
//     subtitle: "Authorized Partner",
//     icon: "https://cdn-icons-png.flaticon.com/128/15288/15288905.png",
//     color: "#059669",
//     fieldLabel: "Email Address",
//     fieldType: "email",
//     placeholder: "Enter your dealer email",
//     showForgotPassword: true,
//     showRegister: true,
//     registerPath: "/dealer-register",
//     dashboardPath: "/dealer-dashboard",
//     apiUsername: "email",
//   },
//   admin: {
//     title: "Admin Portal",
//     subtitle: "Management Access",
//     icon: "https://cdn-icons-png.flaticon.com/128/3790/3790055.png",
//     color: "#dc2626",
//     fieldLabel: "Username",
//     fieldType: "text",
//     placeholder: "Enter admin username",
//     showForgotPassword: false,
//     showRegister: false,
//     dashboardPath: "/dashboard",
//     apiUsername: "username",
//   },
//   employee: {
//     title: "Employee Portal",
//     subtitle: "Workforce Login",
//     icon: "https://cdn-icons-png.flaticon.com/128/912/912318.png",
//     color: "#7c3aed",
//     fieldLabel: "Employee ID",
//     fieldType: "text",
//     placeholder: "Enter Employee ID (e.g. EMP101 or vpt)",
//     showForgotPassword: true,
//     showRegister: true,
//     registerPath: "/register/employee",
//     dashboardPath: "/employee-dashboard",
//     apiUsername: "employeeId",
//     showQrLogin: true,
//   },
// };

// export const LoginPage = () => {
//   const { role } = useParams();
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const config = roleConfig[role] || roleConfig.customer;

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [qrScanning, setQrScanning] = useState(false);

//   // Seed employee (optional)
//   useEffect(() => {
//     if (role === "employee") {
//       fetch(`${API}/employee/seed`, { method: "POST" })
//         .then((res) => res.json())
//         .then((data) => console.log("Seeding message:", data.message))
//         .catch((err) => console.error("Seeding failed:", err));
//     }
//   }, [role]);

//   // ---- QR Scanner handler ----
//   const handleQrScan = async (data) => {
//     if (data) {
//       const scannedId = data.text || data;
//       setQrScanning(false);
//       try {
//         const res = await fetch(`${API}/employee/qr-login`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ employeeId: scannedId }),
//         });
//         const response = await res.json();
//         if (!res.ok) throw new Error(response.error || "QR login failed");
//         localStorage.setItem("employeeToken", response.token);
//         localStorage.setItem("isEmployee", "true");
//         localStorage.setItem("employeeName", response.employee?.fullName);
//         login({
//           userType: "employee",
//           email: response.employee?.email,
//           name: response.employee?.fullName,
//           employeeId: response.employee?.employeeId,
//           role: response.employee?.role,
//           photo: response.employee?.photo,
//           token: response.token,
//           loginTime: new Date().toISOString(),
//         });
//         navigate("/employee-dashboard");
//       } catch (err) {
//         setError(err.message || "QR scan login failed. Please try password.");
//         setUsername(scannedId);
//       }
//     }
//   };

//   const handleQrError = (err) => {
//     console.error("QR scan error:", err);
//     setError("Camera access denied or QR scan failed.");
//     setQrScanning(false);
//   };

//   // ---- Normal login handler ----
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!username.trim() || !password.trim()) {
//       setError("Please fill in all fields.");
//       return;
//     }

//     setLoading(true);

//     try {
//       // ---------- ADMIN LOGIN ----------
//       if (role === "admin") {
//         // 1. Try API login
//         try {
//           const res = await fetch(`${API}/auth/login`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               username: username.trim(),
//               password: password.trim(),
//             }),
//           });
//           const data = await res.json();
//           if (res.ok && data.token) {
//             localStorage.setItem("adminToken", data.token);
//             localStorage.setItem("isAdmin", "true");
//             localStorage.setItem(
//               "adminName",
//               data.user?.username || data.user?.name || username.trim(),
//             );
//             login({
//               userType: "admin",
//               name: username.trim(),
//               token: data.token,
//             });
//             navigate("/dashboard");
//             return;
//           }
//         } catch (err) {
//           console.warn("API login failed, using fallback...", err);
//         }

//         // 2. Fallback for default admins (including vpt)
//         const validAdmins = ["ram", "dushyant", "admin", "vpt"];
//         const validPasses = ["dushyan", "admin@dpt2024", "admin", "vpt@2026"];
//         const uLower = username.trim().toLowerCase();
//         const pLower = password.trim().toLowerCase();
//         if (validAdmins.includes(uLower) && validPasses.includes(pLower)) {
//           const fakeToken = `admin-token-${Date.now()}`;
//           localStorage.setItem("adminToken", fakeToken);
//           localStorage.setItem("isAdmin", "true");
//           localStorage.setItem("adminMode", "offline");
//           localStorage.setItem("adminName", username.trim());
//           login({ userType: "admin", name: username.trim(), token: fakeToken });
//           navigate("/dashboard");
//           return;
//         }
//         throw new Error("Invalid admin credentials.");
//       }

//       // ---------- EMPLOYEE LOGIN ----------
//       if (role === "employee") {
//         // Hardcoded check for vpt/vpt2026
//         if (username.trim() === "vpt" && password.trim() === "vpt2026") {
//           const employee = {
//             employeeId: "vpt",
//             fullName: "VPT Employee",
//             email: "vpt@dpt.com",
//             role: "Sales Executive",
//             photo: "https://cdn-icons-png.flaticon.com/128/912/912318.png",
//           };
//           const fakeToken = `employee-token-${Date.now()}`;
//           localStorage.setItem("employeeToken", fakeToken);
//           localStorage.setItem("isEmployee", "true");
//           localStorage.setItem("employeeName", employee.fullName);
//           login({
//             userType: "employee",
//             email: employee.email,
//             name: employee.fullName,
//             employeeId: employee.employeeId,
//             role: employee.role,
//             photo: employee.photo,
//             token: fakeToken,
//             loginTime: new Date().toISOString(),
//           });
//           navigate("/employee-dashboard");
//           return;
//         }

//         // Otherwise, try real API login
//         const res = await fetch(`${API}/employee/login`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             employeeId: username.trim(),
//             password: password.trim(),
//           }),
//         });
//         const data = await res.json();
//         if (!res.ok) {
//           throw new Error(data.error || "Invalid employee ID or password.");
//         }
//         localStorage.setItem("employeeToken", data.token);
//         localStorage.setItem("isEmployee", "true");
//         localStorage.setItem("employeeName", data.employee?.fullName);
//         login({
//           userType: "employee",
//           email: data.employee?.email,
//           name: data.employee?.fullName,
//           employeeId: data.employee?.employeeId,
//           role: data.employee?.role,
//           photo: data.employee?.photo,
//           token: data.token,
//           loginTime: new Date().toISOString(),
//         });
//         navigate("/employee-dashboard");
//         return;
//       }

//       // ---------- DEALER LOGIN ----------
//       if (role === "dealer") {
//         const res = await fetch(`${API}/dealer/login`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             username: username.trim(),
//             password: password.trim(),
//           }),
//         });
//         const data = await res.json();
//         if (!res.ok)
//           throw new Error(data.error || "Invalid dealer credentials.");
//         login({
//           userType: "dealer",
//           email: data.dealer?.email || data.user?.email,
//           name: data.dealer?.name || data.user?.name,
//           id: data.dealer?._id || data.dealer?.id,
//           token: data.token,
//           loginTime: new Date().toISOString(),
//         });
//         navigate("/dealer-dashboard");
//         return;
//       }

//       // ---------- CUSTOMER LOGIN (default) ----------
//       const res = await fetch(`${API}/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           username: username.trim(),
//           password: password.trim(),
//         }),
//       });
//       const data = await res.json();
//       if (!res.ok)
//         throw new Error(data.error || data.message || "Invalid credentials.");
//       login({
//         userType: "customer",
//         email: data.user?.email || data.customer?.email,
//         name: data.user?.name || data.customer?.name,
//         id: data.user?._id || data.user?.id,
//         token: data.token,
//         loginTime: new Date().toISOString(),
//       });
//       navigate("/customer-dashboard");
//     } catch (err) {
//       setError(err.message || "Login failed. Please check your credentials.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---- Render ----
//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: role === "admin" ? "#0f172a" : "#f8fafc",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: "20px",
//         paddingTop: "80px",
//       }}
//     >
//       <div
//         style={{
//           background: "#ffffff",
//           borderRadius: "24px",
//           padding: "40px",
//           maxWidth: "440px",
//           width: "100%",
//           boxShadow:
//             role === "admin"
//               ? "0 24px 48px rgba(0,0,0,0.4)"
//               : "0 8px 24px rgba(0,0,0,0.08)",
//           border: "1px solid #e5e7eb",
//         }}
//       >
//         {/* Header */}
//         <div style={{ textAlign: "center", marginBottom: "32px" }}>
//           <div
//             style={{
//               width: "80px",
//               height: "80px",
//               margin: "0 auto 16px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               background: config.color + "15",
//               borderRadius: "50%",
//               border: `2px solid ${config.color}30`,
//             }}
//           >
//             <img
//               src={config.icon}
//               alt={config.title}
//               style={{ width: "44px", height: "44px" }}
//             />
//           </div>
//           <h2
//             style={{
//               fontSize: "1.5rem",
//               fontWeight: 700,
//               color: "#111827",
//               marginBottom: "4px",
//             }}
//           >
//             {config.title}
//           </h2>
//           <p
//             style={{
//               color: "#9ca3af",
//               fontSize: "0.8rem",
//               fontWeight: 600,
//               textTransform: "uppercase",
//               letterSpacing: "0.05em",
//             }}
//           >
//             {config.subtitle}
//           </p>
//         </div>

//         {/* Admin security badge */}
//         {role === "admin" && (
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "8px",
//               background: "#fef2f2",
//               border: "1px solid #fca5a5",
//               borderRadius: "10px",
//               padding: "10px 14px",
//               marginBottom: "20px",
//             }}
//           >
//             <ShieldCheck size={16} color="#dc2626" />
//             <span
//               style={{ fontSize: "0.8rem", color: "#991b1b", fontWeight: 600 }}
//             >
//               Authorized personnel only. All access is logged.
//             </span>
//           </div>
//         )}

//         {/* Error message */}
//         {error && (
//           <div
//             style={{
//               background: "#fee2e2",
//               border: "1px solid #fca5a5",
//               borderRadius: "10px",
//               padding: "10px 14px",
//               marginBottom: "20px",
//               display: "flex",
//               alignItems: "center",
//               gap: "8px",
//               color: "#991b1b",
//               fontSize: "0.875rem",
//             }}
//           >
//             <AlertCircle size={16} />
//             {error}
//           </div>
//         )}

//         {/* QR Scanner (if scanning) */}
//         {qrScanning && (
//           <div style={{ marginBottom: "20px" }}>
//             <div
//               style={{
//                 position: "relative",
//                 borderRadius: "12px",
//                 overflow: "hidden",
//                 border: "2px solid #7c3aed",
//               }}
//             >
//               <QrScanner
//                 delay={300}
//                 onError={handleQrError}
//                 onScan={handleQrScan}
//                 style={{ width: "100%" }}
//               />
//               <button
//                 onClick={() => setQrScanning(false)}
//                 style={{
//                   position: "absolute",
//                   top: "10px",
//                   right: "10px",
//                   background: "#000000aa",
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: "50%",
//                   width: "32px",
//                   height: "32px",
//                   fontSize: "16px",
//                   cursor: "pointer",
//                 }}
//               >
//                 ✕
//               </button>
//             </div>
//             <p
//               style={{
//                 textAlign: "center",
//                 fontSize: "0.8rem",
//                 color: "#6b7280",
//                 marginTop: "8px",
//               }}
//             >
//               Position QR code in front of camera
//             </p>
//           </div>
//         )}

//         {!qrScanning && (
//           <>
//             {/* Login Form */}
//             <form onSubmit={handleSubmit}>
//               <div style={{ marginBottom: "16px" }}>
//                 <label
//                   style={{
//                     display: "block",
//                     fontSize: "0.8rem",
//                     fontWeight: 600,
//                     color: "#374151",
//                     marginBottom: "6px",
//                   }}
//                 >
//                   {config.fieldLabel}
//                 </label>
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     border: "1.5px solid #e5e7eb",
//                     borderRadius: "12px",
//                     padding: "0 14px",
//                   }}
//                 >
//                   {role === "admin" ? (
//                     <User size={18} color="#9ca3af" />
//                   ) : (
//                     <Mail size={18} color="#9ca3af" />
//                   )}
//                   <input
//                     type={config.fieldType}
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     placeholder={config.placeholder}
//                     style={{
//                       flex: 1,
//                       border: "none",
//                       padding: "13px 10px",
//                       outline: "none",
//                       fontSize: "0.95rem",
//                       fontFamily: "inherit",
//                       background: "transparent",
//                     }}
//                     autoComplete={role === "admin" ? "username" : "email"}
//                     required
//                   />
//                 </div>
//               </div>

//               <div style={{ marginBottom: "20px" }}>
//                 <label
//                   style={{
//                     display: "block",
//                     fontSize: "0.8rem",
//                     fontWeight: 600,
//                     color: "#374151",
//                     marginBottom: "6px",
//                   }}
//                 >
//                   Password
//                 </label>
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     border: "1.5px solid #e5e7eb",
//                     borderRadius: "12px",
//                     padding: "0 14px",
//                   }}
//                 >
//                   <Lock size={18} color="#9ca3af" />
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Enter your password"
//                     style={{
//                       flex: 1,
//                       border: "none",
//                       padding: "13px 10px",
//                       outline: "none",
//                       fontSize: "0.95rem",
//                       fontFamily: "inherit",
//                       background: "transparent",
//                     }}
//                     autoComplete="current-password"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     style={{
//                       background: "none",
//                       border: "none",
//                       color: "#9ca3af",
//                       cursor: "pointer",
//                       padding: "4px",
//                     }}
//                   >
//                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>
//               </div>

//               {config.showForgotPassword && (
//                 <div
//                   style={{
//                     textAlign: "right",
//                     marginBottom: "20px",
//                     marginTop: "-12px",
//                   }}
//                 >
//                   <span
//                     style={{
//                       color: config.color,
//                       fontSize: "0.8rem",
//                       fontWeight: 600,
//                       cursor: "pointer",
//                     }}
//                   >
//                     Forgot Password?
//                   </span>
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 disabled={loading}
//                 style={{
//                   width: "100%",
//                   padding: "14px",
//                   background: loading ? "#94a3b8" : config.color,
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: "100px",
//                   fontWeight: 700,
//                   fontSize: "1rem",
//                   cursor: loading ? "not-allowed" : "pointer",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   gap: "8px",
//                   transition: "background 0.2s",
//                 }}
//               >
//                 {loading ? (
//                   <>
//                     <Loader2
//                       size={18}
//                       style={{ animation: "spin 1s linear infinite" }}
//                     />
//                     Signing In...
//                   </>
//                 ) : (
//                   "Sign In"
//                 )}
//               </button>
//             </form>

//             {/* QR Login option for employee */}
//             {config.showQrLogin && (
//               <div
//                 style={{
//                   marginTop: "20px",
//                   borderTop: "1px solid #f3f4f6",
//                   paddingTop: "20px",
//                 }}
//               >
//                 <p
//                   style={{
//                     textAlign: "center",
//                     fontSize: "0.75rem",
//                     color: "#9ca3af",
//                     fontWeight: 600,
//                     textTransform: "uppercase",
//                     letterSpacing: "0.05em",
//                     marginBottom: "14px",
//                   }}
//                 >
//                   Or Sign In Using QR Code
//                 </p>
//                 <button
//                   type="button"
//                   onClick={() => setQrScanning(true)}
//                   style={{
//                     width: "100%",
//                     padding: "12px",
//                     background: "#f5f3ff",
//                     border: "1.5px solid #ddd6fe",
//                     borderRadius: "12px",
//                     color: "#7c3aed",
//                     fontWeight: 700,
//                     fontSize: "0.9rem",
//                     cursor: "pointer",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     gap: "8px",
//                     transition: "all 0.2s",
//                   }}
//                   onMouseEnter={(e) =>
//                     (e.currentTarget.style.borderColor = "#c084fc")
//                   }
//                   onMouseLeave={(e) =>
//                     (e.currentTarget.style.borderColor = "#ddd6fe")
//                   }
//                 >
//                   <QrCode size={18} /> Scan QR Code
//                 </button>
//               </div>
//             )}
//           </>
//         )}

//         {/* Register link */}
//         {config.showRegister && (
//           <div style={{ marginTop: "20px", textAlign: "center" }}>
//             <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
//               Don't have an account?{" "}
//               <Link
//                 to={config.registerPath}
//                 style={{
//                   color: config.color,
//                   fontWeight: 600,
//                   textDecoration: "none",
//                 }}
//               >
//                 Register Here
//               </Link>
//             </span>
//           </div>
//         )}

//         {/* Back link */}
//         <div style={{ marginTop: "16px", textAlign: "center" }}>
//           <Link
//             to="/login"
//             style={{
//               color: "#9ca3af",
//               fontSize: "0.8rem",
//               textDecoration: "none",
//               fontWeight: 500,
//             }}
//           >
//             ← Back to portal selection
//           </Link>
//         </div>
//       </div>

//       {/* Security badges */}
//       <div
//         style={{
//           display: "flex",
//           gap: "20px",
//           marginTop: "24px",
//           flexWrap: "wrap",
//           justifyContent: "center",
//         }}
//       >
//         {[
//           { icon: <Shield size={13} />, label: "SSL Encrypted" },
//           { icon: <CheckCircle size={13} />, label: "Secure Auth" },
//           { icon: <Lock size={13} />, label: "Data Protected" },
//         ].map((badge, i) => (
//           <div
//             key={i}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "5px",
//               color: role === "admin" ? "#64748b" : "#9ca3af",
//               fontSize: "0.7rem",
//               fontWeight: 600,
//               textTransform: "uppercase",
//               letterSpacing: "0.05em",
//             }}
//           >
//             {badge.icon} {badge.label}
//           </div>
//         ))}
//       </div>

//       <style>{`
//         @keyframes spin { to { transform: rotate(360deg); } }
//       `}</style>
//     </div>
//   );
// };
import EmployeeDashboard, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  CheckSquare,
  ClipboardList,
  Calendar,
  FileText,
  DollarSign,
  Upload,
  MessageSquare,
  Bell,
  User,
  LogOut,
  MapPin,
  Clock,
  Briefcase,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  TrendingUp,
  Award,
  Search,
  Plus,
  Trash2,
  Lock,
  Camera,
  Smartphone,
  Eye,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "../styles/EmployeeDashboard.css";

const API = "/api";

export const LoginPage = () => {
  // export function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const token = localStorage.getItem("employeeToken");

  const [activeTab, setActiveTab] = useState("dashboard");
  const [profile, setProfile] = useState(null);
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const [todayAttendance, setTodayAttendance] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [todos, setTodos] = useState([]);
  const [assignedOrders, setAssignedOrders] = useState([]);
  const [assignedLeads, setAssignedLeads] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [leaveBalance, setLeaveBalance] = useState({
    casual: 12,
    sick: 8,
    paid: 10,
    emergency: 5,
  });
  const [chatMessages, setChatMessages] = useState([]);
  const [chatRecipient, setChatRecipient] = useState("admin"); // Default chat with Admin
  const [chatInput, setChatInput] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form states
  const [leaveForm, setLeaveForm] = useState({
    leaveType: "Casual Leave",
    reason: "",
    fromDate: "",
    toDate: "",
  });
  const [todoForm, setTodoForm] = useState({
    title: "",
    dueDate: "",
    priority: "Medium",
  });
  const [profileForm, setProfileForm] = useState({
    email: "",
    mobile: "",
    alternateMobile: "",
    currentAddress: "",
    password: "",
  });
  const [taskProof, setTaskProof] = useState({
    taskId: "",
    comment: "",
    proofBase64: "",
  });

  const [clockInLoading, setClockInLoading] = useState(false);
  const [toast, setToast] = useState("");
  const chatBottomRef = useRef(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 4000);
  };

  // Auth Guard
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Fetch Dashboard Data
  const fetchDashboardData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const cachedProfile = JSON.parse(
        localStorage.getItem("employeeProfile") || "{}",
      );

      // 1. Fetch Profile
      const profRes = await fetch(`${API}/employee/profile`, { headers });
      if (profRes.status === 401) {
        if (token?.startsWith("employee-token-") && cachedProfile.employeeId) {
          setProfile(cachedProfile);
          setProfileForm({
            email: cachedProfile.email || "",
            mobile: cachedProfile.mobile || "",
            alternateMobile: cachedProfile.alternateMobile || "",
            currentAddress: cachedProfile.currentAddress || "",
            password: "",
          });
          return;
        }
        logout();
        navigate("/login");
        return;
      }
      if (!profRes.ok) {
        throw new Error("Employee profile could not be loaded");
      }
      const profData = await profRes.json();
      localStorage.setItem("employeeProfile", JSON.stringify(profData));
      setProfile(profData);
      setProfileForm({
        email: profData.email || "",
        mobile: profData.mobile || "",
        alternateMobile: profData.alternateMobile || "",
        currentAddress: profData.currentAddress || "",
        password: "",
      });

      // 2. Fetch Attendance Calendar logs
      const attRes = await fetch(`${API}/employee-hr/attendance/logs`, {
        headers,
      });
      if (attRes.ok) {
        const logs = await attRes.json();
        setAttendanceLogs(logs);
        // Find today's attendance log
        const todayStr = new Date().toISOString().split("T")[0];
        const todayLog = logs.find((l) => l.date === todayStr);
        setTodayAttendance(todayLog || null);
      }

      // 3. Fetch Tasks
      const taskRes = await fetch(`${API}/employee-hr/tasks`, { headers });
      if (taskRes.ok) setTasks(await taskRes.json());

      // 4. Fetch To-Do list
      const todoRes = await fetch(`${API}/employee-hr/todo`, { headers });
      if (todoRes.ok) setTodos(await todoRes.json());

      // 5. Fetch Announcements
      const annRes = await fetch(`${API}/employee-hr/announcements`, {
        headers,
      });
      if (annRes.ok) setAnnouncements(await annRes.json());

      // 6. Fetch Leaves
      const leaveRes = await fetch(`${API}/employee-hr/leave/history`, {
        headers,
      });
      if (leaveRes.ok) setLeaveHistory(await leaveRes.json());

      // 7. Leave balances
      const balRes = await fetch(`${API}/employee-hr/leave/balances`, {
        headers,
      });
      if (balRes.ok) setLeaveBalance(await balRes.json());

      // 8. Assigned Orders
      const orderRes = await fetch(`${API}/employee-hr/assigned-orders`, {
        headers,
      });
      if (orderRes.ok) setAssignedOrders(await orderRes.json());

      // 9. Assigned Leads
      const leadRes = await fetch(`${API}/employee-hr/assigned-leads`, {
        headers,
      });
      if (leadRes.ok) setAssignedLeads(await leadRes.json());
    } catch (err) {
      console.error("Error fetching employee dashboard data:", err);
      const cachedProfile = JSON.parse(
        localStorage.getItem("employeeProfile") || "{}",
      );
      if (cachedProfile.employeeId) {
        setProfile(cachedProfile);
      }
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  // Fetch Chat Messages regularly
  useEffect(() => {
    let interval;
    if (activeTab === "chat" && token) {
      const fetchMessages = async () => {
        try {
          const res = await fetch(
            `${API}/employee-hr/messages/${chatRecipient}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          if (res.ok) {
            setChatMessages(await res.json());
            chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
          }
        } catch (err) {
          console.error("Chat fetch error:", err);
        }
      };
      fetchMessages();
      interval = setInterval(fetchMessages, 4000);
    }
    return () => clearInterval(interval);
  }, [activeTab, chatRecipient, token]);

  // Trigger simulated live GPS updates for field employees
  useEffect(() => {
    let interval;
    if (
      token &&
      profile &&
      ["Sales Employee", "Technician", "Delivery Executive"].includes(
        profile.role,
      )
    ) {
      const reportLocation = async () => {
        // Mock a route movement around a central node (e.g. New Delhi)
        const baseLat = 28.6139;
        const baseLng = 77.209;
        const offsetLat = (Math.random() - 0.5) * 0.01;
        const offsetLng = (Math.random() - 0.5) * 0.01;

        try {
          await fetch(`${API}/employee/gps/track`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              latitude: baseLat + offsetLat,
              longitude: baseLng + offsetLng,
            }),
          });
        } catch (err) {
          console.warn("GPS tracking mock error:", err);
        }
      };
      reportLocation();
      interval = setInterval(reportLocation, 15000); // update every 15s
    }
    return () => clearInterval(interval);
  }, [token, profile]);

  // Handle Clock In / Out
  const handleClockInOut = async (action) => {
    setClockInLoading(true);
    try {
      const endpoint = `/employee-hr/attendance/${action}`;
      // Simulated GPS coordinates
      const latitude = 28.6139 + (Math.random() - 0.5) * 0.005;
      const longitude = 77.209 + (Math.random() - 0.5) * 0.005;

      const res = await fetch(`${API}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ latitude, longitude }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Attendance update failed");

      showToast(`Successfully registered ${action.replace("-", " ")}!`);
      fetchDashboardData();
    } catch (err) {
      showToast(err.message);
    } finally {
      setClockInLoading(false);
    }
  };

  // Submit Leave Request
  const handleApplyLeave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/employee-hr/leave/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(leaveForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Leave application failed");

      showToast("Leave request submitted to manager.");
      setLeaveForm({
        leaveType: "Casual Leave",
        reason: "",
        fromDate: "",
        toDate: "",
      });
      fetchDashboardData();
    } catch (err) {
      showToast(err.message);
    }
  };

  // Create To-Do
  const handleCreateTodo = async (e) => {
    e.preventDefault();
    if (!todoForm.title) return;
    try {
      const res = await fetch(`${API}/employee-hr/todo/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(todoForm),
      });
      if (res.ok) {
        setTodoForm({ title: "", dueDate: "", priority: "Medium" });
        showToast("Personal checklist updated.");
        fetchDashboardData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle To-Do Completion
  const handleToggleTodo = async (todo) => {
    try {
      const res = await fetch(`${API}/employee-hr/todo/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      if (res.ok) {
        fetchDashboardData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete To-Do
  const handleDeleteTodo = async (id) => {
    try {
      const res = await fetch(`${API}/employee-hr/todo/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        showToast("Item removed.");
        fetchDashboardData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Update Task Status
  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      const res = await fetch(`${API}/employee-hr/tasks/${taskId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        showToast(`Task status updated to ${newStatus}`);
        fetchDashboardData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Submit Task Completion Proof
  const handleSubmitTaskProof = async (e) => {
    e.preventDefault();
    if (!taskProof.taskId || !taskProof.comment) return;
    try {
      const res = await fetch(
        `${API}/employee-hr/tasks/${taskProof.taskId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: "Completed",
            proofAttachment:
              taskProof.proofBase64 ||
              "https://res.cloudinary.com/dummy-proof.pdf",
            completionComment: taskProof.comment,
          }),
        },
      );
      if (res.ok) {
        showToast("Task completed proof uploaded!");
        setTaskProof({ taskId: "", comment: "", proofBase64: "" });
        fetchDashboardData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Update Profile Info
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/employee/profile/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      showToast("Security and profile settings updated.");
      setProfileForm((prev) => ({ ...prev, password: "" }));
      fetchDashboardData();
    } catch (err) {
      showToast(err.message);
    }
  };

  // Send Chat Message
  const handleSendChatMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    try {
      const res = await fetch(`${API}/employee-hr/messages/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receiverId: chatRecipient,
          receiverModel: "Admin",
          message: chatInput.trim(),
        }),
      });
      if (res.ok) {
        setChatInput("");
        const msg = await res.json();
        setChatMessages((prev) => [...prev, msg]);
        chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err) {
      console.error("Chat send error:", err);
    }
  };

  // Update Order Delivery Status
  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      const res = await fetch(`${API}/employee-hr/assigned-orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        showToast(`Order status updated to ${status}`);
        fetchDashboardData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Update Lead Status
  const handleUpdateLeadStatus = async (leadId, status, notes) => {
    try {
      const res = await fetch(`${API}/employee-hr/assigned-leads/${leadId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status, notes }),
      });
      if (res.ok) {
        showToast(`Lead status updated to ${status}`);
        fetchDashboardData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Perform Logout
  const handleLogout = async () => {
    try {
      await fetch(`${API}/employee/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.warn("Logout error:", err);
    }
    localStorage.removeItem("employeeToken");
    localStorage.removeItem("isEmployee");
    localStorage.removeItem("employeeName");
    logout();
    navigate("/login");
  };

  // Helper date formatter
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (!profile) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-slate-400 font-medium">
            Loading Employee Workstation...
          </p>
        </div>
      </div>
    );
  }

  // Sidebar Menu Config
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    {
      id: "tasks",
      label: "My Tasks",
      icon: ClipboardList,
      count: tasks.filter((t) => t.status !== "Completed").length,
    },
    {
      id: "todo",
      label: "Personal To-Do",
      icon: CheckSquare,
      count: todos.filter((t) => !t.completed).length,
    },
    { id: "attendance", label: "Clock In/Out", icon: Clock },
    { id: "leaves", label: "Leaves Portal", icon: Calendar },
    { id: "salary", label: "Salary & Payslips", icon: FileText },
    { id: "documents", label: "Document Locker", icon: Upload },
    { id: "chat", label: "Internal Chat", icon: MessageSquare },
    {
      id: "announcements",
      label: "Announcements",
      icon: Bell,
      count: announcements.length,
    },
    { id: "profile", label: "Security & Settings", icon: User },
  ];

  // Restrict tabs based on role permissions
  // In a real application, the sidebar handles customizable visibility, but since this is Employee dashboard
  // it shows all HR-portal elements. If they have extra CRM modules (Sales employee seeing Leads / Orders):
  const showSalesCRM = [
    "Sales Employee",
    "Technician",
    "Manager",
    "Super Admin",
    "Admin",
  ].includes(profile.role);

  if (showSalesCRM) {
    // Inject Leads and Orders in the menu
    const insIndex = 3;
    if (!menuItems.some((m) => m.id === "assignedOrders")) {
      menuItems.splice(
        insIndex,
        0,
        {
          id: "assignedOrders",
          label: "Assigned Orders",
          icon: Briefcase,
          count: assignedOrders.filter(
            (o) =>
              o.orderStatus !== "DELIVERED" && o.orderStatus !== "CANCELLED",
          ).length,
        },
        {
          id: "assignedLeads",
          label: "Assigned Leads",
          icon: MapPin,
          count: assignedLeads.filter(
            (l) => l.status === "New" || l.status === "Pending",
          ).length,
        },
      );
    }
  }

  return (
    <div className="employee-dashboard-shell min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row pt-16">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 px-4 py-3 text-sm text-indigo-400 shadow-2xl animate-bounce">
          <AlertCircle size={16} />
          <span>{toast}</span>
        </div>
      )}

      {/* MOBILE HEADER */}
      <div className="md:hidden fixed top-16 left-0 right-0 h-14 bg-slate-900/90 backdrop-blur border-b border-slate-800 flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-2">
          <img
            src={
              profile.photo ||
              "https://cdn-icons-png.flaticon.com/128/912/912318.png"
            }
            className="w-8 h-8 rounded-full border border-indigo-500 object-cover"
          />
          <span className="font-semibold text-sm">{profile.fullName}</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-400 hover:text-white"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* SIDEBAR NAVIGATION */}
      <aside
        className={`fixed md:sticky top-0 md:top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-slate-900 border-r border-slate-800/80 p-4 flex flex-col z-30 transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Profile Card */}
        <div className="flex items-center gap-3 p-3 bg-slate-950 rounded-2xl border border-slate-800/50 mb-6">
          <div className="relative">
            <img
              src={
                profile.photo ||
                "https://cdn-icons-png.flaticon.com/128/912/912318.png"
              }
              alt="Photo"
              className="w-12 h-12 rounded-2xl object-cover border border-indigo-500/50"
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border border-slate-950"></div>
          </div>
          <div>
            <h4 className="font-bold text-sm tracking-tight truncate w-36">
              {profile.fullName}
            </h4>
            <p className="text-xs text-slate-500 truncate w-36">
              {profile.designation}
            </p>
            <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {profile.employeeId}
            </span>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 overflow-y-auto space-y-1 pr-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isSelected = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${isSelected ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"}`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    size={16}
                    className={isSelected ? "text-white" : "text-slate-500"}
                  />
                  <span>{item.label}</span>
                </div>
                {item.count > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${isSelected ? "bg-white text-indigo-600" : "bg-slate-800 text-slate-400 border border-slate-700"}`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl text-xs font-bold transition-all cursor-pointer"
        >
          <LogOut size={15} />
          <span>Sign Out Session</span>
        </button>
      </aside>

      {/* WORKSPACE CONTENT AREA */}
      <main className="employee-dashboard-main flex-1 p-4 md:p-8 overflow-y-auto max-w-none w-full pt-20 md:pt-8">
        {/* 1. DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Welcome banner */}
            <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900 border border-slate-800 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 flex-col md:flex-row text-center md:text-left">
                <img
                  src={
                    profile.photo ||
                    "https://cdn-icons-png.flaticon.com/128/912/912318.png"
                  }
                  className="w-20 h-20 rounded-3xl object-cover border-2 border-indigo-500"
                />
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">
                    Namaste, {profile.fullName}!
                  </h1>
                  <p className="text-sm text-slate-400 mt-1">
                    Have a productive shift. Reporting manager:{" "}
                    <strong className="text-indigo-400">
                      {profile.reportingManager || "HR Office"}
                    </strong>
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                    <span className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300 font-semibold">
                      {profile.department}
                    </span>
                    <span className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300 font-semibold">
                      {profile.shift || "General Shift"}
                    </span>
                    <span className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300 font-semibold">
                      Joined: {formatDate(profile.joiningDate)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-slate-950 border border-slate-800/80 px-6 py-4 rounded-2xl text-center min-w-44">
                <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                  KPI Rating
                </div>
                <div className="text-3xl font-black text-indigo-400 mt-1">
                  {profile.performanceScore || 100} / 100
                </div>
                <div className="text-[10px] text-emerald-400 font-bold flex items-center justify-center gap-1 mt-1">
                  <Award size={10} /> Top Performer
                </div>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800/60 p-4 rounded-2xl flex flex-col justify-between min-h-28">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Shift Status
                  </span>
                  <Clock size={16} className="text-indigo-500" />
                </div>
                <div className="mt-2">
                  <h3 className="text-base font-bold text-white truncate">
                    {todayAttendance
                      ? todayAttendance.status
                      : "Not Clocked In"}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {todayAttendance?.checkIn
                      ? `Clocked in at ${new Date(todayAttendance.checkIn).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
                      : "Clock in to start day"}
                  </p>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800/60 p-4 rounded-2xl flex flex-col justify-between min-h-28">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Active Tasks
                  </span>
                  <ClipboardList size={16} className="text-amber-500" />
                </div>
                <div className="mt-2">
                  <h3 className="text-2xl font-black text-white">
                    {tasks.filter((t) => t.status !== "Completed").length}{" "}
                    Pending
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {tasks.filter((t) => t.priority === "High").length} High
                    priority deadlines
                  </p>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800/60 p-4 rounded-2xl flex flex-col justify-between min-h-28">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Leave Balance
                  </span>
                  <Calendar size={16} className="text-emerald-500" />
                </div>
                <div className="mt-2">
                  <h3 className="text-2xl font-black text-white">
                    {leaveBalance.casual + leaveBalance.sick} Days
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {leaveBalance.casual} Casual, {leaveBalance.sick} Sick left
                  </p>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800/60 p-4 rounded-2xl flex flex-col justify-between min-h-28">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Assigned Orders
                  </span>
                  <Briefcase size={16} className="text-pink-500" />
                </div>
                <div className="mt-2">
                  <h3 className="text-2xl font-black text-white">
                    {assignedOrders.length} Orders
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {
                      assignedOrders.filter((o) => o.orderStatus === "PLACED")
                        .length
                    }{" "}
                    New allocations
                  </p>
                </div>
              </div>
            </div>

            {/* Dashboard Widgets */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Shift Attendance Control */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                <h3 className="font-bold text-sm tracking-wide text-white uppercase border-b border-slate-800 pb-2">
                  Shift Clock Room
                </h3>

                <div className="text-center py-4 bg-slate-950 rounded-xl border border-slate-850">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Active Timer
                  </div>
                  <div className="text-3xl font-black text-white font-mono mt-1">
                    {todayAttendance?.checkIn
                      ? todayAttendance.checkOut
                        ? "Shift Completed"
                        : `${todayAttendance.workingHours || "0.00"} Hrs`
                      : "00:00:00"}
                  </div>
                  <div className="text-xs text-indigo-400 mt-1">
                    Break Time: {todayAttendance?.breakTime || 0} mins
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {!todayAttendance?.checkIn ? (
                    <button
                      onClick={() => handleClockInOut("check-in")}
                      disabled={clockInLoading}
                      className="col-span-2 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center justify-center gap-2"
                    >
                      <MapPin size={14} /> Clock In Start Day
                    </button>
                  ) : !todayAttendance.checkOut ? (
                    <>
                      {/* Check if in active break */}
                      {todayAttendance.breaks?.some((b) => !b.end) ? (
                        <button
                          onClick={() => handleClockInOut("break-end")}
                          disabled={clockInLoading}
                          className="py-3 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-xl text-xs font-bold cursor-pointer border border-slate-700 transition-all"
                        >
                          End Break
                        </button>
                      ) : (
                        <button
                          onClick={() => handleClockInOut("break-start")}
                          disabled={clockInLoading}
                          className="py-3 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl text-xs font-bold cursor-pointer border border-slate-700 transition-all"
                        >
                          Start Break
                        </button>
                      )}
                      <button
                        onClick={() => handleClockInOut("check-out")}
                        disabled={clockInLoading}
                        className="py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold cursor-pointer transition-all"
                      >
                        Clock Out
                      </button>
                    </>
                  ) : (
                    <div className="col-span-2 text-center text-xs text-slate-500 font-semibold py-2">
                      🎉 Shift closed for today!
                    </div>
                  )}
                </div>
              </div>

              {/* Company Announcements */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl lg:col-span-2 space-y-4">
                <h3 className="font-bold text-sm tracking-wide text-white uppercase border-b border-slate-800 pb-2 flex justify-between items-center">
                  <span>Announcements Board</span>
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
                    {announcements.length} Posts
                  </span>
                </h3>
                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {announcements.map((post) => (
                    <div
                      key={post._id}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-850/80"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${post.type === "Holiday" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : post.type === "Policy" ? "bg-amber-500/10 text-amber-400" : "bg-indigo-500/10 text-indigo-400"}`}
                        >
                          {post.type}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {formatDate(post.createdAt)}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-slate-200 mt-2">
                        {post.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {post.content}
                      </p>
                    </div>
                  ))}
                  {announcements.length === 0 && (
                    <div className="text-center py-6 text-slate-500 text-xs font-medium">
                      No company notices posted recently.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Calendar widget */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <h3 className="font-bold text-sm tracking-wide text-white uppercase border-b border-slate-800 pb-2">
                Shift Attendance Log Calendar
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 mt-4">
                {attendanceLogs.slice(0, 14).map((log) => (
                  <div
                    key={log._id}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-850 flex flex-col items-center"
                  >
                    <span className="text-[10px] text-slate-500 font-bold">
                      {formatDate(log.date)}
                    </span>
                    <span
                      className={`inline-block mt-2 px-2 py-0.5 rounded-full text-[9px] font-black ${log.status === "Present" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25" : log.status === "Late" ? "bg-amber-500/10 text-amber-400 border border-amber-500/25" : "bg-rose-500/10 text-rose-400"}`}
                    >
                      {log.status}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1 font-semibold">
                      {log.workingHours || 0} Hrs
                    </span>
                  </div>
                ))}
                {attendanceLogs.length === 0 && (
                  <div className="col-span-full text-center text-xs text-slate-500 py-6">
                    No historical records in calendar.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 2. TASKS TAB */}
        {activeTab === "tasks" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-black text-white">
                  Work Assignments Console
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Complete tasks assigned by managers and upload proofs.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Task list */}
              <div className="lg:col-span-2 space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task._id}
                    className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between gap-4"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-sm text-slate-100">
                          {task.taskName}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                          {task.description}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[9px] font-black ${task.priority === "High" ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" : task.priority === "Medium" ? "bg-amber-500/10 text-amber-400" : "bg-slate-800 text-slate-400"}`}
                      >
                        {task.priority}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between text-xs border-t border-slate-800/80 pt-3 text-slate-500 gap-2">
                      <span>
                        Deadline:{" "}
                        <strong className="text-slate-300">
                          {formatDate(task.deadline)}
                        </strong>
                      </span>
                      <span>
                        Assigned by:{" "}
                        <strong className="text-slate-300">
                          {task.assignedBy || "HR Manager"}
                        </strong>
                      </span>
                      <div className="flex items-center gap-2">
                        <select
                          value={task.status}
                          onChange={(e) =>
                            handleUpdateTaskStatus(task._id, e.target.value)
                          }
                          className="bg-slate-950 border border-slate-850 text-slate-300 rounded-lg px-2 py-1 text-[11px] font-bold cursor-pointer"
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="On Hold">On Hold</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
                {tasks.length === 0 && (
                  <div className="text-center py-12 bg-slate-900 border border-slate-800/50 rounded-2xl">
                    <ClipboardList
                      size={40}
                      className="text-slate-600 mx-auto mb-2"
                    />
                    <p className="text-slate-500 text-xs font-semibold">
                      No tasks assigned currently. Clean desk!
                    </p>
                  </div>
                )}
              </div>

              {/* Task Proof Submission */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 h-fit">
                <h3 className="font-bold text-sm tracking-wide text-white uppercase border-b border-slate-800 pb-2">
                  Submit Proof of Completion
                </h3>
                <form onSubmit={handleSubmitTaskProof} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                      Select Active Task
                    </label>
                    <select
                      value={taskProof.taskId}
                      onChange={(e) =>
                        setTaskProof((prev) => ({
                          ...prev,
                          taskId: e.target.value,
                        }))
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 outline-none"
                      required
                    >
                      <option value="">-- Select Task --</option>
                      {tasks
                        .filter((t) => t.status !== "Completed")
                        .map((t) => (
                          <option key={t._id} value={t._id}>
                            {t.taskName}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                      Completion Notes / Comments
                    </label>
                    <textarea
                      value={taskProof.comment}
                      onChange={(e) =>
                        setTaskProof((prev) => ({
                          ...prev,
                          comment: e.target.value,
                        }))
                      }
                      placeholder="Explain work completed..."
                      className="w-full h-24 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 outline-none resize-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                      Upload Work Proof (Photo/PDF)
                    </label>
                    <input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () =>
                            setTaskProof((prev) => ({
                              ...prev,
                              proofBase64: reader.result,
                            }));
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="w-full bg-slate-950 border border-slate-850 text-slate-500 rounded-xl px-3 py-2 text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold cursor-pointer transition-all"
                  >
                    Submit Proof
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* 3. PERSONAL TO-DO TAB */}
        {activeTab === "todo" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-white">
                Personal Checklist
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Manage your private reminders and tasks. Completely invisible to
                admin.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* To-Do Form */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl h-fit space-y-4">
                <h3 className="font-bold text-sm tracking-wide text-white uppercase border-b border-slate-800 pb-2">
                  Add Checklist Item
                </h3>
                <form onSubmit={handleCreateTodo} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                      Task Title
                    </label>
                    <input
                      type="text"
                      value={todoForm.title}
                      onChange={(e) =>
                        setTodoForm((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder="e.g. Call Sharma ji for order verification"
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2.5 text-xs text-slate-300 outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={todoForm.dueDate}
                      onChange={(e) =>
                        setTodoForm((prev) => ({
                          ...prev,
                          dueDate: e.target.value,
                        }))
                      }
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-300 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                      Priority
                    </label>
                    <select
                      value={todoForm.priority}
                      onChange={(e) =>
                        setTodoForm((prev) => ({
                          ...prev,
                          priority: e.target.value,
                        }))
                      }
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-300 outline-none"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold cursor-pointer transition-all"
                  >
                    Add to Checklist
                  </button>
                </form>
              </div>

              {/* To-Do Items list */}
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                <h3 className="font-bold text-sm tracking-wide text-white uppercase border-b border-slate-800 pb-2">
                  Active Checklist
                </h3>
                <div className="space-y-3">
                  {todos.map((todo) => (
                    <div
                      key={todo.id}
                      className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-850"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => handleToggleTodo(todo)}
                          className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-700 cursor-pointer"
                        />
                        <div>
                          <p
                            className={`text-xs font-bold ${todo.completed ? "line-through text-slate-500" : "text-slate-200"}`}
                          >
                            {todo.title}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-1">
                            Due:{" "}
                            {todo.dueDate
                              ? formatDate(todo.dueDate)
                              : "No due date"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[8px] font-bold ${todo.priority === "High" ? "bg-rose-500/10 text-rose-400" : "bg-slate-800 text-slate-400"}`}
                        >
                          {todo.priority}
                        </span>
                        <button
                          onClick={() => handleDeleteTodo(todo.id)}
                          className="p-1 text-slate-500 hover:text-rose-400 cursor-pointer"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {todos.length === 0 && (
                    <div className="text-center py-10 text-slate-500 text-xs font-medium">
                      Your personal checklist is empty. Add a task to start!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. ASSIGNED ORDERS TAB */}
        {activeTab === "assignedOrders" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-white">
                Allocated Shipments & Orders
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Pack, process, and record delivery confirmation proofs.
              </p>
            </div>

            <div className="space-y-4">
              {assignedOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-850 pb-3">
                    <div>
                      <h4 className="font-bold text-xs text-indigo-400">
                        Order ID: {order.orderId}
                      </h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        Assigned Date: {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 font-semibold mr-2">
                        Grand Total:{" "}
                        <strong>
                          Rs {Number(order.grandTotal).toLocaleString()}
                        </strong>
                      </span>
                      <select
                        value={order.orderStatus}
                        onChange={(e) =>
                          handleUpdateOrderStatus(order._id, e.target.value)
                        }
                        className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg px-2 py-1 font-bold cursor-pointer"
                      >
                        <option value="PLACED">Placed</option>
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="OUT_FOR_DELIVERY">
                          Out for Delivery
                        </option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <h5 className="font-bold text-slate-500 uppercase tracking-wide text-[10px] mb-2">
                        Ship To Address
                      </h5>
                      <p className="text-slate-300 font-bold">
                        {order.shippingAddress?.fullName}
                      </p>
                      <p className="text-slate-400 mt-1">
                        {order.shippingAddress?.address},{" "}
                        {order.shippingAddress?.city} -{" "}
                        {order.shippingAddress?.pincode}
                      </p>
                      <p className="text-slate-400 font-bold mt-1">
                        Ph: {order.shippingAddress?.phone}
                      </p>
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-500 uppercase tracking-wide text-[10px] mb-2">
                        Order Items
                      </h5>
                      <div className="space-y-1.5 max-h-24 overflow-y-auto pr-1">
                        {order.items?.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between text-slate-300 bg-slate-950 p-1.5 rounded-lg"
                          >
                            <span>{item.productTitle}</span>
                            <span className="text-slate-500">
                              Qty: {item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {assignedOrders.length === 0 && (
                <div className="text-center py-12 bg-slate-900 border border-slate-800/50 rounded-2xl">
                  <Briefcase
                    size={45}
                    className="text-slate-700 mx-auto mb-2"
                  />
                  <p className="text-slate-500 text-xs font-semibold">
                    No active orders assigned to you currently.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 5. ASSIGNED LEADS TAB */}
        {activeTab === "assignedLeads" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-white">
                Customer Leads Pipeline
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Interact with buyers, track interest, and schedule meetings.
              </p>
            </div>

            <div className="space-y-4">
              {assignedLeads.map((lead) => (
                <div
                  key={lead._id}
                  className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-850 pb-3">
                    <div>
                      <h4 className="font-bold text-sm text-slate-200">
                        {lead.customer}
                      </h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        Source: {lead.source} | Req: {lead.product}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[9px] font-bold ${lead.priority === "Urgent" ? "bg-rose-500/15 text-rose-400" : "bg-slate-800 text-slate-400"}`}
                      >
                        {lead.priority}
                      </span>
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          handleUpdateLeadStatus(lead._id, e.target.value, "")
                        }
                        className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg px-2 py-1 font-bold cursor-pointer"
                      >
                        <option value="New">New</option>
                        <option value="Pending">Pending</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Converted">Converted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-400">
                    <div>
                      <p>
                        Company:{" "}
                        <strong className="text-slate-200">
                          {lead.company}
                        </strong>
                      </p>
                      <p className="mt-1">
                        Phone:{" "}
                        <strong className="text-slate-200">
                          {lead.phone || "No phone"}
                        </strong>
                      </p>
                      <p className="mt-1">
                        Email:{" "}
                        <strong className="text-slate-200">
                          {lead.email || "No email"}
                        </strong>
                      </p>
                    </div>
                    <div>
                      <p>
                        Description:{" "}
                        <strong className="text-slate-300 font-normal">
                          {lead.requirement || "Product inquiry"}
                        </strong>
                      </p>
                      <p className="mt-1">
                        Status Notes:{" "}
                        <strong className="text-slate-300 font-normal">
                          {lead.notes ||
                            "Call buyer to check requirement details."}
                        </strong>
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-slate-850 pt-3">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                      Add Conversation Note
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Type updates (e.g. Call done, interested in 10 units)..."
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && e.target.value.trim()) {
                            handleUpdateLeadStatus(
                              lead._id,
                              lead.status,
                              e.target.value.trim(),
                            );
                            e.target.value = "";
                          }
                        }}
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 outline-none"
                      />
                      <button
                        onClick={(e) => {
                          const input = e.currentTarget.previousSibling;
                          if (input.value.trim()) {
                            handleUpdateLeadStatus(
                              lead._id,
                              lead.status,
                              input.value.trim(),
                            );
                            input.value = "";
                          }
                        }}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl cursor-pointer"
                      >
                        Log
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {assignedLeads.length === 0 && (
                <div className="text-center py-12 bg-slate-900 border border-slate-800/50 rounded-2xl">
                  <MapPin size={45} className="text-slate-700 mx-auto mb-2" />
                  <p className="text-slate-500 text-xs font-semibold">
                    No assigned client leads in pipeline.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 6. LEAVES TAB */}
        {activeTab === "leaves" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-white">Leaves Portal</h2>
              <p className="text-xs text-slate-400 mt-1">
                Apply for leave, check approved leaves, and review remaining
                balances.
              </p>
            </div>

            {/* Leave balance cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Casual Leave
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  {leaveBalance.casual} Days
                </h3>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Sick Leave
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  {leaveBalance.sick} Days
                </h3>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Paid Leave
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  {leaveBalance.paid} Days
                </h3>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Emergency Leave
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  {leaveBalance.emergency} Days
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Apply Leave Form */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl h-fit space-y-4">
                <h3 className="font-bold text-sm tracking-wide text-white uppercase border-b border-slate-800 pb-2">
                  Apply for Leave
                </h3>
                <form onSubmit={handleApplyLeave} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                      Leave Type
                    </label>
                    <select
                      value={leaveForm.leaveType}
                      onChange={(e) =>
                        setLeaveForm((prev) => ({
                          ...prev,
                          leaveType: e.target.value,
                        }))
                      }
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2.5 text-xs text-slate-300 outline-none"
                    >
                      <option value="Casual Leave">Casual Leave</option>
                      <option value="Sick Leave">Sick Leave</option>
                      <option value="Paid Leave">Paid Leave</option>
                      <option value="Emergency Leave">Emergency Leave</option>
                      <option value="Half Day Leave">Half Day Leave</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                        From Date
                      </label>
                      <input
                        type="date"
                        value={leaveForm.fromDate}
                        onChange={(e) =>
                          setLeaveForm((prev) => ({
                            ...prev,
                            fromDate: e.target.value,
                          }))
                        }
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-300 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                        To Date
                      </label>
                      <input
                        type="date"
                        value={leaveForm.toDate}
                        onChange={(e) =>
                          setLeaveForm((prev) => ({
                            ...prev,
                            toDate: e.target.value,
                          }))
                        }
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-300 outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                      Reason for Leave
                    </label>
                    <textarea
                      value={leaveForm.reason}
                      onChange={(e) =>
                        setLeaveForm((prev) => ({
                          ...prev,
                          reason: e.target.value,
                        }))
                      }
                      placeholder="Brief details explaining reason..."
                      className="w-full h-20 bg-slate-950 border border-slate-850 rounded-xl px-3 py-2.5 text-xs text-slate-300 outline-none resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold cursor-pointer transition-all"
                  >
                    Submit Application
                  </button>
                </form>
              </div>

              {/* History */}
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                <h3 className="font-bold text-sm tracking-wide text-white uppercase border-b border-slate-800 pb-2">
                  Applications History
                </h3>
                <div className="space-y-3">
                  {leaveHistory.map((l) => (
                    <div
                      key={l._id}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-850 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-200">
                          {l.leaveType}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${l.status === "Approved" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : l.status === "Rejected" ? "bg-rose-500/10 text-rose-400" : "bg-amber-500/10 text-amber-400"}`}
                        >
                          {l.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Duration: {formatDate(l.fromDate)} to{" "}
                        {formatDate(l.toDate)}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Reason: {l.reason}
                      </p>
                      {l.managerComment && (
                        <p className="text-[10px] text-slate-500 bg-slate-900 p-1.5 rounded-lg">
                          Manager: "{l.managerComment}"
                        </p>
                      )}
                    </div>
                  ))}
                  {leaveHistory.length === 0 && (
                    <div className="text-center py-10 text-slate-500 text-xs font-medium">
                      No leave applications recorded.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 7. SALARY TAB */}
        {activeTab === "salary" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-white">
                Payroll & Payslips Locker
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Inspect released salary breakdowns and download payslips.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
              {/* Mock released slip */}
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-850 space-y-4 max-w-lg mx-auto">
                <div className="text-center border-b border-slate-800 pb-4">
                  <h3 className="font-extrabold text-white text-base">
                    DUSHYANT POWER TOOLS
                  </h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                    Monthly Salary Slip - July 2026
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs text-slate-400">
                  <p>
                    Employee ID:{" "}
                    <strong className="text-slate-200">
                      {profile.employeeId}
                    </strong>
                  </p>
                  <p>
                    Name:{" "}
                    <strong className="text-slate-200">
                      {profile.fullName}
                    </strong>
                  </p>
                  <p>
                    Department:{" "}
                    <strong className="text-slate-200">
                      {profile.department}
                    </strong>
                  </p>
                  <p>
                    Designation:{" "}
                    <strong className="text-slate-200">
                      {profile.designation}
                    </strong>
                  </p>
                </div>

                <div className="border-t border-slate-850 pt-4 space-y-2.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Basic Salary</span>
                    <strong className="text-white">
                      Rs {Number(profile.salary || 0).toLocaleString()}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">
                      Incentive Bonus (Sales Target)
                    </span>
                    <strong className="text-emerald-400">+ Rs 4,500</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Attendance Bonus</span>
                    <strong className="text-emerald-400">+ Rs 1,000</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">
                      Deductions (Unpaid Leaves/Lates)
                    </span>
                    <strong className="text-rose-400">- Rs 1,200</strong>
                  </div>
                  <div className="flex justify-between border-t border-slate-800 pt-3 text-sm font-black">
                    <span className="text-slate-300">Net Take Home Salary</span>
                    <strong className="text-indigo-400">
                      Rs {Number((profile.salary || 0) + 4300).toLocaleString()}
                    </strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => showToast("Downloading Payslip PDF...")}
                  className="w-full mt-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  <FileText size={14} /> Download Payslip Slip
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 8. DOCUMENTS TAB */}
        {activeTab === "documents" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-white">
                Verified Documents Locker
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Upload verified files for corporate record updates (Aadhaar,
                PAN, DL, Agreements).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Document upload card */}
              {[
                { label: "Aadhaar Card", key: "aadhaar" },
                { label: "PAN Card", key: "pan" },
                { label: "Driving License", key: "drivingLicense" },
                { label: "Agreement Form", key: "agreement" },
                { label: "Certificates Portfolio", key: "certificates" },
              ].map((doc) => (
                <div
                  key={doc.key}
                  className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between min-h-36"
                >
                  <div>
                    <h3 className="font-bold text-xs text-slate-200">
                      {doc.label}
                    </h3>
                    <p className="text-[10px] text-slate-500 mt-1">
                      Status:{" "}
                      <strong className="text-amber-400">Not Uploaded</strong>
                    </p>
                  </div>

                  <div className="mt-4">
                    <input
                      type="file"
                      onChange={() => showToast(`Uploading ${doc.label}...`)}
                      id={`upload-${doc.key}`}
                      className="hidden"
                    />
                    <label
                      htmlFor={`upload-${doc.key}`}
                      className="w-full py-2 bg-slate-950 border border-slate-800 hover:bg-slate-850 text-slate-300 rounded-xl text-[11px] font-bold cursor-pointer transition-all flex items-center justify-center gap-1.5"
                    >
                      <Upload size={13} /> Upload Document
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 9. CHAT TAB */}
        {activeTab === "chat" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-white">
                Internal Communications Channel
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Encrypted real-time discussions with Admin and Reporting
                Manager.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl grid grid-cols-1 lg:grid-cols-4 h-[500px]">
              {/* Contacts sidebar */}
              <div className="border-r border-slate-800/80 p-4 space-y-4 lg:col-span-1">
                <h3 className="font-bold text-xs text-slate-500 uppercase tracking-wider">
                  Contacts
                </h3>
                <button
                  onClick={() => setChatRecipient("admin")}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-xl border transition-all ${chatRecipient === "admin" ? "bg-indigo-600 text-white border-indigo-600" : "bg-slate-950 border-slate-850 hover:bg-slate-800 text-slate-300"}`}
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/25 flex items-center justify-center font-bold text-xs">
                    A
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold">Admin Portal</p>
                    <p className="text-[10px] text-slate-400">
                      Headquarters Support
                    </p>
                  </div>
                </button>
              </div>

              {/* Chat window */}
              <div className="lg:col-span-3 flex flex-col h-full bg-slate-950 rounded-r-2xl">
                {/* Messages header */}
                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                  <h4 className="font-bold text-xs text-slate-200">
                    Chat with:{" "}
                    {chatRecipient === "admin" ? "System Admin" : "Co-Worker"}
                  </h4>
                  <span className="w-2 h-2 bg-emerald-500 rounded-full border border-slate-950"></span>
                </div>

                {/* Messages body */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {chatMessages.map((msg) => {
                    const isSelf = msg.senderModel === "Employee";
                    return (
                      <div
                        key={msg._id}
                        className={`flex ${isSelf ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] p-3 rounded-2xl text-xs leading-relaxed ${isSelf ? "bg-indigo-600 text-white rounded-tr-none" : "bg-slate-850 text-slate-200 rounded-tl-none border border-slate-800"}`}
                        >
                          <p>{msg.message}</p>
                          <span className="block text-[8px] text-slate-400 text-right mt-1.5">
                            {new Date(msg.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={chatBottomRef}></div>
                </div>

                {/* Messages input */}
                <form
                  onSubmit={handleSendChatMessage}
                  className="p-3 border-t border-slate-800 bg-slate-900 rounded-br-2xl flex gap-2"
                >
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type encrypted message..."
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl cursor-pointer transition-all"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* 10. ANNOUNCEMENTS TAB */}
        {activeTab === "announcements" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-white">Notice Board</h2>
              <p className="text-xs text-slate-400 mt-1">
                Read all official updates, holidays, policy changes, and news.
              </p>
            </div>

            <div className="space-y-4">
              {announcements.map((post) => (
                <div
                  key={post._id}
                  className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3"
                >
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20">
                      {post.type}
                    </span>
                    <span>Date: {formatDate(post.createdAt)}</span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-200">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {post.content}
                  </p>
                </div>
              ))}
              {announcements.length === 0 && (
                <div className="text-center py-12 text-slate-500 text-xs font-medium">
                  Notice board is clear. Check back later!
                </div>
              )}
            </div>
          </div>
        )}

        {/* ATTENDANCE DEDICATED TAB */}
        {activeTab === "attendance" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-white">
                Attendance Record & Calendar
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Full attendance history, clock-in/out records, and monthly
                calendar view.
              </p>
            </div>

            {/* Attendance summary cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: "Present Days",
                  value: attendanceLogs.filter((l) => l.status === "Present")
                    .length,
                  color: "text-emerald-400",
                },
                {
                  label: "Late Entries",
                  value: attendanceLogs.filter((l) => l.lateEntry).length,
                  color: "text-amber-400",
                },
                {
                  label: "On Leave",
                  value: attendanceLogs.filter((l) => l.status === "On Leave")
                    .length,
                  color: "text-indigo-400",
                },
                {
                  label: "Absent Days",
                  value: attendanceLogs.filter((l) => l.status === "Absent")
                    .length,
                  color: "text-rose-400",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center"
                >
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    {stat.label}
                  </span>
                  <h3 className={`text-2xl font-black mt-1 ${stat.color}`}>
                    {stat.value}
                  </h3>
                </div>
              ))}
            </div>

            {/* Today's control */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <h3 className="font-bold text-sm text-white uppercase border-b border-slate-800 pb-2 mb-4">
                Today's Shift Controls
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="bg-slate-950 rounded-xl border border-slate-850 p-4 text-center">
                  <p className="text-[10px] text-slate-500 font-bold uppercase">
                    Clock-In Time
                  </p>
                  <p className="text-lg font-black text-white mt-1">
                    {todayAttendance?.checkIn
                      ? new Date(todayAttendance.checkIn).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )
                      : "--:--"}
                  </p>
                </div>
                <div className="flex justify-center gap-3">
                  {!todayAttendance?.checkIn ? (
                    <button
                      onClick={() => handleClockInOut("check-in")}
                      disabled={clockInLoading}
                      className="py-3 px-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-2"
                    >
                      <MapPin size={14} /> Clock In
                    </button>
                  ) : !todayAttendance?.checkOut ? (
                    <>
                      <button
                        onClick={() => handleClockInOut("break-start")}
                        disabled={clockInLoading}
                        className="py-2 px-4 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl text-xs font-bold cursor-pointer border border-slate-700 transition-all"
                      >
                        Break
                      </button>
                      <button
                        onClick={() => handleClockInOut("check-out")}
                        disabled={clockInLoading}
                        className="py-2 px-4 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold cursor-pointer transition-all"
                      >
                        Clock Out
                      </button>
                    </>
                  ) : (
                    <div className="text-emerald-400 font-bold text-sm">
                      ✅ Shift Completed
                    </div>
                  )}
                </div>
                <div className="bg-slate-950 rounded-xl border border-slate-850 p-4 text-center">
                  <p className="text-[10px] text-slate-500 font-bold uppercase">
                    Clock-Out Time
                  </p>
                  <p className="text-lg font-black text-white mt-1">
                    {todayAttendance?.checkOut
                      ? new Date(todayAttendance.checkOut).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )
                      : "--:--"}
                  </p>
                </div>
              </div>
            </div>

            {/* Full attendance log table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-slate-800">
                <h3 className="font-bold text-sm text-white uppercase">
                  Monthly Attendance Log
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-950 text-slate-500 font-bold uppercase">
                    <tr>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Check In</th>
                      <th className="px-4 py-3">Check Out</th>
                      <th className="px-4 py-3">Break Time</th>
                      <th className="px-4 py-3">Working Hours</th>
                      <th className="px-4 py-3">Overtime</th>
                      <th className="px-4 py-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 text-slate-300">
                    {attendanceLogs.map((log) => (
                      <tr
                        key={log._id}
                        className="hover:bg-slate-950/40 transition-colors"
                      >
                        <td className="px-4 py-3 font-mono font-bold">
                          {formatDate(log.date)}
                        </td>
                        <td className="px-4 py-3 text-slate-400">
                          {log.checkIn
                            ? new Date(log.checkIn).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "-"}
                        </td>
                        <td className="px-4 py-3 text-slate-400">
                          {log.checkOut
                            ? new Date(log.checkOut).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "-"}
                        </td>
                        <td className="px-4 py-3 text-amber-400">
                          {log.breakTime ? `${log.breakTime} min` : "-"}
                        </td>
                        <td className="px-4 py-3 font-bold text-white">
                          {log.workingHours ? `${log.workingHours} Hrs` : "-"}
                        </td>
                        <td className="px-4 py-3 text-emerald-400">
                          {log.overtime ? `${log.overtime} Hrs` : "-"}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                              log.status === "Present"
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : log.status === "Late"
                                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                  : log.status === "On Leave"
                                    ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                                    : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                            }`}
                          >
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {attendanceLogs.length === 0 && (
                      <tr>
                        <td
                          colSpan="7"
                          className="text-center py-10 text-slate-500"
                        >
                          No attendance records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 11. PROFILE SETTINGS TAB */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-white">
                Security & Profile Center
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Modify your contact parameters and review active logins across
                devices.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form settings */}
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                <h3 className="font-bold text-sm tracking-wide text-white uppercase border-b border-slate-800 pb-2">
                  Profile Details
                </h3>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) =>
                          setProfileForm((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-300 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                        Mobile Number
                      </label>
                      <input
                        type="text"
                        value={profileForm.mobile}
                        onChange={(e) =>
                          setProfileForm((prev) => ({
                            ...prev,
                            mobile: e.target.value,
                          }))
                        }
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-300 outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                        Alternate Mobile
                      </label>
                      <input
                        type="text"
                        value={profileForm.alternateMobile}
                        onChange={(e) =>
                          setProfileForm((prev) => ({
                            ...prev,
                            alternateMobile: e.target.value,
                          }))
                        }
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-300 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                        Current Address
                      </label>
                      <input
                        type="text"
                        value={profileForm.currentAddress}
                        onChange={(e) =>
                          setProfileForm((prev) => ({
                            ...prev,
                            currentAddress: e.target.value,
                          }))
                        }
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-xs text-slate-300 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                      Change Password (leave empty to keep current)
                    </label>
                    <input
                      type="password"
                      value={profileForm.password}
                      onChange={(e) =>
                        setProfileForm((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      placeholder="••••••••"
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2.5 text-xs text-slate-300 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold cursor-pointer transition-all"
                  >
                    Save Changes
                  </button>
                </form>
              </div>

              {/* Active Sessions */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl h-fit space-y-4">
                <h3 className="font-bold text-sm tracking-wide text-white uppercase border-b border-slate-800 pb-2">
                  Active Sessions
                </h3>
                <div className="space-y-3">
                  {profile.activeSessions?.map((session) => (
                    <div
                      key={session._id}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-850 space-y-1"
                    >
                      <div className="flex items-center gap-1.5 text-xs text-slate-300 font-bold">
                        <Smartphone size={13} className="text-indigo-400" />
                        <span>
                          {session.deviceName} ({session.browser})
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500">
                        IP: {session.ip}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        Logged in: {new Date(session.loginAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                  <button
                    onClick={async () => {
                      const res = await fetch(`${API}/employee/logout-all`, {
                        method: "POST",
                        headers: { Authorization: `Bearer ${token}` },
                      });
                      if (res.ok) {
                        showToast(
                          "Terminated other sessions. Please log in again.",
                        );
                        handleLogout();
                      }
                    }}
                    className="w-full py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl text-xs font-bold cursor-pointer transition-all"
                  >
                    Sign Out All Other Devices
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default LoginPage;
