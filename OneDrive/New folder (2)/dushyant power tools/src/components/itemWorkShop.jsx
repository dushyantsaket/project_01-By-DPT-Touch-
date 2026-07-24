import React, { useState } from "react";
import {
  Users,
  MoreVertical,
  Banknote,
  X,
  ChevronUp,
  Plus,
  Search,
  Settings,
  ChevronDown,
  ChevronRight,
  Edit,
  Trash2,
  Eye,
  Printer,
  Upload,
  Download,
  Image as ImageIcon,
  Calendar,
  Clock,
  Phone,
  Mail,
  MapPin,
  Building,
  User as UserIcon,
  DollarSign,
  CreditCard,
  Package,
  ShoppingCart,
  Receipt,
  BarChart3,
  Wallet,
  FileText,
  Clock as ClockIcon,
  Briefcase,
  Users2,
  Megaphone,
  HelpCircle,
  LogOut,
  Menu,
  ChevronLeft,
  Filter,
  RefreshCw,
  AlertCircle,
  Info,
  CheckCircle,
  Circle,
  PlusCircle,
  MinusCircle,
  ArrowLeft,
  ArrowRight,
  Home,
  ClipboardList,
  Truck,
  Warehouse,
  Percent,
  Calculator,
  PrinterCheck,
  Send,
  Inbox,
  Archive,
  BookOpen,
  Folder,
  Tag,
  Layers,
} from "lucide-react";

// ============================================================
// ICON COMPONENTS (same as before – keep them)
// ============================================================
// ... (all the Ic* components from your original code – they are unchanged)
// For brevity, I'm assuming you already have them. If not, copy from the previous answer.

// ============================================================
// MAIN COMPONENT
// ============================================================

const ItemsWorkspace = () => {
  // ─── NAVIGATION ─────────────────────────────────────────────
  const [activeSection, setActiveSection] = useState("items"); // items, godown, expenses
  const [expenseTab, setExpenseTab] = useState("dashboard"); // dashboard, list, reports

  // ─── ITEMS STATE (unchanged from your original) ─────────────
  // (I'll keep a minimal version here; you can paste your full items array)
  const [items, setItems] = useState([
    {
      id: "i1",
      name: "10mm ply",
      code: "-",
      stock: 1,
      unit: "PCS",
      sellingPrice: 980,
      purchasePrice: 0,
      category: "Plywood",
      godown: "Main Godown",
      lowStock: 5,
    },
    // ... add all your other items here (or keep the full list from your original code)
  ]);
  const [godownItems, setGodownItems] = useState(
    items.map((item) => ({
      ...item,
      stockValue: item.stock * item.purchasePrice,
    })),
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showLowStock, setShowLowStock] = useState(false);
  const [godownSearch, setGodownSearch] = useState("");
  const [isCreateItemModalOpen, setIsCreateItemModalOpen] = useState(false);
  const [isItemDetailModalOpen, setIsItemDetailModalOpen] = useState(false);
  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemFormData, setItemFormData] = useState({
    name: "",
    code: "",
    stock: 0,
    unit: "PCS",
    sellingPrice: 0,
    purchasePrice: 0,
    category: "",
    godown: "Main Godown",
    lowStock: 5,
  });

  // ─── EXPENSES STATE ──────────────────────────────────────────
  const [expenses, setExpenses] = useState([
    {
      id: "e1",
      date: "2025-03-10",
      title: "Cab to client",
      category: "Travel",
      vendor: "Uber",
      employee: "Rahul",
      client: "ABC Corp",
      amount: 1500,
      tax: 0,
      paymentMethod: "Cash",
      status: "Paid",
      receipt: "receipt1.pdf",
      description: "Client meeting",
    },
    {
      id: "e2",
      date: "2025-03-11",
      title: "Printer ink",
      category: "Office Supplies",
      vendor: "HP",
      employee: "Priya",
      client: "",
      amount: 3500,
      tax: 630,
      paymentMethod: "Bank",
      status: "Pending",
      receipt: "",
      description: "Office stationery",
    },
    {
      id: "e3",
      date: "2025-03-12",
      title: "Electricity bill",
      category: "Utilities",
      vendor: "BESCOM",
      employee: "",
      client: "",
      amount: 8000,
      tax: 0,
      paymentMethod: "Bank",
      status: "Paid",
      receipt: "elec_bill.pdf",
      description: "",
    },
    {
      id: "e4",
      date: "2025-03-13",
      title: "Team lunch",
      category: "Meals",
      vendor: "Cafe",
      employee: "Amit",
      client: "XYZ Ltd",
      amount: 600,
      tax: 0,
      paymentMethod: "Cash",
      status: "Paid",
      receipt: "",
      description: "Celebration",
    },
    {
      id: "e5",
      date: "2025-03-14",
      title: "Flight booking",
      category: "Travel",
      vendor: "Indigo",
      employee: "Sneha",
      client: "",
      amount: 2200,
      tax: 396,
      paymentMethod: "Card",
      status: "Approved",
      receipt: "flight_ticket.pdf",
      description: "Business trip",
    },
    {
      id: "e6",
      date: "2025-03-15",
      title: "Stock purchase",
      category: "Inventory",
      vendor: "Steel Ltd",
      employee: "",
      client: "",
      amount: 45000,
      tax: 8100,
      paymentMethod: "Bank",
      status: "Paid",
      receipt: "invoice_123.pdf",
      description: "Raw material",
    },
    {
      id: "e7",
      date: "2025-02-28",
      title: "Rent",
      category: "Shop Rent",
      vendor: "Landlord",
      employee: "",
      client: "",
      amount: 12000,
      tax: 0,
      paymentMethod: "Bank",
      status: "Paid",
      receipt: "",
      description: "February rent",
    },
    {
      id: "e8",
      date: "2025-03-05",
      title: "Google Ads",
      category: "Marketing",
      vendor: "Google",
      employee: "Marketing",
      client: "",
      amount: 8000,
      tax: 0,
      paymentMethod: "Card",
      status: "Pending",
      receipt: "",
      description: "Ad campaign",
    },
    {
      id: "e9",
      date: "2025-03-08",
      title: "Salary - Rahul",
      category: "Salary",
      vendor: "",
      employee: "Rahul",
      client: "",
      amount: 18000,
      tax: 0,
      paymentMethod: "Bank",
      status: "Paid",
      receipt: "",
      description: "",
    },
    {
      id: "e10",
      date: "2025-03-09",
      title: "Client Dinner",
      category: "Client Meeting",
      vendor: "Restaurant",
      employee: "Rahul",
      client: "ABC Corp",
      amount: 2500,
      tax: 0,
      paymentMethod: "Cash",
      status: "Paid",
      receipt: "",
      description: "",
    },
  ]);

  // ─── DERIVED DATA ────────────────────────────────────────────
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);

  const thisMonthExpenses = expenses.filter((e) => {
    const d = new Date(e.date);
    return d >= firstDay && d <= lastDay;
  });

  const totalThisMonth = thisMonthExpenses.reduce(
    (sum, e) => sum + e.amount,
    0,
  );
  const pendingBills = expenses.filter((e) => e.status === "Pending").length;
  const avgDaily =
    thisMonthExpenses.length > 0
      ? totalThisMonth / thisMonthExpenses.length
      : 0;
  const highestCategory = (() => {
    const catMap = {};
    thisMonthExpenses.forEach((e) => {
      catMap[e.category] = (catMap[e.category] || 0) + e.amount;
    });
    let maxCat = "",
      maxAmt = 0;
    for (const [cat, amt] of Object.entries(catMap)) {
      if (amt > maxAmt) {
        maxAmt = amt;
        maxCat = cat;
      }
    }
    return maxCat || "None";
  })();

  // Cash vs Online
  const cash = thisMonthExpenses
    .filter((e) => e.paymentMethod === "Cash")
    .reduce((s, e) => s + e.amount, 0);
  const online = totalThisMonth - cash;

  // Prediction (simple: average of last 3 months growth)
  const getMonthlyTotal = (monthOffset) => {
    const month = (currentMonth - monthOffset + 12) % 12;
    const year = currentYear - (monthOffset > currentMonth ? 1 : 0);
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);
    return expenses
      .filter((e) => {
        const d = new Date(e.date);
        return d >= start && d <= end;
      })
      .reduce((s, e) => s + e.amount, 0);
  };
  const lastMonthTotal = getMonthlyTotal(1);
  const twoMonthsAgo = getMonthlyTotal(2);
  const growth =
    twoMonthsAgo > 0 ? (lastMonthTotal - twoMonthsAgo) / twoMonthsAgo : 0;
  const predictedNextMonth = totalThisMonth * (1 + growth);
  const comparison =
    lastMonthTotal > 0
      ? (((totalThisMonth - lastMonthTotal) / lastMonthTotal) * 100).toFixed(0)
      : "0";

  // ─── RECURRING EXPENSES (dummy) ─────────────────────────────
  const recurring = [
    { title: "Rent", amount: 12000, frequency: "Monthly" },
    { title: "Electricity", amount: 6500, frequency: "Monthly" },
    { title: "Internet", amount: 1000, frequency: "Monthly" },
    { title: "Salary", amount: 35000, frequency: "1st Date" },
  ];

  // ─── UPCOMING BILLS (due within 7 days) ─────────────────────
  const upcoming = expenses.filter((e) => {
    const d = new Date(e.date);
    const diff = (d - now) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 7 && e.status !== "Paid";
  });

  // ─── VENDOR / EMPLOYEE / CLIENT BREAKDOWNS ──────────────────
  const vendorMap = {};
  const employeeMap = {};
  const clientMap = {};
  thisMonthExpenses.forEach((e) => {
    if (e.vendor) vendorMap[e.vendor] = (vendorMap[e.vendor] || 0) + e.amount;
    if (e.employee)
      employeeMap[e.employee] = (employeeMap[e.employee] || 0) + e.amount;
    if (e.client) clientMap[e.client] = (clientMap[e.client] || 0) + e.amount;
  });
  const topVendors = Object.entries(vendorMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const topEmployees = Object.entries(employeeMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const topClients = Object.entries(clientMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // ─── CATEGORY PIE CHART DATA ────────────────────────────────
  const catTotals = {};
  thisMonthExpenses.forEach((e) => {
    catTotals[e.category] = (catTotals[e.category] || 0) + e.amount;
  });
  const pieData = Object.entries(catTotals).map(([label, value]) => ({
    label,
    value,
  }));
  const totalPie = pieData.reduce((s, d) => s + d.value, 0);

  // ─── MONTHLY TREND (last 6 months) ──────────────────────────
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const m = (currentMonth - i + 12) % 12;
    const y = currentYear - (i > currentMonth ? 1 : 0);
    const start = new Date(y, m, 1);
    const end = new Date(y, m + 1, 0);
    const total = expenses
      .filter((e) => {
        const d = new Date(e.date);
        return d >= start && d <= end;
      })
      .reduce((s, e) => s + e.amount, 0);
    months.push({
      label: new Date(y, m).toLocaleString("default", { month: "short" }),
      total,
    });
  }
  const maxTrend = Math.max(...months.map((m) => m.total), 1);

  // ─── AI INSIGHTS ─────────────────────────────────────────────
  const insights = [];
  if (totalThisMonth > lastMonthTotal * 1.2)
    insights.push("⚠️ Expenses this month are 20% higher than last month.");
  if (highestCategory === "Travel")
    insights.push(
      "✈️ Travel expenses are the highest – consider video calls to save.",
    );
  if (catTotals["Inventory"] && catTotals["Inventory"] > 20000)
    insights.push("📦 Stock purchase is high – negotiate with suppliers.");
  if (catTotals["Utilities"] && catTotals["Utilities"] > 5000)
    insights.push("💡 Electricity bill is increasing – check for wastage.");
  if (insights.length === 0)
    insights.push("✅ All expenses are within normal range. Keep it up!");

  // ─── EXPENSE LIST FILTERS ────────────────────────────────────
  const [expenseSearch, setExpenseSearch] = useState("");
  const [expenseCategoryFilter, setExpenseCategoryFilter] = useState("");
  const [expenseDateRange, setExpenseDateRange] = useState({
    from: "",
    to: "",
  });
  const [expenseStatusFilter, setExpenseStatusFilter] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "desc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredExpenses = expenses.filter((e) => {
    const matchSearch =
      e.title.toLowerCase().includes(expenseSearch.toLowerCase()) ||
      e.description.toLowerCase().includes(expenseSearch.toLowerCase()) ||
      e.vendor.toLowerCase().includes(expenseSearch.toLowerCase()) ||
      e.employee.toLowerCase().includes(expenseSearch.toLowerCase()) ||
      e.client.toLowerCase().includes(expenseSearch.toLowerCase());
    const matchCategory =
      !expenseCategoryFilter || e.category === expenseCategoryFilter;
    const matchStatus =
      !expenseStatusFilter || e.status === expenseStatusFilter;
    const matchDate =
      (!expenseDateRange.from ||
        new Date(e.date) >= new Date(expenseDateRange.from)) &&
      (!expenseDateRange.to ||
        new Date(e.date) <= new Date(expenseDateRange.to));
    return matchSearch && matchCategory && matchStatus && matchDate;
  });

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key])
      return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key])
      return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedExpenses.length / itemsPerPage);
  const paginated = sortedExpenses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // ─── EXPENSE MODAL STATES ────────────────────────────────────
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [isEditExpenseModalOpen, setIsEditExpenseModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [expenseFormData, setExpenseFormData] = useState({
    title: "",
    description: "",
    category: "",
    vendor: "",
    employee: "",
    client: "",
    amount: "",
    tax: "",
    paymentMethod: "Cash",
    date: new Date().toISOString().split("T")[0],
    status: "Pending",
    receipt: null,
    dueDate: "",
    recurring: false,
    frequency: "Monthly",
  });

  const resetExpenseForm = () => {
    setExpenseFormData({
      title: "",
      description: "",
      category: "",
      vendor: "",
      employee: "",
      client: "",
      amount: "",
      tax: "",
      paymentMethod: "Cash",
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
      receipt: null,
      dueDate: "",
      recurring: false,
      frequency: "Monthly",
    });
  };

  const handleAddExpense = () => {
    if (
      !expenseFormData.title ||
      !expenseFormData.category ||
      !expenseFormData.amount
    ) {
      alert("Please fill Title, Category and Amount");
      return;
    }
    const newExpense = {
      id: `e${Date.now()}`,
      date: expenseFormData.date,
      title: expenseFormData.title,
      category: expenseFormData.category,
      vendor: expenseFormData.vendor || "",
      employee: expenseFormData.employee || "",
      client: expenseFormData.client || "",
      amount: parseFloat(expenseFormData.amount),
      tax: parseFloat(expenseFormData.tax) || 0,
      paymentMethod: expenseFormData.paymentMethod,
      status: expenseFormData.status,
      receipt: expenseFormData.receipt ? expenseFormData.receipt.name : "",
      description: expenseFormData.description || "",
    };
    setExpenses([newExpense, ...expenses]);
    setIsAddExpenseModalOpen(false);
    resetExpenseForm();
  };

  const handleEditExpense = () => {
    if (!selectedExpense) return;
    const updated = {
      ...selectedExpense,
      date: expenseFormData.date,
      title: expenseFormData.title,
      category: expenseFormData.category,
      vendor: expenseFormData.vendor || "",
      employee: expenseFormData.employee || "",
      client: expenseFormData.client || "",
      amount: parseFloat(expenseFormData.amount),
      tax: parseFloat(expenseFormData.tax) || 0,
      paymentMethod: expenseFormData.paymentMethod,
      status: expenseFormData.status,
      receipt: expenseFormData.receipt
        ? expenseFormData.receipt.name
        : selectedExpense.receipt,
      description: expenseFormData.description || "",
    };
    setExpenses(
      expenses.map((e) => (e.id === selectedExpense.id ? updated : e)),
    );
    setIsEditExpenseModalOpen(false);
    setSelectedExpense(null);
    resetExpenseForm();
  };

  const handleDeleteExpense = (id) => {
    if (window.confirm("Delete this expense?")) {
      setExpenses(expenses.filter((e) => e.id !== id));
    }
  };

  const openEditExpense = (exp) => {
    setSelectedExpense(exp);
    setExpenseFormData({
      title: exp.title,
      description: exp.description || "",
      category: exp.category,
      vendor: exp.vendor || "",
      employee: exp.employee || "",
      client: exp.client || "",
      amount: exp.amount.toString(),
      tax: exp.tax.toString(),
      paymentMethod: exp.paymentMethod,
      date: exp.date,
      status: exp.status,
      receipt: null,
      dueDate: "",
      recurring: false,
      frequency: "Monthly",
    });
    setIsEditExpenseModalOpen(true);
  };

  // ─── RENDER HELPERS ──────────────────────────────────────────

  // Pie Chart SVG
  const PieChart = ({ data, total }) => {
    let cumulative = 0;
    const colors = [
      "#4C3CCE",
      "#06B181",
      "#F97316",
      "#D946EF",
      "#3B82F6",
      "#F43F5E",
      "#EAB308",
      "#8B5CF6",
    ];
    return (
      <svg viewBox="0 0 200 200" width="100%" height="100%">
        {data.map((d, i) => {
          const percent = d.value / total;
          const angle = percent * 360;
          const startAngle = cumulative;
          const endAngle = cumulative + angle;
          const x1 = 100 + 80 * Math.cos((Math.PI / 180) * startAngle);
          const y1 = 100 + 80 * Math.sin((Math.PI / 180) * startAngle);
          const x2 = 100 + 80 * Math.cos((Math.PI / 180) * endAngle);
          const y2 = 100 + 80 * Math.sin((Math.PI / 180) * endAngle);
          const largeArc = angle > 180 ? 1 : 0;
          cumulative += angle;
          return (
            <path
              key={i}
              d={`M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`}
              fill={colors[i % colors.length]}
              stroke="#fff"
              strokeWidth="2"
            />
          );
        })}
        <text
          x="100"
          y="100"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="14"
          fill="#1a1d24"
          fontWeight="600"
        >
          {data.length > 0 ? "Expenses" : "No data"}
        </text>
      </svg>
    );
  };

  // Bar Chart SVG
  const BarChart = ({ data, max }) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-end",
          height: "150px",
          padding: "10px 0",
        }}
      >
        {data.map((d, i) => {
          const height = max > 0 ? (d.total / max) * 120 : 0;
          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "40px",
              }}
            >
              <div
                style={{
                  height: `${height}px`,
                  width: "30px",
                  backgroundColor: "#4C3CCE",
                  borderRadius: "4px 4px 0 0",
                  transition: "height 0.3s",
                }}
              ></div>
              <span
                style={{ fontSize: "10px", color: "#858D9D", marginTop: "4px" }}
              >
                {d.label}
              </span>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: "600",
                  color: "#1a1d24",
                }}
              >
                ₹{d.total}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  // ─── RENDER EXPENSES DASHBOARD ──────────────────────────────
  const renderExpensesDashboard = () => (
    <div>
      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "20px",
          borderBottom: "1px solid #E0E2E7",
          paddingBottom: "8px",
        }}
      >
        <button
          className={`btn-tertiary ${expenseTab === "dashboard" ? "active" : ""}`}
          onClick={() => setExpenseTab("dashboard")}
          style={{
            border: "none",
            background: expenseTab === "dashboard" ? "#E8F3FE" : "transparent",
            color: expenseTab === "dashboard" ? "#0C8CE9" : "#475467",
          }}
        >
          Dashboard
        </button>
        <button
          className={`btn-tertiary ${expenseTab === "list" ? "active" : ""}`}
          onClick={() => setExpenseTab("list")}
          style={{
            border: "none",
            background: expenseTab === "list" ? "#E8F3FE" : "transparent",
            color: expenseTab === "list" ? "#0C8CE9" : "#475467",
          }}
        >
          Expenses List
        </button>
        <button
          className={`btn-tertiary ${expenseTab === "reports" ? "active" : ""}`}
          onClick={() => setExpenseTab("reports")}
          style={{
            border: "none",
            background: expenseTab === "reports" ? "#E8F3FE" : "transparent",
            color: expenseTab === "reports" ? "#0C8CE9" : "#475467",
          }}
        >
          Reports
        </button>
      </div>

      {expenseTab === "dashboard" && (
        <>
          {/* Summary Cards */}
          <div className="stats-cards">
            <StatCard
              icon={<Wallet size={14} color="#485eb0" />}
              title="This Month"
              value={`₹ ${totalThisMonth.toLocaleString("en-IN")}`}
            />
            <StatCard
              icon={<TrendingUp size={14} color="#06B181" />}
              title="Predicted Next Month"
              value={`₹ ${predictedNextMonth.toFixed(0).toLocaleString("en-IN")}`}
            />
            <StatCard
              icon={<BarChart3 size={14} color="#C59242" />}
              title={`Last Month vs This Month`}
              value={`${comparison}%`}
            />
            <StatCard
              icon={<Calendar size={14} color="#0C8CE9" />}
              title="Avg Daily"
              value={`₹ ${avgDaily.toFixed(0)}`}
            />
            <StatCard
              icon={<Tag size={14} color="#D946EF" />}
              title="Highest Category"
              value={highestCategory}
            />
            <StatCard
              icon={<AlertCircle size={14} color="#C33B3B" />}
              title="Pending Bills"
              value={pendingBills}
            />
            <StatCard
              icon={<DollarSign size={14} color="#06B181" />}
              title="Cash vs Online"
              value={`₹ ${cash} / ₹ ${online}`}
            />
          </div>

          {/* Charts */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            <div className="stat-card" style={{ padding: "16px" }}>
              <h4
                style={{
                  marginBottom: "10px",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Category Breakdown
              </h4>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "200px",
                }}
              >
                {pieData.length > 0 ? (
                  <PieChart data={pieData} total={totalPie} />
                ) : (
                  <p>No data</p>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginTop: "10px",
                }}
              >
                {pieData.map((d, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: "12px",
                      background: "#f0f2f5",
                      padding: "2px 8px",
                      borderRadius: "12px",
                    }}
                  >
                    {d.label}: ₹{d.value}
                  </span>
                ))}
              </div>
            </div>
            <div className="stat-card" style={{ padding: "16px" }}>
              <h4
                style={{
                  marginBottom: "10px",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Monthly Trend
              </h4>
              <BarChart data={months} max={maxTrend} />
            </div>
          </div>

          {/* AI Insights */}
          <div
            className="stat-card"
            style={{
              padding: "16px",
              marginBottom: "20px",
              background: "#F0F7FF",
            }}
          >
            <h4
              style={{
                fontSize: "14px",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              🧠 AI Insights
            </h4>
            <ul style={{ paddingLeft: "20px", color: "#475467" }}>
              {insights.map((ins, i) => (
                <li key={i}>{ins}</li>
              ))}
            </ul>
          </div>

          {/* Recurring & Upcoming */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            <div className="stat-card" style={{ padding: "16px" }}>
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "8px",
                }}
              >
                🔄 Recurring Expenses
              </h4>
              {recurring.map((r, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "6px 0",
                    borderBottom: "1px solid #f0f2f5",
                  }}
                >
                  <span>{r.title}</span>
                  <span>
                    ₹{r.amount} ({r.frequency})
                  </span>
                </div>
              ))}
            </div>
            <div className="stat-card" style={{ padding: "16px" }}>
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "8px",
                }}
              >
                ⏰ Upcoming Bills
              </h4>
              {upcoming.length === 0 ? (
                <p style={{ color: "#858D9D" }}>No upcoming bills</p>
              ) : (
                upcoming.map((e, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "6px 0",
                      borderBottom: "1px solid #f0f2f5",
                    }}
                  >
                    <span>{e.title}</span>
                    <span>
                      ₹{e.amount} (due {new Date(e.date).toLocaleDateString()})
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Vendor / Employee / Client Breakdowns */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            <div className="stat-card" style={{ padding: "16px" }}>
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "8px",
                }}
              >
                🏢 Top Vendors
              </h4>
              {topVendors.map(([name, amt], i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "4px 0",
                    borderBottom: "1px solid #f0f2f5",
                  }}
                >
                  <span>{name}</span>
                  <span>₹{amt}</span>
                </div>
              ))}
            </div>
            <div className="stat-card" style={{ padding: "16px" }}>
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "8px",
                }}
              >
                👤 Top Employees
              </h4>
              {topEmployees.map(([name, amt], i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "4px 0",
                    borderBottom: "1px solid #f0f2f5",
                  }}
                >
                  <span>{name}</span>
                  <span>₹{amt}</span>
                </div>
              ))}
            </div>
            <div className="stat-card" style={{ padding: "16px" }}>
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "8px",
                }}
              >
                🤝 Top Clients
              </h4>
              {topClients.map(([name, amt], i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "4px 0",
                    borderBottom: "1px solid #f0f2f5",
                  }}
                >
                  <span>{name}</span>
                  <span>₹{amt}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {expenseTab === "list" && (
        <>
          {/* Advanced Filters */}
          <div className="filter-bar">
            <div className="filter-left" style={{ flexWrap: "wrap" }}>
              <div className="search-wrapper">
                <IcSearch size={16} color="#525A6A" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={expenseSearch}
                  onChange={(e) => setExpenseSearch(e.target.value)}
                />
              </div>
              <select
                className="category-dropdown"
                value={expenseCategoryFilter}
                onChange={(e) => setExpenseCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                {[...new Set(expenses.map((e) => e.category))].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <select
                className="category-dropdown"
                value={expenseStatusFilter}
                onChange={(e) => setExpenseStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
              </select>
              <input
                type="date"
                value={expenseDateRange.from}
                onChange={(e) =>
                  setExpenseDateRange({
                    ...expenseDateRange,
                    from: e.target.value,
                  })
                }
                style={{
                  padding: "6px",
                  borderRadius: "8px",
                  border: "1px solid #d0d5dd",
                }}
              />
              <input
                type="date"
                value={expenseDateRange.to}
                onChange={(e) =>
                  setExpenseDateRange({
                    ...expenseDateRange,
                    to: e.target.value,
                  })
                }
                style={{
                  padding: "6px",
                  borderRadius: "8px",
                  border: "1px solid #d0d5dd",
                }}
              />
              <button
                className="btn-tertiary"
                onClick={() => {
                  setExpenseSearch("");
                  setExpenseCategoryFilter("");
                  setExpenseStatusFilter("");
                  setExpenseDateRange({ from: "", to: "" });
                }}
              >
                <RefreshCw size={14} color="#525A6A" /> Reset
              </button>
            </div>
            <div className="filter-right">
              <button
                className="btn-primary"
                onClick={() => setIsAddExpenseModalOpen(true)}
              >
                <Plus size={16} color="#292D35" /> Add Expense
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="table-container">
            <table className="items-table">
              <thead>
                <tr>
                  <th
                    onClick={() =>
                      setSortConfig({
                        key: "id",
                        direction:
                          sortConfig.key === "id" &&
                          sortConfig.direction === "asc"
                            ? "desc"
                            : "asc",
                      })
                    }
                  >
                    ID
                  </th>
                  <th
                    onClick={() =>
                      setSortConfig({
                        key: "date",
                        direction:
                          sortConfig.key === "date" &&
                          sortConfig.direction === "asc"
                            ? "desc"
                            : "asc",
                      })
                    }
                  >
                    Date
                  </th>
                  <th
                    onClick={() =>
                      setSortConfig({
                        key: "title",
                        direction:
                          sortConfig.key === "title" &&
                          sortConfig.direction === "asc"
                            ? "desc"
                            : "asc",
                      })
                    }
                  >
                    Title
                  </th>
                  <th>Category</th>
                  <th>Vendor</th>
                  <th>Employee</th>
                  <th>Client</th>
                  <th
                    onClick={() =>
                      setSortConfig({
                        key: "amount",
                        direction:
                          sortConfig.key === "amount" &&
                          sortConfig.direction === "asc"
                            ? "desc"
                            : "asc",
                      })
                    }
                  >
                    Amount
                  </th>
                  <th>Tax</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Receipt</th>
                  <th style={{ width: "80px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td
                      colSpan="13"
                      style={{ textAlign: "center", padding: "20px" }}
                    >
                      No expenses found
                    </td>
                  </tr>
                ) : (
                  paginated.map((e) => (
                    <tr key={e.id}>
                      <td>{e.id}</td>
                      <td>{new Date(e.date).toLocaleDateString()}</td>
                      <td>{e.title}</td>
                      <td>{e.category}</td>
                      <td>{e.vendor}</td>
                      <td>{e.employee}</td>
                      <td>{e.client}</td>
                      <td>₹{e.amount}</td>
                      <td>{e.tax > 0 ? `₹${e.tax}` : "-"}</td>
                      <td>{e.paymentMethod}</td>
                      <td>
                        <span
                          style={{
                            background:
                              e.status === "Paid"
                                ? "#E6F9F1"
                                : e.status === "Pending"
                                  ? "#FEF3E2"
                                  : "#E8F3FE",
                            padding: "2px 10px",
                            borderRadius: "12px",
                            fontSize: "12px",
                          }}
                        >
                          {e.status}
                        </span>
                      </td>
                      <td>
                        {e.receipt ? (
                          <FileText size={14} color="#0C8CE9" />
                        ) : (
                          "-"
                        )}
                      </td>
                      <td>
                        <div className="row-actions">
                          <button
                            className="btn-icon-small"
                            onClick={() => openEditExpense(e)}
                          >
                            <Edit size={14} color="#525A6A" />
                          </button>
                          <button
                            className="btn-icon-small"
                            onClick={() => handleDeleteExpense(e.id)}
                          >
                            <Trash2 size={14} color="#C33B3B" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div
            className="table-footer"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>
              Showing {paginated.length} of {filteredExpenses.length} expenses
            </span>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                className="btn-secondary"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span style={{ padding: "6px 12px" }}>
                Page {currentPage} of {totalPages || 1}
              </span>
              <button
                className="btn-secondary"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {expenseTab === "reports" && (
        <div
          className="stat-card"
          style={{ padding: "40px", textAlign: "center" }}
        >
          <h3>📊 Reports Module</h3>
          <p style={{ color: "#858D9D" }}>
            Export daily, weekly, monthly, GST, vendor, employee, and client
            reports. (Coming soon)
          </p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <button className="btn-primary-solid">Export Excel</button>
            <button className="btn-primary-solid">Export PDF</button>
            <button className="btn-primary-solid">Print</button>
          </div>
        </div>
      )}
    </div>
  );

  // ─── RENDER ITEMS VIEW (unchanged) ──────────────────────────
  const renderItemsView = () => (
    // ... your original items view code here
    <div>Items view (unchanged)</div>
  );

  const renderGodownView = () => <div>Godown view (unchanged)</div>;

  // ─── MAIN RENDER ─────────────────────────────────────────────
  const renderContent = () => {
    switch (activeSection) {
      case "items":
        return renderItemsView();
      case "godown":
        return renderGodownView();
      case "expenses":
        return renderExpensesDashboard();
      default:
        return renderItemsView();
    }
  };

  // ─── RETURN ──────────────────────────────────────────────────
  return (
    <div className="items-workspace">
      {/* LEFT NAV (unchanged) – make sure Expenses nav option is present */}
      <aside className="left-nav">
        {/* ... your original left nav code, with the Expenses NavOption added */}
        <div className="profile-container">...</div>
        <nav className="left-nav-body">
          <div className="nav-section-title">Accounting Solutions</div>
          <div className="nav-options">
            <NavOption
              icon={<IcExpenses />}
              label="Expenses"
              active={activeSection === "expenses"}
              onClick={() => setActiveSection("expenses")}
            />
            {/* other nav options */}
          </div>
        </nav>
      </aside>

      <main className="main-content">{renderContent()}</main>

      {/* ADD EXPENSE MODAL */}
      {isAddExpenseModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsAddExpenseModalOpen(false)}
        >
          <div
            className="modal-content-wrapper"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "800px" }}
          >
            <div className="modal-header">
              <h2>Add Expense</h2>
              <button
                className="btn-icon"
                onClick={() => setIsAddExpenseModalOpen(false)}
              >
                <X size={20} color="#858D9D" />
              </button>
            </div>
            <div className="modal-body create-item-form">
              <div className="form-section">
                <div className="form-row">
                  <div className="form-group">
                    <label>Title *</label>
                    <input
                      type="text"
                      value={expenseFormData.title}
                      onChange={(e) =>
                        setExpenseFormData({
                          ...expenseFormData,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Category *</label>
                    <select
                      value={expenseFormData.category}
                      onChange={(e) =>
                        setExpenseFormData({
                          ...expenseFormData,
                          category: e.target.value,
                        })
                      }
                    >
                      <option value="">Select</option>
                      <option value="Travel">Travel</option>
                      <option value="Office Supplies">Office Supplies</option>
                      <option value="Utilities">Utilities</option>
                      <option value="Meals">Meals</option>
                      <option value="Inventory">Inventory</option>
                      <option value="Salary">Salary</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Shop Rent">Shop Rent</option>
                      <option value="Client Meeting">Client Meeting</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Vendor</label>
                    <input
                      type="text"
                      value={expenseFormData.vendor}
                      onChange={(e) =>
                        setExpenseFormData({
                          ...expenseFormData,
                          vendor: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Employee</label>
                    <input
                      type="text"
                      value={expenseFormData.employee}
                      onChange={(e) =>
                        setExpenseFormData({
                          ...expenseFormData,
                          employee: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Client</label>
                    <input
                      type="text"
                      value={expenseFormData.client}
                      onChange={(e) =>
                        setExpenseFormData({
                          ...expenseFormData,
                          client: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Amount (₹) *</label>
                    <input
                      type="number"
                      value={expenseFormData.amount}
                      onChange={(e) =>
                        setExpenseFormData({
                          ...expenseFormData,
                          amount: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Tax (₹)</label>
                    <input
                      type="number"
                      value={expenseFormData.tax}
                      onChange={(e) =>
                        setExpenseFormData({
                          ...expenseFormData,
                          tax: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Payment Method</label>
                    <select
                      value={expenseFormData.paymentMethod}
                      onChange={(e) =>
                        setExpenseFormData({
                          ...expenseFormData,
                          paymentMethod: e.target.value,
                        })
                      }
                    >
                      <option value="Cash">Cash</option>
                      <option value="Bank">Bank</option>
                      <option value="Card">Card</option>
                      <option value="UPI">UPI</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      value={expenseFormData.date}
                      onChange={(e) =>
                        setExpenseFormData({
                          ...expenseFormData,
                          date: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      value={expenseFormData.status}
                      onChange={(e) =>
                        setExpenseFormData({
                          ...expenseFormData,
                          status: e.target.value,
                        })
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Paid">Paid</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Description</label>
                    <input
                      type="text"
                      value={expenseFormData.description}
                      onChange={(e) =>
                        setExpenseFormData({
                          ...expenseFormData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Receipt</label>
                    <input
                      type="file"
                      onChange={(e) =>
                        setExpenseFormData({
                          ...expenseFormData,
                          receipt: e.target.files[0],
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-secondary"
                onClick={() => setIsAddExpenseModalOpen(false)}
              >
                Cancel
              </button>
              <button className="btn-primary-solid" onClick={handleAddExpense}>
                Add Expense
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT EXPENSE MODAL (similar) */}
      {isEditExpenseModalOpen && selectedExpense && (
        <div
          className="modal-overlay"
          onClick={() => setIsEditExpenseModalOpen(false)}
        >
          <div
            className="modal-content-wrapper"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "800px" }}
          >
            <div className="modal-header">
              <h2>Edit Expense</h2>
              <button
                className="btn-icon"
                onClick={() => setIsEditExpenseModalOpen(false)}
              >
                <X size={20} color="#858D9D" />
              </button>
            </div>
            <div className="modal-body create-item-form">
              <div className="form-section">
                <div className="form-row">
                  <div className="form-group">
                    <label>Title *</label>
                    <input
                      type="text"
                      value={expenseFormData.title}
                      onChange={(e) =>
                        setExpenseFormData({
                          ...expenseFormData,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Category *</label>
                    <select
                      value={expenseFormData.category}
                      onChange={(e) =>
                        setExpenseFormData({
                          ...expenseFormData,
                          category: e.target.value,
                        })
                      }
                    >
                      <option value="Travel">Travel</option>
                      <option value="Office Supplies">Office Supplies</option>
                      <option value="Utilities">Utilities</option>
                      <option value="Meals">Meals</option>
                      <option value="Inventory">Inventory</option>
                      <option value="Salary">Salary</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Shop Rent">Shop Rent</option>
                      <option value="Client Meeting">Client Meeting</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Vendor</label>
                    <input
                      type="text"
                      value={expenseFormData.vendor}
                      onChange={(e) =>
                        setExpenseFormData({
                          ...expenseFormData,
                          vendor: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Employee</label>
                    <input
                      type="text"
                      value={expenseFormData.employee}
                      onChange={(e) =>
                        setExpenseFormData({
                          ...expenseFormData,
                          employee: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Client</label>
                    <input
                      type="text"
                      value={expenseFormData.client}
                      onChange={(e) =>
                        setExpenseFormData({
                          ...expenseFormData,
                          client: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Amount (₹) *</label>
                    <input
                      type="number"
                      value={expenseFormData.amount}
                      onChange={(e) =>
                        setExpenseFormData({
                          ...expenseFormData,
                          amount: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Tax (₹)</label>
                    <input
                      type="number"
                      value={expenseFormData.tax}
                      onChange={(e) =>
                        setExpenseFormData({
                          ...expenseFormData,
                          tax: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Payment Method</label>
                    <select
                      value={expenseFormData.paymentMethod}
                      onChange={(e) =>
                        setExpenseFormData({
                          ...expenseFormData,
                          paymentMethod: e.target.value,
                        })
                      }
                    >
                      <option value="Cash">Cash</option>
                      <option value="Bank">Bank</option>
                      <option value="Card">Card</option>
                      <option value="UPI">UPI</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      value={expenseFormData.date}
                      onChange={(e) =>
                        setExpenseFormData({
                          ...expenseFormData,
                          date: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      value={expenseFormData.status}
                      onChange={(e) =>
                        setExpenseFormData({
                          ...expenseFormData,
                          status: e.target.value,
                        })
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Paid">Paid</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Description</label>
                    <input
                      type="text"
                      value={expenseFormData.description}
                      onChange={(e) =>
                        setExpenseFormData({
                          ...expenseFormData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Receipt</label>
                    <input
                      type="file"
                      onChange={(e) =>
                        setExpenseFormData({
                          ...expenseFormData,
                          receipt: e.target.files[0],
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-secondary"
                onClick={() => setIsEditExpenseModalOpen(false)}
              >
                Cancel
              </button>
              <button className="btn-primary-solid" onClick={handleEditExpense}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── SUB-COMPONENTS ────────────────────────────────────────────
const StatCard = ({ icon, title, value }) => (
  <div className="stat-card">
    <div className="stat-header">
      {icon}
      <span className="stat-title">{title}</span>
    </div>
    <div className="stat-value">{value}</div>
  </div>
);

// ─── MISSING ICON ──────────────────────────────────────────────
const TrendingUp = ({ size = 14, color = "#06B181" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M3 17L9 11L13 15L21 7"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 7H21V11"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── STYLES (already in your project, but include for completeness) ─────
// ... (the styles from your original code are unchanged; make sure they are present)

export default ItemsWorkspace;
 
