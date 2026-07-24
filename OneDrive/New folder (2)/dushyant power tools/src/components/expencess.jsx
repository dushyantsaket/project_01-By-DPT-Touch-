import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ComposedChart,
  Scatter,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Search,
  Filter,
  Users,
  Building2,
  Factory,
  Store,
  Truck,
  Fuel,
  Home,
  Briefcase,
  User,
  Phone,
  Mail,
  DollarSign,
  CreditCard,
  Calendar,
  Clock,
  MapPin,
  Navigation,
  FileText,
  Receipt,
  Printer,
  X,
  Check,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Activity,
  Zap,
  Settings,
  Bell,
  UserPlus,
  Warehouse,
  ShoppingCart,
  Package,
  Shield,
  Wrench,
  Coffee,
  Utensils,
  Hotel,
  Car,
  Bus,
  Train,
  Plane,
  Globe,
  Link,
  Camera,
  UploadCloud,
  File,
  Image,
  ChevronDown,
  ChevronRight,
  Menu,
  Sun,
  Moon,
  LogOut,
  HelpCircle,
  Info,
  Award,
  Target,
  Flag,
  DollarSign as MoneyIcon,
  ArrowLeft,
  BarChart2,
  PieChart as PieChart2,
  TrendingUp as TrendingUpIcon,
  Calendar as CalendarIcon,
  FileText as FileTextIcon,
  Printer as PrinterIcon,
} from "lucide-react";
import "./expenseworkspace.css";
// ============================================================
// 1. UTILITY FUNCTIONS
// ============================================================

const formatCurrency = (value) => {
  if (!value) return "₹0";
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)}Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
  return `₹${value.toFixed(0)}`;
};

const formatCurrencyFull = (value) => {
  if (!value) return "₹0";
  return `₹${value.toLocaleString("en-IN")}`;
};

const getInitials = (name) => {
  if (!name) return "?";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getStatusColor = (status) => {
  const map = {
    Active:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    Inactive:
      "bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300",
    Pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    Paid: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    Unpaid: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    Due: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    Completed:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    Cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    Salary:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    Fuel: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    Transport:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
    Travel: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
    Warehouse:
      "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
    Shop: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    Factory: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    Utility: "bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300",
    Electricity:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    Internet:
      "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
    Water: "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300",
    Rent: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    Maintenance:
      "bg-stone-100 text-stone-800 dark:bg-stone-900/30 dark:text-stone-300",
  };
  return (
    map[status] ||
    "bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-300"
  );
};

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

const getMonthName = (monthIndex) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[monthIndex];
};

const getCurrentMonth = () => {
  return new Date().getMonth();
};

const getCurrentYear = () => {
  return new Date().getFullYear();
};

const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// ============================================================
// 2. MAIN COMPONENT
// ============================================================

const Expenses = () => {
  // ========== STATE ==========
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeSubTab, setActiveSubTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [selectedYear, setSelectedYear] = useState(getCurrentYear());
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [showBillPreview, setShowBillPreview] = useState(false);
  const [billPreviewData, setBillPreviewData] = useState(null);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickAddType, setQuickAddType] = useState(null);
  const [notification, setNotification] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [reportPeriod, setReportPeriod] = useState("monthly");
  const [reportMonth, setReportMonth] = useState(getCurrentMonth());
  const [reportYear, setReportYear] = useState(getCurrentYear());

  // ========== MASTER DATA (stored in localStorage) ==========
  const [employees, setEmployees] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [fuelEntries, setFuelEntries] = useState([]);
  const [travelEntries, setTravelEntries] = useState([]);
  const [transportTrips, setTransportTrips] = useState([]);
  const [utilityBills, setUtilityBills] = useState([]);
  const [orders, setOrders] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [payments, setPayments] = useState([]);

  // ========== LOAD DATA FROM LOCALSTORAGE ==========
  useEffect(() => {
    const loadData = () => {
      const keys = [
        "expenses_employees",
        "expenses_warehouses",
        "expenses_vehicles",
        "expenses_customers",
        "expenses_suppliers",
        "expenses_products",
        "expenses_expenses",
        "expenses_categories",
        "expenses_fuel",
        "expenses_travel",
        "expenses_transport",
        "expenses_utilities",
        "expenses_orders",
        "expenses_purchases",
        "expenses_invoices",
        "expenses_payments",
      ];
      const data = keys.reduce((acc, key) => {
        const stored = localStorage.getItem(key);
        acc[key.replace("expenses_", "")] = stored ? JSON.parse(stored) : [];
        return acc;
      }, {});
      setEmployees(data.employees || []);
      setWarehouses(data.warehouses || []);
      setVehicles(data.vehicles || []);
      setCustomers(data.customers || []);
      setSuppliers(data.suppliers || []);
      setProducts(data.products || []);
      setExpenses(data.expenses || []);
      setExpenseCategories(data.categories || []);
      setFuelEntries(data.fuel || []);
      setTravelEntries(data.travel || []);
      setTransportTrips(data.transport || []);
      setUtilityBills(data.utilities || []);
      setOrders(data.orders || []);
      setPurchaseOrders(data.purchases || []);
      setInvoices(data.invoices || []);
      setPayments(data.payments || []);
    };
    loadData();
  }, []);

  // ========== SAVE DATA TO LOCALSTORAGE ==========
  const saveData = (key, data) => {
    localStorage.setItem(`expenses_${key}`, JSON.stringify(data));
  };

  // ========== DEFAULT EXPENSE CATEGORIES ==========
  useEffect(() => {
    if (expenseCategories.length === 0) {
      const defaultCategories = [
        "Salary",
        "Fuel",
        "Transport",
        "Travel",
        "Warehouse Rent",
        "Shop Rent",
        "Factory Rent",
        "Electricity",
        "Water",
        "Internet",
        "Maintenance",
        "Packing Material",
        "Marketing",
        "Advertising",
        "Client Meeting",
        "Hotel",
        "Food",
        "Parking",
        "Toll Tax",
        "Insurance",
        "Office Supplies",
        "Software Subscription",
        "GST",
        "Miscellaneous",
      ];
      setExpenseCategories(
        defaultCategories.map((c) => ({ id: generateId(), name: c })),
      );
      saveData(
        "categories",
        defaultCategories.map((c) => ({ id: generateId(), name: c })),
      );
    }
  }, []);

  // ========== COMPUTED VALUES (Real-time calculations) ==========
  const totalEmployees = useMemo(() => employees.length, [employees]);
  const totalWarehouses = useMemo(() => warehouses.length, [warehouses]);
  const totalVehicles = useMemo(() => vehicles.length, [vehicles]);
  const totalCustomers = useMemo(() => customers.length, [customers]);
  const totalSuppliers = useMemo(() => suppliers.length, [suppliers]);
  const totalProducts = useMemo(() => products.length, [products]);

  // Calculate salary expense
  const salaryExpense = useMemo(() => {
    return employees.reduce((sum, emp) => sum + (emp.salary || 0), 0);
  }, [employees]);

  // Calculate fuel expense
  const fuelExpense = useMemo(() => {
    return fuelEntries.reduce((sum, entry) => sum + (entry.amount || 0), 0);
  }, [fuelEntries]);

  // Calculate travel expense
  const travelExpense = useMemo(() => {
    return travelEntries.reduce((sum, entry) => sum + (entry.total || 0), 0);
  }, [travelEntries]);

  // Calculate transport expense
  const transportExpense = useMemo(() => {
    return transportTrips.reduce((sum, trip) => sum + (trip.total || 0), 0);
  }, [transportTrips]);

  // Calculate warehouse expenses
  const warehouseExpense = useMemo(() => {
    return warehouses.reduce((sum, wh) => {
      let total =
        (wh.monthlyRent || 0) +
        (wh.electricity || 0) +
        (wh.water || 0) +
        (wh.internet || 0) +
        (wh.security || 0) +
        (wh.maintenance || 0);
      return sum + total;
    }, 0);
  }, [warehouses]);

  // Calculate utility bills
  const utilityExpense = useMemo(() => {
    return utilityBills.reduce((sum, bill) => sum + (bill.amount || 0), 0);
  }, [utilityBills]);

  // Calculate total expense from all sources
  const totalExpense = useMemo(() => {
    const expenseTotal = expenses.reduce(
      (sum, exp) => sum + (exp.amount || 0),
      0,
    );
    return (
      expenseTotal +
      salaryExpense +
      fuelExpense +
      travelExpense +
      transportExpense +
      warehouseExpense +
      utilityExpense
    );
  }, [
    expenses,
    salaryExpense,
    fuelExpense,
    travelExpense,
    transportExpense,
    warehouseExpense,
    utilityExpense,
  ]);

  // Revenue (from orders)
  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, order) => sum + (order.amount || 0), 0);
  }, [orders]);

  // Profit calculation
  const grossProfit = totalRevenue - totalExpense;
  const tax = totalExpense * 0.05;
  const netProfit = grossProfit - tax;

  // Monthly expense breakdown
  const monthlyExpenseData = useMemo(() => {
    const months = [];
    for (let i = 0; i < 12; i++) {
      const monthExpenses = expenses.filter((e) => {
        const d = new Date(e.date);
        return d.getMonth() === i && d.getFullYear() === getCurrentYear();
      });
      const total = monthExpenses.reduce((sum, e) => sum + (e.amount || 0), 0);
      months.push({
        month: getMonthName(i),
        expenses: total,
        revenue: 0,
      });
    }
    orders.forEach((order) => {
      const d = new Date(order.date);
      if (d.getFullYear() === getCurrentYear()) {
        months[d.getMonth()].revenue += order.amount || 0;
      }
    });
    return months;
  }, [expenses, orders]);

  // Expense category breakdown
  const categoryBreakdown = useMemo(() => {
    const categories = {};
    expenses.forEach((exp) => {
      const cat = exp.category || "Uncategorized";
      categories[cat] = (categories[cat] || 0) + (exp.amount || 0);
    });
    if (salaryExpense > 0)
      categories["Salary"] = (categories["Salary"] || 0) + salaryExpense;
    if (fuelExpense > 0)
      categories["Fuel"] = (categories["Fuel"] || 0) + fuelExpense;
    if (travelExpense > 0)
      categories["Travel"] = (categories["Travel"] || 0) + travelExpense;
    if (transportExpense > 0)
      categories["Transport"] =
        (categories["Transport"] || 0) + transportExpense;
    if (warehouseExpense > 0)
      categories["Warehouse"] =
        (categories["Warehouse"] || 0) + warehouseExpense;
    if (utilityExpense > 0)
      categories["Utilities"] = (categories["Utilities"] || 0) + utilityExpense;
    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  }, [
    expenses,
    salaryExpense,
    fuelExpense,
    travelExpense,
    transportExpense,
    warehouseExpense,
    utilityExpense,
  ]);

  // ========== NEW: Reports & Historical Data ==========
  const getHistoricalData = (monthsBack = 6) => {
    const data = [];
    const currentDate = new Date();

    for (let i = monthsBack; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setMonth(date.getMonth() - i);
      const month = date.getMonth();
      const year = date.getFullYear();

      // Filter expenses for this month
      const monthExpenses = expenses.filter((e) => {
        const d = new Date(e.date);
        return d.getMonth() === month && d.getFullYear() === year;
      });

      const monthOrders = orders.filter((o) => {
        const d = new Date(o.date);
        return d.getMonth() === month && d.getFullYear() === year;
      });

      const totalExp = monthExpenses.reduce(
        (sum, e) => sum + (e.amount || 0),
        0,
      );
      const totalRev = monthOrders.reduce((sum, o) => sum + (o.amount || 0), 0);

      data.push({
        month: getMonthName(month),
        year: year,
        expenses: totalExp,
        revenue: totalRev,
        profit: totalRev - totalExp,
        label: `${getMonthName(month)} ${year}`,
      });
    }
    return data;
  };

  const historicalData = useMemo(() => {
    return getHistoricalData(6);
  }, [expenses, orders]);

  const yearlyData = useMemo(() => {
    const data = [];
    const currentYear = getCurrentYear();
    for (let month = 0; month < 12; month++) {
      const monthExpenses = expenses.filter((e) => {
        const d = new Date(e.date);
        return d.getMonth() === month && d.getFullYear() === currentYear;
      });
      const monthOrders = orders.filter((o) => {
        const d = new Date(o.date);
        return d.getMonth() === month && d.getFullYear() === currentYear;
      });
      data.push({
        month: getMonthName(month),
        expenses: monthExpenses.reduce((sum, e) => sum + (e.amount || 0), 0),
        revenue: monthOrders.reduce((sum, o) => sum + (o.amount || 0), 0),
      });
    }
    return data;
  }, [expenses, orders]);

  // ========== AI INSIGHTS ==========
  const aiInsights = useMemo(() => {
    const insights = [];

    if (salaryExpense > 0) {
      const salaryPercent = (salaryExpense / totalExpense) * 100;
      if (salaryPercent > 50) {
        insights.push({
          type: "warning",
          message: `Salary expense is ${salaryPercent.toFixed(0)}% of total expenses. Consider reviewing workforce efficiency.`,
          icon: "👤",
        });
      }
    }

    if (fuelExpense > 0) {
      const fuelPercent = (fuelExpense / totalExpense) * 100;
      if (fuelPercent > 15) {
        insights.push({
          type: "info",
          message: `Fuel expense is ${fuelPercent.toFixed(0)}% of total expenses. Consider route optimization.`,
          icon: "⛽",
        });
      }
    }

    if (warehouseExpense > 0) {
      insights.push({
        type: "info",
        message: `Warehouse expenses total ${formatCurrencyFull(warehouseExpense)}. Check if all warehouses are being utilized optimally.`,
        icon: "🏚️",
      });
    }

    const pendingBills = utilityBills.filter((b) => !b.paid).length;
    if (pendingBills > 0) {
      insights.push({
        type: "warning",
        message: `${pendingBills} utility bills are pending payment. Please settle them to avoid penalties.`,
        icon: "⚠️",
      });
    }

    const totalExp = totalExpense;
    const totalRev = totalRevenue;
    if (totalExp > 0 && totalRev > 0) {
      const margin = ((totalRev - totalExp) / totalRev) * 100;
      if (margin < 10) {
        insights.push({
          type: "alert",
          message: `Profit margin is only ${margin.toFixed(0)}%. Consider reducing expenses or increasing prices.`,
          icon: "📉",
        });
      } else if (margin > 30) {
        insights.push({
          type: "success",
          message: `Excellent profit margin of ${margin.toFixed(0)}%. Keep up the good work!`,
          icon: "📈",
        });
      }
    }

    if (employees.length === 0) {
      insights.push({
        type: "info",
        message:
          "No employees added yet. Add employees to track salary expenses.",
        icon: "👤",
      });
    }

    if (warehouses.length === 0) {
      insights.push({
        type: "info",
        message:
          "No warehouses added yet. Add warehouses to track rent and operational costs.",
        icon: "🏚️",
      });
    }

    if (expenses.length === 0 && salaryExpense === 0 && fuelExpense === 0) {
      insights.push({
        type: "info",
        message:
          "Start adding expenses to see real-time analytics and insights.",
        icon: "💡",
      });
    }

    return insights.length > 0
      ? insights
      : [
          {
            type: "success",
            message:
              "Your expenses are well managed. Keep tracking regularly for better insights.",
            icon: "✅",
          },
        ];
  }, [
    employees,
    warehouses,
    expenses,
    salaryExpense,
    fuelExpense,
    warehouseExpense,
    utilityBills,
    totalExpense,
    totalRevenue,
  ]);

  // ========== FILTERED EXPENSES ==========
  const filteredExpenses = useMemo(() => {
    let result = expenses;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.name?.toLowerCase().includes(q) ||
          e.category?.toLowerCase().includes(q) ||
          e.vendor?.toLowerCase().includes(q) ||
          e.description?.toLowerCase().includes(q),
      );
    }
    return result;
  }, [expenses, searchQuery]);

  // ========== FORM HANDLERS ==========
  const handleAddEmployee = (data) => {
    const newEmp = {
      id: generateId(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    const updated = [...employees, newEmp];
    setEmployees(updated);
    saveData("employees", updated);
    closeModal();
    showNotification("Employee added successfully!");
  };

  const handleAddWarehouse = (data) => {
    const newWh = {
      id: generateId(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    const updated = [...warehouses, newWh];
    setWarehouses(updated);
    saveData("warehouses", updated);
    closeModal();
    showNotification("Warehouse added successfully!");
  };

  const handleAddVehicle = (data) => {
    const newVeh = {
      id: generateId(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    const updated = [...vehicles, newVeh];
    setVehicles(updated);
    saveData("vehicles", updated);
    closeModal();
    showNotification("Vehicle added successfully!");
  };

  const handleAddCustomer = (data) => {
    const newCust = {
      id: generateId(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    const updated = [...customers, newCust];
    setCustomers(updated);
    saveData("customers", updated);
    closeModal();
    showNotification("Customer added successfully!");
  };

  const handleAddSupplier = (data) => {
    const newSupp = {
      id: generateId(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    const updated = [...suppliers, newSupp];
    setSuppliers(updated);
    saveData("suppliers", updated);
    closeModal();
    showNotification("Supplier added successfully!");
  };

  const handleAddProduct = (data) => {
    const newProd = {
      id: generateId(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    const updated = [...products, newProd];
    setProducts(updated);
    saveData("products", updated);
    closeModal();
    showNotification("Product added successfully!");
  };

  const handleAddExpense = (data) => {
    const newExp = {
      id: generateId(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    const updated = [...expenses, newExp];
    setExpenses(updated);
    saveData("expenses", updated);
    closeModal();
    showNotification("Expense added successfully!");
  };

  const handleAddFuelEntry = (data) => {
    const newEntry = {
      id: generateId(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    const updated = [...fuelEntries, newEntry];
    setFuelEntries(updated);
    saveData("fuel", updated);
    closeModal();
    showNotification("Fuel entry added successfully!");
  };

  const handleAddTravel = (data) => {
    const newTravel = {
      id: generateId(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    const updated = [...travelEntries, newTravel];
    setTravelEntries(updated);
    saveData("travel", updated);
    closeModal();
    showNotification("Travel entry added successfully!");
  };

  const handleAddUtilityBill = (data) => {
    const newBill = {
      id: generateId(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    const updated = [...utilityBills, newBill];
    setUtilityBills(updated);
    saveData("utilities", updated);
    closeModal();
    showNotification("Utility bill added successfully!");
  };

  const handleAddOrder = (data) => {
    const newOrder = {
      id: generateId(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    const updated = [...orders, newOrder];
    setOrders(updated);
    saveData("orders", updated);
    closeModal();
    showNotification("Order added successfully!");
  };

  const handleDelete = (type, id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    let updated;
    switch (type) {
      case "employee":
        updated = employees.filter((e) => e.id !== id);
        setEmployees(updated);
        saveData("employees", updated);
        break;
      case "warehouse":
        updated = warehouses.filter((w) => w.id !== id);
        setWarehouses(updated);
        saveData("warehouses", updated);
        break;
      case "expense":
        updated = expenses.filter((e) => e.id !== id);
        setExpenses(updated);
        saveData("expenses", updated);
        break;
      case "vehicle":
        updated = vehicles.filter((v) => v.id !== id);
        setVehicles(updated);
        saveData("vehicles", updated);
        break;
      case "customer":
        updated = customers.filter((c) => c.id !== id);
        setCustomers(updated);
        saveData("customers", updated);
        break;
      case "supplier":
        updated = suppliers.filter((s) => s.id !== id);
        setSuppliers(updated);
        saveData("suppliers", updated);
        break;
      case "product":
        updated = products.filter((p) => p.id !== id);
        setProducts(updated);
        saveData("products", updated);
        break;
      case "fuel":
        updated = fuelEntries.filter((f) => f.id !== id);
        setFuelEntries(updated);
        saveData("fuel", updated);
        break;
      case "travel":
        updated = travelEntries.filter((t) => t.id !== id);
        setTravelEntries(updated);
        saveData("travel", updated);
        break;
      case "utility":
        updated = utilityBills.filter((u) => u.id !== id);
        setUtilityBills(updated);
        saveData("utilities", updated);
        break;
      case "order":
        updated = orders.filter((o) => o.id !== id);
        setOrders(updated);
        saveData("orders", updated);
        break;
      default:
        return;
    }
    showNotification("Item deleted successfully!");
  };

  // ========== MODAL HANDLERS ==========
  const openModal = (type, data = null) => {
    setModalType(type);
    setModalData(data);
    setEditingItem(data);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType(null);
    setModalData(null);
    setEditingItem(null);
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  // ========== NEW: Reports View ==========
  const renderReports = () => {
    const historical = getHistoricalData(12);
    const currentMonthData = historical[historical.length - 1] || {
      expenses: 0,
      revenue: 0,
      profit: 0,
    };
    const lastMonthData = historical[historical.length - 2] || {
      expenses: 0,
      revenue: 0,
      profit: 0,
    };

    const monthOverMonthGrowth =
      lastMonthData.revenue > 0
        ? ((currentMonthData.revenue - lastMonthData.revenue) /
            lastMonthData.revenue) *
          100
        : 0;

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowReports(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft
                size={20}
                className="text-gray-500 dark:text-gray-400"
              />
            </button>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Reports & Analytics
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={reportPeriod}
              onChange={(e) => setReportPeriod(e.target.value)}
              className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
            <button
              onClick={() => window.print()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
            >
              <PrinterIcon size={16} /> Print Report
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Total Revenue
            </p>
            <p className="text-xl font-bold text-green-600 dark:text-green-400">
              {formatCurrencyFull(totalRevenue)}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Total Expenses
            </p>
            <p className="text-xl font-bold text-red-600 dark:text-red-400">
              {formatCurrencyFull(totalExpense)}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Net Profit
            </p>
            <p
              className={`text-xl font-bold ${netProfit >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
            >
              {formatCurrencyFull(netProfit)}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Month-over-Month Growth
            </p>
            <p
              className={`text-xl font-bold ${monthOverMonthGrowth >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
            >
              {monthOverMonthGrowth.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Historical Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
            <TrendingUpIcon size={18} className="text-blue-500" />
            12-Month Historical Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={historical}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="label" stroke="#6b7280" fontSize={10} />
              <YAxis
                stroke="#6b7280"
                fontSize={10}
                tickFormatter={(v) => `₹${v / 1000}K`}
              />
              <Tooltip formatter={(v) => `₹${v.toLocaleString("en-IN")}`} />
              <Legend />
              <Bar
                dataKey="revenue"
                fill="#3b82f6"
                name="Revenue"
                barSize={20}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="expenses"
                fill="#ef4444"
                name="Expenses"
                barSize={20}
                radius={[4, 4, 0, 0]}
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#10b981"
                strokeWidth={2}
                name="Profit"
                dot={{ r: 3 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Yearly Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Monthly Revenue Trend
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={yearlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={10} />
                <YAxis stroke="#6b7280" fontSize={10} />
                <Tooltip formatter={(v) => `₹${v.toLocaleString("en-IN")}`} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Monthly Expense Trend
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={yearlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={10} />
                <YAxis stroke="#6b7280" fontSize={10} />
                <Tooltip formatter={(v) => `₹${v.toLocaleString("en-IN")}`} />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setShowReports(false)}
            className="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-medium transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  };

  // ========== RENDER FUNCTIONS ==========

  // -------- OVERVIEW DASHBOARD --------
  const renderOverview = () => {
    // KPI Cards with click handlers
    const kpiCards = [
      {
        label: "Total Employees",
        value: totalEmployees,
        icon: "👤",
        color: "bg-blue-500",
        onClick: () => {
          setActiveTab("employees");
          setShowReports(false);
        },
        data: employees,
      },
      {
        label: "Total Warehouses",
        value: totalWarehouses,
        icon: "🏚️",
        color: "bg-teal-500",
        onClick: () => {
          setActiveTab("warehouses");
          setShowReports(false);
        },
        data: warehouses,
      },
      {
        label: "Total Vehicles",
        value: totalVehicles,
        icon: "🚚",
        color: "bg-indigo-500",
        onClick: () => {
          setActiveTab("vehicles");
          setShowReports(false);
        },
        data: vehicles,
      },
      {
        label: "Total Customers",
        value: totalCustomers,
        icon: "👥",
        color: "bg-green-500",
        onClick: () => {
          setActiveTab("customers");
          setShowReports(false);
        },
        data: customers,
      },
      {
        label: "Total Suppliers",
        value: totalSuppliers,
        icon: "🏭",
        color: "bg-purple-500",
        onClick: () => {
          setActiveTab("suppliers");
          setShowReports(false);
        },
        data: suppliers,
      },
      {
        label: "Total Products",
        value: totalProducts,
        icon: "📦",
        color: "bg-orange-500",
        onClick: () => {
          setActiveTab("products");
          setShowReports(false);
        },
        data: products,
      },
      {
        label: "Monthly Salary",
        value: formatCurrency(salaryExpense),
        icon: "💰",
        color: "bg-pink-500",
        onClick: () => {
          setActiveTab("expenses");
          setShowReports(false);
        },
        data: { total: salaryExpense },
      },
      {
        label: "Fuel Expense",
        value: formatCurrency(fuelExpense),
        icon: "⛽",
        color: "bg-yellow-500",
        onClick: () => {
          setActiveTab("fuel");
          setShowReports(false);
        },
        data: { total: fuelExpense },
      },
      {
        label: "Warehouse Expense",
        value: formatCurrency(warehouseExpense),
        icon: "🏚️",
        color: "bg-cyan-500",
        onClick: () => {
          setActiveTab("warehouses");
          setShowReports(false);
        },
        data: { total: warehouseExpense },
      },
      {
        label: "Total Expense",
        value: formatCurrency(totalExpense),
        icon: "💳",
        color: "bg-red-500",
        onClick: () => {
          setActiveTab("expenses");
          setShowReports(false);
        },
        data: { total: totalExpense },
      },
      {
        label: "Total Revenue",
        value: formatCurrency(totalRevenue),
        icon: "📊",
        color: "bg-emerald-500",
        onClick: () => {
          setActiveTab("orders");
          setShowReports(false);
        },
        data: { total: totalRevenue },
      },
      {
        label: "Net Profit",
        value: formatCurrency(netProfit),
        icon: "🏆",
        color: "bg-violet-500",
        onClick: () => {
          setShowReports(true);
        },
        data: { total: netProfit },
      },
    ];

    return (
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {kpiCards.map((card, idx) => (
            <div
              key={idx}
              onClick={card.onClick}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-all cursor-pointer hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  <p className="text-[10px] font-medium text-gray-500 dark:text-gray-400 truncate">
                    {card.label}
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white mt-0.5">
                    {card.value}
                  </p>
                </div>
                <div
                  className={`${card.color} w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm flex-shrink-0`}
                >
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Action: View Reports */}
        <div className="flex justify-end">
          <button
            onClick={() => setShowReports(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
          >
            <FileTextIcon size={18} /> View Detailed Reports
          </button>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Expense & Revenue */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Monthly Expense & Revenue
            </h3>
            {monthlyExpenseData.some((d) => d.expenses > 0 || d.revenue > 0) ? (
              <ResponsiveContainer width="100%" height={280}>
                <ComposedChart data={monthlyExpenseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={10} />
                  <YAxis
                    stroke="#6b7280"
                    fontSize={10}
                    tickFormatter={(v) => `₹${v / 1000}K`}
                  />
                  <Tooltip formatter={(v) => `₹${v.toLocaleString("en-IN")}`} />
                  <Legend />
                  <Bar
                    dataKey="expenses"
                    fill="#ef4444"
                    name="Expense"
                    barSize={20}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="revenue"
                    fill="#3b82f6"
                    name="Revenue"
                    barSize={20}
                    radius={[4, 4, 0, 0]}
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-72 flex items-center justify-center text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <BarChart3 size={48} className="mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No expense data available</p>
                  <p className="text-xs mt-1">
                    Add employees, warehouses, or expenses to see charts
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Category Breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Expense Category Breakdown
            </h3>
            {categoryBreakdown.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={categoryBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={{ stroke: "#6b7280" }}
                  >
                    {categoryBreakdown.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => `₹${v.toLocaleString("en-IN")}`} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-72 flex items-center justify-center text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <PieChartIcon size={48} className="mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No category data available</p>
                  <p className="text-xs mt-1">Add expenses to see breakdown</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Profit Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-5 text-white">
            <p className="text-sm opacity-80">Total Revenue</p>
            <p className="text-2xl font-bold">
              {formatCurrency(totalRevenue) || "₹0"}
            </p>
          </div>
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-5 text-white">
            <p className="text-sm opacity-80">Total Expenses</p>
            <p className="text-2xl font-bold">
              {formatCurrency(totalExpense) || "₹0"}
            </p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-5 text-white">
            <p className="text-sm opacity-80">Gross Profit</p>
            <p className="text-2xl font-bold">
              {formatCurrency(grossProfit) || "₹0"}
            </p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-5 text-white">
            <p className="text-sm opacity-80">Net Profit</p>
            <p className="text-2xl font-bold">
              {formatCurrency(netProfit) || "₹0"}
            </p>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
            <Zap className="text-yellow-500" size={18} />
            AI Insights
            <span className="text-xs text-gray-400 font-normal ml-2">
              (Based on your real data)
            </span>
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
            {aiInsights.map((insight, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-3 p-3 rounded-lg border
                                    ${
                                      insight.type === "warning"
                                        ? "bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800/30"
                                        : insight.type === "alert"
                                          ? "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800/30"
                                          : insight.type === "success"
                                            ? "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800/30"
                                            : "bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800/30"
                                    }`}
              >
                <span className="text-lg flex-shrink-0">{insight.icon}</span>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {insight.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // -------- EMPLOYEES --------
  const renderEmployees = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-3">
            {activeTab !== "overview" && (
              <button
                onClick={() => {
                  setActiveTab("overview");
                  setShowReports(false);
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft
                  size={20}
                  className="text-gray-500 dark:text-gray-400"
                />
              </button>
            )}
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Employees ({totalEmployees})
            </h2>
          </div>
          <button
            onClick={() => openModal("employee")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
          >
            <Plus size={16} /> Add Employee
          </button>
        </div>

        {employees.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <UserPlus
              size={64}
              className="mx-auto text-gray-300 dark:text-gray-600 mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              No Employees Added
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Add your employees to track salary and expenses.
            </p>
            <button
              onClick={() => openModal("employee")}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2 transition-colors"
            >
              <Plus size={16} /> Add First Employee
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {employees.map((emp) => (
              <div
                key={emp.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                    {getInitials(emp.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {emp.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {emp.designation || "Employee"}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(emp.status || "Active")}`}
                      >
                        {emp.status || "Active"}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {emp.department || "General"}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-green-600 dark:text-green-400 mt-1">
                      {formatCurrencyFull(emp.salary || 0)}/month
                    </p>
                    {/* New: Employee Details */}
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 space-y-0.5">
                      {emp.phone && <p>📞 {emp.phone}</p>}
                      {emp.email && <p>✉️ {emp.email}</p>}
                      {emp.address && <p>📍 {emp.address}</p>}
                      {emp.aadhar && <p>🪪 Aadhar: {emp.aadhar}</p>}
                    </div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal("employee", emp);
                      }}
                      className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <Edit
                        size={14}
                        className="text-gray-500 dark:text-gray-400"
                      />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete("employee", emp.id);
                      }}
                      className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                    >
                      <Trash2 size={14} className="text-red-500" />
                    </button>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
                  Joined: {formatDate(emp.joiningDate)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // -------- VEHICLES --------
  const renderVehicles = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActiveTab("overview");
                setShowReports(false);
              }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft
                size={20}
                className="text-gray-500 dark:text-gray-400"
              />
            </button>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Vehicles ({totalVehicles})
            </h2>
          </div>
          <button
            onClick={() => openModal("vehicle")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
          >
            <Plus size={16} /> Add Vehicle
          </button>
        </div>

        {vehicles.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <Truck
              size={64}
              className="mx-auto text-gray-300 dark:text-gray-600 mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              No Vehicles Added
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Add vehicles to track expenses and maintenance.
            </p>
            <button
              onClick={() => openModal("vehicle")}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2 transition-colors"
            >
              <Plus size={16} /> Add First Vehicle
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vehicles.map((veh) => (
              <div
                key={veh.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl">
                      🚗
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {veh.name || "Vehicle"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Plate: {veh.numberPlate || "N/A"}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(veh.status || "Active")}`}
                  >
                    {veh.status || "Active"}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Driver
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 text-xs">
                      {veh.driver || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Type
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 text-xs">
                      {veh.type || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Transport
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 text-xs">
                      {veh.transport || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Photo
                    </p>
                    {veh.photo ? (
                      <img
                        src={veh.photo}
                        alt="Vehicle"
                        className="w-12 h-8 object-cover rounded"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">No photo</span>
                    )}
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Total Expense: {formatCurrencyFull(veh.totalExpense || 0)}
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => openModal("vehicle", veh)}
                      className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                      <Edit size={14} className="text-gray-500" />
                    </button>
                    <button
                      onClick={() => handleDelete("vehicle", veh.id)}
                      className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg"
                    >
                      <Trash2 size={14} className="text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // -------- CUSTOMERS --------
  const renderCustomers = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActiveTab("overview");
                setShowReports(false);
              }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <ArrowLeft size={20} className="text-gray-500" />
            </button>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Customers ({totalCustomers})
            </h2>
          </div>
          <button
            onClick={() => openModal("customer")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <Plus size={16} /> Add Customer
          </button>
        </div>
        {customers.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <Users
              size={64}
              className="mx-auto text-gray-300 dark:text-gray-600 mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              No Customers Added
            </h3>
            <button
              onClick={() => openModal("customer")}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Add First Customer
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {customers.map((cust) => (
              <div
                key={cust.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                    {getInitials(cust.name)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {cust.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {cust.company || "Individual"}
                    </p>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 space-y-1">
                  {cust.phone && <p>📞 {cust.phone}</p>}
                  {cust.email && <p>✉️ {cust.email}</p>}
                  {cust.address && <p>📍 {cust.address}</p>}
                </div>
                <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-1">
                  <button
                    onClick={() => openModal("customer", cust)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg"
                  >
                    <Edit size={14} className="text-gray-500" />
                  </button>
                  <button
                    onClick={() => handleDelete("customer", cust.id)}
                    className="p-1.5 hover:bg-red-100 rounded-lg"
                  >
                    <Trash2 size={14} className="text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // -------- SUPPLIERS --------
  const renderSuppliers = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActiveTab("overview");
                setShowReports(false);
              }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <ArrowLeft size={20} className="text-gray-500" />
            </button>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Suppliers ({totalSuppliers})
            </h2>
          </div>
          <button
            onClick={() => openModal("supplier")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <Plus size={16} /> Add Supplier
          </button>
        </div>
        {suppliers.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <Building2
              size={64}
              className="mx-auto text-gray-300 dark:text-gray-600 mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              No Suppliers Added
            </h3>
            <button
              onClick={() => openModal("supplier")}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Add First Supplier
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suppliers.map((supp) => (
              <div
                key={supp.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                    {getInitials(supp.name)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {supp.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {supp.location || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 space-y-1">
                  {supp.phone && <p>📞 {supp.phone}</p>}
                  {supp.email && <p>✉️ {supp.email}</p>}
                  {supp.address && <p>📍 {supp.address}</p>}
                  {supp.material && <p>📦 {supp.material}</p>}
                </div>
                <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-1">
                  <button
                    onClick={() => openModal("supplier", supp)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg"
                  >
                    <Edit size={14} className="text-gray-500" />
                  </button>
                  <button
                    onClick={() => handleDelete("supplier", supp.id)}
                    className="p-1.5 hover:bg-red-100 rounded-lg"
                  >
                    <Trash2 size={14} className="text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // -------- PRODUCTS --------
  const renderProducts = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActiveTab("overview");
                setShowReports(false);
              }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <ArrowLeft size={20} className="text-gray-500" />
            </button>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Products ({totalProducts})
            </h2>
          </div>
          <button
            onClick={() => openModal("product")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <Plus size={16} /> Add Product
          </button>
        </div>
        {products.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <Package
              size={64}
              className="mx-auto text-gray-300 dark:text-gray-600 mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              No Products Added
            </h3>
            <button
              onClick={() => openModal("product")}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Add First Product
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-white text-xl">
                    📦
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {prod.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {prod.category || "General"}
                    </p>
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
                  <p className="text-gray-500 dark:text-gray-400">
                    Price:{" "}
                    <span className="text-gray-900 dark:text-white font-semibold">
                      {formatCurrencyFull(prod.price || 0)}
                    </span>
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Stock:{" "}
                    <span className="text-gray-900 dark:text-white font-semibold">
                      {prod.stock || 0}
                    </span>
                  </p>
                </div>
                <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-1">
                  <button
                    onClick={() => openModal("product", prod)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg"
                  >
                    <Edit size={14} className="text-gray-500" />
                  </button>
                  <button
                    onClick={() => handleDelete("product", prod.id)}
                    className="p-1.5 hover:bg-red-100 rounded-lg"
                  >
                    <Trash2 size={14} className="text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // -------- WAREHOUSES --------
  const renderWarehouses = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActiveTab("overview");
                setShowReports(false);
              }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <ArrowLeft size={20} className="text-gray-500" />
            </button>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Warehouses ({totalWarehouses})
            </h2>
          </div>
          <button
            onClick={() => openModal("warehouse")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <Plus size={16} /> Add Warehouse
          </button>
        </div>

        {warehouses.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <Warehouse
              size={64}
              className="mx-auto text-gray-300 dark:text-gray-600 mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              No Warehouses Added
            </h3>
            <button
              onClick={() => openModal("warehouse")}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Add First Warehouse
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {warehouses.map((wh) => {
              const totalWhExpense =
                (wh.monthlyRent || 0) +
                (wh.electricity || 0) +
                (wh.water || 0) +
                (wh.internet || 0) +
                (wh.security || 0) +
                (wh.maintenance || 0);
              return (
                <div
                  key={wh.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white text-2xl">
                        🏚️
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {wh.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {wh.code || "WH-" + wh.id.slice(0, 6)}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(wh.status || "Active")}`}
                    >
                      {wh.status || "Active"} {wh.stock && `📦${wh.stock}`}
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Location
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 text-xs truncate">
                        {wh.address || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Stock
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 text-xs">
                        {wh.stock || 0} units
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Monthly Rent
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {formatCurrencyFull(wh.monthlyRent || 0)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Total Monthly Cost
                      </p>
                      <p className="font-semibold text-red-600 dark:text-red-400">
                        {formatCurrencyFull(totalWhExpense)}
                      </p>
                    </div>
                  </div>
                  {/* Google Maps location */}
                  {wh.location && (
                    <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700/30 rounded-lg flex items-center gap-2">
                      <MapPin size={14} className="text-red-500" />
                      <span className="text-xs text-gray-600 dark:text-gray-300">
                        📍 {wh.location}
                      </span>
                    </div>
                  )}
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <div className="flex gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>⚡ {formatCurrencyFull(wh.electricity || 0)}</span>
                      <span>💧 {formatCurrencyFull(wh.water || 0)}</span>
                      <span>🌐 {formatCurrencyFull(wh.internet || 0)}</span>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => openModal("warehouse", wh)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      >
                        <Edit size={14} className="text-gray-500" />
                      </button>
                      <button
                        onClick={() => handleDelete("warehouse", wh.id)}
                        className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg"
                      >
                        <Trash2 size={14} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Map Integration */}
        {warehouses.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 mt-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
              <MapPin size={18} className="text-red-500" />
              Warehouse Locations
            </h3>
            <div className="relative w-full h-72 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <Globe size={48} className="mx-auto mb-3 opacity-30" />
                  <p className="text-sm">📍 Google Maps Integration</p>
                  <p className="text-xs mt-1">
                    {warehouses.length} warehouses added
                  </p>
                </div>
              </div>
              {warehouses.map((wh, idx) => (
                <div
                  key={wh.id}
                  className="absolute w-4 h-4 rounded-full border-2 border-white shadow-lg cursor-pointer transition-all hover:scale-150"
                  style={{
                    left: `${15 + (idx % 5) * 18}%`,
                    top: `${20 + (idx % 3) * 25}%`,
                    backgroundColor: "#10b981",
                    transform: "translate(-50%, -50%)",
                  }}
                  title={wh.name}
                >
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                    {wh.name}
                  </div>
                </div>
              ))}
              <div className="absolute bottom-3 left-3 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg shadow-lg text-xs flex items-center gap-2">
                <MapPin size={14} className="text-green-500" />
                <span>{warehouses.length} Warehouses</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // -------- EXPENSES LIST --------
  const renderExpensesList = () => {
    const totalExpensesAmount = expenses.reduce(
      (sum, e) => sum + (e.amount || 0),
      0,
    );

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActiveTab("overview");
                setShowReports(false);
              }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <ArrowLeft size={20} className="text-gray-500" />
            </button>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              All Expenses
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total:{" "}
              <span className="font-bold text-gray-900 dark:text-white">
                {formatCurrencyFull(totalExpensesAmount)}
              </span>
            </span>
            <button
              onClick={() => openModal("expense")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <Plus size={16} /> Add Expense
            </button>
          </div>
        </div>

        {expenses.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <Receipt
              size={64}
              className="mx-auto text-gray-300 dark:text-gray-600 mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              No Expenses Added
            </h3>
            <button
              onClick={() => openModal("expense")}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Add First Expense
            </button>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Vendor
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {expenses.map((exp) => (
                    <tr
                      key={exp.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(exp.category)}`}
                        >
                          {exp.category || "Uncategorized"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-800 dark:text-gray-200 font-medium">
                        {exp.name || "N/A"}
                      </td>
                      <td className="px-4 py-3 font-bold text-gray-900 dark:text-white">
                        {formatCurrencyFull(exp.amount || 0)}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs">
                        {formatDate(exp.date)}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs">
                        {exp.vendor || "N/A"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(exp.status || "Pending")}`}
                        >
                          {exp.status || "Pending"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button
                            onClick={() => {
                              setBillPreviewData(exp);
                              setShowBillPreview(true);
                            }}
                            className="p-1.5 hover:bg-gray-100 rounded-lg"
                          >
                            <Eye size={14} className="text-blue-500" />
                          </button>
                          <button
                            onClick={() => openModal("expense", exp)}
                            className="p-1.5 hover:bg-gray-100 rounded-lg"
                          >
                            <Edit size={14} className="text-gray-500" />
                          </button>
                          <button
                            onClick={() => handleDelete("expense", exp.id)}
                            className="p-1.5 hover:bg-red-100 rounded-lg"
                          >
                            <Trash2 size={14} className="text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  // -------- FUEL MANAGEMENT --------
  const renderFuel = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActiveTab("overview");
                setShowReports(false);
              }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <ArrowLeft size={20} className="text-gray-500" />
            </button>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Fuel Management
            </h2>
          </div>
          <button
            onClick={() => openModal("fuel")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <Plus size={16} /> Add Fuel Entry
          </button>
        </div>

        {fuelEntries.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <Fuel
              size={64}
              className="mx-auto text-gray-300 dark:text-gray-600 mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              No Fuel Entries
            </h3>
            <button
              onClick={() => openModal("fuel")}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Add First Fuel Entry
            </button>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Vehicle
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Quantity
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Pump
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {fuelEntries.map((entry) => (
                    <tr
                      key={entry.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                    >
                      <td className="px-4 py-3 text-gray-800 dark:text-gray-200 font-medium">
                        {entry.vehicle || "N/A"}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs">
                        {formatDate(entry.date)}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                        {entry.quantity || 0} L
                      </td>
                      <td className="px-4 py-3 font-bold text-gray-900 dark:text-white">
                        {formatCurrencyFull(entry.amount || 0)}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs">
                        {entry.pump || "N/A"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button
                            onClick={() => openModal("fuel", entry)}
                            className="p-1.5 hover:bg-gray-100 rounded-lg"
                          >
                            <Edit size={14} className="text-gray-500" />
                          </button>
                          <button
                            onClick={() => handleDelete("fuel", entry.id)}
                            className="p-1.5 hover:bg-red-100 rounded-lg"
                          >
                            <Trash2 size={14} className="text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  // -------- TRAVEL EXPENSES --------
  const renderTravel = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActiveTab("overview");
                setShowReports(false);
              }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <ArrowLeft size={20} className="text-gray-500" />
            </button>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Travel Expenses
            </h2>
          </div>
          <button
            onClick={() => openModal("travel")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <Plus size={16} /> Add Travel Entry
          </button>
        </div>

        {travelEntries.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <Hotel
              size={64}
              className="mx-auto text-gray-300 dark:text-gray-600 mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              No Travel Entries
            </h3>
            <button
              onClick={() => openModal("travel")}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Add First Travel Entry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {travelEntries.map((travel) => (
              <div
                key={travel.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {travel.purpose || "Travel"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {travel.client || "N/A"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {travel.city || "N/A"} • {formatDate(travel.startDate)} →{" "}
                      {formatDate(travel.endDate)}
                    </p>
                  </div>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {formatCurrencyFull(travel.total || 0)}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-2 text-xs">
                  <div className="bg-gray-50 dark:bg-gray-700/30 p-2 rounded text-center">
                    <p className="text-gray-500 dark:text-gray-400">Hotel</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrencyFull(travel.hotel || 0)}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/30 p-2 rounded text-center">
                    <p className="text-gray-500 dark:text-gray-400">Food</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrencyFull(travel.food || 0)}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/30 p-2 rounded text-center">
                    <p className="text-gray-500 dark:text-gray-400">Fuel</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrencyFull(travel.fuelCost || 0)}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/30 p-2 rounded text-center">
                    <p className="text-gray-500 dark:text-gray-400">Distance</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {travel.distance || 0} km
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {travel.bills ? "📎 Bills Attached" : "📎 No Bills"}
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => openModal("travel", travel)}
                      className="p-1.5 hover:bg-gray-100 rounded-lg"
                    >
                      <Edit size={14} className="text-gray-500" />
                    </button>
                    <button
                      onClick={() => handleDelete("travel", travel.id)}
                      className="p-1.5 hover:bg-red-100 rounded-lg"
                    >
                      <Trash2 size={14} className="text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // -------- UTILITY BILLS --------
  const renderUtilities = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActiveTab("overview");
                setShowReports(false);
              }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <ArrowLeft size={20} className="text-gray-500" />
            </button>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Utility Bills
            </h2>
          </div>
          <button
            onClick={() => openModal("utility")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <Plus size={16} /> Add Bill
          </button>
        </div>

        {utilityBills.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <FileText
              size={64}
              className="mx-auto text-gray-300 dark:text-gray-600 mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              No Utility Bills
            </h3>
            <button
              onClick={() => openModal("utility")}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Add First Bill
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {utilityBills.map((bill) => (
              <div
                key={bill.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {bill.type || "Utility"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {bill.provider || "N/A"}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(bill.paid ? "Paid" : "Unpaid")}`}
                  >
                    {bill.paid ? "Paid" : "Unpaid"}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Amount
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {formatCurrencyFull(bill.amount || 0)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Due Date
                    </p>
                    <p
                      className={`text-sm font-semibold ${new Date(bill.dueDate) < new Date() && !bill.paid ? "text-red-600 dark:text-red-400" : "text-gray-900 dark:text-white"}`}
                    >
                      {formatDate(bill.dueDate)}
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {bill.bill ? "📎 Bill Attached" : "📎 No Bill"}
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => {
                        setBillPreviewData(bill);
                        setShowBillPreview(true);
                      }}
                      className="p-1.5 hover:bg-gray-100 rounded-lg"
                    >
                      <Eye size={14} className="text-blue-500" />
                    </button>
                    <button
                      onClick={() => openModal("utility", bill)}
                      className="p-1.5 hover:bg-gray-100 rounded-lg"
                    >
                      <Edit size={14} className="text-gray-500" />
                    </button>
                    <button
                      onClick={() => handleDelete("utility", bill.id)}
                      className="p-1.5 hover:bg-red-100 rounded-lg"
                    >
                      <Trash2 size={14} className="text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // -------- ORDERS --------
  const renderOrders = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActiveTab("overview");
                setShowReports(false);
              }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <ArrowLeft size={20} className="text-gray-500" />
            </button>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Orders
            </h2>
          </div>
          <button
            onClick={() => openModal("order")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <Plus size={16} /> Add Order
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
            <ShoppingCart
              size={64}
              className="mx-auto text-gray-300 dark:text-gray-600 mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              No Orders
            </h3>
            <button
              onClick={() => openModal("order")}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Add First Order
            </button>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Order ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Customer
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                    >
                      <td className="px-4 py-3 font-mono text-xs text-gray-800 dark:text-gray-200">
                        {order.id.slice(0, 8)}
                      </td>
                      <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                        {order.customer || "N/A"}
                      </td>
                      <td className="px-4 py-3 font-bold text-gray-900 dark:text-white">
                        {formatCurrencyFull(order.amount || 0)}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300 text-xs">
                        {formatDate(order.date)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(order.status || "Pending")}`}
                        >
                          {order.status || "Pending"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button
                            onClick={() => openModal("order", order)}
                            className="p-1.5 hover:bg-gray-100 rounded-lg"
                          >
                            <Edit size={14} className="text-gray-500" />
                          </button>
                          <button
                            onClick={() => handleDelete("order", order.id)}
                            className="p-1.5 hover:bg-red-100 rounded-lg"
                          >
                            <Trash2 size={14} className="text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ============================================================
  // 3. MODAL RENDERER
  // ============================================================

  const renderModal = () => {
    if (!modalOpen) return null;

    const renderEmployeeForm = () => {
      const data = editingItem || {};
      return (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            data.salary = parseFloat(data.salary) || 0;
            handleAddEmployee(data);
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Employee Name *
              </label>
              <input
                type="text"
                name="name"
                defaultValue={data.name || ""}
                required
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                defaultValue={data.phone || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                defaultValue={data.email || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                defaultValue={data.address || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Aadhar Number
              </label>
              <input
                type="text"
                name="aadhar"
                defaultValue={data.aadhar || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Aadhar Copy (URL)
              </label>
              <input
                type="text"
                name="aadharCopy"
                defaultValue={data.aadharCopy || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white"
                placeholder="Upload link or file path"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Department
              </label>
              <input
                type="text"
                name="department"
                defaultValue={data.department || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Designation
              </label>
              <input
                type="text"
                name="designation"
                defaultValue={data.designation || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Monthly Salary (₹) *
              </label>
              <input
                type="number"
                name="salary"
                defaultValue={data.salary || ""}
                required
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Joining Date
              </label>
              <input
                type="date"
                name="joiningDate"
                defaultValue={data.joiningDate || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                name="status"
                defaultValue={data.status || "Active"}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              {editingItem ? "Update Employee" : "Add Employee"}
            </button>
          </div>
        </form>
      );
    };

    const renderVehicleForm = () => {
      const data = editingItem || {};
      return (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            data.totalExpense = parseFloat(data.totalExpense) || 0;
            handleAddVehicle(data);
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Vehicle Name *
              </label>
              <input
                type="text"
                name="name"
                defaultValue={data.name || ""}
                required
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Number Plate *
              </label>
              <input
                type="text"
                name="numberPlate"
                defaultValue={data.numberPlate || ""}
                required
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Driver
              </label>
              <input
                type="text"
                name="driver"
                defaultValue={data.driver || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Vehicle Type
              </label>
              <select
                name="type"
                defaultValue={data.type || "Truck"}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              >
                <option value="Truck">Truck</option>
                <option value="Van">Van</option>
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
                <option value="Bus">Bus</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Transport Type
              </label>
              <input
                type="text"
                name="transport"
                defaultValue={data.transport || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                placeholder="e.g., Inbound, Outbound"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Total Expense (₹)
              </label>
              <input
                type="number"
                name="totalExpense"
                defaultValue={data.totalExpense || 0}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Photo URL
              </label>
              <input
                type="text"
                name="photo"
                defaultValue={data.photo || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                placeholder="Image URL"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                name="status"
                defaultValue={data.status || "Active"}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Under Maintenance">Under Maintenance</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              {editingItem ? "Update Vehicle" : "Add Vehicle"}
            </button>
          </div>
        </form>
      );
    };

    const renderCustomerForm = () => {
      const data = editingItem || {};
      return (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            handleAddCustomer(data);
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Customer Name *
              </label>
              <input
                type="text"
                name="name"
                defaultValue={data.name || ""}
                required
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                defaultValue={data.phone || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                defaultValue={data.email || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                defaultValue={data.address || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Company
              </label>
              <input
                type="text"
                name="company"
                defaultValue={data.company || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                GST
              </label>
              <input
                type="text"
                name="gst"
                defaultValue={data.gst || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              {editingItem ? "Update Customer" : "Add Customer"}
            </button>
          </div>
        </form>
      );
    };

    const renderSupplierForm = () => {
      const data = editingItem || {};
      return (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            handleAddSupplier(data);
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Supplier Name *
              </label>
              <input
                type="text"
                name="name"
                defaultValue={data.name || ""}
                required
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                defaultValue={data.phone || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                defaultValue={data.email || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                defaultValue={data.address || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                defaultValue={data.location || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                placeholder="Delhi, Shehdol, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Material Supplied
              </label>
              <input
                type="text"
                name="material"
                defaultValue={data.material || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              {editingItem ? "Update Supplier" : "Add Supplier"}
            </button>
          </div>
        </form>
      );
    };

    const renderProductForm = () => {
      const data = editingItem || {};
      return (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            data.price = parseFloat(data.price) || 0;
            data.stock = parseInt(data.stock) || 0;
            handleAddProduct(data);
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                defaultValue={data.name || ""}
                required
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <input
                type="text"
                name="category"
                defaultValue={data.category || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                defaultValue={data.price || 0}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stock"
                defaultValue={data.stock || 0}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Unit
              </label>
              <input
                type="text"
                name="unit"
                defaultValue={data.unit || "pcs"}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <input
                type="text"
                name="description"
                defaultValue={data.description || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              {editingItem ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      );
    };

    const renderWarehouseForm = () => {
      const data = editingItem || {};
      return (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            data.monthlyRent = parseFloat(data.monthlyRent) || 0;
            data.electricity = parseFloat(data.electricity) || 0;
            data.water = parseFloat(data.water) || 0;
            data.internet = parseFloat(data.internet) || 0;
            data.security = parseFloat(data.security) || 0;
            data.maintenance = parseFloat(data.maintenance) || 0;
            data.stock = parseInt(data.stock) || 0;
            handleAddWarehouse(data);
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Warehouse Name *
              </label>
              <input
                type="text"
                name="name"
                defaultValue={data.name || ""}
                required
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Code
              </label>
              <input
                type="text"
                name="code"
                defaultValue={data.code || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                defaultValue={data.address || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location (for Map)
              </label>
              <input
                type="text"
                name="location"
                defaultValue={data.location || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                placeholder="e.g., Delhi, Mumbai"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Stock (units)
              </label>
              <input
                type="number"
                name="stock"
                defaultValue={data.stock || 0}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Monthly Rent (₹)
              </label>
              <input
                type="number"
                name="monthlyRent"
                defaultValue={data.monthlyRent || 0}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Manager
              </label>
              <input
                type="text"
                name="manager"
                defaultValue={data.manager || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Electricity (₹/month)
              </label>
              <input
                type="number"
                name="electricity"
                defaultValue={data.electricity || 0}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Water (₹/month)
              </label>
              <input
                type="number"
                name="water"
                defaultValue={data.water || 0}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Internet (₹/month)
              </label>
              <input
                type="number"
                name="internet"
                defaultValue={data.internet || 0}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Security (₹/month)
              </label>
              <input
                type="number"
                name="security"
                defaultValue={data.security || 0}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Maintenance (₹/month)
              </label>
              <input
                type="number"
                name="maintenance"
                defaultValue={data.maintenance || 0}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                name="status"
                defaultValue={data.status || "Active"}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Under Construction">Under Construction</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              {editingItem ? "Update Warehouse" : "Add Warehouse"}
            </button>
          </div>
        </form>
      );
    };

    const renderExpenseForm = () => {
      const data = editingItem || {};
      return (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            data.amount = parseFloat(data.amount) || 0;
            handleAddExpense(data);
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category *
              </label>
              <select
                name="category"
                defaultValue={data.category || ""}
                required
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              >
                <option value="">Select Category</option>
                {expenseCategories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
                <option value="Miscellaneous">Miscellaneous</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Expense Name *
              </label>
              <input
                type="text"
                name="name"
                defaultValue={data.name || ""}
                required
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Amount (₹) *
              </label>
              <input
                type="number"
                name="amount"
                defaultValue={data.amount || ""}
                required
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                defaultValue={
                  data.date || new Date().toISOString().split("T")[0]
                }
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Vendor
              </label>
              <input
                type="text"
                name="vendor"
                defaultValue={data.vendor || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                name="status"
                defaultValue={data.status || "Pending"}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Due">Due</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                name="description"
                defaultValue={data.description || ""}
                rows="2"
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              {editingItem ? "Update Expense" : "Add Expense"}
            </button>
          </div>
        </form>
      );
    };

    const renderFuelForm = () => {
      const data = editingItem || {};
      return (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            data.quantity = parseFloat(data.quantity) || 0;
            data.amount = parseFloat(data.amount) || 0;
            handleAddFuelEntry(data);
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Vehicle *
              </label>
              <input
                type="text"
                name="vehicle"
                defaultValue={data.vehicle || ""}
                required
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                defaultValue={
                  data.date || new Date().toISOString().split("T")[0]
                }
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Quantity (Liters)
              </label>
              <input
                type="number"
                name="quantity"
                defaultValue={data.quantity || 0}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Amount (₹) *
              </label>
              <input
                type="number"
                name="amount"
                defaultValue={data.amount || ""}
                required
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Petrol Pump
              </label>
              <input
                type="text"
                name="pump"
                defaultValue={data.pump || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Driver
              </label>
              <input
                type="text"
                name="driver"
                defaultValue={data.driver || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              {editingItem ? "Update Entry" : "Add Fuel Entry"}
            </button>
          </div>
        </form>
      );
    };

    const renderTravelForm = () => {
      const data = editingItem || {};
      return (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            data.distance = parseFloat(data.distance) || 0;
            data.fuelCost = parseFloat(data.fuelCost) || 0;
            data.hotel = parseFloat(data.hotel) || 0;
            data.food = parseFloat(data.food) || 0;
            data.parking = parseFloat(data.parking) || 0;
            data.toll = parseFloat(data.toll) || 0;
            data.total =
              data.fuelCost + data.hotel + data.food + data.parking + data.toll;
            handleAddTravel(data);
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Purpose *
              </label>
              <input
                type="text"
                name="purpose"
                defaultValue={data.purpose || ""}
                required
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Client
              </label>
              <input
                type="text"
                name="client"
                defaultValue={data.client || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                defaultValue={data.city || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Vehicle
              </label>
              <input
                type="text"
                name="vehicle"
                defaultValue={data.vehicle || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                defaultValue={data.startDate || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                defaultValue={data.endDate || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Distance (km)
              </label>
              <input
                type="number"
                name="distance"
                defaultValue={data.distance || 0}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Fuel Cost (₹)
              </label>
              <input
                type="number"
                name="fuelCost"
                defaultValue={data.fuelCost || 0}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Hotel (₹)
              </label>
              <input
                type="number"
                name="hotel"
                defaultValue={data.hotel || 0}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Food (₹)
              </label>
              <input
                type="number"
                name="food"
                defaultValue={data.food || 0}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Parking (₹)
              </label>
              <input
                type="number"
                name="parking"
                defaultValue={data.parking || 0}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Toll (₹)
              </label>
              <input
                type="number"
                name="toll"
                defaultValue={data.toll || 0}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              {editingItem ? "Update Travel" : "Add Travel Entry"}
            </button>
          </div>
        </form>
      );
    };

    const renderUtilityForm = () => {
      const data = editingItem || {};
      return (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            data.amount = parseFloat(data.amount) || 0;
            data.paid = data.paid === "true";
            handleAddUtilityBill(data);
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bill Type *
              </label>
              <select
                name="type"
                defaultValue={data.type || "Electricity"}
                required
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              >
                <option value="Electricity">Electricity</option>
                <option value="Water">Water</option>
                <option value="Internet">Internet</option>
                <option value="Mobile">Mobile</option>
                <option value="Gas">Gas</option>
                <option value="Security">Security</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Provider
              </label>
              <input
                type="text"
                name="provider"
                defaultValue={data.provider || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Amount (₹) *
              </label>
              <input
                type="number"
                name="amount"
                defaultValue={data.amount || ""}
                required
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                defaultValue={data.dueDate || ""}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                name="paid"
                defaultValue={data.paid ? "true" : "false"}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              >
                <option value="false">Unpaid</option>
                <option value="true">Paid</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              {editingItem ? "Update Bill" : "Add Bill"}
            </button>
          </div>
        </form>
      );
    };

    const renderOrderForm = () => {
      const data = editingItem || {};
      return (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            data.amount = parseFloat(data.amount) || 0;
            handleAddOrder(data);
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Customer Name *
              </label>
              <input
                type="text"
                name="customer"
                defaultValue={data.customer || ""}
                required
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Amount (₹) *
              </label>
              <input
                type="number"
                name="amount"
                defaultValue={data.amount || ""}
                required
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                defaultValue={
                  data.date || new Date().toISOString().split("T")[0]
                }
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                name="status"
                defaultValue={data.status || "Pending"}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              {editingItem ? "Update Order" : "Add Order"}
            </button>
          </div>
        </form>
      );
    };

    // Determine which form to show
    let title = "";
    let formContent = null;
    switch (modalType) {
      case "employee":
        title = editingItem ? "Edit Employee" : "Add Employee";
        formContent = renderEmployeeForm();
        break;
      case "vehicle":
        title = editingItem ? "Edit Vehicle" : "Add Vehicle";
        formContent = renderVehicleForm();
        break;
      case "customer":
        title = editingItem ? "Edit Customer" : "Add Customer";
        formContent = renderCustomerForm();
        break;
      case "supplier":
        title = editingItem ? "Edit Supplier" : "Add Supplier";
        formContent = renderSupplierForm();
        break;
      case "product":
        title = editingItem ? "Edit Product" : "Add Product";
        formContent = renderProductForm();
        break;
      case "warehouse":
        title = editingItem ? "Edit Warehouse" : "Add Warehouse";
        formContent = renderWarehouseForm();
        break;
      case "expense":
        title = editingItem ? "Edit Expense" : "Add Expense";
        formContent = renderExpenseForm();
        break;
      case "fuel":
        title = editingItem ? "Edit Fuel Entry" : "Add Fuel Entry";
        formContent = renderFuelForm();
        break;
      case "travel":
        title = editingItem ? "Edit Travel Entry" : "Add Travel Entry";
        formContent = renderTravelForm();
        break;
      case "utility":
        title = editingItem ? "Edit Utility Bill" : "Add Utility Bill";
        formContent = renderUtilityForm();
        break;
      case "order":
        title = editingItem ? "Edit Order" : "Add Order";
        formContent = renderOrderForm();
        break;
      default:
        return null;
    }

    return (
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
        onClick={closeModal}
      >
        <div
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
            <button
              onClick={closeModal}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
          {formContent}
        </div>
      </div>
    );
  };

  // ============================================================
  // 4. BILL PREVIEW MODAL
  // ============================================================

  const renderBillPreview = () => {
    if (!showBillPreview || !billPreviewData) return null;
    return (
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
        onClick={() => setShowBillPreview(false)}
      >
        <div
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Bill Preview
            </h3>
            <button
              onClick={() => setShowBillPreview(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
          <div className="space-y-3">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  Category
                </span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {billPreviewData.category || billPreviewData.type || "N/A"}
                </span>
                <span className="text-gray-500 dark:text-gray-400">Name</span>
                <span className="text-gray-900 dark:text-white font-medium">
                  {billPreviewData.name || billPreviewData.purpose || "N/A"}
                </span>
                <span className="text-gray-500 dark:text-gray-400">Amount</span>
                <span className="text-gray-900 dark:text-white font-bold">
                  {formatCurrencyFull(
                    billPreviewData.amount || billPreviewData.total || 0,
                  )}
                </span>
                <span className="text-gray-500 dark:text-gray-400">Date</span>
                <span className="text-gray-900 dark:text-white">
                  {formatDate(
                    billPreviewData.date ||
                      billPreviewData.startDate ||
                      billPreviewData.dueDate,
                  )}
                </span>
                <span className="text-gray-500 dark:text-gray-400">Vendor</span>
                <span className="text-gray-900 dark:text-white">
                  {billPreviewData.vendor || billPreviewData.provider || "N/A"}
                </span>
                <span className="text-gray-500 dark:text-gray-400">Status</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(billPreviewData.status || billPreviewData.paid ? "Paid" : "Pending")}`}
                >
                  {billPreviewData.status ||
                    (billPreviewData.paid ? "Paid" : "Pending")}
                </span>
              </div>
            </div>
            {billPreviewData.description && (
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Description
                </p>
                <p className="text-sm text-gray-900 dark:text-white">
                  {billPreviewData.description}
                </p>
              </div>
            )}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
              <FileText
                size={48}
                className="mx-auto text-gray-400 dark:text-gray-500 mb-2"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Bill Document
              </p>
              <button className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium inline-flex items-center gap-2">
                <Download size={16} /> Download Bill
              </button>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setShowBillPreview(false)}
              className="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ============================================================
  // 5. MAIN LAYOUT
  // ============================================================

  const COLORS = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
    "#14b8a6",
    "#f97316",
    "#6366f1",
    "#84cc16",
  ];

  // -------- MENU ITEMS --------
  const menuItems = [
    {
      id: "overview",
      label: "Overview",
      iconSrc: "https://cdn-icons-png.flaticon.com/128/10112/10112441.png",
    },
    {
      id: "employees",
      label: "Employees",
      iconSrc: "https://cdn-icons-png.flaticon.com/128/17753/17753273.png",
    },
    {
      id: "vehicles",
      label: "Vehicles",
      iconSrc: "https://cdn-icons-png.flaticon.com/128/3033/3033684.png",
    },
    {
      id: "customers",
      label: "Customers",
      iconSrc: "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
    },
    {
      id: "suppliers",
      label: "Suppliers",
      iconSrc: "https://cdn-icons-png.flaticon.com/128/2983/2983825.png",
    },
    {
      id: "products",
      label: "Products",
      iconSrc: "https://cdn-icons-png.flaticon.com/128/3144/3144456.png",
    },
    {
      id: "warehouses",
      label: "Warehouses",
      iconSrc: "https://cdn-icons-png.flaticon.com/128/10857/10857085.png",
    },
    {
      id: "expenses",
      label: "Expenses",
      iconSrc: "https://cdn-icons-png.flaticon.com/128/1514/1514783.png",
    },
    {
      id: "fuel",
      label: "Fuel",
      iconSrc: "https://cdn-icons-png.flaticon.com/128/3094/3094371.png",
    },
    {
      id: "travel",
      label: "Travel",
      iconSrc: "https://cdn-icons-png.flaticon.com/128/2838/2838950.png",
    },
    {
      id: "utilities",
      label: "Utilities",
      iconSrc: "https://cdn-icons-png.flaticon.com/128/2870/2870944.png",
    },
    {
      id: "orders",
      label: "Orders",
      iconSrc: "https://cdn-icons-png.flaticon.com/128/1170/1170678.png",
    },
  ];

  // If showing reports, render reports view
  if (showReports) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
        <div className="p-6 max-w-7xl mx-auto">{renderReports()}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-200">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-4 right-4 z-[100] bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg animate-fadeIn flex items-center gap-3">
          <Check size={20} />
          {notification}
        </div>
      )}

      {/* Modals */}
      {renderModal()}
      {renderBillPreview()}

      {/* Main Layout */}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div
          className={`${sidebarCollapsed ? "w-16" : "w-64"} bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex-shrink-0 transition-all duration-300 flex flex-col h-full overflow-y-auto`}
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              ₹
            </div>
            {!sidebarCollapsed && (
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Expense ERP
              </span>
            )}
          </div>
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setActiveSubTab("overview");
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${activeTab === item.id ? "bg-blue-600 text-white shadow-md" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
              >
                <img
                  src={item.iconSrc}
                  alt={item.label}
                  className="w-5 h-5 flex-shrink-0 object-contain"
                  style={{
                    filter:
                      activeTab === item.id
                        ? "brightness(0) invert(1)"
                        : "none",
                  }}
                />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
          <div className="p-3 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              {sidebarCollapsed ? "➡️" : "⬅️ Collapse"}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-3 flex items-center justify-between gap-4 flex-shrink-0">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200 truncate">
                {menuItems.find((m) => m.id === activeTab)?.label ||
                  "Dashboard"}
              </h1>
              <span className="text-xs text-gray-400 dark:text-gray-500 hidden sm:inline">
                / {activeTab}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500 hidden sm:inline bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                {totalExpense > 0
                  ? `${formatCurrency(totalExpense)} total`
                  : "No data yet"}
              </span>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 lg:w-64 pl-9 pr-4 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 border border-transparent rounded-lg focus:border-blue-500 focus:bg-white dark:focus:bg-gray-700 transition-all outline-none text-gray-900 dark:text-white placeholder-gray-500"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  🔍
                </span>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-lg"
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
              <button
                onClick={() => setShowQuickAdd(!showQuickAdd)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
              >
                <Plus size={18} />
                <span className="hidden sm:inline">Quick Add</span>
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                A
              </div>
            </div>
          </header>

          {/* Quick Add Dropdown */}
          {showQuickAdd && (
            <div className="absolute right-6 top-20 mt-1 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-40 p-2">
              <div className="grid grid-cols-2 gap-1">
                <button
                  onClick={() => {
                    setShowQuickAdd(false);
                    openModal("employee");
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm text-left flex items-center gap-2"
                >
                  <UserPlus size={16} /> Employee
                </button>
                <button
                  onClick={() => {
                    setShowQuickAdd(false);
                    openModal("vehicle");
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm text-left flex items-center gap-2"
                >
                  <Truck size={16} /> Vehicle
                </button>
                <button
                  onClick={() => {
                    setShowQuickAdd(false);
                    openModal("customer");
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm text-left flex items-center gap-2"
                >
                  <Users size={16} /> Customer
                </button>
                <button
                  onClick={() => {
                    setShowQuickAdd(false);
                    openModal("supplier");
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm text-left flex items-center gap-2"
                >
                  <Building2 size={16} /> Supplier
                </button>
                <button
                  onClick={() => {
                    setShowQuickAdd(false);
                    openModal("product");
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm text-left flex items-center gap-2"
                >
                  <Package size={16} /> Product
                </button>
                <button
                  onClick={() => {
                    setShowQuickAdd(false);
                    openModal("warehouse");
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm text-left flex items-center gap-2"
                >
                  <Warehouse size={16} /> Warehouse
                </button>
                <button
                  onClick={() => {
                    setShowQuickAdd(false);
                    openModal("expense");
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm text-left flex items-center gap-2"
                >
                  <Receipt size={16} /> Expense
                </button>
                <button
                  onClick={() => {
                    setShowQuickAdd(false);
                    openModal("fuel");
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm text-left flex items-center gap-2"
                >
                  <Fuel size={16} /> Fuel
                </button>
                <button
                  onClick={() => {
                    setShowQuickAdd(false);
                    openModal("travel");
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm text-left flex items-center gap-2"
                >
                  <Hotel size={16} /> Travel
                </button>
                <button
                  onClick={() => {
                    setShowQuickAdd(false);
                    openModal("utility");
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm text-left flex items-center gap-2"
                >
                  <FileText size={16} /> Utility
                </button>
                <button
                  onClick={() => {
                    setShowQuickAdd(false);
                    openModal("order");
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm text-left flex items-center gap-2 col-span-2"
                >
                  <ShoppingCart size={16} /> Order
                </button>
              </div>
            </div>
          )}

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">
              {activeTab === "overview" && renderOverview()}
              {activeTab === "employees" && renderEmployees()}
              {activeTab === "vehicles" && renderVehicles()}
              {activeTab === "customers" && renderCustomers()}
              {activeTab === "suppliers" && renderSuppliers()}
              {activeTab === "products" && renderProducts()}
              {activeTab === "warehouses" && renderWarehouses()}
              {activeTab === "expenses" && renderExpensesList()}
              {activeTab === "fuel" && renderFuel()}
              {activeTab === "travel" && renderTravel()}
              {activeTab === "utilities" && renderUtilities()}
              {activeTab === "orders" && renderOrders()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
