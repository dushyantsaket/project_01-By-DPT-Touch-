import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  Clock,
  Calendar,
  ClipboardList,
  Briefcase,
  MapPin,
  UserCircle,
  Truck,
  TrendingUp,
  FileText,
  Activity,
  Settings,
  LogOut,
  Search,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Download,
  Upload,
  MessageSquare,
  Bell,
  User,
  Award,
  Star,
  Target,
  Zap,
  CreditCard,
  Gift,
  Smartphone,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Filter,
  RefreshCw,
  DollarSign,
  Package,
  ShoppingCart,
  Heart,
  Phone,
  Mail,
  MapPin as MapPinIcon,
  File,
  Image as ImageIcon,
  Lock,
  Key,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "../styles/EmployeeDashboard.css";

const API = "/api";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const token = localStorage.getItem("adminToken");

  // ---- Login State ----
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // ---- Dashboard State ----
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState("");

  // Data states
  const [employees, setEmployees] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [leads, setLeads] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [reports, setReports] = useState([]);

  // Form states for modals
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [employeeForm, setEmployeeForm] = useState({
    photo: "",
    name: "",
    employeeId: "",
    fatherName: "",
    mobile: "",
    email: "",
    aadhar: "",
    pan: "",
    dob: "",
    gender: "",
    address: "",
    joiningDate: "",
    department: "",
    designation: "",
    salary: "",
    reportingManager: "",
    status: "Active",
    documents: [],
  });

  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [leaveAction, setLeaveAction] = useState("");

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "Medium",
    deadline: "",
    attachments: [],
  });

  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderForm, setOrderForm] = useState({
    customer: "",
    items: [],
    total: 0,
    status: "PLACED",
    assignedTo: "",
  });

  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [customerForm, setCustomerForm] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    notes: "",
  });

  const [showDealerModal, setShowDealerModal] = useState(false);
  const [dealerForm, setDealerForm] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    price: "",
    payments: [],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // ---- Toast ----
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 4000);
  };

  // ---- Login Handler ----
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");
    if (loginId === "vpt" && loginPassword === "vpt@2026") {
      localStorage.setItem("adminToken", "mock-admin-token-vpt");
      localStorage.setItem("adminName", "VPT Admin");
      window.location.reload(); // Reload to apply token
    } else {
      setLoginError("Invalid admin ID or password.");
    }
  };

  // ---- Auth Guard ----
  useEffect(() => {
    if (!token) {
      // If no token, show login form (handled in return)
    }
  }, [token, navigate]);

  // ---- Fetch Data ----
  const fetchData = async () => {
    if (!token) return;
    try {
      const headers = { Authorization: `Bearer ${token}` };

      // Employees
      const empRes = await fetch(`${API}/admin/employees`, { headers });
      if (empRes.ok) setEmployees(await empRes.json());

      // Attendance
      const attRes = await fetch(`${API}/admin/attendance`, { headers });
      if (attRes.ok) setAttendanceRecords(await attRes.json());

      // Leave requests
      const leaveRes = await fetch(`${API}/admin/leave-requests`, { headers });
      if (leaveRes.ok) setLeaveRequests(await leaveRes.json());

      // Tasks
      const taskRes = await fetch(`${API}/admin/tasks`, { headers });
      if (taskRes.ok) setTasks(await taskRes.json());

      // Orders
      const orderRes = await fetch(`${API}/admin/orders`, { headers });
      if (orderRes.ok) setOrders(await orderRes.json());

      // Leads
      const leadRes = await fetch(`${API}/admin/leads`, { headers });
      if (leadRes.ok) setLeads(await leadRes.json());

      // Customers
      const custRes = await fetch(`${API}/admin/customers`, { headers });
      if (custRes.ok) setCustomers(await custRes.json());

      // Dealers
      const dealRes = await fetch(`${API}/admin/dealers`, { headers });
      if (dealRes.ok) setDealers(await dealRes.json());

      // Performance
      const perfRes = await fetch(`${API}/admin/performance`, { headers });
      if (perfRes.ok) setPerformanceData(await perfRes.json());

      // Activity logs
      const actRes = await fetch(`${API}/admin/activity-logs`, { headers });
      if (actRes.ok) setActivityLogs(await actRes.json());

      // Reports (summary)
      const repRes = await fetch(`${API}/admin/reports`, { headers });
      if (repRes.ok) setReports(await repRes.json());
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  // ---- Handlers for CRUD operations ----
  const handleCreateEmployee = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/admin/employees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(employeeForm),
      });
      if (res.ok) {
        showToast("✅ Employee created!");
        setShowEmployeeModal(false);
        setEmployeeForm({});
        fetchData();
      }
    } catch (err) {
      showToast("Error creating employee");
    }
  };

  const handleUpdateEmployee = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/admin/employees/${editingEmployee._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(employeeForm),
      });
      if (res.ok) {
        showToast("✅ Employee updated!");
        setShowEmployeeModal(false);
        setEditingEmployee(null);
        setEmployeeForm({});
        fetchData();
      }
    } catch (err) {
      showToast("Error updating employee");
    }
  };

  const handleDeleteEmployee = async (id) => {
    if (!confirm("Delete this employee?")) return;
    try {
      const res = await fetch(`${API}/admin/employees/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        showToast("🗑️ Employee deleted.");
        fetchData();
      }
    } catch (err) {
      showToast("Error deleting employee");
    }
  };

  const handleLeaveAction = async (leaveId, action) => {
    try {
      const res = await fetch(`${API}/admin/leave-requests/${leaveId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: action }),
      });
      if (res.ok) {
        showToast(`✅ Leave ${action}`);
        fetchData();
      }
    } catch (err) {
      showToast("Error updating leave");
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/admin/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskForm),
      });
      if (res.ok) {
        showToast("✅ Task created!");
        setShowTaskModal(false);
        setTaskForm({});
        fetchData();
      }
    } catch (err) {
      showToast("Error creating task");
    }
  };

  const handleCreateCustomer = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/admin/customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(customerForm),
      });
      if (res.ok) {
        showToast("✅ Customer added!");
        setShowCustomerModal(false);
        setCustomerForm({});
        fetchData();
      }
    } catch (err) {
      showToast("Error adding customer");
    }
  };

  const handleCreateDealer = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/admin/dealers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dealerForm),
      });
      if (res.ok) {
        showToast("✅ Dealer registered!");
        setShowDealerModal(false);
        setDealerForm({});
        fetchData();
      }
    } catch (err) {
      showToast("Error registering dealer");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API}/admin/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.warn("Logout error:", err);
    }
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    logout();
    window.location.reload(); // Reload to show login screen
  };

  // ---- Helpers ----
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    const map = {
      Active: "bg-emerald-50 text-emerald-600 border-emerald-200",
      Inactive: "bg-slate-50 text-slate-600 border-slate-200",
      Pending: "bg-amber-50 text-amber-600 border-amber-200",
      Approved: "bg-emerald-50 text-emerald-600 border-emerald-200",
      Rejected: "bg-red-50 text-red-600 border-red-200",
      "In Progress": "bg-blue-50 text-blue-600 border-blue-200",
      Completed: "bg-emerald-50 text-emerald-600 border-emerald-200",
      PLACED: "bg-amber-50 text-amber-600 border-amber-200",
      CONFIRMED: "bg-blue-50 text-blue-600 border-blue-200",
      SHIPPED: "bg-indigo-50 text-indigo-600 border-indigo-200",
      DELIVERED: "bg-emerald-50 text-emerald-600 border-emerald-200",
      CANCELLED: "bg-red-50 text-red-600 border-red-200",
      New: "bg-blue-50 text-blue-600 border-blue-200",
      Contacted: "bg-amber-50 text-amber-600 border-amber-200",
      Converted: "bg-emerald-50 text-emerald-600 border-emerald-200",
      Closed: "bg-slate-50 text-slate-600 border-slate-200",
    };
    return map[status] || "bg-slate-50 text-slate-600 border-slate-200";
  };

  // ---- Sidebar menu ----
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "employees", label: "Employees", icon: Users },
    { id: "attendance", label: "Attendance", icon: Clock },
    { id: "leave", label: "Leave Requests", icon: Calendar },
    { id: "tasks", label: "Tasks", icon: ClipboardList },
    { id: "orders", label: "Orders", icon: Briefcase },
    { id: "leads", label: "Leads", icon: MapPin },
    { id: "customers", label: "Customers", icon: UserCircle },
    { id: "dealers", label: "Dealers", icon: Truck },
    { id: "performance", label: "Performance", icon: TrendingUp },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "activity", label: "Activity Logs", icon: Activity },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // ---- Login Screen ----
  if (!token) {
    return (
      <div className="admin-dashboard-shell min-h-screen flex items-center justify-center bg-slate-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full border border-slate-200">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto bg-red-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              A
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mt-4">
              Admin Login
            </h2>
            <p className="text-sm text-slate-500">
              Enter your credentials to access the panel
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                Admin ID
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <User size={16} />
                </span>
                <input
                  type="text"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-700 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  placeholder="Enter admin ID"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <Lock size={16} />
                </span>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-700 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>
            {loginError && (
              <div className="text-red-600 text-sm bg-red-50 p-2 rounded-lg border border-red-200">
                {loginError}
              </div>
            )}
            <button
              type="submit"
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold transition"
            >
              Sign In
            </button>
          </form>
          <div className="mt-4 text-center text-xs text-slate-400">
            Default: <span className="font-mono text-slate-600">vpt</span> /{" "}
            <span className="font-mono text-slate-600">vpt@2026</span>
          </div>
        </div>
      </div>
    );
  }

  // ---- Main Dashboard (only shown when token exists) ----
  return (
    <div className="admin-dashboard-shell min-h-screen flex flex-col md:flex-row pt-16">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 rounded-lg bg-white border border-slate-200 px-5 py-3 text-sm text-red-600 shadow-md">
          <AlertCircle size={16} />
          <span>{toast}</span>
        </div>
      )}

      {/* Mobile Header */}
      <div className="md:hidden fixed top-16 left-0 right-0 h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-2">
          <span className="font-bold text-red-600">Admin Panel</span>
          <span className="text-xs text-slate-500">
            ({localStorage.getItem("adminName") || "Admin"})
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-600 hover:text-slate-900"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 md:top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-slate-200 p-4 flex flex-col z-30 transition-transform duration-300 ${
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 mb-6">
          <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-lg">
            A
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-800">
              {localStorage.getItem("adminName") || "Admin"}
            </h4>
            <p className="text-xs text-slate-500">Super Admin</p>
          </div>
        </div>

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
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  isSelected
                    ? "bg-red-50 text-red-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-sm font-bold transition-all"
        >
          <LogOut size={15} />
          <span>Sign Out</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto w-full pt-20 md:pt-6 max-w-7xl mx-auto">
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase">
                    Employees
                  </span>
                  <Users size={18} className="text-red-600" />
                </div>
                <p className="text-2xl font-bold text-slate-800 mt-2">
                  {employees.length}
                </p>
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase">
                    Tasks Pending
                  </span>
                  <ClipboardList size={18} className="text-amber-600" />
                </div>
                <p className="text-2xl font-bold text-slate-800 mt-2">
                  {tasks.filter((t) => t.status !== "Completed").length}
                </p>
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase">
                    Leave Requests
                  </span>
                  <Calendar size={18} className="text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-slate-800 mt-2">
                  {leaveRequests.filter((l) => l.status === "Pending").length}
                </p>
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase">
                    Orders
                  </span>
                  <Briefcase size={18} className="text-indigo-600" />
                </div>
                <p className="text-2xl font-bold text-slate-800 mt-2">
                  {orders.length}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-slate-200 p-5 rounded-lg shadow-sm">
              <h3 className="font-bold text-sm text-slate-800 border-b border-slate-200 pb-2 mb-4">
                Quick Actions
              </h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setShowEmployeeModal(true)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition"
                >
                  + Add Employee
                </button>
                <button
                  onClick={() => setShowTaskModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition"
                >
                  + Create Task
                </button>
                <button
                  onClick={() => setShowCustomerModal(true)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition"
                >
                  + Add Customer
                </button>
                <button
                  onClick={() => setShowDealerModal(true)}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-bold hover:bg-amber-700 transition"
                >
                  + Register Dealer
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-slate-200 p-5 rounded-lg shadow-sm">
              <h3 className="font-bold text-sm text-slate-800 border-b border-slate-200 pb-2 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {activityLogs.slice(0, 10).map((log) => (
                  <div
                    key={log._id}
                    className="flex items-center justify-between text-sm border-b border-slate-100 py-2"
                  >
                    <span className="text-slate-700">{log.action}</span>
                    <span className="text-xs text-slate-500">
                      {formatDateTime(log.timestamp)}
                    </span>
                  </div>
                ))}
                {activityLogs.length === 0 && (
                  <p className="text-slate-500 text-sm">No recent activity</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "employees" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Employees</h2>
                <p className="text-sm text-slate-500">Manage all employees</p>
              </div>
              <button
                onClick={() => {
                  setEditingEmployee(null);
                  setEmployeeForm({});
                  setShowEmployeeModal(true);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition flex items-center gap-2"
              >
                <Plus size={16} /> Add Employee
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center bg-white border border-slate-200 p-3 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                <Search size={16} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, ID, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-sm text-slate-700"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-700 outline-none"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase">
                    <tr>
                      <th className="px-4 py-3">Photo</th>
                      <th className="px-4 py-3">ID</th>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Designation</th>
                      <th className="px-4 py-3">Mobile</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    {employees
                      .filter(
                        (emp) =>
                          emp.name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          emp.employeeId
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          emp.email
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()),
                      )
                      .filter(
                        (emp) =>
                          filterStatus === "all" || emp.status === filterStatus,
                      )
                      .map((emp) => (
                        <tr
                          key={emp._id}
                          className="hover:bg-slate-50 transition"
                        >
                          <td className="px-4 py-3">
                            <img
                              src={
                                emp.photo ||
                                "https://cdn-icons-png.flaticon.com/128/912/912318.png"
                              }
                              alt={emp.name}
                              className="w-8 h-8 rounded-full object-cover border border-slate-200"
                            />
                          </td>
                          <td className="px-4 py-3 font-mono font-bold">
                            {emp.employeeId}
                          </td>
                          <td className="px-4 py-3 font-medium">{emp.name}</td>
                          <td className="px-4 py-3">{emp.designation}</td>
                          <td className="px-4 py-3">{emp.mobile}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(emp.status)}`}
                            >
                              {emp.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => {
                                setEditingEmployee(emp);
                                setEmployeeForm(emp);
                                setShowEmployeeModal(true);
                              }}
                              className="p-1 text-blue-600 hover:text-blue-800"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteEmployee(emp._id)}
                              className="p-1 text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={16} />
                            </button>
                            <button className="p-1 text-slate-500 hover:text-slate-700">
                              <Eye size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    {employees.length === 0 && (
                      <tr>
                        <td
                          colSpan="7"
                          className="text-center py-10 text-slate-500"
                        >
                          No employees found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "attendance" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800">
              Attendance Management
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm text-center">
                <span className="text-xs font-bold text-slate-500 uppercase">
                  Today Present
                </span>
                <p className="text-2xl font-bold text-emerald-600 mt-1">
                  {
                    attendanceRecords.filter(
                      (a) =>
                        new Date(a.date).toDateString() ===
                          new Date().toDateString() && a.status === "Present",
                    ).length
                  }
                </p>
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm text-center">
                <span className="text-xs font-bold text-slate-500 uppercase">
                  Today Late
                </span>
                <p className="text-2xl font-bold text-amber-600 mt-1">
                  {
                    attendanceRecords.filter(
                      (a) =>
                        new Date(a.date).toDateString() ===
                          new Date().toDateString() && a.lateEntry,
                    ).length
                  }
                </p>
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm text-center">
                <span className="text-xs font-bold text-slate-500 uppercase">
                  On Leave
                </span>
                <p className="text-2xl font-bold text-blue-600 mt-1">
                  {
                    attendanceRecords.filter(
                      (a) =>
                        new Date(a.date).toDateString() ===
                          new Date().toDateString() && a.status === "On Leave",
                    ).length
                  }
                </p>
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm text-center">
                <span className="text-xs font-bold text-slate-500 uppercase">
                  Absent
                </span>
                <p className="text-2xl font-bold text-red-600 mt-1">
                  {
                    attendanceRecords.filter(
                      (a) =>
                        new Date(a.date).toDateString() ===
                          new Date().toDateString() && a.status === "Absent",
                    ).length
                  }
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-200">
                <h3 className="font-bold text-sm text-slate-800">
                  Attendance Logs
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase">
                    <tr>
                      <th className="px-4 py-3">Employee</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Check In</th>
                      <th className="px-4 py-3">Check Out</th>
                      <th className="px-4 py-3">Hours</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    {attendanceRecords.map((rec) => (
                      <tr
                        key={rec._id}
                        className="hover:bg-slate-50 transition"
                      >
                        <td className="px-4 py-3 font-medium">
                          {rec.employeeName}
                        </td>
                        <td className="px-4 py-3">{formatDate(rec.date)}</td>
                        <td className="px-4 py-3">
                          {rec.checkIn ? formatDateTime(rec.checkIn) : "-"}
                        </td>
                        <td className="px-4 py-3">
                          {rec.checkOut ? formatDateTime(rec.checkOut) : "-"}
                        </td>
                        <td className="px-4 py-3">
                          {rec.workingHours ? rec.workingHours + "h" : "-"}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(rec.status)}`}
                          >
                            {rec.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {attendanceRecords.length === 0 && (
                      <tr>
                        <td
                          colSpan="6"
                          className="text-center py-10 text-slate-500"
                        >
                          No records
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "leave" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800">Leave Requests</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm text-center">
                <span className="text-xs font-bold text-slate-500 uppercase">
                  Pending
                </span>
                <p className="text-2xl font-bold text-amber-600 mt-1">
                  {leaveRequests.filter((l) => l.status === "Pending").length}
                </p>
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm text-center">
                <span className="text-xs font-bold text-slate-500 uppercase">
                  Approved
                </span>
                <p className="text-2xl font-bold text-emerald-600 mt-1">
                  {leaveRequests.filter((l) => l.status === "Approved").length}
                </p>
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm text-center">
                <span className="text-xs font-bold text-slate-500 uppercase">
                  Rejected
                </span>
                <p className="text-2xl font-bold text-red-600 mt-1">
                  {leaveRequests.filter((l) => l.status === "Rejected").length}
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase">
                    <tr>
                      <th className="px-4 py-3">Employee</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3">From</th>
                      <th className="px-4 py-3">To</th>
                      <th className="px-4 py-3">Reason</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    {leaveRequests.map((leave) => (
                      <tr
                        key={leave._id}
                        className="hover:bg-slate-50 transition"
                      >
                        <td className="px-4 py-3 font-medium">
                          {leave.employeeName}
                        </td>
                        <td className="px-4 py-3">{leave.leaveType}</td>
                        <td className="px-4 py-3">
                          {formatDate(leave.fromDate)}
                        </td>
                        <td className="px-4 py-3">
                          {formatDate(leave.toDate)}
                        </td>
                        <td className="px-4 py-3 max-w-[150px] truncate">
                          {leave.reason}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(leave.status)}`}
                          >
                            {leave.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {leave.status === "Pending" && (
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() =>
                                  handleLeaveAction(leave._id, "Approved")
                                }
                                className="p-1 text-emerald-600 hover:text-emerald-800"
                              >
                                <CheckCircle size={16} />
                              </button>
                              <button
                                onClick={() =>
                                  handleLeaveAction(leave._id, "Rejected")
                                }
                                className="p-1 text-red-600 hover:text-red-800"
                              >
                                <XCircle size={16} />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                    {leaveRequests.length === 0 && (
                      <tr>
                        <td
                          colSpan="7"
                          className="text-center py-10 text-slate-500"
                        >
                          No requests
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "tasks" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Tasks</h2>
                <p className="text-sm text-slate-500">
                  Create and manage tasks
                </p>
              </div>
              <button
                onClick={() => {
                  setTaskForm({});
                  setShowTaskModal(true);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition flex items-center gap-2"
              >
                <Plus size={16} /> New Task
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase">
                    <tr>
                      <th className="px-4 py-3">Title</th>
                      <th className="px-4 py-3">Assigned To</th>
                      <th className="px-4 py-3">Priority</th>
                      <th className="px-4 py-3">Deadline</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    {tasks.map((task) => (
                      <tr
                        key={task._id}
                        className="hover:bg-slate-50 transition"
                      >
                        <td className="px-4 py-3 font-medium">{task.title}</td>
                        <td className="px-4 py-3">
                          {task.assignedTo?.name || "Unassigned"}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                              task.priority === "High"
                                ? "bg-red-50 text-red-600 border-red-200"
                                : task.priority === "Medium"
                                  ? "bg-amber-50 text-amber-600 border-amber-200"
                                  : "bg-slate-100 text-slate-600 border-slate-200"
                            }`}
                          >
                            {task.priority}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {formatDate(task.deadline)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(task.status)}`}
                          >
                            {task.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button className="p-1 text-blue-600 hover:text-blue-800">
                            <Edit size={16} />
                          </button>
                          <button className="p-1 text-red-600 hover:text-red-800">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {tasks.length === 0 && (
                      <tr>
                        <td
                          colSpan="6"
                          className="text-center py-10 text-slate-500"
                        >
                          No tasks
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800">Orders</h2>
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase">
                    <tr>
                      <th className="px-4 py-3">Order ID</th>
                      <th className="px-4 py-3">Customer</th>
                      <th className="px-4 py-3">Total</th>
                      <th className="px-4 py-3">Assigned To</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    {orders.map((order) => (
                      <tr
                        key={order._id}
                        className="hover:bg-slate-50 transition"
                      >
                        <td className="px-4 py-3 font-mono font-bold">
                          {order.orderId}
                        </td>
                        <td className="px-4 py-3">{order.customer?.name}</td>
                        <td className="px-4 py-3">₹{order.total}</td>
                        <td className="px-4 py-3">
                          {order.assignedTo?.name || "Unassigned"}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(order.status)}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button className="p-1 text-blue-600 hover:text-blue-800">
                            <Edit size={16} />
                          </button>
                          <button className="p-1 text-red-600 hover:text-red-800">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {orders.length === 0 && (
                      <tr>
                        <td
                          colSpan="6"
                          className="text-center py-10 text-slate-500"
                        >
                          No orders
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "leads" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800">Leads</h2>
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase">
                    <tr>
                      <th className="px-4 py-3">Customer</th>
                      <th className="px-4 py-3">Phone</th>
                      <th className="px-4 py-3">Product</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Assigned To</th>
                      <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    {leads.map((lead) => (
                      <tr
                        key={lead._id}
                        className="hover:bg-slate-50 transition"
                      >
                        <td className="px-4 py-3 font-medium">
                          {lead.customer}
                        </td>
                        <td className="px-4 py-3">{lead.phone}</td>
                        <td className="px-4 py-3">{lead.product}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(lead.status)}`}
                          >
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {lead.assignedTo?.name || "Unassigned"}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button className="p-1 text-blue-600 hover:text-blue-800">
                            <Edit size={16} />
                          </button>
                          <button className="p-1 text-red-600 hover:text-red-800">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {leads.length === 0 && (
                      <tr>
                        <td
                          colSpan="6"
                          className="text-center py-10 text-slate-500"
                        >
                          No leads
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "customers" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Customers</h2>
                <p className="text-sm text-slate-500">
                  Manage customer data, support tickets, wallets
                </p>
              </div>
              <button
                onClick={() => setShowCustomerModal(true)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition flex items-center gap-2"
              >
                <Plus size={16} /> Add Customer
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase">
                    <tr>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Mobile</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Orders</th>
                      <th className="px-4 py-3">Wallet</th>
                      <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    {customers.map((cust) => (
                      <tr
                        key={cust._id}
                        className="hover:bg-slate-50 transition"
                      >
                        <td className="px-4 py-3 font-medium">{cust.name}</td>
                        <td className="px-4 py-3">{cust.mobile}</td>
                        <td className="px-4 py-3">{cust.email}</td>
                        <td className="px-4 py-3">{cust.orderCount || 0}</td>
                        <td className="px-4 py-3">₹{cust.wallet || 0}</td>
                        <td className="px-4 py-3 text-center">
                          <button className="p-1 text-blue-600 hover:text-blue-800">
                            <Edit size={16} />
                          </button>
                          <button className="p-1 text-red-600 hover:text-red-800">
                            <Trash2 size={16} />
                          </button>
                          <button className="p-1 text-slate-500 hover:text-slate-700">
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {customers.length === 0 && (
                      <tr>
                        <td
                          colSpan="6"
                          className="text-center py-10 text-slate-500"
                        >
                          No customers
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "dealers" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Dealers</h2>
                <p className="text-sm text-slate-500">
                  Registration, pricing, orders, payments
                </p>
              </div>
              <button
                onClick={() => setShowDealerModal(true)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition flex items-center gap-2"
              >
                <Plus size={16} /> Register Dealer
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase">
                    <tr>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Mobile</th>
                      <th className="px-4 py-3">Price</th>
                      <th className="px-4 py-3">Orders</th>
                      <th className="px-4 py-3">Payments</th>
                      <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    {dealers.map((dealer) => (
                      <tr
                        key={dealer._id}
                        className="hover:bg-slate-50 transition"
                      >
                        <td className="px-4 py-3 font-medium">{dealer.name}</td>
                        <td className="px-4 py-3">{dealer.mobile}</td>
                        <td className="px-4 py-3">₹{dealer.price}</td>
                        <td className="px-4 py-3">{dealer.orderCount || 0}</td>
                        <td className="px-4 py-3">
                          {dealer.payments?.length || 0}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button className="p-1 text-blue-600 hover:text-blue-800">
                            <Edit size={16} />
                          </button>
                          <button className="p-1 text-red-600 hover:text-red-800">
                            <Trash2 size={16} />
                          </button>
                          <button className="p-1 text-slate-500 hover:text-slate-700">
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {dealers.length === 0 && (
                      <tr>
                        <td
                          colSpan="6"
                          className="text-center py-10 text-slate-500"
                        >
                          No dealers
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "performance" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800">
              Performance Board
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {performanceData.map((p) => (
                <div
                  key={p._id}
                  className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        p.photo ||
                        "https://cdn-icons-png.flaticon.com/128/912/912318.png"
                      }
                      alt={p.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">
                        {p.name}
                      </h4>
                      <p className="text-xs text-slate-500">{p.designation}</p>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-slate-500">Score:</span>{" "}
                      <strong className="text-slate-800">
                        {p.score || 0}%
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500">Tasks:</span>{" "}
                      <strong className="text-slate-800">
                        {p.tasksCompleted}/{p.tasksAssigned}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500">Orders:</span>{" "}
                      <strong className="text-slate-800">
                        {p.ordersDelivered}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500">Rating:</span>{" "}
                      <strong className="text-slate-800">
                        {p.rating || 0}⭐
                      </strong>
                    </div>
                  </div>
                </div>
              ))}
              {performanceData.length === 0 && (
                <div className="col-span-full text-center py-10 text-slate-500">
                  No performance data
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "reports" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800">Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-sm text-slate-800">
                  Sales Report
                </h3>
                <p className="text-2xl font-bold text-slate-800 mt-2">
                  ₹{reports.sales || 0}
                </p>
                <button className="mt-2 px-4 py-1 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition">
                  Download
                </button>
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-sm text-slate-800">
                  Attendance Report
                </h3>
                <p className="text-2xl font-bold text-slate-800 mt-2">
                  {reports.attendance || 0}%
                </p>
                <button className="mt-2 px-4 py-1 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition">
                  Download
                </button>
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-sm text-slate-800">
                  Task Completion
                </h3>
                <p className="text-2xl font-bold text-slate-800 mt-2">
                  {reports.taskCompletion || 0}%
                </p>
                <button className="mt-2 px-4 py-1 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition">
                  Download
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "activity" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800">Activity Logs</h2>
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase">
                    <tr>
                      <th className="px-4 py-3">Timestamp</th>
                      <th className="px-4 py-3">User</th>
                      <th className="px-4 py-3">Action</th>
                      <th className="px-4 py-3">Details</th>
                      <th className="px-4 py-3">IP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    {activityLogs.map((log) => (
                      <tr
                        key={log._id}
                        className="hover:bg-slate-50 transition"
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          {formatDateTime(log.timestamp)}
                        </td>
                        <td className="px-4 py-3">{log.user}</td>
                        <td className="px-4 py-3 font-medium">{log.action}</td>
                        <td className="px-4 py-3">{log.details || "—"}</td>
                        <td className="px-4 py-3 font-mono text-xs">
                          {log.ip || "—"}
                        </td>
                      </tr>
                    ))}
                    {activityLogs.length === 0 && (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center py-10 text-slate-500"
                        >
                          No logs
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800">Settings</h2>
            <div className="bg-white border border-slate-200 p-5 rounded-lg shadow-sm">
              <h3 className="font-bold text-sm text-slate-800 border-b border-slate-200 pb-2 mb-4">
                Role Management
              </h3>
              <p className="text-sm text-slate-600">
                Manage roles and permissions for employees.
              </p>
              {/* Placeholder for role management UI */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-medium text-slate-700">Admin</span>
                  <span className="text-xs text-slate-500">Full access</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-medium text-slate-700">Manager</span>
                  <span className="text-xs text-slate-500">Limited access</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-medium text-slate-700">Employee</span>
                  <span className="text-xs text-slate-500">Basic</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      {/* Employee Modal */}
      {showEmployeeModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              {editingEmployee ? "Edit Employee" : "Add Employee"}
            </h3>
            <form
              onSubmit={
                editingEmployee ? handleUpdateEmployee : handleCreateEmployee
              }
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={employeeForm.name || ""}
                    onChange={(e) =>
                      setEmployeeForm({ ...employeeForm, name: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    value={employeeForm.employeeId || ""}
                    onChange={(e) =>
                      setEmployeeForm({
                        ...employeeForm,
                        employeeId: e.target.value,
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase">
                    Father Name
                  </label>
                  <input
                    type="text"
                    value={employeeForm.fatherName || ""}
                    onChange={(e) =>
                      setEmployeeForm({
                        ...employeeForm,
                        fatherName: e.target.value,
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase">
                    Mobile
                  </label>
                  <input
                    type="text"
                    value={employeeForm.mobile || ""}
                    onChange={(e) =>
                      setEmployeeForm({
                        ...employeeForm,
                        mobile: e.target.value,
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase">
                    Email
                  </label>
                  <input
                    type="email"
                    value={employeeForm.email || ""}
                    onChange={(e) =>
                      setEmployeeForm({
                        ...employeeForm,
                        email: e.target.value,
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase">
                    Aadhaar
                  </label>
                  <input
                    type="text"
                    value={employeeForm.aadhar || ""}
                    onChange={(e) =>
                      setEmployeeForm({
                        ...employeeForm,
                        aadhar: e.target.value,
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase">
                    PAN
                  </label>
                  <input
                    type="text"
                    value={employeeForm.pan || ""}
                    onChange={(e) =>
                      setEmployeeForm({ ...employeeForm, pan: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase">
                    DOB
                  </label>
                  <input
                    type="date"
                    value={employeeForm.dob || ""}
                    onChange={(e) =>
                      setEmployeeForm({ ...employeeForm, dob: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase">
                    Gender
                  </label>
                  <select
                    value={employeeForm.gender || ""}
                    onChange={(e) =>
                      setEmployeeForm({
                        ...employeeForm,
                        gender: e.target.value,
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase">
                    Joining Date
                  </label>
                  <input
                    type="date"
                    value={employeeForm.joiningDate || ""}
                    onChange={(e) =>
                      setEmployeeForm({
                        ...employeeForm,
                        joiningDate: e.target.value,
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase">
                    Department
                  </label>
                  <input
                    type="text"
                    value={employeeForm.department || ""}
                    onChange={(e) =>
                      setEmployeeForm({
                        ...employeeForm,
                        department: e.target.value,
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase">
                    Designation
                  </label>
                  <input
                    type="text"
                    value={employeeForm.designation || ""}
                    onChange={(e) =>
                      setEmployeeForm({
                        ...employeeForm,
                        designation: e.target.value,
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase">
                    Salary
                  </label>
                  <input
                    type="number"
                    value={employeeForm.salary || ""}
                    onChange={(e) =>
                      setEmployeeForm({
                        ...employeeForm,
                        salary: e.target.value,
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase">
                    Reporting Manager
                  </label>
                  <input
                    type="text"
                    value={employeeForm.reportingManager || ""}
                    onChange={(e) =>
                      setEmployeeForm({
                        ...employeeForm,
                        reportingManager: e.target.value,
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase">
                    Status
                  </label>
                  <select
                    value={employeeForm.status || "Active"}
                    onChange={(e) =>
                      setEmployeeForm({
                        ...employeeForm,
                        status: e.target.value,
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase">
                    Address
                  </label>
                  <textarea
                    value={employeeForm.address || ""}
                    onChange={(e) =>
                      setEmployeeForm({
                        ...employeeForm,
                        address: e.target.value,
                      })
                    }
                    rows="2"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowEmployeeModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition"
                >
                  {editingEmployee ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              Create Task
            </h3>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase">
                  Title
                </label>
                <input
                  type="text"
                  value={taskForm.title}
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, title: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase">
                  Description
                </label>
                <textarea
                  value={taskForm.description}
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, description: e.target.value })
                  }
                  rows="3"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase">
                  Assigned To
                </label>
                <select
                  value={taskForm.assignedTo}
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, assignedTo: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase">
                    Priority
                  </label>
                  <select
                    value={taskForm.priority}
                    onChange={(e) =>
                      setTaskForm({ ...taskForm, priority: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase">
                    Deadline
                  </label>
                  <input
                    type="date"
                    value={taskForm.deadline}
                    onChange={(e) =>
                      setTaskForm({ ...taskForm, deadline: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowTaskModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Customer Modal */}
      {showCustomerModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              Add Customer
            </h3>
            <form onSubmit={handleCreateCustomer} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase">
                  Name
                </label>
                <input
                  type="text"
                  value={customerForm.name}
                  onChange={(e) =>
                    setCustomerForm({ ...customerForm, name: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase">
                  Mobile
                </label>
                <input
                  type="text"
                  value={customerForm.mobile}
                  onChange={(e) =>
                    setCustomerForm({ ...customerForm, mobile: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase">
                  Email
                </label>
                <input
                  type="email"
                  value={customerForm.email}
                  onChange={(e) =>
                    setCustomerForm({ ...customerForm, email: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase">
                  Address
                </label>
                <textarea
                  value={customerForm.address}
                  onChange={(e) =>
                    setCustomerForm({
                      ...customerForm,
                      address: e.target.value,
                    })
                  }
                  rows="2"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase">
                  Notes
                </label>
                <textarea
                  value={customerForm.notes}
                  onChange={(e) =>
                    setCustomerForm({ ...customerForm, notes: e.target.value })
                  }
                  rows="2"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCustomerModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Dealer Modal */}
      {showDealerModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              Register Dealer
            </h3>
            <form onSubmit={handleCreateDealer} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase">
                  Name
                </label>
                <input
                  type="text"
                  value={dealerForm.name}
                  onChange={(e) =>
                    setDealerForm({ ...dealerForm, name: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase">
                  Mobile
                </label>
                <input
                  type="text"
                  value={dealerForm.mobile}
                  onChange={(e) =>
                    setDealerForm({ ...dealerForm, mobile: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase">
                  Email
                </label>
                <input
                  type="email"
                  value={dealerForm.email}
                  onChange={(e) =>
                    setDealerForm({ ...dealerForm, email: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase">
                  Address
                </label>
                <textarea
                  value={dealerForm.address}
                  onChange={(e) =>
                    setDealerForm({ ...dealerForm, address: e.target.value })
                  }
                  rows="2"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase">
                  Price
                </label>
                <input
                  type="number"
                  value={dealerForm.price}
                  onChange={(e) =>
                    setDealerForm({ ...dealerForm, price: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowDealerModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
