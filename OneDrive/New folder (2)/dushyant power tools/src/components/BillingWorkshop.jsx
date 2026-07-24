

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  FileText,
  Plus,
  Download,
  Search,
  Package,
  IndianRupee,
  Clock,
  CheckCircle,
  X,
  User,
  Calendar,
  DollarSign,
  Percent,
  ShoppingBag,
  Trash2,
  Save,
  UploadCloud,
  Settings,
  Scan,
  Tag,
  Box,
  Truck,
  Printer,
  Eye,
  Edit,
  Palette,
  Building2,
  Globe,
  Phone,
  Mail,
  MapPin,
  Image,
  Moon,
  Sun,
  Layout,
  Grid,
  List,
  ChevronDown,
  ChevronRight,
  ShoppingCart,
  Star,
  Camera,
  QrCode,
  PenTool,
  FileSignature,
  AlertCircle,
} from "lucide-react";
import { useReactToPrint } from "react-to-print";

const API = "/api";

// ----------------------------
// Helper: Format Currency
// ----------------------------
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
};

// ----------------------------
// 1. PARTY SELECTOR MODAL (with Add Party)
// ----------------------------
const PartySelector = ({ onSelect, onClose, showToast, token }) => {
  const [parties, setParties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newParty, setNewParty] = useState({
    name: "",
    phone: "",
    gst: "",
    address: "",
  });

  const fetchParties = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/parties`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setParties(data.data || []);
      } else {
        showToast("Failed to load parties");
      }
    } catch (err) {
      showToast("Error fetching parties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParties();
  }, []);

  const handleAddParty = async (e) => {
    e.preventDefault();
    if (!newParty.name.trim()) {
      showToast("Party name is required");
      return;
    }
    try {
      const res = await fetch(`${API}/parties`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newParty),
      });
      if (res.ok) {
        const data = await res.json();
        showToast("Party added successfully!");
        setNewParty({ name: "", phone: "", gst: "", address: "" });
        setShowAddForm(false);
        fetchParties(); // refresh list
        onSelect(data.data); // auto-select new party
      } else {
        const err = await res.json();
        showToast(err.message || "Failed to add party");
      }
    } catch (err) {
      showToast("Network error");
    }
  };

  const filtered = parties.filter(
    (p) =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone?.includes(searchTerm) ||
      p.gst?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div style={styles.modalOverlay}>
      <div style={{ ...styles.modalContent, maxWidth: "600px" }}>
        <div style={styles.modalHeader}>
          <h3 style={{ margin: 0 }}>Select Party</h3>
          <button onClick={onClose} style={styles.btnIcon}>
            <X size={24} />
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by name, phone, GST..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
        />

        <div style={{ marginTop: "8px", marginBottom: "12px" }}>
          <button
            style={{ ...styles.btnSecondary, width: "100%" }}
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? "− Hide Add Party" : "+ Add New Party"}
          </button>
        </div>

        {showAddForm && (
          <form
            onSubmit={handleAddParty}
            style={{
              padding: "12px",
              background: "#f8fafc",
              borderRadius: "8px",
              marginBottom: "12px",
            }}
          >
            <div style={styles.rowFields}>
              <div>
                <label style={styles.label}>Name*</label>
                <input
                  type="text"
                  value={newParty.name}
                  onChange={(e) =>
                    setNewParty({ ...newParty, name: e.target.value })
                  }
                  style={styles.input}
                  required
                />
              </div>
              <div>
                <label style={styles.label}>Phone</label>
                <input
                  type="text"
                  value={newParty.phone}
                  onChange={(e) =>
                    setNewParty({ ...newParty, phone: e.target.value })
                  }
                  style={styles.input}
                />
              </div>
            </div>
            <div style={styles.rowFields}>
              <div>
                <label style={styles.label}>GSTIN</label>
                <input
                  type="text"
                  value={newParty.gst}
                  onChange={(e) =>
                    setNewParty({ ...newParty, gst: e.target.value })
                  }
                  style={styles.input}
                />
              </div>
              <div>
                <label style={styles.label}>Address</label>
                <input
                  type="text"
                  value={newParty.address}
                  onChange={(e) =>
                    setNewParty({ ...newParty, address: e.target.value })
                  }
                  style={styles.input}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "8px",
                justifyContent: "flex-end",
                marginTop: "8px",
              }}
            >
              <button
                type="button"
                style={styles.btnSecondary}
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
              <button type="submit" style={styles.btnPrimary}>
                Add Party
              </button>
            </div>
          </form>
        )}

        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              Loading...
            </div>
          ) : filtered.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "20px",
                color: "#94a3b8",
              }}
            >
              <User size={48} style={{ marginBottom: "12px" }} />
              <p>No parties found. Add a new party using the button above.</p>
            </div>
          ) : (
            filtered.map((party) => (
              <div
                key={party._id}
                onClick={() => onSelect(party)}
                style={{
                  padding: "12px 16px",
                  borderBottom: "1px solid #e2e8f0",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#f1f5f9")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <div>
                  <div style={{ fontWeight: "600" }}>{party.name}</div>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>
                    {party.phone && `📞 ${party.phone}`}
                    {party.gst && ` | GST: ${party.gst}`}
                  </div>
                </div>
                <ChevronRight size={20} color="#94a3b8" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// ----------------------------
// 2. SIGNATURE UPLOADER
// ----------------------------
const SignatureUploader = ({ onSave, onClose, showToast }) => {
  const [signature, setSignature] = useState(null);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setSignature(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    setSignature(canvas.toDataURL());
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignature(null);
  };

  const handleSave = () => {
    if (signature) {
      onSave(signature);
      onClose();
      showToast("Signature added successfully!");
    } else {
      showToast("Please draw or upload a signature");
    }
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={{ ...styles.modalContent, maxWidth: "500px" }}>
        <div style={styles.modalHeader}>
          <h3 style={{ margin: 0 }}>Add Signature</h3>
          <button onClick={onClose} style={styles.btnIcon}>
            <X size={24} />
          </button>
        </div>
        <p style={{ fontSize: "14px", color: "#64748b" }}>
          Draw your signature below or upload an image.
        </p>
        <div
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <canvas
            ref={canvasRef}
            width={400}
            height={150}
            style={{ width: "100%", height: "150px", cursor: "crosshair" }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "12px",
            flexWrap: "wrap",
          }}
        >
          <button onClick={clearCanvas} style={styles.btnSecondary}>
            Clear
          </button>
          <label style={{ ...styles.btnSecondary, cursor: "pointer" }}>
            <UploadCloud size={16} /> Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
          </label>
        </div>
        {signature && (
          <div style={{ marginTop: "12px" }}>
            <p style={{ fontSize: "12px", color: "#64748b" }}>Preview:</p>
            <img
              src={signature}
              alt="Signature"
              style={{
                maxHeight: "60px",
                border: "1px solid #e2e8f0",
                borderRadius: "4px",
                padding: "4px",
              }}
            />
          </div>
        )}
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "flex-end",
            marginTop: "16px",
          }}
        >
          <button onClick={onClose} style={styles.btnSecondary}>
            Cancel
          </button>
          <button onClick={handleSave} style={styles.btnPrimary}>
            Save Signature
          </button>
        </div>
      </div>
    </div>
  );
};

// ----------------------------
// 3. BARCODE SCANNER MODAL
// ----------------------------
const BarcodeScanner = ({ onScan, onClose, showToast }) => {
  const [barcode, setBarcode] = useState("");

  const handleScan = () => {
    if (barcode.trim()) {
      onScan(barcode);
      onClose();
      showToast(`Barcode scanned: ${barcode}`);
    } else {
      showToast("Please enter a barcode");
    }
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={{ ...styles.modalContent, maxWidth: "450px" }}>
        <div style={styles.modalHeader}>
          <h3 style={{ margin: 0 }}>Scan Barcode</h3>
          <button onClick={onClose} style={styles.btnIcon}>
            <X size={24} />
          </button>
        </div>
        <div style={{ textAlign: "center", padding: "20px" }}>
          <div
            style={{
              background: "#f1f5f9",
              padding: "40px",
              borderRadius: "12px",
              border: "2px dashed #cbd5e1",
              marginBottom: "16px",
            }}
          >
            <QrCode size={64} color="#94a3b8" />
            <p style={{ marginTop: "8px", color: "#64748b" }}>
              Click "Start Scanner" to use camera, or enter manually.
            </p>
          </div>
          <div
            style={{ display: "flex", gap: "8px", justifyContent: "center" }}
          >
            <button
              onClick={() => showToast("📷 Camera scanner would open here.")}
              style={styles.btnPrimary}
            >
              <Camera size={16} /> Start Scanner
            </button>
          </div>
          <div style={{ marginTop: "16px" }}>
            <p style={{ fontSize: "13px", color: "#64748b" }}>
              Or enter manually:
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                placeholder="Enter barcode"
                style={{ ...styles.input, flex: 1 }}
              />
              <button onClick={handleScan} style={styles.btnPrimary}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ----------------------------
// 4. INVOICE PREVIEW (Enhanced)
// ----------------------------
const InvoicePreview = ({
  invoiceData,
  businessData,
  theme,
  paperSize,
  logo,
  settings,
}) => {
  const themeStyles = {
    compact: { fontSize: "12px", padding: "8px", border: "1px solid #ccc" },
    advanced: {
      fontSize: "14px",
      padding: "12px",
      border: "2px solid #2563eb",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    simple: { fontSize: "14px", padding: "12px", border: "1px solid #ddd" },
    classic: {
      fontSize: "14px",
      padding: "12px",
      border: "2px solid #000",
      fontFamily: "serif",
    },
    modern: {
      fontSize: "14px",
      padding: "16px",
      border: "none",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      borderRadius: "8px",
    },
    luxury: {
      fontSize: "14px",
      padding: "20px",
      border: "2px solid #d4af37",
      boxShadow: "0 8px 32px rgba(212, 175, 55, 0.2)",
      fontFamily: "Georgia, serif",
      background: "linear-gradient(to bottom, #faf8f0, #ffffff)",
    },
    stylish: {
      fontSize: "14px",
      padding: "16px",
      border: "1px solid #e0e0e0",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      borderRadius: "12px",
      background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
    },
  };

  const paperWidths = {
    2: "200px",
    3: "300px",
    4: "400px",
    5: "500px",
    6: "600px",
  };

  const items = invoiceData?.items || [];
  const total = invoiceData?.grandTotal || 0;
  const party = invoiceData?.party || {};
  const invoiceNumber = invoiceData?.invoiceNumber || "INV-001";
  const date = invoiceData?.date
    ? new Date(invoiceData.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

  return (
    <div
      style={{
        ...(themeStyles[theme] || themeStyles.compact),
        width: paperWidths[paperSize] || "100%",
        maxWidth: "100%",
        background: "#fff",
        margin: "0 auto",
        overflow: "auto",
      }}
    >
      <div style={{ padding: "12px" }}>
        {logo && (
          <img
            src={logo}
            alt="Logo"
            style={{ maxHeight: "50px", marginBottom: "8px", display: "block" }}
          />
        )}
        <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "700" }}>
          {businessData?.name || "Business Name"}
        </h2>
        <p style={{ margin: "4px 0", fontSize: "12px", color: "#666" }}>
          {businessData?.address || "Address Line"}
        </p>
        <p style={{ margin: "4px 0", fontSize: "12px", color: "#666" }}>
          GST: {businessData?.gst || "GSTIN"}
        </p>
        {settings?.showPhone && businessData?.phone && (
          <p style={{ margin: "4px 0", fontSize: "12px", color: "#666" }}>
            Phone: {businessData.phone}
          </p>
        )}
        <hr style={{ margin: "8px 0" }} />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "12px",
            marginBottom: "8px",
          }}
        >
          <div>
            <strong>Invoice No:</strong> {invoiceNumber}
          </div>
          <div>
            <strong>Date:</strong> {date}
            {settings?.showTime && (
              <span style={{ marginLeft: "8px" }}>
                {new Date().toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            )}
          </div>
        </div>
        <div style={{ fontSize: "12px", marginBottom: "4px" }}>
          <strong>P.O. No.:</strong> {invoiceData?.poNo || "—"}
        </div>
        <div style={{ fontSize: "12px", marginBottom: "4px" }}>
          <strong>E-way Bill No.:</strong> {invoiceData?.ewayBillNo || "—"}
        </div>
        <div style={{ fontSize: "12px", marginBottom: "8px" }}>
          <strong>Vehicle No.:</strong> {invoiceData?.vehicleNo || "—"}
        </div>

        <div style={{ fontSize: "12px", marginBottom: "8px" }}>
          <strong>Bill To:</strong> {party.name || "Party Name"}
          {settings?.showPartyBalance && (
            <span style={{ marginLeft: "16px" }}>
              Balance: ₹{invoiceData?.partyBalance || 0}
            </span>
          )}
          <div style={{ fontSize: "11px", color: "#666", marginTop: "2px" }}>
            {party.address && <div>{party.address}</div>}
            {party.phone && <div>Ph.: {party.phone}</div>}
            {party.gst && <div>GSTIN: {party.gst}</div>}
          </div>
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "12px",
            marginTop: "8px",
          }}
        >
          <thead>
            <tr
              style={{ borderBottom: "1px solid #ccc", background: "#f8f9fa" }}
            >
              <th style={{ textAlign: "left", padding: "6px" }}>#</th>
              <th style={{ textAlign: "left", padding: "6px" }}>Item</th>
              <th style={{ textAlign: "center", padding: "6px" }}>HSN</th>
              <th style={{ textAlign: "center", padding: "6px" }}>Qty</th>
              <th style={{ textAlign: "right", padding: "6px" }}>Rate</th>
              <th style={{ textAlign: "right", padding: "6px" }}>Disc %</th>
              <th style={{ textAlign: "right", padding: "6px" }}>Tax %</th>
              <th style={{ textAlign: "right", padding: "6px" }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "6px" }}>{idx + 1}</td>
                <td style={{ padding: "6px" }}>{item.name}</td>
                <td style={{ textAlign: "center", padding: "6px" }}>
                  {item.hsn || "—"}
                </td>
                <td style={{ textAlign: "center", padding: "6px" }}>
                  {item.qty}
                </td>
                <td style={{ textAlign: "right", padding: "6px" }}>
                  ₹{item.rate || item.price || 0}
                </td>
                <td style={{ textAlign: "right", padding: "6px" }}>
                  {item.discount || 0}%
                </td>
                <td style={{ textAlign: "right", padding: "6px" }}>
                  {item.tax || 0}%
                </td>
                <td style={{ textAlign: "right", padding: "6px" }}>
                  ₹{item.amount || 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: "8px", fontSize: "12px", textAlign: "right" }}>
          <div>
            <strong>Subtotal:</strong> ₹{invoiceData?.subtotal || 0}
          </div>
          <div>
            <strong>+ Additional Charges:</strong> ₹
            {invoiceData?.additionalCharges || 0}
          </div>
          <div>
            <strong>Taxable Amount:</strong> ₹{invoiceData?.taxableAmount || 0}
          </div>
          <div>
            <strong>Discount:</strong> ₹{invoiceData?.discount?.value || 0}
          </div>
          <div>
            <strong>TCS:</strong> ₹{invoiceData?.tcs || 0}
          </div>
          <div style={{ fontWeight: "bold", fontSize: "14px" }}>
            <strong>Total Amount:</strong> ₹{total.toFixed(2)}
          </div>
          <div>
            <strong>Amount Paid:</strong> ₹{invoiceData?.paidAmount || 0}
          </div>
          <div>
            <strong>Balance:</strong> ₹
            {(total - (invoiceData?.paidAmount || 0)).toFixed(2)}
          </div>
        </div>

        <div style={{ fontSize: "10px", marginTop: "12px", color: "#666" }}>
          <strong>Notes:</strong> {invoiceData?.notes || "—"}
        </div>
        <div style={{ fontSize: "10px", marginTop: "4px", color: "#666" }}>
          <strong>Terms:</strong> {invoiceData?.terms || "Standard terms apply"}
        </div>
      </div>
    </div>
  );
};

// ----------------------------
// 5. INVOICE CREATOR (Fully functional)
// ----------------------------
const InvoiceCreator = ({ type, onClose, onSave, showToast, token }) => {
  // ---- State ----
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    date: new Date().toISOString().split("T")[0],
    dueDate: "",
    paymentTerms: 30,
    poNo: "",
    ewayBillNo: "",
    vehicleNo: "",
    party: { name: "", id: "", gst: "", phone: "", address: "" },
    items: [],
    subtotal: 0,
    additionalCharges: 0,
    taxableAmount: 0,
    discount: { type: "percent", value: 0 },
    tcs: 0,
    autoRoundOff: true,
    grandTotal: 0,
    paidAmount: 0,
    paymentStatus: "pending",
    notes: "",
    terms: "Goods once sold will not be taken back or exchanged.",
    signature: "",
  });

  const [itemRows, setItemRows] = useState([
    {
      id: 1,
      name: "",
      hsn: "",
      qty: 1,
      price: 0,
      discount: 0,
      tax: 0,
      amount: 0,
    },
  ]);
  const [nextId, setNextId] = useState(2);
  const [showPartyModal, setShowPartyModal] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);

  // ---- Recalculate totals ----
  useEffect(() => {
    let subtotal = 0;
    itemRows.forEach((item) => {
      const qty = Number(item.qty) || 0;
      const price = Number(item.price) || 0;
      const discount = Number(item.discount) || 0;
      const tax = Number(item.tax) || 0;
      const total = qty * price;
      const discounted = total - (total * discount) / 100;
      const taxAmount = (discounted * tax) / 100;
      const final = discounted + taxAmount;
      item.amount = final;
      subtotal += final;
    });
    const additional = Number(formData.additionalCharges) || 0;
    const discountValue =
      formData.discount.type === "percent"
        ? (subtotal * formData.discount.value) / 100
        : Number(formData.discount.value) || 0;
    const taxable = subtotal + additional - discountValue;
    const tcsAmount = (taxable * (Number(formData.tcs) || 0)) / 100;
    const grandTotal = taxable + tcsAmount;
    const roundOff = formData.autoRoundOff
      ? Math.round(grandTotal) - grandTotal
      : 0;
    const finalGrand = grandTotal + roundOff;

    setFormData((prev) => ({
      ...prev,
      subtotal,
      taxableAmount: taxable,
      grandTotal: finalGrand,
    }));
  }, [
    itemRows,
    formData.additionalCharges,
    formData.discount,
    formData.tcs,
    formData.autoRoundOff,
  ]);

  // ---- Handlers ----
  const addItemRow = () => {
    setItemRows([
      ...itemRows,
      {
        id: nextId,
        name: "",
        hsn: "",
        qty: 1,
        price: 0,
        discount: 0,
        tax: 0,
        amount: 0,
      },
    ]);
    setNextId(nextId + 1);
  };

  const removeItemRow = (id) => {
    if (itemRows.length > 1) {
      setItemRows(itemRows.filter((row) => row.id !== id));
    }
  };

  const updateItemRow = (id, field, value) => {
    setItemRows(
      itemRows.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    );
  };

  const handlePartySelect = (party) => {
    setFormData((prev) => ({
      ...prev,
      party: {
        name: party.name,
        id: party._id,
        gst: party.gst,
        phone: party.phone,
        address: party.address,
      },
    }));
    setShowPartyModal(false);
  };

  const handleSignatureSave = (sig) => {
    setFormData((prev) => ({ ...prev, signature: sig }));
  };

  const handleBarcodeScan = (code) => {
    // Optionally fill item name or look up product
    showToast(`Barcode ${code} added to first item name`);
    if (itemRows.length > 0) {
      updateItemRow(itemRows[0].id, "name", code);
    }
  };

  // ---- Updated handleSubmit (shows invoice number in toast) ----
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.party.name) {
      showToast("Please select a party");
      return;
    }
    try {
      const payload = { ...formData, items: itemRows, type: type };
      const res = await fetch(`${API}/invoices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = await res.json();
        showToast(
          `✅ Invoice ${data.data?.invoiceNumber || "created"} successfully!`,
        );
        onSave(); // Refresh the list in parent
        onClose(); // Close modal
      } else {
        const err = await res.json();
        showToast(err.message || "Failed to create invoice");
      }
    } catch (err) {
      showToast("Network error");
    }
  };

  // Save & New: submit and then reset form
  const handleSaveAndNew = async (e) => {
    e.preventDefault();
    // First submit
    await handleSubmit(e);
    // Reset form for new invoice (but keep modal open)
    setFormData({
      invoiceNumber: "",
      date: new Date().toISOString().split("T")[0],
      dueDate: "",
      paymentTerms: 30,
      poNo: "",
      ewayBillNo: "",
      vehicleNo: "",
      party: { name: "", id: "", gst: "", phone: "", address: "" },
      items: [],
      subtotal: 0,
      additionalCharges: 0,
      taxableAmount: 0,
      discount: { type: "percent", value: 0 },
      tcs: 0,
      autoRoundOff: true,
      grandTotal: 0,
      paidAmount: 0,
      paymentStatus: "pending",
      notes: "",
      terms: "Goods once sold will not be taken back or exchanged.",
      signature: "",
    });
    setItemRows([
      {
        id: 1,
        name: "",
        hsn: "",
        qty: 1,
        price: 0,
        discount: 0,
        tax: 0,
        amount: 0,
      },
    ]);
    setNextId(2);
  };

  // ---- Render ----
  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <div style={styles.modalHeader}>
          <h2
            style={{
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <FileText size={24} /> Create{" "}
            {type.charAt(0).toUpperCase() + type.slice(1)} Invoice
          </h2>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <button
              style={styles.btnSecondary}
              onClick={() => showToast("Phone upload placeholder")}
            >
              <UploadCloud size={16} /> Upload via Phone
            </button>
            <button
              style={styles.btnIcon}
              onClick={() => showToast("Settings placeholder")}
            >
              <Settings size={20} />
            </button>
            <button style={styles.btnSecondary} onClick={handleSaveAndNew}>
              Save & New
            </button>
            <button type="submit" form="invoice-form" style={styles.btnPrimary}>
              Save
            </button>
            <button onClick={onClose} style={styles.btnIcon}>
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Banner */}
        <div style={styles.banner}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span>📨</span>
            <div>
              <div style={{ fontWeight: "600" }}>
                Invoice Auto-SMS to Party is turned on
              </div>
              <div style={{ fontSize: "13px", color: "#475569" }}>
                An SMS with the invoice details and link is sent to the party
                after the invoice has been created
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              style={styles.btnSmallPrimary}
              onClick={() => window.dispatchEvent(new Event("switchTab-print"))}
            >
              Change Settings
            </button>
            <button style={styles.btnIcon}>✕</button>
          </div>
        </div>

        <form id="invoice-form" onSubmit={handleSubmit}>
          <div style={styles.twoColumn}>
            {/* Bill From */}
            <div style={styles.billFromBox}>
              <div
                style={{
                  fontWeight: "600",
                  borderBottom: "1px solid #e2e8f0",
                  paddingBottom: "8px",
                  marginBottom: "12px",
                }}
              >
                Bill From
              </div>
              <div
                style={styles.addPartyPlaceholder}
                onClick={() => setShowPartyModal(true)}
              >
                <User size={20} />{" "}
                {formData.party.name ? formData.party.name : "+ Add Party"}
              </div>
              {formData.party.name && (
                <div
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    marginTop: "8px",
                  }}
                >
                  {formData.party.phone && <div>📞 {formData.party.phone}</div>}
                  {formData.party.gst && <div>GST: {formData.party.gst}</div>}
                  {formData.party.address && (
                    <div>{formData.party.address}</div>
                  )}
                </div>
              )}
            </div>

            {/* Invoice Details */}
            <div>
              <div style={styles.rowFields}>
                <div>
                  <label style={styles.label}>Invoice No:</label>
                  <input
                    type="text"
                    value={formData.invoiceNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        invoiceNumber: e.target.value,
                      })
                    }
                    style={styles.input}
                    required
                  />
                </div>
                <div>
                  <label style={styles.label}>Date:</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    style={styles.input}
                  />
                </div>
              </div>
              <div style={styles.rowFields}>
                <div>
                  <label style={styles.label}>Payment Terms:</label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="number"
                      value={formData.paymentTerms}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          paymentTerms: Number(e.target.value),
                        })
                      }
                      style={{
                        ...styles.input,
                        width: "80%",
                        borderRadius: "4px 0 0 4px",
                      }}
                    />
                    <span style={styles.inputSuffix}>days</span>
                  </div>
                </div>
                <div>
                  <label style={styles.label}>Due Date:</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) =>
                      setFormData({ ...formData, dueDate: e.target.value })
                    }
                    style={styles.input}
                  />
                </div>
              </div>
              <div style={styles.rowFields}>
                <div>
                  <label style={styles.label}>PO No:</label>
                  <input
                    type="text"
                    value={formData.poNo}
                    onChange={(e) =>
                      setFormData({ ...formData, poNo: e.target.value })
                    }
                    style={styles.input}
                  />
                </div>
                <div>
                  <label style={styles.label}>E-Way Bill No:</label>
                  <input
                    type="text"
                    value={formData.ewayBillNo}
                    onChange={(e) =>
                      setFormData({ ...formData, ewayBillNo: e.target.value })
                    }
                    style={styles.input}
                  />
                </div>
              </div>
              <div style={styles.rowFields}>
                <div>
                  <label style={styles.label}>Vehicle No:</label>
                  <input
                    type="text"
                    value={formData.vehicleNo}
                    onChange={(e) =>
                      setFormData({ ...formData, vehicleNo: e.target.value })
                    }
                    style={styles.input}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div style={{ marginTop: "24px" }}>
            <div style={styles.itemsHeader}>
              <span style={{ fontWeight: "500" }}>Items</span>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  type="button"
                  onClick={addItemRow}
                  style={styles.btnAddItem}
                >
                  <Plus size={16} /> Add Item
                </button>
                <button
                  type="button"
                  onClick={() => setShowBarcodeModal(true)}
                  style={styles.btnScan}
                >
                  <Scan size={16} /> Scan Barcode
                </button>
              </div>
            </div>
            <div style={styles.tableWrap}>
              <table style={styles.table}>
                <thead style={{ background: "#f8fafc" }}>
                  <tr>
                    <th style={styles.th}>#</th>
                    <th style={styles.th}>Item / Services</th>
                    <th style={styles.th}>HSN/SAC</th>
                    <th style={styles.th}>Qty</th>
                    <th style={styles.th}>Price (₹)</th>
                    <th style={styles.th}>Disc %</th>
                    <th style={styles.th}>Tax %</th>
                    <th style={styles.th}>Amount (₹)</th>
                    <th style={styles.th}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {itemRows.map((row, idx) => (
                    <tr key={row.id} style={{ borderTop: "1px solid #f1f5f9" }}>
                      <td style={styles.tdCenter}>{idx + 1}</td>
                      <td style={styles.td}>
                        <input
                          type="text"
                          value={row.name}
                          onChange={(e) =>
                            updateItemRow(row.id, "name", e.target.value)
                          }
                          placeholder="Item name"
                          style={styles.inputSmall}
                        />
                      </td>
                      <td style={styles.td}>
                        <input
                          type="text"
                          value={row.hsn}
                          onChange={(e) =>
                            updateItemRow(row.id, "hsn", e.target.value)
                          }
                          placeholder="HSN"
                          style={styles.inputTiny}
                        />
                      </td>
                      <td style={styles.tdCenter}>
                        <input
                          type="number"
                          value={row.qty}
                          onChange={(e) =>
                            updateItemRow(row.id, "qty", Number(e.target.value))
                          }
                          min="1"
                          style={styles.inputSmallCenter}
                        />
                      </td>
                      <td style={styles.tdCenter}>
                        <input
                          type="number"
                          value={row.price}
                          onChange={(e) =>
                            updateItemRow(
                              row.id,
                              "price",
                              Number(e.target.value),
                            )
                          }
                          min="0"
                          step="0.01"
                          style={styles.inputSmallCenter}
                        />
                      </td>
                      <td style={styles.tdCenter}>
                        <input
                          type="number"
                          value={row.discount}
                          onChange={(e) =>
                            updateItemRow(
                              row.id,
                              "discount",
                              Number(e.target.value),
                            )
                          }
                          min="0"
                          max="100"
                          style={styles.inputTiny}
                        />
                      </td>
                      <td style={styles.tdCenter}>
                        <input
                          type="number"
                          value={row.tax}
                          onChange={(e) =>
                            updateItemRow(row.id, "tax", Number(e.target.value))
                          }
                          min="0"
                          max="100"
                          style={styles.inputTiny}
                        />
                      </td>
                      <td style={{ ...styles.tdRight, fontWeight: "500" }}>
                        ₹{(row.amount || 0).toFixed(2)}
                      </td>
                      <td style={styles.tdCenter}>
                        <button
                          type="button"
                          onClick={() => removeItemRow(row.id)}
                          style={styles.btnDelete}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals & Notes */}
          <div style={styles.totalsRow}>
            <div style={styles.notesSection}>
              <div style={{ marginBottom: "16px" }}>
                <label style={styles.label}>+ Add Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows="2"
                  placeholder="Enter notes..."
                  style={styles.textarea}
                />
              </div>
              <div>
                <label style={styles.label}>Terms and Conditions</label>
                <textarea
                  value={formData.terms}
                  onChange={(e) =>
                    setFormData({ ...formData, terms: e.target.value })
                  }
                  rows="3"
                  style={styles.textarea}
                />
              </div>
            </div>

            <div style={styles.totalsBox}>
              <div style={styles.totalsRowItem}>
                <span>Subtotal</span>
                <span>₹{formData.subtotal.toFixed(2)}</span>
              </div>
              <div style={styles.totalsRowItem}>
                <span>+ Additional Charges</span>
                <input
                  type="number"
                  value={formData.additionalCharges}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      additionalCharges: Number(e.target.value),
                    })
                  }
                  min="0"
                  step="0.01"
                  style={styles.inputSmallRight}
                />
              </div>
              <div style={styles.totalsRowItem}>
                <span>Taxable Amount</span>
                <span>₹{formData.taxableAmount.toFixed(2)}</span>
              </div>
              <div style={styles.totalsRowItem}>
                <span>Discount</span>
                <div
                  style={{ display: "flex", gap: "4px", alignItems: "center" }}
                >
                  <select
                    value={formData.discount.type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        discount: {
                          ...formData.discount,
                          type: e.target.value,
                        },
                      })
                    }
                    style={styles.selectTiny}
                  >
                    <option value="percent">%</option>
                    <option value="fixed">₹</option>
                  </select>
                  <input
                    type="number"
                    value={formData.discount.value}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        discount: {
                          ...formData.discount,
                          value: Number(e.target.value),
                        },
                      })
                    }
                    min="0"
                    step="0.01"
                    style={styles.inputSmallRight}
                  />
                </div>
              </div>
              <div style={styles.totalsRowItem}>
                <span>TCS</span>
                <input
                  type="number"
                  value={formData.tcs}
                  onChange={(e) =>
                    setFormData({ ...formData, tcs: Number(e.target.value) })
                  }
                  min="0"
                  step="0.01"
                  style={styles.inputSmallRight}
                />
              </div>
              <div style={styles.totalsRowItem}>
                <span>Auto Round Off</span>
                <label style={{ marginLeft: "8px" }}>
                  <input
                    type="checkbox"
                    checked={formData.autoRoundOff}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        autoRoundOff: e.target.checked,
                      })
                    }
                  />
                </label>
                <span>₹{formData.grandTotal.toFixed(2)}</span>
              </div>
              <div
                style={{
                  ...styles.totalsRowItem,
                  fontWeight: "700",
                  fontSize: "18px",
                  borderTop: "2px solid #e2e8f0",
                  paddingTop: "8px",
                }}
              >
                <span>Total Amount</span>
                <span>₹{formData.grandTotal.toFixed(2)}</span>
              </div>
              <div style={styles.totalsRowItem}>
                <span>Amount Paid</span>
                <input
                  type="number"
                  value={formData.paidAmount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      paidAmount: Number(e.target.value),
                    })
                  }
                  min="0"
                  step="0.01"
                  style={styles.inputSmallRight}
                />
              </div>
              <div style={{ ...styles.totalsRowItem, fontWeight: "500" }}>
                <span>Balance Amount</span>
                <span>
                  ₹{(formData.grandTotal - formData.paidAmount).toFixed(2)}
                </span>
              </div>
              <div style={{ marginTop: "12px" }}>
                <label style={styles.label}>Payment Status</label>
                <select
                  value={formData.paymentStatus}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentStatus: e.target.value })
                  }
                  style={styles.selectFull}
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="partial">Partial</option>
                </select>
              </div>
              <div style={{ marginTop: "12px" }}>
                <label style={styles.label}>Authorized Signatory</label>
                <div
                  style={styles.signaturePlaceholder}
                  onClick={() => setShowSignatureModal(true)}
                >
                  {formData.signature ? (
                    <img
                      src={formData.signature}
                      alt="Signature"
                      style={{ maxHeight: "40px" }}
                    />
                  ) : (
                    "+ Add Signature"
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Modals */}
      {showPartyModal && (
        <PartySelector
          token={token}
          onSelect={handlePartySelect}
          onClose={() => setShowPartyModal(false)}
          showToast={showToast}
        />
      )}
      {showSignatureModal && (
        <SignatureUploader
          onSave={handleSignatureSave}
          onClose={() => setShowSignatureModal(false)}
          showToast={showToast}
        />
      )}
      {showBarcodeModal && (
        <BarcodeScanner
          onScan={handleBarcodeScan}
          onClose={() => setShowBarcodeModal(false)}
          showToast={showToast}
        />
      )}
    </div>
  );
};

// ----------------------------
// 6. INVOICE PRINT SETTINGS (with react-to-print)
// ----------------------------
const InvoicePrintSettings = ({
  invoiceData,
  businessData,
  token,
  showToast,
}) => {
  const [paperSize, setPaperSize] = useState("3");
  const [theme, setTheme] = useState("compact");
  const [logo, setLogo] = useState(businessData?.logo || null);
  const [showPartyBalance, setShowPartyBalance] = useState(true);
  const [showItemDescription, setShowItemDescription] = useState(true);
  const [showTime, setShowTime] = useState(true);
  const [showPhone, setShowPhone] = useState(true);

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `Invoice-${invoiceData?.invoiceNumber || "preview"}`,
    onAfterPrint: () => showToast("✅ Invoice printed successfully!"),
    onPrintError: () => showToast("❌ Failed to print."),
  });

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setLogo(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const previewProps = {
    invoiceData,
    businessData,
    theme,
    paperSize,
    logo,
    settings: { showPartyBalance, showItemDescription, showTime, showPhone },
  };

  return (
    <div style={styles.printSettingsContainer}>
      <h3
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Printer size={24} /> Print Settings
      </h3>
      <div style={styles.twoColumn}>
        <div style={styles.settingsLeft}>
          <div style={styles.settingGroup}>
            <h4>Select Paper Size</h4>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["2", "3", "4", "5", "6"].map((size) => (
                <button
                  key={size}
                  onClick={() => setPaperSize(size)}
                  style={{
                    padding: "6px 16px",
                    background: paperSize === size ? "#2563eb" : "#f1f5f9",
                    color: paperSize === size ? "#fff" : "#1e293b",
                    border: "none",
                    borderRadius: "20px",
                    cursor: "pointer",
                    fontWeight: paperSize === size ? "600" : "400",
                  }}
                >
                  {size} inch
                </button>
              ))}
            </div>
          </div>

          <div style={styles.settingGroup}>
            <h4>Themes</h4>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {[
                { id: "compact", label: "Compact", icon: <Layout size={16} /> },
                {
                  id: "advanced",
                  label: "Advanced",
                  icon: <Settings size={16} />,
                },
                { id: "simple", label: "Simple", icon: <Grid size={16} /> },
                { id: "classic", label: "Classic", icon: <Moon size={16} /> },
                { id: "modern", label: "Modern", icon: <Sun size={16} /> },
                { id: "luxury", label: "Luxury", icon: <Star size={16} /> },
                {
                  id: "stylish",
                  label: "Stylish",
                  icon: <Palette size={16} />,
                },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  style={{
                    padding: "6px 16px",
                    background: theme === t.id ? "#2563eb" : "#f1f5f9",
                    color: theme === t.id ? "#fff" : "#1e293b",
                    border: "none",
                    borderRadius: "20px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    textTransform: "capitalize",
                  }}
                >
                  {t.icon} {t.label}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.settingGroup}>
            <h4>Upload Logo</h4>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              style={{ marginTop: "8px" }}
            />
            {logo && (
              <img
                src={logo}
                alt="Logo"
                style={{
                  maxHeight: "60px",
                  marginTop: "8px",
                  display: "block",
                }}
              />
            )}
          </div>

          <div style={styles.settingGroup}>
            <h4>Theme Settings</h4>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={showPartyBalance}
                onChange={(e) => setShowPartyBalance(e.target.checked)}
              />{" "}
              Show party balance in invoice
            </label>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={showItemDescription}
                onChange={(e) => setShowItemDescription(e.target.checked)}
              />{" "}
              Show item description in invoice
            </label>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={showTime}
                onChange={(e) => setShowTime(e.target.checked)}
              />{" "}
              Show time on invoices
            </label>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={showPhone}
                onChange={(e) => setShowPhone(e.target.checked)}
              />{" "}
              Show phone number on invoice
            </label>
          </div>

          <button onClick={handlePrint} style={styles.btnPrimary}>
            <Printer size={16} /> Print Invoice
          </button>
        </div>

        <div style={styles.previewRight}>
          <h4
            style={{
              marginBottom: "12px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Eye size={20} /> Preview
          </h4>
          <div style={styles.previewContainer} ref={printRef}>
            <InvoicePreview {...previewProps} />
          </div>
        </div>
      </div>
    </div>
  );
};

// ----------------------------
// 7. BUSINESS SETTINGS
// ----------------------------
const BusinessSettings = ({ businessData, onUpdate, showToast }) => {
  const [form, setForm] = useState(
    businessData || {
      name: "",
      phone: "",
      email: "",
      address: "",
      state: "",
      city: "",
      gst: "",
      isGstRegistered: true,
      enableEInvoice: false,
      enableTDS: false,
      enableTCS: false,
      businessType: [],
      registrationType: "",
      website: "",
      msme: "",
      logo: "",
    },
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(form);
    showToast("Business settings updated successfully");
  };

  return (
    <div style={styles.businessSettings}>
      <h3>Business Settings</h3>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGrid}>
          <div>
            <label style={styles.label}>Business Name*</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div>
            <label style={styles.label}>Company Phone Number</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div>
            <label style={styles.label}>Website</label>
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={{ gridColumn: "span 2" }}>
            <label style={styles.label}>Billing Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows="2"
              style={styles.textarea}
            />
          </div>
          <div>
            <label style={styles.label}>State</label>
            <input
              type="text"
              name="state"
              value={form.state}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div>
            <label style={styles.label}>City</label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div>
            <label style={styles.label}>GST Registered?</label>
            <input
              type="checkbox"
              name="isGstRegistered"
              checked={form.isGstRegistered}
              onChange={handleChange}
            />
          </div>
          <div>
            <label style={styles.label}>GSTIN*</label>
            <input
              type="text"
              name="gst"
              value={form.gst}
              onChange={handleChange}
              style={styles.input}
              required={form.isGstRegistered}
            />
          </div>
          <div>
            <label style={styles.label}>Enable TDS</label>
            <input
              type="checkbox"
              name="enableTDS"
              checked={form.enableTDS}
              onChange={handleChange}
            />
          </div>
          <div>
            <label style={styles.label}>Enable TCS</label>
            <input
              type="checkbox"
              name="enableTCS"
              checked={form.enableTCS}
              onChange={handleChange}
            />
          </div>
          <div style={{ gridColumn: "span 2" }}>
            <label style={styles.label}>Business Type (Select multiple)</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {[
                "Retailer",
                "Wholesaler",
                "Distributor",
                "Manufacturer",
                "Services",
              ].map((type) => (
                <label key={type} style={{ marginRight: "12px" }}>
                  <input
                    type="checkbox"
                    name="businessType"
                    value={type}
                    checked={form.businessType.includes(type)}
                    onChange={(e) => {
                      const val = e.target.value;
                      setForm((prev) => ({
                        ...prev,
                        businessType: prev.businessType.includes(val)
                          ? prev.businessType.filter((t) => t !== val)
                          : [...prev.businessType, val],
                      }));
                    }}
                  />{" "}
                  {type}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label style={styles.label}>Registration Type</label>
            <select
              name="registrationType"
              value={form.registrationType}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Select</option>
              <option value="Private Limited Company">
                Private Limited Company
              </option>
              <option value="Partnership">Partnership</option>
              <option value="Proprietorship">Proprietorship</option>
              <option value="LLP">LLP</option>
            </select>
          </div>
          <div>
            <label style={styles.label}>MSME Number</label>
            <input
              type="text"
              name="msme"
              value={form.msme}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={{ gridColumn: "span 2" }}>
            <label style={styles.label}>Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (ev) =>
                    setForm((prev) => ({ ...prev, logo: ev.target.result }));
                  reader.readAsDataURL(file);
                }
              }}
            />
            {form.logo && (
              <img
                src={form.logo}
                alt="Logo"
                style={{ maxHeight: "60px", marginTop: "8px" }}
              />
            )}
          </div>
        </div>
        <button type="submit" style={styles.btnPrimary}>
          Save Business Settings
        </button>
      </form>
    </div>
  );
};

// ----------------------------
// 8. INVOICE TEMPLATES
// ----------------------------
const InvoiceTemplates = ({ onApplyTemplate, showToast }) => {
  const [selectedTheme, setSelectedTheme] = useState("modern");
  const [customColor, setCustomColor] = useState("#2563eb");
  const [customThemeName, setCustomThemeName] = useState("");

  const themes = [
    { id: "modern", label: "Modern", icon: <Sun size={20} /> },
    { id: "luxury", label: "Luxury", icon: <Star size={20} /> },
    { id: "stylish", label: "Stylish", icon: <Palette size={20} /> },
    { id: "classic", label: "Classic", icon: <Grid size={20} /> },
    { id: "compact", label: "Compact", icon: <Layout size={20} /> },
    { id: "advanced", label: "Advanced", icon: <Settings size={20} /> },
    { id: "simple", label: "Simple", icon: <FileText size={20} /> },
  ];

  const applyTheme = (themeId) => {
    setSelectedTheme(themeId);
    onApplyTemplate(themeId);
    showToast(`Theme "${themeId}" applied`);
  };

  const createCustomTheme = () => {
    if (!customThemeName.trim()) {
      showToast("Please enter a theme name");
      return;
    }
    showToast(
      `Custom theme "${customThemeName}" created with color ${customColor}`,
    );
    setCustomThemeName("");
  };

  return (
    <div style={styles.templatesContainer}>
      <h3>Invoice Templates</h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => applyTheme(theme.id)}
            style={{
              padding: "12px 24px",
              background: selectedTheme === theme.id ? "#2563eb" : "#f1f5f9",
              color: selectedTheme === theme.id ? "#fff" : "#1e293b",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {theme.icon} {theme.label}
          </button>
        ))}
      </div>

      <div style={styles.customThemeSection}>
        <h4>Create Custom Theme</h4>
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="Theme Name"
            value={customThemeName}
            onChange={(e) => setCustomThemeName(e.target.value)}
            style={styles.input}
          />
          <input
            type="color"
            value={customColor}
            onChange={(e) => setCustomColor(e.target.value)}
            style={{
              width: "40px",
              height: "40px",
              border: "none",
              cursor: "pointer",
            }}
          />
          <button onClick={createCustomTheme} style={styles.btnPrimary}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

// ----------------------------
// 9. MAIN BILLING WORKSPACE
// ----------------------------
export default function BillingWorkspace({ token, showToast }) {
  const [activeTab, setActiveTab] = useState("invoices");
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [invoiceType, setInvoiceType] = useState("sales");
  const [businessData, setBusinessData] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Listen for "switchTab-print" event from Change Settings button
  useEffect(() => {
    const handler = () => setActiveTab("print");
    window.addEventListener("switchTab-print", handler);
    return () => window.removeEventListener("switchTab-print", handler);
  }, []);

  // Fetch Invoices
  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/invoices`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setInvoices(data.data || []);
      }
    } catch (err) {
      showToast("Error fetching invoices");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Business Data
  const fetchBusiness = async () => {
    try {
      const res = await fetch(`${API}/business`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setBusinessData(data.data);
      }
    } catch (err) {
      showToast("Error fetching business details");
    }
  };

  useEffect(() => {
    if (token) {
      fetchInvoices();
      fetchBusiness();
    }
  }, [token]);

  // Filters & Stats
  const filteredInvoices = useMemo(() => {
    let filtered = invoices;
    if (searchTerm.trim()) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (inv) =>
          inv.invoiceNumber?.toLowerCase().includes(lower) ||
          (inv.party?.name || "").toLowerCase().includes(lower) ||
          inv.paymentStatus?.toLowerCase().includes(lower),
      );
    }
    return filtered;
  }, [invoices, searchTerm]);

  const stats = useMemo(() => {
    const total = filteredInvoices.length;
    const totalAmount = filteredInvoices.reduce(
      (sum, inv) => sum + (inv.grandTotal || 0),
      0,
    );
    const pending = filteredInvoices.filter(
      (inv) => inv.paymentStatus === "pending",
    ).length;
    const paid = filteredInvoices.filter(
      (inv) => inv.paymentStatus === "paid",
    ).length;
    return { total, totalAmount, pending, paid };
  }, [filteredInvoices]);

  const handleUpdateBusiness = (data) => {
    setBusinessData(data);
    showToast("Business settings updated");
  };

  const handleDeleteInvoice = async (id) => {
    if (!confirm("Are you sure you want to delete this invoice?")) return;
    try {
      const res = await fetch(`${API}/invoices/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        showToast("Invoice deleted successfully");
        fetchInvoices();
      } else {
        showToast("Failed to delete invoice");
      }
    } catch (err) {
      showToast("Error deleting invoice");
    }
  };

  return (
    <section className="admin-card">
      <div className="admin-section-title">
        <div>
          <FileText size={19} />
          <strong>Billing Workspace</strong>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            className="primary"
            type="button"
            onClick={() => setShowModal(true)}
          >
            <Plus size={16} /> Create Invoice
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={styles.tabNav}>
        <button
          onClick={() => setActiveTab("invoices")}
          style={{
            ...styles.tabBtn,
            borderBottom:
              activeTab === "invoices" ? "2px solid #2563eb" : "none",
          }}
        >
          <FileText size={16} /> Invoices
        </button>
        <button
          onClick={() => setActiveTab("print")}
          style={{
            ...styles.tabBtn,
            borderBottom: activeTab === "print" ? "2px solid #2563eb" : "none",
          }}
        >
          <Printer size={16} /> Print Settings
        </button>
        <button
          onClick={() => setActiveTab("business")}
          style={{
            ...styles.tabBtn,
            borderBottom:
              activeTab === "business" ? "2px solid #2563eb" : "none",
          }}
        >
          <Building2 size={16} /> Business Settings
        </button>
        <button
          onClick={() => setActiveTab("templates")}
          style={{
            ...styles.tabBtn,
            borderBottom:
              activeTab === "templates" ? "2px solid #2563eb" : "none",
          }}
        >
          <Palette size={16} /> Invoice Templates
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "invoices" && (
        <>
          {/* Stats Cards */}
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#64748b",
                  }}
                >
                  Total
                </span>
                <Package size={20} color="#2563eb" />
              </div>
              <div style={{ fontSize: "28px", fontWeight: "700" }}>
                {stats.total}
              </div>
            </div>
            <div style={styles.statCard}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#64748b",
                  }}
                >
                  Amount
                </span>
                <IndianRupee size={20} color="#16a34a" />
              </div>
              <div style={{ fontSize: "28px", fontWeight: "700" }}>
                ₹{stats.totalAmount.toLocaleString()}
              </div>
            </div>
            <div style={styles.statCard}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#64748b",
                  }}
                >
                  Pending
                </span>
                <Clock size={20} color="#f59e0b" />
              </div>
              <div style={{ fontSize: "28px", fontWeight: "700" }}>
                {stats.pending}
              </div>
            </div>
            <div style={styles.statCard}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#64748b",
                  }}
                >
                  Paid
                </span>
                <CheckCircle size={20} color="#22c55e" />
              </div>
              <div style={{ fontSize: "28px", fontWeight: "700" }}>
                {stats.paid}
              </div>
            </div>
          </div>

          {/* Search */}
          <div style={styles.searchContainer}>
            <div style={styles.searchWrapper}>
              <Search size={18} style={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search by invoice no, party..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
            </div>
          </div>

          {/* Table */}
          {filteredInvoices.length === 0 ? (
            <div style={styles.emptyState}>
              <FileText
                size={48}
                style={{ color: "#cbd5e1", marginBottom: "16px" }}
              />
              <h3>No invoices found</h3>
              <p>
                {searchTerm
                  ? "Try adjusting your search."
                  : "Create your first invoice."}
              </p>
            </div>
          ) : (
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableHeader}>
                    <th style={styles.th}>Date</th>
                    <th style={styles.th}>Invoice No</th>
                    <th style={styles.th}>Party</th>
                    <th style={styles.th}>Amount</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((inv, idx) => {
                    const status = inv.paymentStatus || "pending";
                    const statusColor =
                      status === "paid"
                        ? "#16a34a"
                        : status === "pending"
                          ? "#f59e0b"
                          : "#8b5cf6";
                    const bg = idx % 2 === 0 ? "#fff" : "#fafbfc";
                    return (
                      <tr
                        key={inv._id || idx}
                        style={{
                          background: bg,
                          borderBottom: "1px solid #f1f5f9",
                        }}
                      >
                        <td style={styles.td}>
                          {inv.date
                            ? new Date(inv.date).toLocaleDateString()
                            : "-"}
                        </td>
                        <td style={{ ...styles.td, fontWeight: "500" }}>
                          {inv.invoiceNumber || "—"}
                        </td>
                        <td style={styles.td}>{inv.party?.name || "-"}</td>
                        <td style={{ ...styles.td, textAlign: "right" }}>
                          ₹{(inv.grandTotal || 0).toLocaleString()}
                        </td>
                        <td style={{ ...styles.td, textAlign: "center" }}>
                          <span
                            style={{
                              ...styles.statusBadge,
                              background:
                                status === "paid"
                                  ? "#dcfce7"
                                  : status === "pending"
                                    ? "#fef9c3"
                                    : "#ede9fe",
                              color: statusColor,
                            }}
                          >
                            {status}
                          </span>
                        </td>
                        <td style={{ ...styles.td, textAlign: "center" }}>
                          <button
                            onClick={() => setSelectedInvoice(inv)}
                            style={styles.actionBtn}
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => showToast("PDF download started")}
                            style={styles.actionBtn}
                          >
                            <Download size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteInvoice(inv._id)}
                            style={{ ...styles.actionBtn, color: "#dc2626" }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {activeTab === "print" && (
        <InvoicePrintSettings
          invoiceData={selectedInvoice || {}}
          businessData={businessData}
          token={token}
          showToast={showToast}
        />
      )}

      {activeTab === "business" && (
        <BusinessSettings
          businessData={businessData}
          onUpdate={handleUpdateBusiness}
          showToast={showToast}
        />
      )}

      {activeTab === "templates" && (
        <InvoiceTemplates
          onApplyTemplate={(theme) => showToast(`Theme ${theme} applied`)}
          showToast={showToast}
        />
      )}

      {/* Invoice Creator Modal */}
      {showModal && (
        <InvoiceCreator
          type={invoiceType}
          onClose={() => setShowModal(false)}
          onSave={fetchInvoices}
          showToast={showToast}
          token={token}
        />
      )}
    </section>
  );
}

// ----------------------------
// 10. STYLES (same as before, included for completeness)
// ----------------------------
const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
    padding: "20px",
    overflow: "auto",
  },
  modalContent: {
    background: "white",
    borderRadius: "16px",
    maxWidth: "1100px",
    width: "100%",
    maxHeight: "90vh",
    overflowY: "auto",
    padding: "24px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    flexWrap: "wrap",
  },
  banner: {
    background: "#eff6ff",
    padding: "12px 16px",
    borderRadius: "8px",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  twoColumn: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
  },
  billFromBox: {
    border: "1px dashed #cbd5e1",
    borderRadius: "8px",
    padding: "16px",
    minHeight: "160px",
  },
  addPartyPlaceholder: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100px",
    color: "#94a3b8",
    border: "1px dashed #cbd5e1",
    borderRadius: "8px",
    cursor: "pointer",
    gap: "8px",
    fontWeight: "500",
  },
  rowFields: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginBottom: "12px",
  },
  label: {
    display: "block",
    fontWeight: "500",
    marginBottom: "4px",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "8px",
    border: "1px solid #e2e8f0",
    borderRadius: "4px",
    fontSize: "14px",
  },
  inputSmall: {
    width: "100%",
    padding: "4px 6px",
    border: "1px solid #e2e8f0",
    borderRadius: "4px",
    fontSize: "13px",
  },
  inputTiny: {
    width: "70px",
    padding: "4px 6px",
    border: "1px solid #e2e8f0",
    borderRadius: "4px",
    fontSize: "13px",
    textAlign: "center",
  },
  inputSmallCenter: {
    width: "70px",
    padding: "4px 6px",
    border: "1px solid #e2e8f0",
    borderRadius: "4px",
    fontSize: "13px",
    textAlign: "center",
  },
  inputSmallRight: {
    width: "120px",
    padding: "4px 6px",
    border: "1px solid #e2e8f0",
    borderRadius: "4px",
    fontSize: "13px",
    textAlign: "right",
  },
  inputSuffix: {
    padding: "6px 8px",
    background: "#f1f5f9",
    border: "1px solid #e2e8f0",
    borderLeft: "none",
    borderRadius: "0 4px 4px 0",
    fontSize: "14px",
  },
  textarea: {
    width: "100%",
    padding: "8px",
    border: "1px solid #e2e8f0",
    borderRadius: "4px",
    fontSize: "14px",
    resize: "vertical",
  },
  itemsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  tableWrap: {
    overflowX: "auto",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
  },
  th: {
    padding: "8px",
    textAlign: "left",
    fontWeight: "600",
    background: "#f8fafc",
    borderBottom: "1px solid #e2e8f0",
  },
  td: {
    padding: "8px",
    borderBottom: "1px solid #f1f5f9",
  },
  tdCenter: {
    padding: "8px",
    textAlign: "center",
    borderBottom: "1px solid #f1f5f9",
  },
  tdRight: {
    padding: "8px",
    textAlign: "right",
    borderBottom: "1px solid #f1f5f9",
  },
  totalsRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    marginTop: "20px",
  },
  notesSection: {
    padding: "16px",
  },
  totalsBox: {
    padding: "16px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    background: "#fafbfc",
  },
  totalsRowItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "4px 0",
    borderBottom: "1px solid #e2e8f0",
    fontSize: "14px",
  },
  signaturePlaceholder: {
    border: "1px dashed #e2e8f0",
    borderRadius: "4px",
    padding: "16px",
    textAlign: "center",
    color: "#94a3b8",
    cursor: "pointer",
  },
  btnPrimary: {
    padding: "8px 20px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  },
  btnSecondary: {
    padding: "6px 12px",
    background: "#f3f4f6",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    cursor: "pointer",
  },
  btnIcon: {
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  btnSmallPrimary: {
    padding: "4px 12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  btnAddItem: {
    padding: "6px 12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "4px",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    cursor: "pointer",
  },
  btnScan: {
    padding: "6px 12px",
    background: "#f1f5f9",
    border: "1px solid #e2e8f0",
    borderRadius: "4px",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    cursor: "pointer",
  },
  btnDelete: {
    background: "none",
    border: "none",
    color: "#dc2626",
    cursor: "pointer",
  },
  selectTiny: {
    padding: "4px",
    border: "1px solid #e2e8f0",
    borderRadius: "4px",
    fontSize: "13px",
  },
  selectFull: {
    width: "100%",
    padding: "8px",
    border: "1px solid #e2e8f0",
    borderRadius: "4px",
    fontSize: "14px",
  },
  printSettingsContainer: {
    padding: "24px",
    background: "#fff",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
  },
  settingsLeft: {
    paddingRight: "24px",
  },
  settingGroup: {
    marginBottom: "24px",
  },
  checkboxLabel: {
    display: "block",
    margin: "6px 0",
    fontSize: "14px",
    color: "#1e293b",
  },
  previewRight: {
    background: "#f8fafc",
    padding: "16px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    minHeight: "400px",
  },
  previewContainer: {
    maxHeight: "600px",
    overflow: "auto",
    background: "#fff",
    padding: "8px",
    borderRadius: "4px",
  },
  businessSettings: {
    padding: "24px",
    background: "#fff",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginBottom: "24px",
  },
  templatesContainer: {
    padding: "24px",
    background: "#fff",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
  },
  customThemeSection: {
    background: "#f1f5f9",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "24px",
  },
  tabNav: {
    display: "flex",
    gap: "8px",
    borderBottom: "1px solid #e2e8f0",
    paddingBottom: "8px",
    marginBottom: "24px",
    flexWrap: "wrap",
  },
  tabBtn: {
    padding: "8px 16px",
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontWeight: "500",
    color: "#475569",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "16px",
    marginBottom: "24px",
  },
  statCard: {
    background: "#fff",
    padding: "16px 20px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
  },
  searchContainer: {
    marginBottom: "20px",
    display: "flex",
    justifyContent: "flex-end",
  },
  searchWrapper: {
    position: "relative",
    width: "100%",
    maxWidth: "320px",
  },
  searchIcon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#94a3b8",
  },
  searchInput: {
    width: "100%",
    padding: "10px 16px 10px 40px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
  },
  emptyState: {
    textAlign: "center",
    padding: "48px 20px",
    background: "#fff",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
  },
  tableWrapper: {
    overflowX: "auto",
    background: "#fff",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
  },
  tableHeader: {
    background: "#f8fafc",
    borderBottom: "1px solid #e2e8f0",
  },
  statusBadge: {
    display: "inline-block",
    padding: "4px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "capitalize",
  },
  actionBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    margin: "0 4px",
    color: "#2563eb",
  },
};
