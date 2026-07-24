
import React, { useState } from "react";
import {
  Users,
  MoreVertical,
  X,
  ChevronUp,
  FileSpreadsheet,
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
  Image as ImageIcon,
  Package,
  ShoppingCart,
  Receipt,
  FileText,
  DollarSign,
  Link,
  BarChart3,
  Keyboard,
  Crown,
  LayoutDashboard,
  BookOpen,
  ShoppingBag,
  Wallet,
  CreditCard,
  UserCog,
  MessageSquare,
  ArrowDown,
  MessageCircle,
  Layers,
  ArrowUpCircle,
  ArrowDownCircle,
  QrCode,
  Phone,
  Mail,
  MapPin,
  Building,
  Calendar,
  Clock,
  Download,
  Share2,
  Filter,
  Grid,
  List,
  PlusCircle,
  MinusCircle,
  Tag,
  Truck,
  FileSignature,
} from "lucide-react";

// QRCode is now generated using an API – no import needed

const PartiesWorkspace = () => {
  // ----- STATE (same as before) -----
  const [activeSection, setActiveSection] = useState("parties");
  const [selectedPartyId, setSelectedPartyId] = useState(null);
  const [activeTab, setActiveTab] = useState("transactions");
  const [parties, setParties] = useState([
    {
      id: "1",
      name: "Cash Sale",
      category: "-",
      phone: "9244526432",
      type: "Customer",
      balance: 0,
      email: "cash@example.com",
      gstin: "",
      pan: "",
      billingAddress: "123, Main Street",
      shippingAddress: "123, Main Street",
      creditPeriod: 30,
      creditLimit: 0,
      manager: "John",
      bankAccounts: [
        {
          id: "b1",
          bankName: "HDFC",
          accountHolder: "Cash Sale",
          accountNumber: "1234567890",
          ifsc: "HDFC0001234",
          branch: "Mumbai",
          upiId: "cash@hdfc",
        },
      ],
    },
    {
      id: "2",
      name: "JAI PRAKASH POWER VENTURES LIMITED",
      category: "-",
      phone: "-",
      type: "Customer",
      balance: 3295,
      email: "jppvl@example.com",
      gstin: "29ABCDE1234F1Z5",
      pan: "ABCDE1234F",
      billingAddress: "456, Industrial Area",
      shippingAddress: "456, Industrial Area",
      creditPeriod: 30,
      creditLimit: 5000,
      manager: "Rajesh",
      bankAccounts: [],
    },
    {
      id: "3",
      name: "JAI PRAKASH POWER VENTURES LIMITED",
      category: "-",
      phone: "-",
      type: "Customer",
      balance: 0,
      email: "",
      gstin: "",
      pan: "",
      billingAddress: "",
      shippingAddress: "",
      creditPeriod: 30,
      creditLimit: 0,
      manager: "",
      bankAccounts: [],
    },
    {
      id: "4",
      name: "JAI PRAKASH POWER VENTURES LIMITED",
      category: "-",
      phone: "7801286021",
      type: "Customer",
      balance: 0,
      email: "",
      gstin: "",
      pan: "",
      billingAddress: "",
      shippingAddress: "",
      creditPeriod: 30,
      creditLimit: 0,
      manager: "",
      bankAccounts: [],
    },
    {
      id: "5",
      name: "JAI PRAKASH POWER VENTURES LIMITED",
      category: "-",
      phone: "7801286021",
      type: "Customer",
      balance: 859417.56,
      email: "",
      gstin: "",
      pan: "",
      billingAddress: "",
      shippingAddress: "",
      creditPeriod: 30,
      creditLimit: 0,
      manager: "",
      bankAccounts: [],
    },
  ]);
  const [items, setItems] = useState([
    {
      id: "i1",
      name: "Plywood 12mm",
      code: "PLY12",
      hsn: "4412",
      gst: 18,
      price: 1200,
      stock: 50,
      qrCode: "PLY12-QR",
      category: "Wood",
    },
    {
      id: "i2",
      name: "Plywood 19mm",
      code: "PLY19",
      hsn: "4412",
      gst: 18,
      price: 1800,
      stock: 30,
      qrCode: "PLY19-QR",
      category: "Wood",
    },
    {
      id: "i3",
      name: "4x6 Sheet",
      code: "SHT46",
      hsn: "4412",
      gst: 18,
      price: 500,
      stock: 100,
      qrCode: "SHT46-QR",
      category: "Sheet",
    },
  ]);
  const [invoices, setInvoices] = useState([]);
  const [nextInvoiceId, setNextInvoiceId] = useState(1);
  const [isCreatePartyModalOpen, setIsCreatePartyModalOpen] = useState(false);
  const [isCreateInvoiceModalOpen, setIsCreateInvoiceModalOpen] =
    useState(false);
  const [isInvoicePreviewModalOpen, setIsInvoicePreviewModalOpen] =
    useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [partyFilter, setPartyFilter] = useState("all");
  const [partyFormData, setPartyFormData] = useState({
    name: "",
    phone: "",
    email: "",
    type: "Customer",
    openingBalance: 0,
    openingBalanceType: "ToCollect",
    gstin: "",
    pan: "",
    billingAddress: "",
    shippingAddress: "",
    creditPeriod: 30,
    creditLimit: 0,
    contactPerson: "",
    dob: "",
    bankAccount: "",
  });
  const [invoiceFormData, setInvoiceFormData] = useState({
    partyId: "",
    items: [],
    date: new Date().toISOString().split("T")[0],
    time: new Date().toTimeString().slice(0, 5),
    discount: 0,
    tax: 0,
    notes: "",
    transport: "",
    vehicleNo: "",
    bankAccountId: "",
    terms: "",
    poNo: "",
    ewayBillNo: "",
    placeOfSupply: "",
    additionalCharges: 0,
    tcs: 0,
    roundOff: 0,
  });
  const [logoUrl, setLogoUrl] = useState(null);
  const [reportType, setReportType] = useState("outstanding");
  const [showBankAccountModal, setShowBankAccountModal] = useState(false);
  const [bankAccountForm, setBankAccountForm] = useState({
    bankName: "",
    accountHolder: "",
    accountNumber: "",
    ifsc: "",
    branch: "",
    upiId: "",
  });
  const [editingBankAccountId, setEditingBankAccountId] = useState(null);

  // Computed totals for cards
  const totalToCollect = parties.reduce(
    (sum, p) => sum + (p.balance > 0 ? p.balance : 0),
    0,
  );
  const totalToPay = parties.reduce(
    (sum, p) => sum + (p.balance < 0 ? Math.abs(p.balance) : 0),
    0,
  );
  const totalReceived = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const totalPending = parties.reduce(
    (sum, p) => sum + (p.balance > 0 ? p.balance : 0),
    0,
  );
  const paidParties = parties.filter((p) => p.balance === 0).length;
  const unpaidParties = parties.filter((p) => p.balance > 0).length;

  // ----- HANDLERS (same as before) -----
  const handleCreateParty = () => {
    if (!partyFormData.name.trim()) {
      alert("Party Name is required");
      return;
    }
    const newParty = {
      id: Date.now().toString(),
      name: partyFormData.name,
      category: partyFormData.category || "-",
      phone: partyFormData.phone || "-",
      type: partyFormData.type || "Customer",
      balance:
        partyFormData.openingBalanceType === "ToCollect"
          ? partyFormData.openingBalance
          : -partyFormData.openingBalance,
      email: partyFormData.email || "",
      gstin: partyFormData.gstin || "",
      pan: partyFormData.pan || "",
      billingAddress: partyFormData.billingAddress || "",
      shippingAddress: partyFormData.shippingAddress || "",
      creditPeriod: partyFormData.creditPeriod || 30,
      creditLimit: partyFormData.creditLimit || 0,
      manager: partyFormData.contactPerson || "",
      bankAccounts: [],
    };
    setParties([newParty, ...parties]);
    setIsCreatePartyModalOpen(false);
    setPartyFormData({
      name: "",
      phone: "",
      email: "",
      type: "Customer",
      openingBalance: 0,
      openingBalanceType: "ToCollect",
      gstin: "",
      pan: "",
      billingAddress: "",
      shippingAddress: "",
      creditPeriod: 30,
      creditLimit: 0,
      contactPerson: "",
      dob: "",
      bankAccount: "",
    });
  };

  const handleDeleteParty = (id) => {
    if (window.confirm("Are you sure you want to delete this party?")) {
      setParties(parties.filter((p) => p.id !== id));
    }
  };

  const handleCreateInvoice = () => {
    if (!invoiceFormData.partyId) {
      alert("Please select a party.");
      return;
    }
    if (invoiceFormData.items.length === 0) {
      alert("Please add at least one item.");
      return;
    }
    const party = parties.find((p) => p.id === invoiceFormData.partyId);
    const invoice = {
      id: `INV-${String(nextInvoiceId).padStart(4, "0")}`,
      party: party,
      items: invoiceFormData.items.map((item) => ({
        ...item,
        total: item.quantity * item.price,
      })),
      date: invoiceFormData.date,
      time: invoiceFormData.time,
      discount: invoiceFormData.discount,
      tax: invoiceFormData.tax,
      notes: invoiceFormData.notes,
      transport: invoiceFormData.transport,
      vehicleNo: invoiceFormData.vehicleNo,
      bankAccount: party.bankAccounts.find(
        (b) => b.id === invoiceFormData.bankAccountId,
      ),
      terms: invoiceFormData.terms,
      poNo: invoiceFormData.poNo,
      ewayBillNo: invoiceFormData.ewayBillNo,
      placeOfSupply: invoiceFormData.placeOfSupply,
      additionalCharges: invoiceFormData.additionalCharges,
      tcs: invoiceFormData.tcs,
      roundOff: invoiceFormData.roundOff,
      subtotal: invoiceFormData.items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0,
      ),
    };
    let total =
      invoice.subtotal -
      invoice.discount +
      invoice.tax +
      invoice.additionalCharges +
      invoice.tcs +
      invoice.roundOff;
    invoice.total = total;
    invoice.status = "unpaid";
    setInvoices([invoice, ...invoices]);
    setNextInvoiceId(nextInvoiceId + 1);
    setIsCreateInvoiceModalOpen(false);
    setInvoiceFormData({
      partyId: "",
      items: [],
      date: new Date().toISOString().split("T")[0],
      time: new Date().toTimeString().slice(0, 5),
      discount: 0,
      tax: 0,
      notes: "",
      transport: "",
      vehicleNo: "",
      bankAccountId: "",
      terms: "",
      poNo: "",
      ewayBillNo: "",
      placeOfSupply: "",
      additionalCharges: 0,
      tcs: 0,
      roundOff: 0,
    });
    setSelectedInvoice(invoice);
    setIsInvoicePreviewModalOpen(true);
  };

  const handleAddItemToInvoice = () => {
    const itemChoice = window.confirm(
      "Add existing item? Click OK to select from list, Cancel to create new.",
    );
    if (itemChoice) {
      const existing = items[0];
      if (existing) {
        setInvoiceFormData({
          ...invoiceFormData,
          items: [
            ...invoiceFormData.items,
            {
              id: Date.now().toString(),
              name: existing.name,
              code: existing.code,
              hsn: existing.hsn,
              gst: existing.gst,
              quantity: 1,
              price: existing.price,
              description: "",
            },
          ],
        });
      } else {
        alert("No items available. Please create a new item.");
      }
    } else {
      const name = prompt("Enter item name:");
      if (name) {
        const code = prompt("Enter item code:");
        const hsn = prompt("Enter HSN:");
        const gst = parseFloat(prompt("Enter GST%:")) || 0;
        const price = parseFloat(prompt("Enter price:")) || 0;
        setInvoiceFormData({
          ...invoiceFormData,
          items: [
            ...invoiceFormData.items,
            {
              id: Date.now().toString(),
              name,
              code: code || "",
              hsn: hsn || "",
              gst,
              quantity: 1,
              price,
              description: "",
            },
          ],
        });
      }
    }
  };

  const handleRemoveItemFromInvoice = (itemId) => {
    setInvoiceFormData({
      ...invoiceFormData,
      items: invoiceFormData.items.filter((item) => item.id !== itemId),
    });
  };

  const handlePrintInvoice = () => window.print();

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setLogoUrl(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleBulkUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newParties = [
        {
          id: Date.now().toString() + "b1",
          name: "Bulk Party 1",
          category: "Wholesale",
          phone: "9876543210",
          type: "Customer",
          balance: 1000,
          email: "",
          gstin: "",
          pan: "",
          billingAddress: "",
          shippingAddress: "",
          creditPeriod: 30,
          creditLimit: 0,
          manager: "",
          bankAccounts: [],
        },
        {
          id: Date.now().toString() + "b2",
          name: "Bulk Party 2",
          category: "Retail",
          phone: "9876543211",
          type: "Supplier",
          balance: -500,
          email: "",
          gstin: "",
          pan: "",
          billingAddress: "",
          shippingAddress: "",
          creditPeriod: 30,
          creditLimit: 0,
          manager: "",
          bankAccounts: [],
        },
      ];
      setParties([...newParties, ...parties]);
      alert("Bulk upload successful! Added 2 parties.");
    }
  };

  const handleAddBankAccount = (partyId, bankData) => {
    const updatedParties = parties.map((p) => {
      if (p.id === partyId) {
        return {
          ...p,
          bankAccounts: [
            ...p.bankAccounts,
            {
              id: Date.now().toString(),
              ...bankData,
            },
          ],
        };
      }
      return p;
    });
    setParties(updatedParties);
    setShowBankAccountModal(false);
    setBankAccountForm({
      bankName: "",
      accountHolder: "",
      accountNumber: "",
      ifsc: "",
      branch: "",
      upiId: "",
    });
  };

  const handleEditBankAccount = (partyId, bankId, updatedData) => {
    const updatedParties = parties.map((p) => {
      if (p.id === partyId) {
        return {
          ...p,
          bankAccounts: p.bankAccounts.map((b) =>
            b.id === bankId ? { ...b, ...updatedData } : b,
          ),
        };
      }
      return p;
    });
    setParties(updatedParties);
    setEditingBankAccountId(null);
    setShowBankAccountModal(false);
  };

  const handleDeleteBankAccount = (partyId, bankId) => {
    if (window.confirm("Delete this bank account?")) {
      const updatedParties = parties.map((p) => {
        if (p.id === partyId) {
          return {
            ...p,
            bankAccounts: p.bankAccounts.filter((b) => b.id !== bankId),
          };
        }
        return p;
      });
      setParties(updatedParties);
    }
  };

  const filterParties = () => {
    let filtered = parties;
    if (partyFilter === "paid")
      filtered = parties.filter((p) => p.balance === 0);
    else if (partyFilter === "unpaid")
      filtered = parties.filter((p) => p.balance > 0);
    else if (partyFilter === "collection")
      filtered = parties.filter((p) => p.balance > 0);
    else if (partyFilter === "received")
      filtered = parties.filter((p) => p.balance === 0);
    else if (partyFilter === "pending")
      filtered = parties.filter((p) => p.balance > 0);
    filtered = filtered.filter((party) => {
      const matchSearch =
        party.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        party.phone.includes(searchQuery);
      const matchCategory =
        !selectedCategory ||
        selectedCategory === "All Categories" ||
        party.category === selectedCategory;
      return matchSearch && matchCategory;
    });
    return filtered;
  };

  const filteredParties = filterParties();

  const selectedParty = parties.find((p) => p.id === selectedPartyId);
  const partyTransactions = invoices.filter(
    (inv) => inv.party.id === selectedPartyId,
  );
  const partyTotalSales = partyTransactions.reduce(
    (sum, inv) => sum + inv.total,
    0,
  );
  const partyTotalReceived = partyTransactions
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.total, 0);
  const partyOutstanding = selectedParty ? selectedParty.balance : 0;
  const partyOverdue = partyTransactions
    .filter((inv) => new Date(inv.date) < new Date(Date.now() - 30 * 86400000))
    .reduce((sum, inv) => sum + inv.total, 0);

  // Ageing buckets
  const getAgeingData = () => {
    const buckets = {
      notDue: 0,
      byTomorrow: 0,
      upcoming: 0,
      due: 0,
      oneFifteen: 0,
      sixteenThirty: 0,
      thirtyPlus: 0,
      totalOverdue: 0,
      totalAmount: 0,
    };
    parties.forEach((p) => {
      const bal = p.balance > 0 ? p.balance : 0;
      if (bal === 0) return;
      buckets.thirtyPlus += bal;
      buckets.totalOverdue += bal;
      buckets.totalAmount += bal;
    });
    return buckets;
  };

  const ageingData = getAgeingData();

  // ----- RENDER FUNCTIONS (same as before, but QR generation changed) -----
  const renderContent = () => {
    if (selectedPartyId && selectedParty) {
      return renderPartyDetails();
    }
    switch (activeSection) {
      case "parties":
        return renderPartiesContent();
      case "reports":
        return renderReportsContent();
      default:
        return <div>Section not implemented</div>;
    }
  };

  const renderPartiesContent = () => (
    <>
      <header className="page-header">
        <h1 className="page-title">All Parties</h1>
        <div className="header-actions">
          <button
            className="btn-tertiary"
            onClick={() => setActiveSection("reports")}
          >
            <BarChart3 size={16} color="#0C8CE9" /> <span>Reports</span>
          </button>
          <button className="btn-icon">
            <Settings size={16} color="#292D35" />
          </button>
          <button className="btn-icon">
            <Keyboard size={16} color="#525A6A" />
          </button>
        </div>
      </header>

      <div className="stats-cards">
        <StatCard
          icon={<Users size={14} color="#485eb0" />}
          title="Total Parties"
          value={parties.length}
          onClick={() => setPartyFilter("all")}
        />
        <StatCard
          icon={<ArrowUpCircle size={14} color="#06B181" />}
          title="Total Collection"
          value={`₹ ${totalToCollect.toLocaleString("en-IN")}`}
          color="green"
          onClick={() => setPartyFilter("collection")}
        />
        <StatCard
          icon={<DollarSign size={14} color="#485eb0" />}
          title="Total Received"
          value={`₹ ${totalReceived.toLocaleString("en-IN")}`}
          onClick={() => setPartyFilter("received")}
        />
        <StatCard
          icon={<ArrowDownCircle size={14} color="#C33B3B" />}
          title="Pending Collection"
          value={`₹ ${totalPending.toLocaleString("en-IN")}`}
          color="red"
          onClick={() => setPartyFilter("pending")}
        />
        <StatCard
          icon={<Users size={14} color="#06B181" />}
          title="Paid Parties"
          value={paidParties}
          onClick={() => setPartyFilter("paid")}
        />
        <StatCard
          icon={<Users size={14} color="#C33B3B" />}
          title="Unpaid Parties"
          value={unpaidParties}
          onClick={() => setPartyFilter("unpaid")}
        />
      </div>

      <div className="filter-bar">
        <div className="filter-left">
          <div className="search-wrapper">
            <Search size={16} color="#525A6A" />
            <input
              type="text"
              placeholder="Search Party"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="category-dropdown"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Retail">Retail</option>
            <option value="Wholesale">Wholesale</option>
            <option value="Distributor">Distributor</option>
            <option value="Manufacturer">Manufacturer</option>
            <option value="Service Provider">Service Provider</option>
          </select>
        </div>
        <div className="filter-right">
          <button
            className="btn-primary dropdown-trigger"
            onClick={() => document.getElementById("bulk-file-input").click()}
          >
            <Layers size={16} color="#292D35" /> <span>Bulk Action</span>{" "}
            <ChevronDown size={16} color="#667085" />
          </button>
          <input
            type="file"
            id="bulk-file-input"
            style={{ display: "none" }}
            onChange={handleBulkUpload}
            accept=".csv,.xlsx,.xls"
          />
          <button
            className="btn-primary"
            onClick={() => setIsCreatePartyModalOpen(true)}
          >
            <Plus size={16} color="#292D35" /> <span>Create Party</span>
          </button>
          <button
            className="btn-primary"
            onClick={() => setIsCreateInvoiceModalOpen(true)}
          >
            <Receipt size={16} color="#292D35" /> <span>Create Bill</span>
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="parties-table">
          <thead>
            <tr>
              <th>Party Name</th>
              <th>Category</th>
              <th>Mobile Number</th>
              <th>Party type</th>
              <th>Balance</th>
              <th style={{ width: "100px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredParties.map((party) => (
              <tr key={party.id} className="table-row">
                <td
                  onClick={() => {
                    setSelectedPartyId(party.id);
                    setActiveTab("transactions");
                  }}
                  style={{ cursor: "pointer", color: "#4c3cce" }}
                >
                  {party.name}
                </td>
                <td>{party.category}</td>
                <td>{party.phone}</td>
                <td>{party.type}</td>
                <td>
                  <span
                    className={`balance ${party.balance > 0 ? "positive" : party.balance < 0 ? "negative" : ""}`}
                  >
                    {party.balance > 0 && (
                      <ArrowDown
                        size={14}
                        color="#49a563"
                        className="rotate-180"
                      />
                    )}
                    {party.balance < 0 && (
                      <ArrowDown size={14} color="#C33B3B" />
                    )}
                    ₹ {Math.abs(party.balance).toLocaleString("en-IN")}
                  </span>
                  {party.balance > 0 && party.phone !== "-" && (
                    <MessageCircle
                      size={16}
                      color="#25D366"
                      className="whatsapp-icon"
                      onClick={() =>
                        window.open(
                          `https://wa.me/91${party.phone}?text=Dear ${party.name}, your outstanding balance is ₹${party.balance}. Please clear it.`,
                          "_blank",
                        )
                      }
                    />
                  )}
                </td>
                <td>
                  <div style={{ display: "flex", gap: "4px" }}>
                    <button
                      className="btn-icon-small"
                      onClick={() => {
                        setSelectedPartyId(party.id);
                        setActiveTab("transactions");
                      }}
                      title="View Details"
                    >
                      <Eye size={14} color="#525A6A" />
                    </button>
                    <button
                      className="btn-icon-small"
                      onClick={() => alert("Edit party: " + party.name)}
                    >
                      <Edit size={14} color="#525A6A" />
                    </button>
                    <button
                      className="btn-icon-small"
                      onClick={() => handleDeleteParty(party.id)}
                    >
                      <Trash2 size={14} color="#C33B3B" />
                    </button>
                    <button className="btn-icon-small">
                      <MoreVertical size={14} color="#858D9D" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals - same as before, with QR generation replaced */}
      {isCreatePartyModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsCreatePartyModalOpen(false)}
        >
          <div
            className="modal-content-wrapper"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Create Party</h2>
              <button
                className="btn-icon"
                onClick={() => setIsCreatePartyModalOpen(false)}
              >
                <X size={20} color="#858D9D" />
              </button>
            </div>
            <div className="modal-body create-party-form">
              <div className="form-section">
                <h3 className="form-section-title">General Details</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      Party Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter party name"
                      value={partyFormData.name}
                      onChange={(e) =>
                        setPartyFormData({
                          ...partyFormData,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Mobile Number</label>
                    <input
                      type="text"
                      placeholder="Enter mobile number"
                      value={partyFormData.phone}
                      onChange={(e) =>
                        setPartyFormData({
                          ...partyFormData,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="Enter email"
                      value={partyFormData.email}
                      onChange={(e) =>
                        setPartyFormData({
                          ...partyFormData,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Opening Balance</label>
                    <div className="opening-balance-group">
                      <input
                        type="number"
                        placeholder="0"
                        value={partyFormData.openingBalance}
                        onChange={(e) =>
                          setPartyFormData({
                            ...partyFormData,
                            openingBalance: parseFloat(e.target.value) || 0,
                          })
                        }
                      />
                      <select
                        value={partyFormData.openingBalanceType}
                        onChange={(e) =>
                          setPartyFormData({
                            ...partyFormData,
                            openingBalanceType: e.target.value,
                          })
                        }
                      >
                        <option value="ToCollect">To Collect</option>
                        <option value="ToPay">To Pay</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-section">
                <div className="form-row">
                  <div className="form-group">
                    <label>GSTIN</label>
                    <input
                      type="text"
                      placeholder="ex: 29XXXXX9438X1XX"
                      value={partyFormData.gstin}
                      onChange={(e) =>
                        setPartyFormData({
                          ...partyFormData,
                          gstin: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>PAN Number</label>
                    <input
                      type="text"
                      placeholder="Enter party PAN Number"
                      value={partyFormData.pan}
                      onChange={(e) =>
                        setPartyFormData({
                          ...partyFormData,
                          pan: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="form-section">
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      Party Type <span className="required">*</span>
                    </label>
                    <select
                      value={partyFormData.type}
                      onChange={(e) =>
                        setPartyFormData({
                          ...partyFormData,
                          type: e.target.value,
                        })
                      }
                    >
                      <option value="Customer">Customer</option>
                      <option value="Supplier">Supplier</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Party Category</label>
                    <select
                      value={partyFormData.category}
                      onChange={(e) =>
                        setPartyFormData({
                          ...partyFormData,
                          category: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Category</option>
                      <option value="Retail">Retail</option>
                      <option value="Wholesale">Wholesale</option>
                      <option value="Distributor">Distributor</option>
                      <option value="Manufacturer">Manufacturer</option>
                      <option value="Service Provider">Service Provider</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-section">
                <div className="form-row">
                  <div className="form-group">
                    <label>Billing Address</label>
                    <input
                      type="text"
                      placeholder="Enter billing address"
                      value={partyFormData.billingAddress}
                      onChange={(e) =>
                        setPartyFormData({
                          ...partyFormData,
                          billingAddress: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Shipping Address</label>
                    <input
                      type="text"
                      placeholder="Enter shipping address"
                      value={partyFormData.shippingAddress}
                      onChange={(e) =>
                        setPartyFormData({
                          ...partyFormData,
                          shippingAddress: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="form-section">
                <div className="form-row">
                  <div className="form-group">
                    <label>Credit Period (days)</label>
                    <input
                      type="number"
                      placeholder="30"
                      value={partyFormData.creditPeriod}
                      onChange={(e) =>
                        setPartyFormData({
                          ...partyFormData,
                          creditPeriod: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Credit Limit</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={partyFormData.creditLimit}
                      onChange={(e) =>
                        setPartyFormData({
                          ...partyFormData,
                          creditLimit: parseFloat(e.target.value) || 0,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="form-section">
                <h3 className="form-section-title">Contact Person Details</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Contact Person Name</label>
                    <input
                      type="text"
                      placeholder="Ex: Ankit Mishra"
                      value={partyFormData.contactPerson}
                      onChange={(e) =>
                        setPartyFormData({
                          ...partyFormData,
                          contactPerson: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input
                      type="text"
                      placeholder="DD-MM-YYYY"
                      value={partyFormData.dob}
                      onChange={(e) =>
                        setPartyFormData({
                          ...partyFormData,
                          dob: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="form-section">
                <div className="form-group">
                  <label>Party Bank Account</label>
                  <input
                    type="text"
                    placeholder="Add party bank information to manage transactions"
                    value={partyFormData.bankAccount}
                    onChange={(e) =>
                      setPartyFormData({
                        ...partyFormData,
                        bankAccount: e.target.value,
                      })
                    }
                  />
                </div>
                <button
                  className="btn-link"
                  onClick={() => alert("Bank account added (simulated)")}
                >
                  Add Bank Account
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-secondary"
                onClick={() => setIsCreatePartyModalOpen(false)}
              >
                Cancel
              </button>
              <button className="btn-primary-solid" onClick={handleCreateParty}>
                Create Party
              </button>
            </div>
          </div>
        </div>
      )}

      {isCreateInvoiceModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsCreateInvoiceModalOpen(false)}
        >
          <div
            className="modal-content-wrapper modal-lg"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "1000px" }}
          >
            <div className="modal-header">
              <h2>Create Sales Invoice</h2>
              <button
                className="btn-icon"
                onClick={() => setIsCreateInvoiceModalOpen(false)}
              >
                <X size={20} color="#858D9D" />
              </button>
            </div>
            <div className="modal-body create-invoice-form">
              <div className="invoice-auto-sms">
                <span>📱 Invoice Auto-SMS to Party is turned on</span>
                <small>
                  An SMS with the invoice details and link is sent to the party
                  after the invoice has been created
                </small>
              </div>
              <div className="form-section">
                <div className="bill-ship-row">
                  <div className="bill-to">
                    <label>Bill To</label>
                    <div className="party-selector">
                      <select
                        value={invoiceFormData.partyId}
                        onChange={(e) => {
                          setInvoiceFormData({
                            ...invoiceFormData,
                            partyId: e.target.value,
                            bankAccountId: "",
                          });
                        }}
                      >
                        <option value="">Change Party</option>
                        {parties.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} ({p.phone})
                          </option>
                        ))}
                      </select>
                      <button className="btn-link-small">+ Add New</button>
                    </div>
                    {invoiceFormData.partyId && (
                      <div className="party-address">
                        <strong>
                          {
                            parties.find(
                              (p) => p.id === invoiceFormData.partyId,
                            )?.name
                          }
                        </strong>
                        <p>
                          {
                            parties.find(
                              (p) => p.id === invoiceFormData.partyId,
                            )?.billingAddress
                          }
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="ship-to">
                    <label>Ship To</label>
                    <button className="btn-link-small">
                      Change Shipping Address
                    </button>
                    {invoiceFormData.partyId && (
                      <div className="party-address">
                        <strong>
                          {
                            parties.find(
                              (p) => p.id === invoiceFormData.partyId,
                            )?.name
                          }
                        </strong>
                        <p>
                          {
                            parties.find(
                              (p) => p.id === invoiceFormData.partyId,
                            )?.shippingAddress
                          }
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="invoice-details-grid">
                  <div className="form-group">
                    <label>Sales Invoice No:</label>
                    <input
                      type="text"
                      value={`INV-${String(nextInvoiceId).padStart(4, "0")}`}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Sales Invoice Date:</label>
                    <input
                      type="date"
                      value={invoiceFormData.date}
                      onChange={(e) =>
                        setInvoiceFormData({
                          ...invoiceFormData,
                          date: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Payment Terms:</label>
                    <select
                      value={invoiceFormData.paymentTerms || "0"}
                      onChange={(e) =>
                        setInvoiceFormData({
                          ...invoiceFormData,
                          paymentTerms: e.target.value,
                        })
                      }
                    >
                      <option value="0">0 days</option>
                      <option value="15">15 days</option>
                      <option value="30">30 days</option>
                      <option value="45">45 days</option>
                      <option value="60">60 days</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Due Date:</label>
                    <input
                      type="date"
                      value={invoiceFormData.dueDate || ""}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>PO No:</label>
                    <input
                      type="text"
                      placeholder="PO number"
                      value={invoiceFormData.poNo}
                      onChange={(e) =>
                        setInvoiceFormData({
                          ...invoiceFormData,
                          poNo: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>E-Way Bill No:</label>
                    <input
                      type="text"
                      placeholder="E-Way Bill No"
                      value={invoiceFormData.ewayBillNo}
                      onChange={(e) =>
                        setInvoiceFormData({
                          ...invoiceFormData,
                          ewayBillNo: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Vehicle No:</label>
                    <input
                      type="text"
                      placeholder="Vehicle number"
                      value={invoiceFormData.vehicleNo}
                      onChange={(e) =>
                        setInvoiceFormData({
                          ...invoiceFormData,
                          vehicleNo: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="place-of-supply">
                  <label>Place of Supply</label>
                  <select
                    value={invoiceFormData.placeOfSupply}
                    onChange={(e) =>
                      setInvoiceFormData({
                        ...invoiceFormData,
                        placeOfSupply: e.target.value,
                      })
                    }
                  >
                    <option value="">Select State</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Karnataka">Karnataka</option>
                  </select>
                </div>
              </div>
              <div className="form-section">
                <div className="invoice-items-header">
                  <h3 className="form-section-title">Items</h3>
                  <button
                    className="btn-primary-small"
                    onClick={handleAddItemToInvoice}
                  >
                    <Plus size={14} /> Add Item
                  </button>
                </div>
                <div className="invoice-items-table-wrap">
                  <table className="invoice-items-table">
                    <thead>
                      <tr>
                        <th>NO</th>
                        <th>ITEMS/SERVICES</th>
                        <th>HSN/SAC</th>
                        <th>QTY</th>
                        <th>PRICE/ITEM (₹)</th>
                        <th>DISCOUNT</th>
                        <th>TAX</th>
                        <th>AMOUNT (₹)</th>
                        <th>QR</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceFormData.items.map((item, index) => {
                        const taxAmt =
                          (item.quantity * item.price * (item.gst || 0)) / 100;
                        const total =
                          item.quantity * item.price +
                          taxAmt -
                          (item.discount || 0);
                        return (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>
                              <input
                                type="text"
                                value={item.name}
                                onChange={(e) => {
                                  const newItems = [...invoiceFormData.items];
                                  newItems[index].name = e.target.value;
                                  setInvoiceFormData({
                                    ...invoiceFormData,
                                    items: newItems,
                                  });
                                }}
                              />
                              <input
                                type="text"
                                placeholder="Description"
                                value={item.description || ""}
                                onChange={(e) => {
                                  const newItems = [...invoiceFormData.items];
                                  newItems[index].description = e.target.value;
                                  setInvoiceFormData({
                                    ...invoiceFormData,
                                    items: newItems,
                                  });
                                }}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                value={item.hsn || ""}
                                onChange={(e) => {
                                  const newItems = [...invoiceFormData.items];
                                  newItems[index].hsn = e.target.value;
                                  setInvoiceFormData({
                                    ...invoiceFormData,
                                    items: newItems,
                                  });
                                }}
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => {
                                  const newItems = [...invoiceFormData.items];
                                  newItems[index].quantity =
                                    parseFloat(e.target.value) || 0;
                                  setInvoiceFormData({
                                    ...invoiceFormData,
                                    items: newItems,
                                  });
                                }}
                              />
                              <span>PCS</span>
                            </td>
                            <td>
                              <input
                                type="number"
                                value={item.price}
                                onChange={(e) => {
                                  const newItems = [...invoiceFormData.items];
                                  newItems[index].price =
                                    parseFloat(e.target.value) || 0;
                                  setInvoiceFormData({
                                    ...invoiceFormData,
                                    items: newItems,
                                  });
                                }}
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                value={item.discount || 0}
                                onChange={(e) => {
                                  const newItems = [...invoiceFormData.items];
                                  newItems[index].discount =
                                    parseFloat(e.target.value) || 0;
                                  setInvoiceFormData({
                                    ...invoiceFormData,
                                    items: newItems,
                                  });
                                }}
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                value={item.gst || 0}
                                onChange={(e) => {
                                  const newItems = [...invoiceFormData.items];
                                  newItems[index].gst =
                                    parseFloat(e.target.value) || 0;
                                  setInvoiceFormData({
                                    ...invoiceFormData,
                                    items: newItems,
                                  });
                                }}
                              />
                              <span>%</span>
                            </td>
                            <td>₹ {total.toFixed(2)}</td>
                            <td>
                              <button
                                className="btn-icon-small"
                                onClick={() => {
                                  const qrData = `${item.name}|${item.code}|${item.price}`;
                                  alert(
                                    `QR Code data: ${qrData}\n(Would show QR code)`,
                                  );
                                }}
                              >
                                <QrCode size={14} color="#4c3cce" />
                              </button>
                              <button
                                className="btn-icon-small"
                                onClick={() => {
                                  alert(
                                    `Scanning item: ${item.name}\nDetails: Code=${item.code}, HSN=${item.hsn}, Price=${item.price}`,
                                  );
                                }}
                              >
                                <Search size={14} color="#525A6A" />
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn-icon-small"
                                onClick={() =>
                                  handleRemoveItemFromInvoice(item.id)
                                }
                              >
                                <X size={14} color="#C33B3B" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="invoice-add-buttons">
                  <button className="btn-link">
                    <PlusCircle size={14} /> Add Additional Charges
                  </button>
                  <button className="btn-link">
                    <MinusCircle size={14} /> Add Discount
                  </button>
                  <button className="btn-link">
                    <Tag size={14} /> Apply TCS
                  </button>
                  <button className="btn-link">
                    <ArrowUpCircle size={14} /> Auto Round Off
                  </button>
                </div>
              </div>
              <div className="form-section">
                <div className="totals-row">
                  <div className="totals-left">
                    <div className="form-group">
                      <label>Notes</label>
                      <textarea
                        placeholder="Additional notes"
                        value={invoiceFormData.notes}
                        onChange={(e) =>
                          setInvoiceFormData({
                            ...invoiceFormData,
                            notes: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="bank-account-select">
                      <label>Bank Account</label>
                      <select
                        value={invoiceFormData.bankAccountId}
                        onChange={(e) =>
                          setInvoiceFormData({
                            ...invoiceFormData,
                            bankAccountId: e.target.value,
                          })
                        }
                      >
                        <option value="">Select Bank Account</option>
                        {invoiceFormData.partyId &&
                          parties
                            .find((p) => p.id === invoiceFormData.partyId)
                            ?.bankAccounts.map((b) => (
                              <option key={b.id} value={b.id}>
                                {b.bankName} - {b.accountNumber}
                              </option>
                            ))}
                      </select>
                      <button
                        className="btn-link-small"
                        onClick={() => {
                          if (invoiceFormData.partyId) {
                            setShowBankAccountModal(true);
                          } else {
                            alert("Please select a party first.");
                          }
                        }}
                      >
                        + Add New Account
                      </button>
                    </div>
                  </div>
                  <div className="totals-right">
                    <div className="total-line">
                      <span>Subtotal</span>
                      <span>
                        ₹{" "}
                        {invoiceFormData.items
                          .reduce(
                            (sum, item) => sum + item.quantity * item.price,
                            0,
                          )
                          .toFixed(2)}
                      </span>
                    </div>
                    <div className="total-line">
                      <span>Discount</span>
                      <span>- ₹ {invoiceFormData.discount.toFixed(2)}</span>
                    </div>
                    <div className="total-line">
                      <span>Tax</span>
                      <span>+ ₹ {invoiceFormData.tax.toFixed(2)}</span>
                    </div>
                    <div className="total-line">
                      <span>Additional Charges</span>
                      <span>
                        + ₹ {invoiceFormData.additionalCharges.toFixed(2)}
                      </span>
                    </div>
                    <div className="total-line">
                      <span>TCS</span>
                      <span>+ ₹ {invoiceFormData.tcs.toFixed(2)}</span>
                    </div>
                    <div className="total-line grand-total">
                      <span>Total Amount</span>
                      <span>
                        ₹{" "}
                        {(
                          invoiceFormData.items.reduce(
                            (sum, item) => sum + item.quantity * item.price,
                            0,
                          ) -
                          invoiceFormData.discount +
                          invoiceFormData.tax +
                          invoiceFormData.additionalCharges +
                          invoiceFormData.tcs +
                          invoiceFormData.roundOff
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className="payment-qr">
                      <button className="btn-link">
                        <QrCode size={14} /> Add Payment QR
                      </button>
                      <button className="btn-link">
                        <FileSignature size={14} /> Add Signature
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-section">
                <div className="terms-section">
                  <label>Terms and Conditions</label>
                  <textarea
                    placeholder="Enter terms and conditions"
                    value={invoiceFormData.terms}
                    onChange={(e) =>
                      setInvoiceFormData({
                        ...invoiceFormData,
                        terms: e.target.value,
                      })
                    }
                    rows="5"
                  />
                </div>
                <div className="authorized-signatory">
                  <label>
                    Authorized Signatory for DUSHYANT FURNITURE MART AND POWER
                    TOOLS
                  </label>
                  <button className="btn-link">+ Add Signature</button>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-secondary"
                onClick={() => setIsCreateInvoiceModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="btn-primary-solid"
                onClick={handleCreateInvoice}
              >
                Create Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      {isInvoicePreviewModalOpen && selectedInvoice && (
        <div
          className="modal-overlay"
          onClick={() => setIsInvoicePreviewModalOpen(false)}
        >
          <div
            className="modal-content-wrapper modal-lg"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "900px" }}
          >
            <div className="modal-header">
              <h2>Invoice Preview</h2>
              <div className="header-actions">
                <button className="btn-tertiary" onClick={handlePrintInvoice}>
                  <Printer size={16} /> <span>Print</span>
                </button>
                <button
                  className="btn-tertiary"
                  onClick={() => {
                    if (selectedInvoice.party.phone)
                      window.open(
                        `https://wa.me/91${selectedInvoice.party.phone}?text=Your%20invoice%20${selectedInvoice.id}%20amount%20₹${selectedInvoice.total}%20is%20due.`,
                        "_blank",
                      );
                    else alert("No phone number for this party.");
                  }}
                >
                  <MessageCircle size={16} color="#25D366" />{" "}
                  <span>WhatsApp</span>
                </button>
                <button
                  className="btn-icon"
                  onClick={() => setIsInvoicePreviewModalOpen(false)}
                >
                  <X size={20} color="#858D9D" />
                </button>
              </div>
            </div>
            <div
              className="modal-body invoice-preview-body"
              id="invoice-preview"
            >
              <div className="invoice-logo-section">
                {logoUrl ? (
                  <img src={logoUrl} alt="Logo" className="invoice-logo" />
                ) : (
                  <div className="invoice-logo-placeholder">
                    <ImageIcon size={40} color="#ccc" />
                    <span>No Logo</span>
                  </div>
                )}
                <div className="invoice-logo-upload">
                  <label className="btn-tertiary">
                    <Upload size={14} /> Upload Logo{" "}
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleLogoUpload}
                    />
                  </label>
                </div>
              </div>
              <div className="invoice-header">
                <h1>TAX INVOICE</h1>
                <p>Invoice #: {selectedInvoice.id}</p>
                <p>
                  Date: {selectedInvoice.date} | Time: {selectedInvoice.time}
                </p>
                {selectedInvoice.poNo && <p>PO No: {selectedInvoice.poNo}</p>}
                {selectedInvoice.ewayBillNo && (
                  <p>E-Way Bill No: {selectedInvoice.ewayBillNo}</p>
                )}
                {selectedInvoice.vehicleNo && (
                  <p>Vehicle No: {selectedInvoice.vehicleNo}</p>
                )}
              </div>
              <div className="invoice-party">
                <div>
                  <strong>Bill To:</strong>
                  <p>{selectedInvoice.party.name}</p>
                  <p>{selectedInvoice.party.phone}</p>
                  <p>{selectedInvoice.party.email}</p>
                  <p>{selectedInvoice.party.billingAddress}</p>
                  {selectedInvoice.placeOfSupply && (
                    <p>Place of Supply: {selectedInvoice.placeOfSupply}</p>
                  )}
                </div>
                <div>
                  <strong>Ship To:</strong>
                  <p>{selectedInvoice.party.name}</p>
                  <p>{selectedInvoice.party.shippingAddress}</p>
                </div>
              </div>
              <table className="invoice-items-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Item</th>
                    <th>Code</th>
                    <th>HSN</th>
                    <th>GST%</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Tax</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoice.items.map((item, idx) => {
                    const taxAmt =
                      (item.quantity * item.price * (item.gst || 0)) / 100;
                    const total =
                      item.quantity * item.price +
                      taxAmt -
                      (item.discount || 0);
                    return (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.code}</td>
                        <td>{item.hsn || "-"}</td>
                        <td>{item.gst || 0}%</td>
                        <td>{item.quantity}</td>
                        <td>₹ {item.price.toFixed(2)}</td>
                        <td>
                          {item.discount
                            ? `₹ ${item.discount.toFixed(2)}`
                            : "-"}
                        </td>
                        <td>₹ {taxAmt.toFixed(2)}</td>
                        <td>₹ {total.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="9" style={{ textAlign: "right" }}>
                      Subtotal:
                    </td>
                    <td>₹ {selectedInvoice.subtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan="9" style={{ textAlign: "right" }}>
                      Discount:
                    </td>
                    <td>- ₹ {selectedInvoice.discount.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan="9" style={{ textAlign: "right" }}>
                      Tax:
                    </td>
                    <td>+ ₹ {selectedInvoice.tax.toFixed(2)}</td>
                  </tr>
                  {selectedInvoice.additionalCharges > 0 && (
                    <tr>
                      <td colSpan="9" style={{ textAlign: "right" }}>
                        Additional Charges:
                      </td>
                      <td>
                        + ₹ {selectedInvoice.additionalCharges.toFixed(2)}
                      </td>
                    </tr>
                  )}
                  {selectedInvoice.tcs > 0 && (
                    <tr>
                      <td colSpan="9" style={{ textAlign: "right" }}>
                        TCS:
                      </td>
                      <td>+ ₹ {selectedInvoice.tcs.toFixed(2)}</td>
                    </tr>
                  )}
                  {selectedInvoice.roundOff !== 0 && (
                    <tr>
                      <td colSpan="9" style={{ textAlign: "right" }}>
                        Round Off:
                      </td>
                      <td>
                        {selectedInvoice.roundOff > 0 ? "+" : "-"} ₹{" "}
                        {Math.abs(selectedInvoice.roundOff).toFixed(2)}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td
                      colSpan="9"
                      style={{ textAlign: "right", fontWeight: "bold" }}
                    >
                      Total:
                    </td>
                    <td style={{ fontWeight: "bold" }}>
                      ₹ {selectedInvoice.total.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
              {selectedInvoice.notes && (
                <div className="invoice-notes">
                  <strong>Notes:</strong>
                  <p>{selectedInvoice.notes}</p>
                </div>
              )}
              {selectedInvoice.terms && (
                <div className="invoice-notes">
                  <strong>Terms and Conditions:</strong>
                  <p>{selectedInvoice.terms}</p>
                </div>
              )}
              {selectedInvoice.bankAccount && (
                <div className="invoice-notes">
                  <strong>Bank:</strong> {selectedInvoice.bankAccount.bankName}{" "}
                  - {selectedInvoice.bankAccount.accountNumber}
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                className="btn-secondary"
                onClick={() => setIsInvoicePreviewModalOpen(false)}
              >
                Close
              </button>
              <button
                className="btn-primary-solid"
                onClick={handlePrintInvoice}
              >
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  const renderPartyDetails = () => {
    if (!selectedParty) return <div>Party not found</div>;
    const transactions = invoices.filter(
      (inv) => inv.party.id === selectedParty.id,
    );
    const totalSales = transactions.reduce((sum, inv) => sum + inv.total, 0);
    const totalReceived = transactions
      .filter((inv) => inv.status === "paid")
      .reduce((sum, inv) => sum + inv.total, 0);
    const outstanding = selectedParty.balance;
    const overdue = transactions
      .filter(
        (inv) => new Date(inv.date) < new Date(Date.now() - 30 * 86400000),
      )
      .reduce((sum, inv) => sum + inv.total, 0);
    const creditUsed = Math.min(selectedParty.creditLimit, outstanding);
    const remainingCredit = selectedParty.creditLimit - creditUsed;

    return (
      <div className="party-details">
        <div className="page-header">
          <h1 className="page-title">
            {selectedParty.name}{" "}
            <button
              className="btn-tertiary"
              onClick={() => setSelectedPartyId(null)}
            >
              ← Back to Parties
            </button>
          </h1>
          <div className="header-actions">
            <button
              className="btn-tertiary"
              onClick={() => {
                if (selectedParty.phone)
                  window.open(
                    `https://wa.me/91${selectedParty.phone}?text=Hello ${selectedParty.name}, this is a reminder for your outstanding balance.`,
                    "_blank",
                  );
                else alert("No phone number.");
              }}
            >
              <MessageCircle size={16} color="#25D366" /> WhatsApp
            </button>
          </div>
        </div>

        <div className="stats-cards">
          <StatCard
            icon={<DollarSign size={14} color="#485eb0" />}
            title="Total Sales"
            value={`₹ ${totalSales.toLocaleString("en-IN")}`}
          />
          <StatCard
            icon={<ArrowUpCircle size={14} color="#06B181" />}
            title="Total Received"
            value={`₹ ${totalReceived.toLocaleString("en-IN")}`}
            color="green"
          />
          <StatCard
            icon={<ArrowDownCircle size={14} color="#C33B3B" />}
            title="Outstanding"
            value={`₹ ${outstanding.toLocaleString("en-IN")}`}
            color="red"
          />
          <StatCard
            icon={<Calendar size={14} color="#C59242" />}
            title="Overdue"
            value={`₹ ${overdue.toLocaleString("en-IN")}`}
          />
          <StatCard
            icon={<CreditCard size={14} color="#485eb0" />}
            title="Credit Limit"
            value={`₹ ${selectedParty.creditLimit.toLocaleString("en-IN")}`}
          />
          <StatCard
            icon={<CreditCard size={14} color="#06B181" />}
            title="Remaining Credit"
            value={`₹ ${remainingCredit.toLocaleString("en-IN")}`}
            color="green"
          />
        </div>

        <div className="tabs">
          <button
            className={`tab ${activeTab === "transactions" ? "active" : ""}`}
            onClick={() => setActiveTab("transactions")}
          >
            Transactions
          </button>
          <button
            className={`tab ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={`tab ${activeTab === "ledger" ? "active" : ""}`}
            onClick={() => setActiveTab("ledger")}
          >
            Ledger (Statement)
          </button>
          <button
            className={`tab ${activeTab === "itemwise" ? "active" : ""}`}
            onClick={() => setActiveTab("itemwise")}
          >
            Item Wise Report
          </button>
        </div>

        {activeTab === "transactions" && (
          <>
            <div className="filter-bar">
              <div className="filter-left">
                <div className="search-wrapper">
                  <Search size={16} color="#525A6A" />
                  <input type="text" placeholder="Search Transactions" />
                </div>
                <select className="category-dropdown">
                  <option>All Types</option>
                  <option>Sales</option>
                  <option>Purchase</option>
                  <option>Payment In</option>
                  <option>Payment Out</option>
                  <option>Quotation</option>
                  <option>Credit Note</option>
                  <option>Debit Note</option>
                  <option>Purchase Return</option>
                  <option>Sales Return</option>
                </select>
                <select className="category-dropdown">
                  <option>All Status</option>
                  <option>Paid</option>
                  <option>Unpaid</option>
                  <option>Overdue</option>
                  <option>Cancelled</option>
                </select>
              </div>
              <div className="filter-right">
                <button
                  className="btn-tertiary"
                  onClick={() => alert("Export PDF (simulated)")}
                >
                  <Download size={14} /> PDF
                </button>
                <button
                  className="btn-tertiary"
                  onClick={() => alert("Export Excel (simulated)")}
                >
                  <FileSpreadsheet size={14} /> Excel
                </button>
                <button className="btn-tertiary" onClick={() => window.print()}>
                  <Printer size={14} /> Print
                </button>
                <button
                  className="btn-tertiary"
                  onClick={() => {
                    if (selectedParty.phone)
                      window.open(
                        `https://wa.me/91${selectedParty.phone}?text=Transactions%20for%20${selectedParty.name}`,
                        "_blank",
                      );
                  }}
                >
                  <MessageCircle size={14} color="#25D366" /> Share
                </button>
              </div>
            </div>
            <div className="table-container">
              <table className="parties-table">
                <thead>
                  <tr>
                    <th>Voucher</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Payment Mode</th>
                    <th>Credit</th>
                    <th>Debit</th>
                    <th>Balance</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((inv) => (
                    <tr key={inv.id}>
                      <td>{inv.id}</td>
                      <td>{inv.date}</td>
                      <td>Sales</td>
                      <td>Bank</td>
                      <td>₹ {inv.total.toFixed(2)}</td>
                      <td>-</td>
                      <td>₹ {inv.total.toFixed(2)}</td>
                      <td>
                        <span className="balance positive">Unpaid</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === "profile" && (
          <div className="profile-section">
            <h3>Profile</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input type="text" value={selectedParty.name} readOnly />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="text" value={selectedParty.phone} readOnly />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input type="text" value={selectedParty.email} readOnly />
              </div>
              <div className="form-group">
                <label>GSTIN</label>
                <input type="text" value={selectedParty.gstin} readOnly />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>PAN</label>
                <input type="text" value={selectedParty.pan} readOnly />
              </div>
              <div className="form-group">
                <label>Credit Period</label>
                <input
                  type="text"
                  value={selectedParty.creditPeriod + " days"}
                  readOnly
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Billing Address</label>
                <textarea
                  rows="2"
                  value={selectedParty.billingAddress}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Shipping Address</label>
                <textarea
                  rows="2"
                  value={selectedParty.shippingAddress}
                  readOnly
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Manager</label>
                <input type="text" value={selectedParty.manager} readOnly />
              </div>
            </div>
            <h4>Bank Accounts</h4>
            {selectedParty.bankAccounts.map((bank) => (
              <div key={bank.id} className="bank-item">
                <p>
                  <strong>{bank.bankName}</strong> - {bank.accountHolder} (
                  {bank.accountNumber})<br />
                  IFSC: {bank.ifsc}, Branch: {bank.branch}, UPI: {bank.upiId}
                </p>
                <div className="bank-actions">
                  <button
                    className="btn-icon-small"
                    onClick={() => {
                      setEditingBankAccountId(bank.id);
                      setBankAccountForm({
                        bankName: bank.bankName,
                        accountHolder: bank.accountHolder,
                        accountNumber: bank.accountNumber,
                        ifsc: bank.ifsc,
                        branch: bank.branch,
                        upiId: bank.upiId,
                      });
                      setShowBankAccountModal(true);
                    }}
                  >
                    <Edit size={14} color="#525A6A" />
                  </button>
                  <button
                    className="btn-icon-small"
                    onClick={() =>
                      handleDeleteBankAccount(selectedParty.id, bank.id)
                    }
                  >
                    <Trash2 size={14} color="#C33B3B" />
                  </button>
                </div>
              </div>
            ))}
            <button
              className="btn-primary"
              onClick={() => {
                setEditingBankAccountId(null);
                setBankAccountForm({
                  bankName: "",
                  accountHolder: "",
                  accountNumber: "",
                  ifsc: "",
                  branch: "",
                  upiId: "",
                });
                setShowBankAccountModal(true);
              }}
            >
              <Plus size={14} /> Add Bank Account
            </button>
          </div>
        )}

        {activeTab === "ledger" && (
          <div className="ledger-section">
            <h3>Ledger Statement</h3>
            <div className="stats-cards mini">
              <StatCard
                icon={<DollarSign size={14} color="#485eb0" />}
                title="Total Sale"
                value={`₹ ${totalSales.toLocaleString("en-IN")}`}
              />
              <StatCard
                icon={<ArrowUpCircle size={14} color="#06B181" />}
                title="Total Received"
                value={`₹ ${totalReceived.toLocaleString("en-IN")}`}
                color="green"
              />
              <StatCard
                icon={<ArrowDownCircle size={14} color="#C33B3B" />}
                title="Outstanding"
                value={`₹ ${outstanding.toLocaleString("en-IN")}`}
                color="red"
              />
              <StatCard
                icon={<Calendar size={14} color="#C59242" />}
                title="Overdue"
                value={`₹ ${overdue.toLocaleString("en-IN")}`}
              />
            </div>
            <table className="parties-table">
              <thead>
                <tr>
                  <th>Voucher</th>
                  <th>Date</th>
                  <th>Payment Mode</th>
                  <th>Credit</th>
                  <th>Debit</th>
                  <th>Balance</th>
                  <th>Outstanding</th>
                  <th>Overdue Days</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((inv) => (
                  <tr key={inv.id}>
                    <td>{inv.id}</td>
                    <td>{inv.date}</td>
                    <td>Bank</td>
                    <td>₹ {inv.total.toFixed(2)}</td>
                    <td>-</td>
                    <td>₹ {inv.total.toFixed(2)}</td>
                    <td>₹ {inv.total.toFixed(2)}</td>
                    <td>0</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "itemwise" && (
          <div className="itemwise-section">
            <h3>Item Wise Report</h3>
            <table className="parties-table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Item Code</th>
                  <th>QR</th>
                  <th>Category</th>
                  <th>Purchase Qty</th>
                  <th>Purchase Amt</th>
                  <th>Sales Qty</th>
                  <th>Sales Amt</th>
                  <th>Profit</th>
                  <th>GST%</th>
                  <th>HSN</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.code}</td>
                    <td>
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=${encodeURIComponent(`${item.name}|${item.code}|${item.price}`)}`}
                        alt="QR"
                        style={{ width: 40, height: 40 }}
                      />
                    </td>
                    <td>{item.category}</td>
                    <td>0</td>
                    <td>₹0</td>
                    <td>0</td>
                    <td>₹0</td>
                    <td>₹0</td>
                    <td>{item.gst}%</td>
                    <td>{item.hsn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  const renderReportsContent = () => {
    return (
      <div>
        <h2>Reports</h2>
        <div className="filter-bar">
          <div className="filter-left">
            <select
              className="category-dropdown"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="outstanding">Ageing Report</option>
              <option value="itemwise">Item-wise Report</option>
            </select>
          </div>
          <div className="filter-right">
            <button className="btn-tertiary">
              <Download size={14} /> Export Excel
            </button>
          </div>
        </div>

        {reportType === "outstanding" && (
          <div>
            <h3>Ageing Report</h3>
            <table className="parties-table">
              <thead>
                <tr>
                  <th>Party Name</th>
                  <th>Not yet due</th>
                  <th>By Tomorrow</th>
                  <th>Upcoming</th>
                  <th>T. Due</th>
                  <th>1-15 Days</th>
                  <th>16-30 Days</th>
                  <th>30+ Days</th>
                  <th>T. Overdue</th>
                  <th>T. Amount</th>
                </tr>
              </thead>
              <tbody>
                {parties
                  .filter((p) => p.balance > 0)
                  .map((p) => (
                    <tr key={p.id}>
                      <td>{p.name}</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                      <td>₹ {p.balance.toFixed(2)}</td>
                      <td>₹ {p.balance.toFixed(2)}</td>
                      <td>₹ {p.balance.toFixed(2)}</td>
                    </tr>
                  ))}
                <tr style={{ fontWeight: "bold" }}>
                  <td>Total</td>
                  <td>₹ 0</td>
                  <td>₹ 0</td>
                  <td>₹ 0</td>
                  <td>₹ 0</td>
                  <td>₹ 0</td>
                  <td>₹ 0</td>
                  <td>
                    ₹{" "}
                    {parties
                      .filter((p) => p.balance > 0)
                      .reduce((sum, p) => sum + p.balance, 0)
                      .toFixed(2)}
                  </td>
                  <td>
                    ₹{" "}
                    {parties
                      .filter((p) => p.balance > 0)
                      .reduce((sum, p) => sum + p.balance, 0)
                      .toFixed(2)}
                  </td>
                  <td>
                    ₹{" "}
                    {parties
                      .filter((p) => p.balance > 0)
                      .reduce((sum, p) => sum + p.balance, 0)
                      .toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {reportType === "itemwise" && (
          <div>
            <h3>Item-wise Report</h3>
            <table className="parties-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Code</th>
                  <th>QR</th>
                  <th>Category</th>
                  <th>Purchase Qty</th>
                  <th>Sold Qty</th>
                  <th>Stock</th>
                  <th>Purchase Amt</th>
                  <th>Sales Amt</th>
                  <th>Profit</th>
                  <th>GST%</th>
                  <th>HSN</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.code}</td>
                    <td>
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=${encodeURIComponent(`${item.name}|${item.code}|${item.price}`)}`}
                        alt="QR"
                        style={{ width: 40, height: 40 }}
                      />
                    </td>
                    <td>{item.category}</td>
                    <td>0</td>
                    <td>0</td>
                    <td>{item.stock}</td>
                    <td>₹0</td>
                    <td>₹0</td>
                    <td>₹0</td>
                    <td>{item.gst}%</td>
                    <td>{item.hsn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  // ----- SUB-COMPONENTS -----
  const NavOption = ({
    icon,
    label,
    active,
    chevron,
    tag,
    subOptions,
    onClick,
  }) => {
    const [expanded, setExpanded] = useState(
      !!subOptions?.some((s) => s.active),
    );
    const hasSubOptions = subOptions && subOptions.length > 0;
    return (
      <div className={`nav-option ${active ? "active" : ""}`}>
        <div
          className={`nav-option-main ${hasSubOptions ? "has-sub" : ""}`}
          onClick={() => {
            if (onClick) onClick();
            if (hasSubOptions) setExpanded(!expanded);
          }}
        >
          <div className="nav-option-left">
            {icon}
            <span className="nav-option-label">{label}</span>
          </div>
          <div className="nav-option-right">
            {tag && <span className="tag-new">{tag}</span>}
            {chevron && <ChevronRight size={16} color="#A3A9B6" />}
            {hasSubOptions && (
              <ChevronRight
                size={16}
                color="#E0E2E7"
                className={`sub-chevron ${expanded ? "expanded" : ""}`}
              />
            )}
          </div>
        </div>
        {hasSubOptions && expanded && (
          <div className="nav-sub-options">
            {subOptions.map((sub, idx) => (
              <div
                key={idx}
                className={`nav-sub-option ${sub.active ? "active" : ""}`}
                onClick={() => {
                  if (sub.onClick) sub.onClick();
                }}
              >
                <div className="nav-option-left">
                  {sub.icon}
                  <span className="nav-option-label">{sub.label}</span>
                </div>
                {sub.tag && <span className="tag-new">{sub.tag}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const StatCard = ({ icon, title, value, color, onClick }) => {
    const colorClass =
      color === "green" ? "stat-green" : color === "red" ? "stat-red" : "";
    return (
      <div className="stat-card" onClick={onClick}>
        <div className="stat-header">
          {icon}
          <span className={`stat-title ${colorClass}`}>{title}</span>
        </div>
        <div className="stat-value">{value}</div>
      </div>
    );
  };

  // Bank Account Modal
  const renderBankAccountModal = () => {
    if (!showBankAccountModal) return null;
    return (
      <div
        className="modal-overlay"
        onClick={() => setShowBankAccountModal(false)}
      >
        <div
          className="modal-content-wrapper"
          onClick={(e) => e.stopPropagation()}
          style={{ maxWidth: "500px" }}
        >
          <div className="modal-header">
            <h2>
              {editingBankAccountId ? "Edit Bank Account" : "Add Bank Account"}
            </h2>
            <button
              className="btn-icon"
              onClick={() => setShowBankAccountModal(false)}
            >
              <X size={20} color="#858D9D" />
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Bank Name</label>
              <input
                type="text"
                placeholder="Enter bank name"
                value={bankAccountForm.bankName}
                onChange={(e) =>
                  setBankAccountForm({
                    ...bankAccountForm,
                    bankName: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Account Holder Name</label>
              <input
                type="text"
                placeholder="Enter account holder name"
                value={bankAccountForm.accountHolder}
                onChange={(e) =>
                  setBankAccountForm({
                    ...bankAccountForm,
                    accountHolder: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Account Number</label>
              <input
                type="text"
                placeholder="Enter account number"
                value={bankAccountForm.accountNumber}
                onChange={(e) =>
                  setBankAccountForm({
                    ...bankAccountForm,
                    accountNumber: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>IFSC Code</label>
              <input
                type="text"
                placeholder="Enter IFSC code"
                value={bankAccountForm.ifsc}
                onChange={(e) =>
                  setBankAccountForm({
                    ...bankAccountForm,
                    ifsc: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Branch</label>
              <input
                type="text"
                placeholder="Enter branch"
                value={bankAccountForm.branch}
                onChange={(e) =>
                  setBankAccountForm({
                    ...bankAccountForm,
                    branch: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>UPI ID</label>
              <input
                type="text"
                placeholder="Enter UPI ID"
                value={bankAccountForm.upiId}
                onChange={(e) =>
                  setBankAccountForm({
                    ...bankAccountForm,
                    upiId: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn-secondary"
              onClick={() => setShowBankAccountModal(false)}
            >
              Cancel
            </button>
            <button
              className="btn-primary-solid"
              onClick={() => {
                if (
                  !bankAccountForm.bankName ||
                  !bankAccountForm.accountHolder ||
                  !bankAccountForm.accountNumber
                ) {
                  alert(
                    "Bank Name, Account Holder and Account Number are required.",
                  );
                  return;
                }
                if (editingBankAccountId) {
                  handleEditBankAccount(
                    selectedParty.id,
                    editingBankAccountId,
                    bankAccountForm,
                  );
                } else {
                  handleAddBankAccount(selectedParty.id, bankAccountForm);
                }
              }}
            >
              {editingBankAccountId ? "Update" : "Add"} Bank Account
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ----- MAIN RENDER -----
  return (
    <div className="parties-workspace">
      <aside className="left-nav">
        <div className="profile-container">
          <div className="left-nav-avatar">
            <img
              src="https://storage.googleapis.com/prod-flobooks/uploads/document/document/a129ebc6-d2e3-4cae-acc8-8fdd70cf27b2/thumb_WhatsApp_Image_2026-02-21_at_12.28.32_PM.jpeg"
              alt="Company Logo"
              height={30}
              width={30}
              className="company-logo"
            />
            <div className="left-nav-avatar-body-text">
              <div className="company-name">
                DUSHYANT FURNITURE MART AND POWER TOOLS
              </div>
              <div className="company-phone">9244526432</div>
            </div>
            <div className="left-nav-avatar-action">
              <Settings size={16} color="#F0F1F3" />
            </div>
          </div>
          <div className="quick-action-btn">
            <div className="quick-action-content">
              <Plus size={16} color="#292D35" />
              <span className="quick-action-label">Create Sales Invoice</span>
            </div>
            <ChevronDown size={20} color="#292D35" />
          </div>
        </div>
        <nav className="left-nav-body">
          <div className="nav-section-title">General</div>
          <div className="nav-options">
            <NavOption
              icon={<Users size={16} color="#E0E2E7" />}
              label="Parties"
              active={activeSection === "parties" || selectedPartyId !== null}
              onClick={() => {
                setSelectedPartyId(null);
                setActiveSection("parties");
              }}
              subOptions={[
                {
                  icon: <Users size={16} color="#E0E2E7" />,
                  label: "All Parties",
                  active: activeSection === "parties" && !selectedPartyId,
                  onClick: () => {
                    setSelectedPartyId(null);
                    setActiveSection("parties");
                  },
                },
                {
                  icon: <BookOpen size={16} color="#A3A9B6" />,
                  label: "SharedLedger",
                  tag: "New",
                  onClick: () => alert("SharedLedger Portal"),
                },
              ]}
            />
          </div>
        </nav>
        <div className="left-nav-footer">
          <NavOption
            icon={<Settings size={16} color="#858D9D" />}
            label="settings"
          />
          <img
            src="https://mybillbook.in/app/assets/images/secure-safe-v2.svg"
            alt="Secure ISO Certified"
            className="secure-badge"
          />
        </div>
      </aside>
      <main className="main-content">
        {renderContent()}
        {renderBankAccountModal()}
      </main>
    </div>
  );
};

// ----- STYLES (same as before) -----
const styles = `
/* ─── RESET & BASE ─── */
* { box-sizing: border-box; margin: 0; padding: 0; }
.parties-workspace { display: flex; min-height: 100vh; background: #f8f9fc; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #292D35; }
/* ─── SCROLLBAR ─── */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 3px; }
::-webkit-scrollbar-thumb { background: #c1c7cd; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #a0a7af; }
/* ─── LEFT NAV ─── */
.left-nav { width: 260px; min-height: 100vh; background: #1e1f26; display: flex; flex-direction: column; padding: 16px 12px; flex-shrink: 0; overflow-y: auto; position: sticky; top: 0; height: 100vh; border-right: 1px solid #2c2d35; }
.profile-container { display: flex; flex-direction: column; gap: 8px; padding-bottom: 16px; border-bottom: 1px solid #2c2d35; margin-bottom: 8px; }
.left-nav-avatar { display: flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 8px; background: #2a2b33; cursor: pointer; transition: background 0.2s; }
.left-nav-avatar:hover { background: #33343d; }
.company-logo { border-radius: 6px; object-fit: cover; flex-shrink: 0; }
.left-nav-avatar-body-text { flex: 1; display: flex; flex-direction: column; min-width: 0; }
.company-name { font-size: 14px; font-weight: 500; color: #f0f1f3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.company-phone { font-size: 12px; color: #858d9d; }
.left-nav-avatar-action { display: flex; align-items: center; justify-content: center; flex-shrink: 0; padding: 4px; border-radius: 4px; cursor: pointer; transition: background 0.2s; }
.left-nav-avatar-action:hover { background: #3d3e48; }
.quick-action-btn { display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: #2a2b33; border-radius: 8px; cursor: pointer; transition: background 0.2s; }
.quick-action-btn:hover { background: #33343d; }
.quick-action-content { display: flex; align-items: center; gap: 4px; flex: 1; }
.quick-action-label { font-size: 12px; font-weight: 500; color: #f0f1f3; }
.feature-pricing { padding: 6px 12px; margin-bottom: 8px; }
.feature-pricing-link { display: flex; align-items: center; gap: 10px; text-decoration: none; color: inherit; width: 100%; }
.feature-pricing-text { display: flex; align-items: center; justify-content: space-between; flex: 1; font-size: 12px; color: #858d9d; }
.tag-new { font-size: 10px; font-weight: 600; background: #f97316; color: #fff; padding: 2px 8px; border-radius: 12px; text-transform: uppercase; letter-spacing: 0.3px; }
.left-nav-body { flex: 1; display: flex; flex-direction: column; gap: 4px; padding: 8px 0; overflow-y: auto; }
.nav-section-title { font-size: 10px; font-weight: 600; text-transform: uppercase; color: #858d9d; padding: 8px 12px 4px; letter-spacing: 0.5px; }
.nav-options { display: flex; flex-direction: column; gap: 2px; }
.nav-option { border-radius: 6px; transition: background 0.15s; }
.nav-option:hover:not(.active) { background: #2a2b33; }
.nav-option.active { background: #2a2b33; }
.nav-option-main { display: flex; align-items: center; justify-content: space-between; padding: 6px 12px; cursor: pointer; border-radius: 6px; }
.nav-option-main.has-sub { cursor: pointer; }
.nav-option-left { display: flex; align-items: center; gap: 8px; min-width: 0; }
.nav-option-label { font-size: 14px; color: #858d9d; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.nav-option.active .nav-option-label { color: #f0f1f3; font-weight: 500; }
.nav-option-right { display: flex; align-items: center; gap: 4px; flex-shrink: 0; }
.sub-chevron { transition: transform 0.25s ease; }
.sub-chevron.expanded { transform: rotate(90deg); }
.nav-sub-options { display: flex; flex-direction: column; gap: 1px; padding-left: 28px; margin-top: 2px; }
.nav-sub-option { display: flex; align-items: center; justify-content: space-between; padding: 6px 12px; border-radius: 6px; cursor: pointer; transition: background 0.15s; }
.nav-sub-option:hover { background: #25262e; }
.nav-sub-option.active { background: #25262e; }
.nav-sub-option.active .nav-option-label { color: #f0f1f3; font-weight: 500; }
.nav-sub-option .nav-option-label { font-size: 14px; color: #858d9d; }
.left-nav-footer { display: flex; flex-direction: column; gap: 12px; padding-top: 12px; border-top: 1px solid #2c2d35; margin-top: auto; }
.secure-badge { align-self: center; max-width: 140px; height: auto; opacity: 0.7; }

/* ─── MAIN CONTENT ─── */
.main-content { flex: 1; padding: 20px 24px 32px; overflow-x: auto; min-width: 0; }
.page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; flex-wrap: wrap; gap: 12px; }
.page-title { font-size: 20px; font-weight: 600; color: #1a1d24; }
.header-actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.btn-tertiary { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; background: transparent; border: 1px solid #d0d5dd; border-radius: 6px; font-size: 14px; font-weight: 500; color: #344054; cursor: pointer; transition: all 0.2s; font-family: inherit; white-space: nowrap; }
.btn-tertiary:hover { background: #f0f2f5; border-color: #b0b8c4; }
.btn-tertiary svg { flex-shrink: 0; }
.btn-icon { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border: none; background: transparent; border-radius: 6px; cursor: pointer; transition: background 0.2s; color: inherit; }
.btn-icon:hover { background: #f0f2f5; }
.btn-icon-small { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border: none; background: transparent; border-radius: 4px; cursor: pointer; transition: background 0.2s; color: inherit; }
.btn-icon-small:hover { background: #f0f2f5; }
.btn-link-small { background: none; border: none; color: #4c3cce; font-size: 13px; cursor: pointer; text-decoration: underline; }
.referral-banner { display: flex; align-items: center; justify-content: space-between; background: #e7f4fd; border-radius: 12px; padding: 12px 20px; margin-bottom: 16px; flex-wrap: wrap; gap: 12px; }
.referral-banner-content { display: flex; align-items: center; gap: 16px; flex: 1; min-width: 200px; }
.referral-banner-img { height: 40px; width: auto; }
.referral-banner-text { display: flex; flex-direction: column; }
.referral-title { font-size: 18px; font-weight: 600; color: #1a1d24; }
.referral-desc { font-size: 12px; color: #475467; }
.referral-banner-actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
.stats-cards { display: flex; gap: 16px; margin-bottom: 16px; flex-wrap: wrap; }
.stat-card { flex: 1; min-width: 140px; background: #fff; border-radius: 10px; padding: 14px 18px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); border: 1px solid #eaeef2; transition: box-shadow 0.2s; cursor: pointer; }
.stat-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
.stat-header { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
.stat-title { font-size: 14px; font-weight: 500; color: #475467; }
.stat-title.stat-green { color: #06B181; }
.stat-title.stat-red { color: #C33B3B; }
.stat-value { font-size: 20px; font-weight: 600; color: #1a1d24; }
.filter-bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
.filter-left { display: flex; align-items: center; gap: 12px; flex: 1; min-width: 200px; flex-wrap: wrap; }
.search-wrapper { display: flex; align-items: center; gap: 8px; background: #fff; border: 1px solid #d0d5dd; border-radius: 8px; padding: 0 12px; flex: 1; min-width: 180px; transition: border-color 0.2s; }
.search-wrapper:focus-within { border-color: #4c3cce; }
.search-wrapper input { border: none; outline: none; padding: 8px 0; font-size: 14px; color: #1a1d24; background: transparent; width: 100%; font-family: inherit; }
.search-wrapper input::placeholder { color: #9aa4b2; }
.category-dropdown { padding: 8px 14px; border: 1px solid #d0d5dd; border-radius: 8px; background: #fff; font-size: 14px; color: #1a1d24; cursor: pointer; font-family: inherit; min-width: 150px; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%23667085' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; padding-right: 36px; }
.category-dropdown:focus { border-color: #4c3cce; outline: none; }
.filter-right { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.btn-primary { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; background: #fff; border: 1px solid #d0d5dd; border-radius: 8px; font-size: 14px; font-weight: 500; color: #1a1d24; cursor: pointer; transition: all 0.2s; font-family: inherit; white-space: nowrap; }
.btn-primary:hover { background: #f0f2f5; border-color: #b0b8c4; }
.btn-primary-small { display: inline-flex; align-items: center; gap: 4px; padding: 4px 12px; background: #4c3cce; color: #fff; border: none; border-radius: 4px; font-size: 12px; cursor: pointer; transition: background 0.2s; }
.btn-primary-small:hover { background: #3a2cb0; }
.btn-primary-solid { padding: 8px 24px; background: #4c3cce; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; color: #fff; cursor: pointer; font-family: inherit; transition: background 0.2s; }
.btn-primary-solid:hover { background: #3a2cb0; }
.dropdown-trigger { cursor: pointer; }
.table-container { background: #fff; border-radius: 12px; border: 1px solid #eaeef2; overflow-x: auto; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
.parties-table { width: 100%; border-collapse: collapse; font-size: 14px; min-width: 640px; }
.parties-table thead { background: #f9fafb; border-bottom: 1px solid #eaeef2; }
.parties-table th { padding: 12px 16px; text-align: left; font-weight: 600; color: #475467; font-size: 14px; white-space: nowrap; }
.parties-table td { padding: 12px 16px; border-bottom: 1px solid #f0f2f5; color: #1a1d24; vertical-align: middle; }
.parties-table tbody tr { transition: background 0.15s; cursor: pointer; }
.parties-table tbody tr:hover { background: #f8f9fc; }
.parties-table tbody tr:last-child td { border-bottom: none; }
.balance { display: inline-flex; align-items: center; gap: 4px; font-weight: 500; }
.balance.positive { color: #06B181; }
.balance.negative { color: #C33B3B; }
.rotate-180 { transform: rotate(180deg); }
.whatsapp-icon { margin-left: 6px; cursor: pointer; opacity: 0.7; transition: opacity 0.2s; vertical-align: middle; }
.whatsapp-icon:hover { opacity: 1; }
.bulk-upload-banner { display: flex; align-items: center; gap: 20px; background: linear-gradient(90deg, #d2dffb, #f8fafe); border-radius: 12px; padding: 16px 24px; flex-wrap: wrap; }
.bulk-upload-img { height: 56px; width: auto; }
.bulk-upload-text { display: flex; flex-direction: column; flex: 1; }
.bulk-upload-title { font-size: 18px; font-weight: 600; color: #1a1d24; }
.bulk-upload-desc { font-size: 12px; color: #475467; }
.bulk-upload-btn { flex-shrink: 0; }

/* ─── MODAL ─── */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.45); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; backdrop-filter: blur(2px); animation: fadeIn 0.2s ease; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.modal-content-wrapper { background: #fff; border-radius: 16px; max-width: 720px; width: 100%; max-height: 90vh; display: flex; flex-direction: column; box-shadow: 0 20px 60px rgba(0,0,0,0.2); animation: slideUp 0.25s ease; }
.modal-content-wrapper.modal-lg { max-width: 1000px; }
@keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
.modal-header { display: flex; align-items: center; justify-content: space-between; padding: 18px 24px 14px; border-bottom: 1px solid #eaeef2; flex-shrink: 0; }
.modal-header h2 { font-size: 20px; font-weight: 600; color: #1a1d24; }
.modal-body { padding: 20px 24px; overflow-y: auto; flex: 1; }
.create-party-form { display: flex; flex-direction: column; gap: 20px; }
.form-section { display: flex; flex-direction: column; gap: 12px; }
.form-section-title { font-size: 14px; font-weight: 600; color: #1a1d24; margin-bottom: 4px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
@media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } }
.form-group { display: flex; flex-direction: column; gap: 4px; }
.form-group label { font-size: 13px; font-weight: 500; color: #475467; }
.form-group .required { color: #e53e3e; }
.form-group input, .form-group select, .form-group textarea { padding: 8px 12px; border: 1px solid #d0d5dd; border-radius: 8px; font-size: 14px; font-family: inherit; color: #1a1d24; background: #fff; transition: border-color 0.2s; width: 100%; }
.form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: #4c3cce; outline: none; box-shadow: 0 0 0 3px rgba(76,60,206,0.1); }
.opening-balance-group { display: flex; gap: 8px; }
.opening-balance-group input { flex: 1; }
.opening-balance-group select { width: auto; min-width: 110px; flex-shrink: 0; }
.btn-link { background: none; border: none; color: #4c3cce; font-size: 14px; font-weight: 500; cursor: pointer; padding: 4px 0; font-family: inherit; text-decoration: underline; text-underline-offset: 2px; }
.btn-link:hover { color: #3a2cb0; }
.modal-footer { display: flex; align-items: center; justify-content: flex-end; gap: 12px; padding: 16px 24px 20px; border-top: 1px solid #eaeef2; flex-shrink: 0; }
.btn-secondary { padding: 8px 20px; background: transparent; border: 1px solid #d0d5dd; border-radius: 8px; font-size: 14px; font-weight: 500; color: #475467; cursor: pointer; font-family: inherit; transition: all 0.2s; }
.btn-secondary:hover { background: #f0f2f5; }

/* Invoice specific styles */
.invoice-auto-sms { background: #e7f4fd; padding: 8px 12px; border-radius: 6px; margin-bottom: 12px; font-size: 14px; display: flex; align-items: center; gap: 8px; }
.invoice-auto-sms small { font-size: 12px; color: #475467; }
.bill-ship-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 16px; }
.bill-to, .ship-to { border: 1px solid #eaeef2; padding: 12px; border-radius: 8px; }
.party-selector { display: flex; gap: 8px; align-items: center; margin-bottom: 8px; }
.party-address { background: #f9fafb; padding: 8px; border-radius: 4px; margin-top: 6px; }
.invoice-details-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; margin-bottom: 16px; }
.place-of-supply { margin-bottom: 16px; }
.place-of-supply select { width: 100%; max-width: 300px; }
.invoice-items-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.invoice-items-table-wrap { max-height: 300px; overflow-y: auto; border: 1px solid #eaeef2; border-radius: 8px; }
.invoice-items-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.invoice-items-table th { background: #f9fafb; padding: 6px 8px; text-align: left; font-weight: 600; font-size: 12px; white-space: nowrap; }
.invoice-items-table td { padding: 4px 8px; border-top: 1px solid #f0f2f5; vertical-align: middle; }
.invoice-items-table td input { border: none; background: transparent; width: 100%; padding: 4px; font-size: 13px; }
.invoice-items-table td input:focus { outline: none; border-bottom: 1px solid #4c3cce; }
.invoice-add-buttons { display: flex; gap: 16px; flex-wrap: wrap; margin-top: 8px; }
.totals-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 16px; }
.totals-right { background: #f9fafb; padding: 12px; border-radius: 8px; }
.total-line { display: flex; justify-content: space-between; padding: 4px 0; font-size: 14px; }
.total-line.grand-total { font-weight: 700; font-size: 16px; border-top: 2px solid #d0d5dd; padding-top: 8px; margin-top: 4px; }
.payment-qr { display: flex; gap: 12px; margin-top: 12px; }
.terms-section textarea { width: 100%; min-height: 100px; }
.authorized-signatory { margin-top: 12px; display: flex; align-items: center; gap: 12px; }
.bank-account-select { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }

/* Party Details */
.party-details .profile-section { margin-top: 20px; border-top: 1px solid #eaeef2; padding-top: 20px; }
.party-details .profile-section h3 { margin-bottom: 12px; }
.party-details .profile-section .bank-item { border: 1px solid #eaeef2; padding: 8px 12px; border-radius: 6px; margin-bottom: 6px; background: #f9fafb; display: flex; justify-content: space-between; align-items: center; }
.party-details .profile-section .bank-actions { display: flex; gap: 4px; }
.ledger-section { margin-top: 20px; border-top: 1px solid #eaeef2; padding-top: 20px; }
.ledger-section .stats-cards.mini .stat-card { min-width: 120px; padding: 10px 14px; }
.tabs { display: flex; gap: 8px; margin-bottom: 16px; border-bottom: 1px solid #eaeef2; }
.tab { padding: 8px 16px; background: transparent; border: none; cursor: pointer; font-weight: 500; color: #475467; }
.tab.active { color: #4c3cce; border-bottom: 2px solid #4c3cce; }
.tab:hover { background: #f0f2f5; }

/* Invoice Preview */
.invoice-preview-body { padding: 20px; background: #fff; }
.invoice-logo-section { display: flex; align-items: center; gap: 16px; margin-bottom: 20px; }
.invoice-logo { max-height: 80px; object-fit: contain; }
.invoice-logo-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100px; height: 80px; border: 2px dashed #ccc; border-radius: 8px; color: #ccc; }
.invoice-header { text-align: center; margin-bottom: 20px; }
.invoice-header h1 { font-size: 28px; font-weight: 700; margin-bottom: 4px; }
.invoice-party { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
.invoice-party strong { display: block; margin-bottom: 4px; }
.invoice-notes { margin-top: 16px; padding: 12px; background: #f9fafb; border-radius: 6px; }

/* Responsive */
@media (max-width: 992px) {
  .left-nav { width: 72px; padding: 12px 8px; }
  .left-nav .company-name, .left-nav .company-phone, .left-nav .quick-action-label, .left-nav .nav-option-label, .left-nav .nav-section-title, .left-nav .feature-pricing-text, .left-nav .tag-new, .left-nav .secure-badge { display: none; }
  .left-nav .left-nav-avatar { justify-content: center; padding: 8px; }
  .left-nav .left-nav-avatar-body-text { display: none; }
  .left-nav .quick-action-btn { justify-content: center; padding: 8px; }
  .left-nav .quick-action-content { gap: 0; }
  .left-nav .nav-option-main { justify-content: center; padding: 8px; }
  .left-nav .nav-option-left { gap: 0; }
  .left-nav .nav-option-right { display: none; }
  .left-nav .nav-sub-options { display: none !important; }
  .left-nav .feature-pricing { display: none; }
  .left-nav .left-nav-footer .secure-badge { display: none; }
  .main-content { padding: 16px; }
  .stats-cards .stat-card { min-width: 100px; padding: 12px 14px; }
  .stat-value { font-size: 17px; }
  .bill-ship-row { grid-template-columns: 1fr; }
  .totals-row { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .left-nav { width: 56px; padding: 8px 4px; }
  .main-content { padding: 12px; }
  .page-header { flex-direction: column; align-items: stretch; }
  .header-actions { flex-wrap: wrap; justify-content: flex-start; }
  .filter-bar { flex-direction: column; align-items: stretch; }
  .filter-left { flex-direction: column; }
  .search-wrapper { min-width: auto; }
  .filter-right { justify-content: stretch; }
  .filter-right .btn-primary { flex: 1; justify-content: center; }
  .stats-cards { flex-direction: column; }
  .referral-banner { flex-direction: column; align-items: flex-start; }
  .referral-banner-actions { width: 100%; justify-content: flex-start; }
  .bulk-upload-banner { flex-direction: column; align-items: flex-start; padding: 16px; }
  .bulk-upload-btn { width: 100%; justify-content: center; }
  .modal-content-wrapper { max-width: 100%; margin: 10px; max-height: 95vh; }
  .modal-body { padding: 16px; }
  .modal-header { padding: 16px; }
  .modal-footer { padding: 12px 16px 16px; flex-wrap: wrap; }
  .modal-footer button { flex: 1; justify-content: center; }
  .tabs { flex-wrap: wrap; }
  .tab { flex: 1; text-align: center; }
  .invoice-details-grid { grid-template-columns: 1fr; }
  .invoice-items-table { font-size: 12px; }
  .invoice-items-table th, .invoice-items-table td { padding: 4px; }
}
`;

// Inject styles
if (typeof document !== "undefined") {
  const styleTag = document.createElement("style");
  styleTag.textContent = styles;
  document.head.appendChild(styleTag);
}

export default PartiesWorkspace;
