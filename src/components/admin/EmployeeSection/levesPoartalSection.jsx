import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Bell,
  Calendar,
  Check,
  Clipboard,
  Cog,
  Clock,
  Download,
  Edit,
  Eye,
  File,
  FileText,
  Filter,
  Home,
  Info,
  Plus,
  RefreshCw,
  Search,
  Trash,
  Upload,
  User,
  Users,
  X,
} from "lucide-react";
import "./levesPoartalSection.css";

const LEAVE_TYPES = [
  {
    id: "cl",
    name: "Casual Leave",
    short: "CL",
    color: "#2563eb",
    badge: "#eff6ff",
  },
  {
    id: "sl",
    name: "Sick Leave",
    short: "SL",
    color: "#10b981",
    badge: "#d1fae5",
  },
  {
    id: "el",
    name: "Emergency Leave",
    short: "EL",
    color: "#f97316",
    badge: "#ffedd5",
  },
  {
    id: "lwp",
    name: "Leave Without Pay",
    short: "LWP",
    color: "#8b5cf6",
    badge: "#ede9fe",
  },
];

const STATUSES = ["Pending", "Approved", "Rejected", "Cancelled"];

const ROLE_PERMISSIONS = {
  superAdmin: [
    "applyLeave",
    "viewOwnLeaves",
    "cancelLeave",
    "approveLeave",
    "rejectLeave",
  ],
  hr: [
    "applyLeave",
    "viewOwnLeaves",
    "cancelLeave",
    "approveLeave",
    "rejectLeave",
  ],
  manager: [
    "applyLeave",
    "viewOwnLeaves",
    "cancelLeave",
    "approveLeave",
    "rejectLeave",
  ],
  employee: ["applyLeave", "viewOwnLeaves", "cancelLeave"],
};

const INITIAL_BALANCE = {
  cl: { available: 8, used: 4, total: 12 },
  sl: { available: 6, used: 4, total: 10 },
  el: { available: 3, used: 0, total: 3 },
  lwp: { available: 2, used: 0, total: 2 },
};

const EMPLOYEES = [
  { id: 1, name: "Amit Singh", department: "Sales" },
  { id: 2, name: "Rajesh Sharma", department: "Operations" },
  { id: 3, name: "Priya Patel", department: "Marketing" },
  { id: 4, name: "Neha Verma", department: "HR" },
];

const HOLIDAYS = ["2026-08-15", "2026-09-05", "2026-10-02", "2026-11-14"];

const INITIAL_LEAVES = [
  {
    id: 1,
    employee: "Amit Singh",
    type: "sl",
    from: "2026-07-24",
    to: "2026-07-24",
    days: 1,
    appliedOn: "2026-07-24",
    reason: "Fever and cold",
    status: "Pending",
  },
  {
    id: 2,
    employee: "Priya Patel",
    type: "cl",
    from: "2026-07-05",
    to: "2026-07-05",
    days: 1,
    appliedOn: "2026-07-03",
    reason: "Personal work",
    status: "Approved",
  },
  {
    id: 3,
    employee: "Vikram Singh",
    type: "el",
    from: "2026-06-28",
    to: "2026-06-28",
    days: 1,
    appliedOn: "2026-06-26",
    reason: "Family emergency",
    status: "Approved",
  },
  {
    id: 4,
    employee: "Neha Verma",
    type: "sl",
    from: "2026-06-15",
    to: "2026-06-16",
    days: 2,
    appliedOn: "2026-06-13",
    reason: "Not feeling well",
    status: "Approved",
  },
];

const ATTENDANCE_ROWS = [
  {
    date: "2026-07-24",
    checkIn: "09:05 AM",
    checkOut: "06:15 PM",
    hours: "09h 10m",
    status: "Present",
  },
  {
    date: "2026-07-23",
    checkIn: "09:10 AM",
    checkOut: "06:00 PM",
    hours: "08h 50m",
    status: "Present",
  },
  {
    date: "2026-07-22",
    checkIn: "09:00 AM",
    checkOut: "06:05 PM",
    hours: "09h 05m",
    status: "Present",
  },
  {
    date: "2026-07-21",
    checkIn: "09:30 AM",
    checkOut: "01:30 PM",
    hours: "04h 00m",
    status: "Half Day",
  },
  {
    date: "2026-07-18",
    checkIn: "09:15 AM",
    checkOut: "06:30 PM",
    hours: "09h 15m",
    status: "Present",
  },
];

const TEAM_LEAVES = [
  {
    id: 1,
    employee: "Rajesh Sharma",
    department: "Sales",
    type: "sl",
    from: "2026-07-24",
    to: "2026-07-24",
    days: 1,
    status: "Pending",
    reason: "Fever and cold",
  },
  {
    id: 2,
    employee: "Priya Patel",
    department: "Marketing",
    type: "cl",
    from: "2026-07-25",
    to: "2026-07-25",
    days: 1,
    status: "Pending",
    reason: "Personal work",
  },
  {
    id: 3,
    employee: "Vikram Singh",
    department: "Operations",
    type: "el",
    from: "2026-07-24",
    to: "2026-07-24",
    days: 1,
    status: "Pending",
    reason: "Family emergency",
  },
  {
    id: 4,
    employee: "Neha Verma",
    department: "HR",
    type: "sl",
    from: "2026-07-23",
    to: "2026-07-24",
    days: 2,
    status: "Approved",
    reason: "Health issue",
  },
  {
    id: 5,
    employee: "Aman Gupta",
    department: "Finance",
    type: "cl",
    from: "2026-07-22",
    to: "2026-07-22",
    days: 1,
    status: "Approved",
    reason: "Bank work",
  },
];

const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const LevesPortalSection = () => {
  const [activeRole, setActiveRole] = useState("manager");
  const [leaveBalance, setLeaveBalance] = useState(INITIAL_BALANCE);
  const [leaveHistory, setLeaveHistory] = useState(INITIAL_LEAVES);
  const [teamLeaves, setTeamLeaves] = useState(TEAM_LEAVES);
  const [attendanceRows] = useState(ATTENDANCE_ROWS);
  const [historyFilter, setHistoryFilter] = useState({
    search: "",
    status: "all",
    type: "all",
  });
  const [leaveForm, setLeaveForm] = useState({
    type: "cl",
    from: "",
    to: "",
    halfDay: false,
    reason: "",
    documentName: "",
    days: 0,
  });
  const [currentModal, setCurrentModal] = useState(null);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [toast, setToast] = useState(null);

  const permissions = useMemo(() => ROLE_PERMISSIONS[activeRole], [activeRole]);

  const calculateLeaveDays = useCallback((from, to, halfDay) => {
    if (!from || !to) return 0;
    const fromDate = new Date(from);
    const toDate = new Date(to);
    if (toDate < fromDate) return 0;
    let count = 0;
    for (
      let current = new Date(fromDate);
      current <= toDate;
      current.setDate(current.getDate() + 1)
    ) {
      const iso = current.toISOString().slice(0, 10);
      const day = new Date(iso).getDay();
      const isWeekend = day === 0 || day === 6;
      const isHoliday = HOLIDAYS.includes(iso);
      if (!isWeekend && !isHoliday) count += 1;
    }
    return halfDay && count > 0 ? 0.5 : count;
  }, []);

  const updateLeaveForm = (field, value) => {
    setLeaveForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "from" || field === "to" || field === "halfDay") {
        const fromValue = field === "from" ? value : prev.from;
        const toValue = field === "to" ? value : prev.to;
        const halfDayValue = field === "halfDay" ? value : prev.halfDay;
        next.days = calculateLeaveDays(fromValue, toValue, halfDayValue);
      }
      return next;
    });
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = (type, message) => setToast({ type, message });

  const handleApplyLeave = () => {
    if (!permissions.includes("applyLeave")) {
      showToast("warning", "You do not have permission to apply leave.");
      return;
    }
    if (
      !leaveForm.type ||
      !leaveForm.from ||
      !leaveForm.to ||
      !leaveForm.reason
    ) {
      showToast("error", "Please complete all required fields.");
      return;
    }
    if (new Date(leaveForm.to) < new Date(leaveForm.from)) {
      showToast("error", "To Date cannot be before From Date.");
      return;
    }
    if (leaveForm.days <= 0) {
      showToast("error", "Please select valid leave dates.");
      return;
    }
    const balance = leaveBalance[leaveForm.type];
    if (leaveForm.days > balance.available) {
      showToast("error", "Requested days exceed available balance.");
      return;
    }
    const newLeave = {
      id: Date.now(),
      employee: "Amit Singh",
      type: leaveForm.type,
      from: leaveForm.from,
      to: leaveForm.to,
      days: leaveForm.days,
      appliedOn: new Date().toISOString().slice(0, 10),
      reason: leaveForm.reason,
      status: "Pending",
    };
    setLeaveHistory((prev) => [newLeave, ...prev]);
    setLeaveBalance((prev) => ({
      ...prev,
      [leaveForm.type]: {
        ...prev[leaveForm.type],
        available: Math.max(0, prev[leaveForm.type].available - leaveForm.days),
        used: prev[leaveForm.type].used + leaveForm.days,
      },
    }));
    setLeaveForm({
      type: "cl",
      from: "",
      to: "",
      halfDay: false,
      reason: "",
      documentName: "",
      days: 0,
    });
    showToast("success", "Leave application submitted successfully.");
  };

  const handleCancelLeave = (leave) => {
    if (!permissions.includes("cancelLeave")) {
      showToast("warning", "You cannot cancel this leave.");
      return;
    }
    setLeaveHistory((prev) =>
      prev.map((item) =>
        item.id === leave.id ? { ...item, status: "Cancelled" } : item,
      ),
    );
    showToast("info", "Leave cancelled.");
  };

  const handleApproveLeave = (leave) => {
    if (!permissions.includes("approveLeave")) {
      showToast("warning", "You cannot approve this leave.");
      return;
    }
    setTeamLeaves((prev) =>
      prev.map((item) =>
        item.id === leave.id ? { ...item, status: "Approved" } : item,
      ),
    );
    showToast("success", "Leave approved.");
  };

  const handleRejectLeave = (leave) => {
    if (!permissions.includes("rejectLeave")) {
      showToast("warning", "You cannot reject this leave.");
      return;
    }
    setTeamLeaves((prev) =>
      prev.map((item) =>
        item.id === leave.id ? { ...item, status: "Rejected" } : item,
      ),
    );
    showToast("error", "Leave rejected.");
  };

  const handleViewLeave = (leave, type) => {
    setSelectedLeave({ ...leave, viewType: type });
    setCurrentModal("view");
  };

  const handleEditLeave = (leave) => {
    setSelectedLeave(leave);
    setLeaveForm({
      type: leave.type,
      from: leave.from,
      to: leave.to,
      halfDay: leave.days === 0.5,
      reason: leave.reason,
      documentName: "",
      days: leave.days,
    });
    setCurrentModal("edit");
  };

  const handleDeleteLeave = (leave) => {
    setLeaveHistory((prev) => prev.filter((item) => item.id !== leave.id));
    showToast("info", "Leave deleted.");
  };

  const handleUploadDocument = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setLeaveForm((prev) => ({ ...prev, documentName: file.name }));
    showToast("success", "Document uploaded.");
  };

  const filteredHistory = useMemo(() => {
    return leaveHistory.filter((item) => {
      const matchesStatus =
        historyFilter.status === "all" || item.status === historyFilter.status;
      const matchesType =
        historyFilter.type === "all" || item.type === historyFilter.type;
      const query = historyFilter.search.toLowerCase();
      const matchesSearch =
        !query ||
        item.employee.toLowerCase().includes(query) ||
        item.reason.toLowerCase().includes(query);
      return matchesStatus && matchesType && matchesSearch;
    });
  }, [leaveHistory, historyFilter]);

  const attendanceSummary = useMemo(() => {
    const present = attendanceRows.filter(
      (row) => row.status === "Present",
    ).length;
    const absent = attendanceRows.filter(
      (row) => row.status === "Absent",
    ).length;
    const halfDay = attendanceRows.filter(
      (row) => row.status === "Half Day",
    ).length;
    const late = attendanceRows.filter((row) => row.status === "Late").length;
    return { present, absent, halfDay, late };
  }, [attendanceRows]);

  const filteredTeamLeaves = useMemo(() => {
    return teamLeaves.filter((item) => {
      const matches =
        historyFilter.status === "all" || item.status === historyFilter.status;
      return matches;
    });
  }, [teamLeaves, historyFilter.status]);

  return (
    <div className="leaves-shell">
      <aside className="app-sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">??</div>
          <div>
            <p className="brand-title">Dushyant Power Tools</p>
            <p className="brand-subtitle">Employee Portal</p>
          </div>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-link active">
            <FaHome /> Dashboard
          </button>
          <button className="nav-link">
            <FaClipboardList /> My Tasks
          </button>
          <button className="nav-link">
            <FaUsers /> Assigned Orders
          </button>
          <button className="nav-link">
            <FaCalendarDay /> Leaves Portal
          </button>
          <button className="nav-link">
            <FaFilePdf /> Salary & Payslips
          </button>
          <button className="nav-link">
            <FaBell /> Announcements
          </button>
          <button className="nav-link">
            <FaCog /> Settings
          </button>
        </nav>
        <button className="sidebar-cta">Sign Out Session</button>
      </aside>

      <main className="app-content">
        <header className="page-header">
          <div>
            <p className="page-label">Leaves & Attendance</p>
            <h1>Apply for leave, track status and manage your team.</h1>
            <p className="page-copy">
              Submit leave requests, review history, and monitor attendance from
              one dashboard.
            </p>
          </div>
          <div className="header-actions">
            <select
              value={activeRole}
              onChange={(e) => setActiveRole(e.target.value)}
              className="role-select"
            >
              <option value="superAdmin">Super Admin</option>
              <option value="hr">HR</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>
            <button className="btn btn-soft">
              <FaUserCircle /> Leave Balance
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                setCurrentModal("apply");
                setSelectedLeave(null);
              }}
            >
              <FaPlus /> Apply Leave
            </button>
          </div>
        </header>

        <section className="balance-section">
          {LEAVE_TYPES.map((type) => {
            const balance = leaveBalance[type.id];
            const usedPct = Math.round((balance.used / balance.total) * 100);
            return (
              <div className="balance-card" key={type.id}>
                <div className="balance-card-top">
                  <span
                    className="balance-badge"
                    style={{ background: type.badge, color: type.color }}
                  >
                    {type.short}
                  </span>
                  <div>
                    <p className="balance-name">{type.name}</p>
                    <p className="balance-sub">{balance.available} Available</p>
                  </div>
                </div>
                <div className="balance-metrics">
                  <div>
                    <span>Total</span>
                    <strong>{balance.total}</strong>
                  </div>
                  <div>
                    <span>Used</span>
                    <strong>{balance.used}</strong>
                  </div>
                </div>
                <div className="balance-progress">
                  <div
                    className="balance-progress-bar"
                    style={{ width: `${usedPct}%`, background: type.color }}
                  />
                  <span>{usedPct}% used</span>
                </div>
              </div>
            );
          })}
        </section>

        <section className="grid-two">
          <section className="panel panel-form">
            <div className="panel-head">
              <div>
                <h2>Apply Leave</h2>
                <p>Fill in the leave form with accurate dates and reason.</p>
              </div>
              <button
                className="btn btn-soft"
                onClick={() => showToast("info", "Leave form is ready.")}
              >
                Refresh
              </button>
            </div>
            <div className="form-row">
              <label>Leave Type</label>
              <select
                value={leaveForm.type}
                onChange={(e) => updateLeaveForm("type", e.target.value)}
              >
                {LEAVE_TYPES.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-grid-2">
              <div className="form-row">
                <label>From Date</label>
                <input
                  type="date"
                  value={leaveForm.from}
                  onChange={(e) => updateLeaveForm("from", e.target.value)}
                />
              </div>
              <div className="form-row">
                <label>To Date</label>
                <input
                  type="date"
                  value={leaveForm.to}
                  onChange={(e) => updateLeaveForm("to", e.target.value)}
                />
              </div>
            </div>
            <div className="form-row details-row">
              <label>Total Days</label>
              <div className="readonly-field">
                {leaveForm.days} {leaveForm.days === 1 ? "Day" : "Days"}
              </div>
            </div>
            <div className="form-row">
              <label>Reason for Leave</label>
              <textarea
                value={leaveForm.reason}
                onChange={(e) => updateLeaveForm("reason", e.target.value)}
                placeholder="Enter reason for leave"
              />
            </div>
            <div className="form-row">
              <label>Upload Document</label>
              <div className="file-upload">
                <input
                  type="file"
                  id="leave-file"
                  onChange={handleUploadDocument}
                />
                <label htmlFor="leave-file">
                  <FaUpload />{" "}
                  {leaveForm.documentName || "Choose file or drag and drop"}
                </label>
              </div>
            </div>
            <div className="form-actions">
              <button
                className="btn btn-secondary"
                onClick={() =>
                  setLeaveForm({
                    type: "cl",
                    from: "",
                    to: "",
                    halfDay: false,
                    reason: "",
                    documentName: "",
                    days: 0,
                  })
                }
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleApplyLeave}>
                Submit Application
              </button>
            </div>
          </section>

          <section className="panel panel-history">
            <div className="panel-head">
              <div>
                <h2>Applications History</h2>
                <p>Review recent leave requests and status updates.</p>
              </div>
              <div className="history-filters">
                <div className="search-box">
                  <FaSearch />
                  <input
                    type="text"
                    placeholder="Search by employee or reason"
                    value={historyFilter.search}
                    onChange={(e) =>
                      setHistoryFilter((prev) => ({
                        ...prev,
                        search: e.target.value,
                      }))
                    }
                  />
                </div>
                <select
                  value={historyFilter.status}
                  onChange={(e) =>
                    setHistoryFilter((prev) => ({
                      ...prev,
                      status: e.target.value,
                    }))
                  }
                >
                  <option value="all">All Status</option>
                  {STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <select
                  value={historyFilter.type}
                  onChange={(e) =>
                    setHistoryFilter((prev) => ({
                      ...prev,
                      type: e.target.value,
                    }))
                  }
                >
                  <option value="all">All Types</option>
                  {LEAVE_TYPES.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="history-list">
              {filteredHistory.length === 0 ? (
                <div className="empty-state">
                  No leave applications recorded.
                </div>
              ) : (
                filteredHistory.map((item) => {
                  const typeMeta = LEAVE_TYPES.find(
                    (type) => type.id === item.type,
                  );
                  return (
                    <div className="history-card" key={item.id}>
                      <div className="history-card-top">
                        <span
                          className="history-chip"
                          style={{
                            background: typeMeta.badge,
                            color: typeMeta.color,
                          }}
                        >
                          {typeMeta.short}
                        </span>
                        <span
                          className={`status-pill status-${item.status.toLowerCase()}`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <div className="history-card-body">
                        <div className="history-row">
                          <strong>{item.employee}</strong>
                          <span>{item.days} Day(s)</span>
                        </div>
                        <div className="history-row">
                          <span>
                            {formatDate(item.from)} - {formatDate(item.to)}
                          </span>
                          <span>Applied {formatDate(item.appliedOn)}</span>
                        </div>
                        <p>{item.reason}</p>
                      </div>
                      <div className="history-actions">
                        <button
                          className="btn btn-soft"
                          onClick={() => handleViewLeave(item, "history")}
                        >
                          <FaEye /> View
                        </button>
                        {item.status === "Pending" && (
                          <button
                            className="btn btn-danger"
                            onClick={() => handleCancelLeave(item)}
                          >
                            <FaTimes /> Cancel
                          </button>
                        )}
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleEditLeave(item)}
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleDeleteLeave(item)}
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>
        </section>

        <section className="attendance-section">
          <div className="panel attendance-summary-panel">
            <div className="panel-head">
              <div>
                <h2>Attendance Summary</h2>
                <p>Track your monthly attendance and recent records.</p>
              </div>
              <div className="attendance-actions">
                <button
                  className="btn btn-soft"
                  onClick={() => showToast("info", "Attendance refreshed")}
                >
                  Refresh
                </button>
              </div>
            </div>
            <div className="attendance-grid">
              <div className="attendance-card">
                <span>Present</span>
                <strong>{attendanceSummary.present}</strong>
              </div>
              <div className="attendance-card absent">
                <span>Absent</span>
                <strong>{attendanceSummary.absent}</strong>
              </div>
              <div className="attendance-card half-day">
                <span>Half Day</span>
                <strong>{attendanceSummary.halfDay}</strong>
              </div>
              <div className="attendance-card late">
                <span>Late</span>
                <strong>{attendanceSummary.late}</strong>
              </div>
            </div>
            <div className="attendance-table-wrap">
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Hours</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRows.map((row) => (
                    <tr key={row.date}>
                      <td>{formatDate(row.date)}</td>
                      <td>{row.checkIn}</td>
                      <td>{row.checkOut}</td>
                      <td>{row.hours}</td>
                      <td>
                        <span
                          className={`status-pill status-${row.status.toLowerCase().replace(" ", "-")}`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="team-section">
          <div className="panel team-panel">
            <div className="panel-head">
              <div>
                <h2>Team Leave Overview</h2>
                <p>View team leave counts and recent pending requests.</p>
              </div>
              <div className="team-stats">
                <div className="stat-box">
                  <span>Total Employees</span>
                  <strong>{EMPLOYEES.length}</strong>
                </div>
                <div className="stat-box">
                  <span>On Leave Today</span>
                  <strong>
                    {
                      teamLeaves.filter((item) => item.status === "Approved")
                        .length
                    }
                  </strong>
                </div>
                <div className="stat-box">
                  <span>Pending Requests</span>
                  <strong>
                    {
                      teamLeaves.filter((item) => item.status === "Pending")
                        .length
                    }
                  </strong>
                </div>
                <div className="stat-box">
                  <span>Approved Leaves</span>
                  <strong>
                    {
                      teamLeaves.filter((item) => item.status === "Approved")
                        .length
                    }
                  </strong>
                </div>
              </div>
            </div>
            <div className="team-table-wrap">
              <table className="team-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Department</th>
                    <th>Leave Type</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Days</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeamLeaves.map((leave) => {
                    const typeMeta = LEAVE_TYPES.find(
                      (type) => type.id === leave.type,
                    );
                    return (
                      <tr key={leave.id}>
                        <td>{leave.employee}</td>
                        <td>{leave.department}</td>
                        <td>{typeMeta?.short}</td>
                        <td>{formatDate(leave.from)}</td>
                        <td>{formatDate(leave.to)}</td>
                        <td>{leave.days}</td>
                        <td>
                          <span
                            className={`status-pill status-${leave.status.toLowerCase()}`}
                          >
                            {leave.status}
                          </span>
                        </td>
                        <td className="action-buttons">
                          {leave.status === "Pending" && (
                            <>
                              <button
                                className="action-btn approve"
                                onClick={() => handleApproveLeave(leave)}
                              >
                                <FaCheck />
                              </button>
                              <button
                                className="action-btn reject"
                                onClick={() => handleRejectLeave(leave)}
                              >
                                <FaTimes />
                              </button>
                            </>
                          )}
                          <button
                            className="action-btn view"
                            onClick={() => handleViewLeave(leave, "team")}
                          >
                            <FaEye />
                          </button>
                          <button
                            className="action-btn delete"
                            onClick={() => handleDeleteLeave(leave)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      {toast && (
        <div className={`toast ${toast.type}`}>
          <span>{toast.message}</span>
        </div>
      )}

      {currentModal && (
        <div className="modal-backdrop" onClick={() => setCurrentModal(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                {currentModal === "view"
                  ? "Leave Details"
                  : currentModal === "edit"
                    ? "Edit Leave"
                    : "Apply Leave"}
              </h3>
              <button
                className="modal-close"
                onClick={() => setCurrentModal(null)}
              >
                �
              </button>
            </div>
            <div className="modal-body">
              {currentModal === "view" && selectedLeave ? (
                <div className="detail-grid">
                  <div>
                    <strong>Employee</strong>
                    <span>{selectedLeave.employee}</span>
                  </div>
                  <div>
                    <strong>Leave Type</strong>
                    <span>
                      {
                        LEAVE_TYPES.find(
                          (type) => type.id === selectedLeave.type,
                        )?.name
                      }
                    </span>
                  </div>
                  <div>
                    <strong>Duration</strong>
                    <span>{selectedLeave.days} day(s)</span>
                  </div>
                  <div>
                    <strong>From</strong>
                    <span>{formatDate(selectedLeave.from)}</span>
                  </div>
                  <div>
                    <strong>To</strong>
                    <span>{formatDate(selectedLeave.to)}</span>
                  </div>
                  <div>
                    <strong>Applied On</strong>
                    <span>{formatDate(selectedLeave.appliedOn)}</span>
                  </div>
                  <div className="detail-full">
                    <strong>Reason</strong>
                    <p>{selectedLeave.reason}</p>
                  </div>
                </div>
              ) : (
                <div className="modal-form">
                  <div className="form-row">
                    <label>Leave Type</label>
                    <select
                      value={leaveForm.type}
                      onChange={(e) => updateLeaveForm("type", e.target.value)}
                    >
                      {LEAVE_TYPES.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-grid-2">
                    <div className="form-row">
                      <label>From Date</label>
                      <input
                        type="date"
                        value={leaveForm.from}
                        onChange={(e) =>
                          updateLeaveForm("from", e.target.value)
                        }
                      />
                    </div>
                    <div className="form-row">
                      <label>To Date</label>
                      <input
                        type="date"
                        value={leaveForm.to}
                        onChange={(e) => updateLeaveForm("to", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-row details-row">
                    <label>Total Days</label>
                    <div className="readonly-field">
                      {leaveForm.days} day(s)
                    </div>
                  </div>
                  <div className="form-row">
                    <label>Reason</label>
                    <textarea
                      value={leaveForm.reason}
                      onChange={(e) =>
                        updateLeaveForm("reason", e.target.value)
                      }
                      rows="3"
                    />
                  </div>
                  <div className="form-row">
                    <label>Upload Document</label>
                    <div className="file-upload modal-upload">
                      <input
                        type="file"
                        id="modal-file"
                        onChange={handleUploadDocument}
                      />
                      <label htmlFor="modal-file">
                        <FaUpload /> {leaveForm.documentName || "Choose file"}
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setCurrentModal(null)}
              >
                Close
              </button>
              {currentModal !== "view" ? (
                <button className="btn btn-primary" onClick={handleApplyLeave}>
                  Save
                </button>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LevesPortalSection;
