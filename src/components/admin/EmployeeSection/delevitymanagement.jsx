import React, { useState, useEffect, useMemo, useCallback } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   Polyline,
// } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement,
// } from "chart.js";
// import { Pie, Bar, Line } from "react-chartjs-2";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaUsers,
//   FaBox,
//   FaTruck,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaClock,
//   FaMoneyBillWave,
//   FaFileInvoice,
//   FaPrint,
//   FaFileExport,
//   FaPlus,
//   FaSearch,
//   FaFilter,
//   FaEye,
//   FaEdit,
//   FaTrash,
//   FaChevronDown,
//   FaChevronUp,
//   FaMapMarkerAlt,
//   FaMapPin,
//   FaRoute,
//   FaSync,
//   FaBell,
//   FaCalendarAlt,
//   FaUpload,
//   FaDownload,
//   FaFilePdf,
//   FaFileExcel,
//   FaUserPlus,
//   FaUsersCog,
//   FaChartPie,
//   FaChartBar,
//   FaChartLine,
//   FaHome,
//   FaUser,
//   FaSignOutAlt,
//   FaBars,
//   FaTimes,
//   FaArrowLeft,
//   FaArrowRight,
//   FaCheck,
//   FaMinus,
//   FaPlusCircle,
//   FaMinusCircle,
//   FaStar,
//   FaStarHalfAlt,
//   FaRegStar,
// } from "react-icons/fa";
// import { MdDeliveryDining, MdPending, MdCancel } from "react-icons/md";
// import { BiPackage, BiStore, BiUser, BiDetail } from "react-icons/bi";
// import { GiReceiveMoney, GiReturnArrow } from "react-icons/gi";
// import { format, subDays, parseISO, differenceInDays } from "date-fns";
import "../EmployeeSection/delevitymanagement.css";

// // Register Chart.js components
// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement,
// );

// // Fix Leaflet icon issue
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// ============================================
// DUMMY DATA
// ============================================

const generateOrders = (count) => {
  const statuses = [
    "Pending Approval",
    "Accepted",
    "Packed",
    "Ready to Dispatch",
    "Out for Delivery",
    "Delivered",
    "Returned",
    "Cancelled",
    "Refunded",
  ];
  const paymentStatuses = ["Paid", "Pending", "COD", "Failed"];
  const cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Hyderabad",
    "Kolkata",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
  ];
  const productNames = [
    "Smartphone X",
    "Laptop Pro",
    "Wireless Earbuds",
    "Smartwatch",
    "Tablet",
    "Bluetooth Speaker",
    "Gaming Mouse",
    "Mechanical Keyboard",
    "Monitor 24",
    "External SSD",
  ];
  const customers = [
    "Rahul Sharma",
    "Priya Patel",
    "Amit Kumar",
    "Sneha Reddy",
    "Vikram Singh",
    "Neha Gupta",
    "Rajesh Mishra",
    "Pooja Joshi",
    "Arjun Nair",
    "Meera Iyer",
  ];
  const deliveryPartners = [
    "Blue Dart",
    "DTDC",
    "Delhivery",
    "Ecom Express",
    "Amazon Logistics",
    "Flipkart Logistics",
    "XpressBees",
    "Shadowfax",
  ];

  const orders = [];
  for (let i = 1; i <= count; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const payment =
      paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)];
    const date = subDays(new Date(), Math.floor(Math.random() * 30));
    const amount = Math.floor(Math.random() * 50000) + 1000;
    const city = cities[Math.floor(Math.random() * cities.length)];
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const product =
      productNames[Math.floor(Math.random() * productNames.length)];
    const partner =
      deliveryPartners[Math.floor(Math.random() * deliveryPartners.length)];
    const items = Math.floor(Math.random() * 5) + 1;
    const trackingId = `TRK${String(Math.floor(Math.random() * 900000) + 100000)}`;
    const hasTracking = Math.random() > 0.3;

    orders.push({
      id: `ORD-${String(i).padStart(5, "0")}`,
      orderDate: date.toISOString(),
      customer,
      city,
      amount,
      paymentStatus: payment,
      orderStatus: status,
      product,
      items,
      deliveryPartner: hasTracking ? partner : null,
      trackingId: hasTracking ? trackingId : null,
      deliveryAddress: `${Math.floor(Math.random() * 1000) + 1}, ${city} Main Road`,
      contact: `+91-${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      assignedTo:
        deliveryPartners[Math.floor(Math.random() * deliveryPartners.length)],
      acceptedAt:
        status !== "Pending Approval"
          ? subDays(new Date(), Math.floor(Math.random() * 10)).toISOString()
          : null,
      packedAt:
        status === "Packed" ||
        status === "Ready to Dispatch" ||
        status === "Out for Delivery" ||
        status === "Delivered"
          ? subDays(new Date(), Math.floor(Math.random() * 8)).toISOString()
          : null,
      dispatchedAt:
        status === "Ready to Dispatch" ||
        status === "Out for Delivery" ||
        status === "Delivered"
          ? subDays(new Date(), Math.floor(Math.random() * 5)).toISOString()
          : null,
      deliveredAt:
        status === "Delivered"
          ? subDays(new Date(), Math.floor(Math.random() * 3)).toISOString()
          : null,
      returnedAt:
        status === "Returned"
          ? subDays(new Date(), Math.floor(Math.random() * 2)).toISOString()
          : null,
      cancelledAt:
        status === "Cancelled"
          ? subDays(new Date(), Math.floor(Math.random() * 2)).toISOString()
          : null,
      refundedAt:
        status === "Refunded"
          ? subDays(new Date(), Math.floor(Math.random() * 2)).toISOString()
          : null,
      notes: Math.random() > 0.7 ? "Urgent delivery, handle with care" : "",
      priority: Math.random() > 0.8 ? "High" : "Normal",
      estimatedDelivery: subDays(
        new Date(),
        Math.floor(Math.random() * 5) + 2,
      ).toISOString(),
      actualDelivery:
        status === "Delivered"
          ? subDays(new Date(), Math.floor(Math.random() * 2)).toISOString()
          : null,
      location: {
        lat: 19.076 + (Math.random() - 0.5) * 0.5,
        lng: 72.8777 + (Math.random() - 0.5) * 0.5,
      },
      deliveryAgent: Math.random() > 0.5 ? "Ravi Kumar" : "Suresh Yadav",
      agentPhone: `+91-${Math.floor(Math.random() * 9000000000) + 1000000000}`,
    });
  }
  return orders;
};

const generateRecentActivities = (count) => {
  const actions = [
    {
      user: "Rahul Sharma",
      action: "applied for leave",
      time: "2 min ago",
      icon: "📝",
    },
    {
      user: "Priya Patel",
      action: "approved leave",
      time: "15 min ago",
      icon: "✅",
    },
    {
      user: "Amit Kumar",
      action: "rejected leave request",
      time: "1 hour ago",
      icon: "❌",
    },
    {
      user: "Sneha Reddy",
      action: "updated leave balance",
      time: "2 hours ago",
      icon: "🔄",
    },
    {
      user: "Vikram Singh",
      action: "uploaded medical certificate",
      time: "3 hours ago",
      icon: "📄",
    },
    {
      user: "Neha Gupta",
      action: "cancelled leave",
      time: "4 hours ago",
      icon: "🚫",
    },
    {
      user: "Rajesh Mishra",
      action: "added new holiday",
      time: "5 hours ago",
      icon: "📅",
    },
    {
      user: "Pooja Joshi",
      action: "approved WFH request",
      time: "6 hours ago",
      icon: "🏠",
    },
  ];
  const activities = [];
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * actions.length);
    activities.push({
      ...actions[idx],
      id: i + 1,
      time: `${Math.floor(Math.random() * 24)} hours ago`,
    });
  }
  return activities;
};

const generateTopDealers = () => {
  const dealers = [
    { name: "Mumbai Electronics", orders: 1245, revenue: 4520000 },
    { name: "Delhi Traders", orders: 980, revenue: 3210000 },
    { name: "Bangalore Tech Hub", orders: 876, revenue: 2980000 },
    { name: "Chennai Distributors", orders: 654, revenue: 2100000 },
    { name: "Hyderabad Solutions", orders: 543, revenue: 1870000 },
  ];
  return dealers;
};

// ============================================
// MAIN COMPONENT
// ============================================

const DeliveryManagement = () => {
  // ============ STATE ============
  const [orders, setOrders] = useState(generateOrders(150));
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    payment: "",
    city: "",
    fromDate: "",
    toDate: "",
    searchBy: "all",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [viewOrder, setViewOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showDealerModal, setShowDealerModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [recentActivities, setRecentActivities] = useState(
    generateRecentActivities(10),
  );
  const [topDealers, setTopDealers] = useState(generateTopDealers());
  const [isMapView, setIsMapView] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortField, setSortField] = useState("orderDate");
  const [sortDirection, setSortDirection] = useState("desc");
  const [toastId, setToastId] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [draggedOrder, setDraggedOrder] = useState(null);
  const [dropTarget, setDropTarget] = useState(null);

  // ============ COMPUTED STATS ============
  const stats = useMemo(() => {
    const total = orders.length;
    const pendingApproval = orders.filter(
      (o) => o.orderStatus === "Pending Approval",
    ).length;
    const accepted = orders.filter((o) => o.orderStatus === "Accepted").length;
    const packed = orders.filter((o) => o.orderStatus === "Packed").length;
    const readyToDispatch = orders.filter(
      (o) => o.orderStatus === "Ready to Dispatch",
    ).length;
    const outForDelivery = orders.filter(
      (o) => o.orderStatus === "Out for Delivery",
    ).length;
    const delivered = orders.filter(
      (o) => o.orderStatus === "Delivered",
    ).length;
    const returned = orders.filter((o) => o.orderStatus === "Returned").length;
    const cancelled = orders.filter(
      (o) => o.orderStatus === "Cancelled",
    ).length;
    const refunded = orders.filter((o) => o.orderStatus === "Refunded").length;
    const cod = orders.filter((o) => o.paymentStatus === "COD").length;
    const paid = orders.filter((o) => o.paymentStatus === "Paid").length;
    const pendingPayment = orders.filter(
      (o) => o.paymentStatus === "Pending",
    ).length;
    const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);
    const avgOrderValue = totalRevenue / total;

    return {
      total,
      pendingApproval,
      accepted,
      packed,
      readyToDispatch,
      outForDelivery,
      delivered,
      returned,
      cancelled,
      refunded,
      cod,
      paid,
      pendingPayment,
      totalRevenue,
      avgOrderValue,
    };
  }, [orders]);

  // ============ FILTERING ============
  useEffect(() => {
    let filtered = [...orders];

    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (o) =>
          o.id.toLowerCase().includes(term) ||
          o.customer.toLowerCase().includes(term) ||
          o.city.toLowerCase().includes(term) ||
          o.product.toLowerCase().includes(term) ||
          o.deliveryPartner?.toLowerCase().includes(term),
      );
    }

    // Status filter
    if (filters.status) {
      filtered = filtered.filter((o) => o.orderStatus === filters.status);
    }

    // Payment filter
    if (filters.payment) {
      filtered = filtered.filter((o) => o.paymentStatus === filters.payment);
    }

    // City filter
    if (filters.city) {
      filtered = filtered.filter((o) => o.city === filters.city);
    }

    // Date range
    if (filters.fromDate) {
      filtered = filtered.filter(
        (o) => new Date(o.orderDate) >= new Date(filters.fromDate),
      );
    }
    if (filters.toDate) {
      filtered = filtered.filter(
        (o) => new Date(o.orderDate) <= new Date(filters.toDate),
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (sortField === "orderDate" || sortField === "estimatedDelivery") {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }
      if (sortField === "amount") {
        aVal = Number(aVal);
        bVal = Number(bVal);
      }
      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredOrders(filtered);
    setCurrentPage(1);
  }, [orders, searchTerm, filters, sortField, sortDirection]);

  // ============ PAGINATION ============
  const totalPages = Math.ceil(filteredOrders.length / pageSize);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  // ============ FUNCTIONS ============

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleSelectOrder = (id) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === paginatedOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(paginatedOrders.map((o) => o.id));
    }
  };

  const handleViewOrder = (order) => {
    setViewOrder(order);
    setShowTrackingModal(true);
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              orderStatus: newStatus,
              ...(newStatus === "Accepted" && {
                acceptedAt: new Date().toISOString(),
              }),
              ...(newStatus === "Packed" && {
                packedAt: new Date().toISOString(),
              }),
              ...(newStatus === "Ready to Dispatch" && {
                dispatchedAt: new Date().toISOString(),
              }),
              ...(newStatus === "Out for Delivery" && {
                outForDeliveryAt: new Date().toISOString(),
              }),
              ...(newStatus === "Delivered" && {
                deliveredAt: new Date().toISOString(),
              }),
              ...(newStatus === "Returned" && {
                returnedAt: new Date().toISOString(),
              }),
              ...(newStatus === "Cancelled" && {
                cancelledAt: new Date().toISOString(),
              }),
              ...(newStatus === "Refunded" && {
                refundedAt: new Date().toISOString(),
              }),
            }
          : o,
      ),
    );
    // Add activity
    const activity = {
      id: Date.now(),
      user: "System",
      action: `Order ${orderId} status updated to ${newStatus}`,
      time: "Just now",
      icon: "🔄",
    };
    setRecentActivities((prev) => [activity, ...prev.slice(0, 9)]);
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
  };

  const handleBulkStatusUpdate = (newStatus) => {
    if (selectedOrders.length === 0) {
      toast.warning("No orders selected");
      return;
    }
    setOrders((prev) =>
      prev.map((o) =>
        selectedOrders.includes(o.id)
          ? {
              ...o,
              orderStatus: newStatus,
              ...(newStatus === "Accepted" && {
                acceptedAt: new Date().toISOString(),
              }),
              ...(newStatus === "Packed" && {
                packedAt: new Date().toISOString(),
              }),
              ...(newStatus === "Ready to Dispatch" && {
                dispatchedAt: new Date().toISOString(),
              }),
              ...(newStatus === "Out for Delivery" && {
                outForDeliveryAt: new Date().toISOString(),
              }),
              ...(newStatus === "Delivered" && {
                deliveredAt: new Date().toISOString(),
              }),
            }
          : o,
      ),
    );
    toast.success(`${selectedOrders.length} orders updated to ${newStatus}`);
    setSelectedOrders([]);
  };

  const handleAddOrder = (newOrder) => {
    setOrders((prev) => [
      {
        ...newOrder,
        id: `ORD-${String(prev.length + 1).padStart(5, "0")}`,
        orderDate: new Date().toISOString(),
        orderStatus: "Pending Approval",
        paymentStatus: newOrder.paymentStatus || "Pending",
        location: {
          lat: 19.076 + Math.random() * 0.1,
          lng: 72.8777 + Math.random() * 0.1,
        },
      },
      ...prev,
    ]);
    setShowOrderModal(false);
    toast.success("Order added successfully!");
    const activity = {
      id: Date.now(),
      user: "Admin",
      action: `Added new order ${newOrder.id}`,
      time: "Just now",
      icon: "➕",
    };
    setRecentActivities((prev) => [activity, ...prev.slice(0, 9)]);
  };

  const handleAddDealer = (dealer) => {
    // Dummy - just show toast
    toast.success("Dealer added successfully!");
    setShowDealerModal(false);
  };

  const handleExport = (type) => {
    toast.info(`Exporting ${type}...`);
    setShowExportModal(false);
  };

  const handlePrint = (order) => {
    window.print();
  };

  const handleGenerateInvoice = (order) => {
    toast.success(`Invoice generated for ${order.id}`);
    setShowInvoiceModal(false);
  };

  const handleBulkImport = (files) => {
    toast.success("Bulk import successful!");
    setShowBulkModal(false);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setOrders(generateOrders(150));
      setRecentActivities(generateRecentActivities(10));
      setTopDealers(generateTopDealers());
      setIsRefreshing(false);
      toast.info("Dashboard refreshed!");
    }, 1000);
  };

  // ============ MODAL RENDERERS ============

  const renderOrderModal = () => (
    <div className="modal-overlay" onClick={() => setShowOrderModal(false)}>
      <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Order</h2>
          <button
            className="modal-close"
            onClick={() => setShowOrderModal(false)}
          >
            ✕
          </button>
        </div>
        <div className="modal-body">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target;
              const data = {
                customer: form.customer.value,
                city: form.city.value,
                amount: parseFloat(form.amount.value),
                product: form.product.value,
                items: parseInt(form.items.value),
                deliveryAddress: form.address.value,
                contact: form.contact.value,
                paymentStatus: form.payment.value,
                deliveryPartner: form.partner.value || null,
              };
              handleAddOrder(data);
            }}
          >
            <div className="form-grid two-col">
              <div className="form-group">
                <label>Customer Name *</label>
                <input type="text" name="customer" required />
              </div>
              <div className="form-group">
                <label>City *</label>
                <input type="text" name="city" required />
              </div>
              <div className="form-group">
                <label>Product *</label>
                <input type="text" name="product" required />
              </div>
              <div className="form-group">
                <label>Amount (₹) *</label>
                <input type="number" name="amount" required min="1" />
              </div>
              <div className="form-group">
                <label>Items *</label>
                <input type="number" name="items" required min="1" />
              </div>
              <div className="form-group">
                <label>Payment Status *</label>
                <select name="payment" required>
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="COD">COD</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
              <div className="form-group">
                <label>Delivery Partner</label>
                <input type="text" name="partner" placeholder="Optional" />
              </div>
              <div className="form-group">
                <label>Contact *</label>
                <input type="text" name="contact" required />
              </div>
              <div className="form-group full-width">
                <label>Delivery Address *</label>
                <textarea name="address" required rows="2"></textarea>
              </div>
            </div>
            <div className="form-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowOrderModal(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Add Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  const renderDealerModal = () => (
    <div className="modal-overlay" onClick={() => setShowDealerModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Dealer</h2>
          <button
            className="modal-close"
            onClick={() => setShowDealerModal(false)}
          >
            ✕
          </button>
        </div>
        <div className="modal-body">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target;
              const data = {
                name: form.name.value,
                email: form.email.value,
                phone: form.phone.value,
                city: form.city.value,
                address: form.address.value,
              };
              handleAddDealer(data);
            }}
          >
            <div className="form-grid two-col">
              <div className="form-group">
                <label>Dealer Name *</label>
                <input type="text" name="name" required />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input type="email" name="email" required />
              </div>
              <div className="form-group">
                <label>Phone *</label>
                <input type="text" name="phone" required />
              </div>
              <div className="form-group">
                <label>City *</label>
                <input type="text" name="city" required />
              </div>
              <div className="form-group full-width">
                <label>Address</label>
                <textarea name="address" rows="2"></textarea>
              </div>
            </div>
            <div className="form-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setShowDealerModal(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Add Dealer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  const renderBulkModal = () => (
    <div className="modal-overlay" onClick={() => setShowBulkModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Bulk Import Orders</h2>
          <button
            className="modal-close"
            onClick={() => setShowBulkModal(false)}
          >
            ✕
          </button>
        </div>
        <div className="modal-body">
          <div className="drag-drop-area">
            <p>Drag & drop Excel/CSV file here or click to browse</p>
            <input
              type="file"
              accept=".xlsx,.csv"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  handleBulkImport([file]);
                  setShowBulkModal(false);
                }
              }}
            />
          </div>
          <p className="hint">Supported formats: .xlsx, .csv</p>
          <div className="form-actions">
            <button
              className="btn-secondary"
              onClick={() => setShowBulkModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInvoiceModal = (order) => (
    <div className="modal-overlay" onClick={() => setShowInvoiceModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Generate Invoice</h2>
          <button
            className="modal-close"
            onClick={() => setShowInvoiceModal(false)}
          >
            ✕
          </button>
        </div>
        <div className="modal-body">
          {order ? (
            <div className="invoice-preview">
              <h3>Order #{order.id}</h3>
              <p>
                <strong>Customer:</strong> {order.customer}
              </p>
              <p>
                <strong>Amount:</strong> ₹{order.amount.toLocaleString()}
              </p>
              <p>
                <strong>Items:</strong> {order.items}
              </p>
              <p>
                <strong>Payment:</strong> {order.paymentStatus}
              </p>
              <button
                className="btn-primary"
                onClick={() => handleGenerateInvoice(order)}
              >
                Generate PDF
              </button>
            </div>
          ) : (
            <p>Select an order to generate invoice</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderTrackingModal = (order) => {
    if (!order) return null;
    const steps = [
      { status: "Pending Approval", icon: "⏳", time: order.orderDate },
      { status: "Accepted", icon: "✅", time: order.acceptedAt },
      { status: "Packed", icon: "📦", time: order.packedAt },
      { status: "Ready to Dispatch", icon: "🚚", time: order.dispatchedAt },
      { status: "Out for Delivery", icon: "🛵", time: order.outForDeliveryAt },
      { status: "Delivered", icon: "🏠", time: order.deliveredAt },
    ];
    const currentStepIndex = steps.findIndex(
      (s) => s.status === order.orderStatus,
    );
    const progress =
      currentStepIndex >= 0 ? (currentStepIndex / (steps.length - 1)) * 100 : 0;

    return (
      <div
        className="modal-overlay"
        onClick={() => setShowTrackingModal(false)}
      >
        <div
          className="modal-content large"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h2>Order Tracking - {order.id}</h2>
            <button
              className="modal-close"
              onClick={() => setShowTrackingModal(false)}
            >
              ✕
            </button>
          </div>
          <div className="modal-body">
            <div className="tracking-grid">
              <div className="tracking-details">
                <div className="tracking-customer">
                  <h3>{order.customer}</h3>
                  <p>
                    {order.city} • {order.contact}
                  </p>
                  <p>
                    <strong>Product:</strong> {order.product} x{order.items}
                  </p>
                  <p>
                    <strong>Amount:</strong> ₹{order.amount.toLocaleString()}
                  </p>
                  <p>
                    <strong>Payment:</strong> {order.paymentStatus}
                  </p>
                  <p>
                    <strong>Delivery Partner:</strong>{" "}
                    {order.deliveryPartner || "N/A"}
                  </p>
                  <p>
                    <strong>Tracking ID:</strong> {order.trackingId || "N/A"}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`status-badge ${order.orderStatus.toLowerCase().replace(/ /g, "-")}`}
                    >
                      {order.orderStatus}
                    </span>
                  </p>
                </div>
                <div className="tracking-progress">
                  <div className="progress-steps">
                    {steps.map((step, idx) => {
                      const isActive = idx <= currentStepIndex;
                      const isCurrent = idx === currentStepIndex;
                      return (
                        <div
                          key={idx}
                          className={`step ${isActive ? "active" : ""} ${isCurrent ? "current" : ""}`}
                        >
                          <div className="step-icon">{step.icon}</div>
                          <div className="step-content">
                            <div className="step-status">{step.status}</div>
                            {step.time && (
                              <div className="step-time">
                                {format(
                                  parseISO(step.time),
                                  "dd MMM yyyy, hh:mm a",
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="tracking-map">
                <MapContainer
                  center={[order.location.lat, order.location.lng]}
                  zoom={13}
                  style={{ height: "100%", width: "100%", borderRadius: "8px" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[order.location.lat, order.location.lng]}>
                    <Popup>
                      {order.customer}
                      <br />
                      {order.deliveryAddress}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
            <div className="tracking-actions">
              <button
                className="btn-secondary"
                onClick={() => setShowTrackingModal(false)}
              >
                Close
              </button>
              <button
                className="btn-primary"
                onClick={() => handlePrint(order)}
              >
                Print
              </button>
              <button
                className="btn-primary"
                onClick={() => handleGenerateInvoice(order)}
              >
                Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderExportModal = () => (
    <div className="modal-overlay" onClick={() => setShowExportModal(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Export Data</h2>
          <button
            className="modal-close"
            onClick={() => setShowExportModal(false)}
          >
            ✕
          </button>
        </div>
        <div className="modal-body">
          <div className="export-options">
            <button
              className="export-btn"
              onClick={() => handleExport("Excel")}
            >
              <FaFileExcel /> Excel
            </button>
            <button className="export-btn" onClick={() => handleExport("CSV")}>
              <FaFileExcel /> CSV
            </button>
            <button className="export-btn" onClick={() => handleExport("PDF")}>
              <FaFilePdf /> PDF
            </button>
            <button
              className="export-btn"
              onClick={() => handleExport("Print")}
            >
              <FaPrint /> Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ============ RENDER ============

  return (
    <div className="delivery-management">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Top Header */}
      <header className="dm-header">
        <div className="header-left">
          <h1>
            <FaBox /> Delivery Management
          </h1>
          <p>Manage orders, track deliveries, and monitor performance</p>
        </div>
        <div className="header-right">
          <button className="icon-btn" onClick={handleRefresh}>
            <FaSync className={isRefreshing ? "spinning" : ""} />
          </button>
          <button className="icon-btn" onClick={() => setShowExportModal(true)}>
            <FaFileExport />
          </button>
          <button className="icon-btn" onClick={() => {}}>
            <FaBell />
          </button>
          <button
            className="btn-primary"
            onClick={() => setShowOrderModal(true)}
          >
            <FaPlus /> Add Order
          </button>
          <button
            className="btn-secondary"
            onClick={() => setShowDealerModal(true)}
          >
            <FaUserPlus /> Add Dealer
          </button>
        </div>
      </header>

      {/* Statistics Cards */}
      <section className="stats-section">
        <div className="stats-grid">
          <motion.div
            className="stat-card"
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedStatus("all")}
          >
            <div className="stat-icon total">
              <FaBox />
            </div>
            <div className="stat-info">
              <span className="stat-label">Total Orders</span>
              <span className="stat-value">{stats.total}</span>
            </div>
          </motion.div>
          <motion.div
            className="stat-card"
            whileHover={{ scale: 1.02 }}
            onClick={() =>
              setFilters({ ...filters, status: "Pending Approval" })
            }
          >
            <div className="stat-icon pending">
              <MdPending />
            </div>
            <div className="stat-info">
              <span className="stat-label">Pending Approval</span>
              <span className="stat-value">{stats.pendingApproval}</span>
            </div>
          </motion.div>
          <motion.div
            className="stat-card"
            whileHover={{ scale: 1.02 }}
            onClick={() => setFilters({ ...filters, status: "Accepted" })}
          >
            <div className="stat-icon accepted">
              <FaCheckCircle />
            </div>
            <div className="stat-info">
              <span className="stat-label">Accepted</span>
              <span className="stat-value">{stats.accepted}</span>
            </div>
          </motion.div>
          <motion.div
            className="stat-card"
            whileHover={{ scale: 1.02 }}
            onClick={() => setFilters({ ...filters, status: "Packed" })}
          >
            <div className="stat-icon packed">
              <BiPackage />
            </div>
            <div className="stat-info">
              <span className="stat-label">Packed</span>
              <span className="stat-value">{stats.packed}</span>
            </div>
          </motion.div>
          <motion.div
            className="stat-card"
            whileHover={{ scale: 1.02 }}
            onClick={() =>
              setFilters({ ...filters, status: "Ready to Dispatch" })
            }
          >
            <div className="stat-icon ready">
              <FaTruck />
            </div>
            <div className="stat-info">
              <span className="stat-label">Ready to Dispatch</span>
              <span className="stat-value">{stats.readyToDispatch}</span>
            </div>
          </motion.div>
          <motion.div
            className="stat-card"
            whileHover={{ scale: 1.02 }}
            onClick={() =>
              setFilters({ ...filters, status: "Out for Delivery" })
            }
          >
            <div className="stat-icon out">
              <MdDeliveryDining />
            </div>
            <div className="stat-info">
              <span className="stat-label">Out for Delivery</span>
              <span className="stat-value">{stats.outForDelivery}</span>
            </div>
          </motion.div>
          <motion.div
            className="stat-card"
            whileHover={{ scale: 1.02 }}
            onClick={() => setFilters({ ...filters, status: "Delivered" })}
          >
            <div className="stat-icon delivered">
              <FaCheckCircle />
            </div>
            <div className="stat-info">
              <span className="stat-label">Delivered</span>
              <span className="stat-value">{stats.delivered}</span>
            </div>
          </motion.div>
          <motion.div
            className="stat-card"
            whileHover={{ scale: 1.02 }}
            onClick={() => setFilters({ ...filters, status: "Returned" })}
          >
            <div className="stat-icon returned">
              <GiReturnArrow />
            </div>
            <div className="stat-info">
              <span className="stat-label">Returned</span>
              <span className="stat-value">{stats.returned}</span>
            </div>
          </motion.div>
          <motion.div
            className="stat-card"
            whileHover={{ scale: 1.02 }}
            onClick={() => setFilters({ ...filters, status: "Cancelled" })}
          >
            <div className="stat-icon cancelled">
              <MdCancel />
            </div>
            <div className="stat-info">
              <span className="stat-label">Cancelled</span>
              <span className="stat-value">{stats.cancelled}</span>
            </div>
          </motion.div>
          <motion.div
            className="stat-card"
            whileHover={{ scale: 1.02 }}
            onClick={() => setFilters({ ...filters, status: "Refunded" })}
          >
            <div className="stat-icon refunded">
              <GiReceiveMoney />
            </div>
            <div className="stat-info">
              <span className="stat-label">Refunded</span>
              <span className="stat-value">{stats.refunded}</span>
            </div>
          </motion.div>
          <motion.div className="stat-card" whileHover={{ scale: 1.02 }}>
            <div className="stat-icon cod">
              <FaMoneyBillWave />
            </div>
            <div className="stat-info">
              <span className="stat-label">COD</span>
              <span className="stat-value">{stats.cod}</span>
            </div>
          </motion.div>
          <motion.div className="stat-card" whileHover={{ scale: 1.02 }}>
            <div className="stat-icon revenue">
              <FaChartLine />
            </div>
            <div className="stat-info">
              <span className="stat-label">Revenue (₹)</span>
              <span className="stat-value">
                {stats.totalRevenue.toLocaleString()}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="filter-section">
        <div className="filter-bar">
          <div className="search-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search orders, customers, cities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> Filters {showFilters ? "▲" : "▼"}
          </button>
          <div className="filter-actions">
            <button className="btn-secondary" onClick={handleRefresh}>
              Reset
            </button>
            <button className="btn-primary" onClick={() => {}}>
              Apply
            </button>
          </div>
        </div>
        {showFilters && (
          <div className="filter-panel">
            <div className="filter-row">
              <div className="filter-group">
                <label>Status</label>
                <select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                >
                  <option value="">All</option>
                  <option value="Pending Approval">Pending Approval</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Packed">Packed</option>
                  <option value="Ready to Dispatch">Ready to Dispatch</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Returned">Returned</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Payment</label>
                <select
                  value={filters.payment}
                  onChange={(e) =>
                    setFilters({ ...filters, payment: e.target.value })
                  }
                >
                  <option value="">All</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="COD">COD</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
              <div className="filter-group">
                <label>City</label>
                <select
                  value={filters.city}
                  onChange={(e) =>
                    setFilters({ ...filters, city: e.target.value })
                  }
                >
                  <option value="">All</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Pune">Pune</option>
                  <option value="Ahmedabad">Ahmedabad</option>
                  <option value="Jaipur">Jaipur</option>
                  <option value="Lucknow">Lucknow</option>
                </select>
              </div>
              <div className="filter-group">
                <label>From Date</label>
                <input
                  type="date"
                  value={filters.fromDate}
                  onChange={(e) =>
                    setFilters({ ...filters, fromDate: e.target.value })
                  }
                />
              </div>
              <div className="filter-group">
                <label>To Date</label>
                <input
                  type="date"
                  value={filters.toDate}
                  onChange={(e) =>
                    setFilters({ ...filters, toDate: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Orders Table */}
      <section className="table-section">
        <div className="table-toolbar">
          <div className="table-actions">
            <button
              className="btn-sm"
              onClick={() => handleBulkStatusUpdate("Accepted")}
            >
              Accept Selected
            </button>
            <button
              className="btn-sm"
              onClick={() => handleBulkStatusUpdate("Packed")}
            >
              Pack Selected
            </button>
            <button
              className="btn-sm"
              onClick={() => handleBulkStatusUpdate("Ready to Dispatch")}
            >
              Dispatch Selected
            </button>
            <button
              className="btn-sm"
              onClick={() => handleBulkStatusUpdate("Out for Delivery")}
            >
              Out for Delivery
            </button>
            <button
              className="btn-sm"
              onClick={() => handleBulkStatusUpdate("Delivered")}
            >
              Deliver Selected
            </button>
          </div>
          <div className="table-pagination-info">
            Showing {paginatedOrders.length} of {filteredOrders.length} orders
          </div>
        </div>

        <div className="table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={
                      selectedOrders.length === paginatedOrders.length &&
                      paginatedOrders.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th onClick={() => handleSort("id")}>
                  Order ID{" "}
                  {sortField === "id" && (sortDirection === "asc" ? "▲" : "▼")}
                </th>
                <th onClick={() => handleSort("customer")}>
                  Customer{" "}
                  {sortField === "customer" &&
                    (sortDirection === "asc" ? "▲" : "▼")}
                </th>
                <th onClick={() => handleSort("city")}>
                  City{" "}
                  {sortField === "city" &&
                    (sortDirection === "asc" ? "▲" : "▼")}
                </th>
                <th onClick={() => handleSort("orderDate")}>
                  Order Date{" "}
                  {sortField === "orderDate" &&
                    (sortDirection === "asc" ? "▲" : "▼")}
                </th>
                <th onClick={() => handleSort("amount")}>
                  Amount{" "}
                  {sortField === "amount" &&
                    (sortDirection === "asc" ? "▲" : "▼")}
                </th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan="9" className="empty-state">
                    No orders found
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => (
                  <tr
                    key={order.id}
                    className={
                      selectedOrders.includes(order.id) ? "selected" : ""
                    }
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => handleSelectOrder(order.id)}
                      />
                    </td>
                    <td>
                      <strong>{order.id}</strong>
                    </td>
                    <td>{order.customer}</td>
                    <td>{order.city}</td>
                    <td>{format(parseISO(order.orderDate), "dd MMM yyyy")}</td>
                    <td>₹{order.amount.toLocaleString()}</td>
                    <td>
                      <span
                        className={`payment-badge ${order.paymentStatus.toLowerCase()}`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`status-badge ${order.orderStatus.toLowerCase().replace(/ /g, "-")}`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="action-btn view"
                          onClick={() => handleViewOrder(order)}
                          title="View"
                        >
                          <FaEye />
                        </button>
                        <button className="action-btn edit" title="Edit">
                          <FaEdit />
                        </button>
                        <button className="action-btn delete" title="Delete">
                          <FaTrash />
                        </button>
                        <button
                          className="action-btn print"
                          onClick={() => handlePrint(order)}
                          title="Print"
                        >
                          <FaPrint />
                        </button>
                        <button
                          className="action-btn invoice"
                          onClick={() => handleGenerateInvoice(order)}
                          title="Invoice"
                        >
                          <FaFileInvoice />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination-bar">
          <div className="pagination-info">
            Page {currentPage} of {totalPages}
          </div>
          <div className="pagination-controls">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <FaArrowLeft /> First
            </button>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let page = i + 1;
              if (totalPages > 5) {
                if (currentPage > 3) page = currentPage - 2 + i;
                if (page > totalPages) page = totalPages - (4 - i);
              }
              return (
                <button
                  key={page}
                  className={currentPage === page ? "active" : ""}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last <FaArrowRight />
            </button>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </section>

      {/* Bottom Grid: Recent Activities, Top Dealers, Charts */}
      <section className="bottom-grid">
        <div className="recent-activities">
          <h3>Recent Activities</h3>
          <div className="activity-list">
            {recentActivities.map((act) => (
              <div key={act.id} className="activity-item">
                <span className="activity-icon">{act.icon}</span>
                <div className="activity-content">
                  <span className="activity-text">
                    <strong>{act.user}</strong> {act.action}
                  </span>
                  <span className="activity-time">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="top-dealers">
          <h3>Top Dealers by Orders</h3>
          <div className="dealer-list">
            {topDealers.map((dealer, idx) => (
              <div key={idx} className="dealer-item">
                <div className="dealer-rank">{idx + 1}</div>
                <div className="dealer-info">
                  <span className="dealer-name">{dealer.name}</span>
                  <span className="dealer-orders">{dealer.orders} orders</span>
                </div>
                <div className="dealer-revenue">
                  ₹{dealer.revenue.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="charts-section">
          <h3>Order Statistics</h3>
          <div className="chart-grid">
            <div className="chart-card">
              <Pie
                data={{
                  labels: [
                    "Delivered",
                    "Out for Delivery",
                    "Pending",
                    "Returned",
                    "Cancelled",
                  ],
                  datasets: [
                    {
                      data: [
                        stats.delivered,
                        stats.outForDelivery,
                        stats.pendingApproval +
                          stats.accepted +
                          stats.packed +
                          stats.readyToDispatch,
                        stats.returned,
                        stats.cancelled,
                      ],
                      backgroundColor: [
                        "#4CAF50",
                        "#FF9800",
                        "#2196F3",
                        "#9C27B0",
                        "#F44336",
                      ],
                    },
                  ],
                }}
                options={{ plugins: { legend: { position: "bottom" } } }}
              />
            </div>
            <div className="chart-card">
              <Bar
                data={{
                  labels: [
                    "Pending",
                    "Accepted",
                    "Packed",
                    "Ready",
                    "Out",
                    "Delivered",
                  ],
                  datasets: [
                    {
                      label: "Orders",
                      data: [
                        stats.pendingApproval,
                        stats.accepted,
                        stats.packed,
                        stats.readyToDispatch,
                        stats.outForDelivery,
                        stats.delivered,
                      ],
                      backgroundColor: [
                        "#FF9800",
                        "#2196F3",
                        "#4CAF50",
                        "#8BC34A",
                        "#FFC107",
                        "#4CAF50",
                      ],
                    },
                  ],
                }}
                options={{ plugins: { legend: { display: false } } }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions">
        <button
          className="quick-action"
          onClick={() => setShowOrderModal(true)}
        >
          <FaPlus /> Add Order
        </button>
        <button
          className="quick-action"
          onClick={() => setShowDealerModal(true)}
        >
          <FaUserPlus /> Add Dealer
        </button>
        <button className="quick-action" onClick={() => setShowBulkModal(true)}>
          <FaUpload /> Bulk ImportS
        </button>
        <button
          className="quick-action"
          onClick={() => setShowInvoiceModal(true)}
        >
          <FaFileInvoice /> Generate Invoice
        </button>
        <button className="quick-action" onClick={() => handlePrint({})}>
          <FaPrint /> Print
        </button>
        <button
          className="quick-action"
          onClick={() => setShowExportModal(true)}
        >
          <FaFileExport /> Export
        </button>
      </section>

      {/* Modals */}
      {showOrderModal && renderOrderModal()}
      {showDealerModal && renderDealerModal()}
      {showBulkModal && renderBulkModal()}
      {showInvoiceModal && renderInvoiceModal(viewOrder)}
      {showTrackingModal && renderTrackingModal(viewOrder)}
      {showExportModal && renderExportModal()}

      <footer className="dm-footer">
        <p>© 2024 Delivery Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default DeliveryManagement;
