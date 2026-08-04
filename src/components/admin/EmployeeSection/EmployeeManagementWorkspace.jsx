import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Users,
  UserPlus,
  ShieldAlert,
  Clock,
  Calendar,
  Briefcase,
  FileText,
  MapPin,
  TrendingUp,
  History,
  Search,
  RefreshCw,
  Plus,
  Trash2,
  Lock,
  Camera,
  Edit,
  Eye,
  ShieldCheck,
  AlertTriangle,
  UserX,
  UserCheck,
  KeyRound,
  ListChecks,
  TimerReset,
  PackageCheck,
  LayoutDashboard,
  CalendarCheck2,
  Coffee,
  Navigation,
  Wifi,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Paperclip,
  BatteryMedium,
  LogIn,
  LogOut,
  Sunrise,
  Sunset,
  Wallet,
} from "lucide-react";
import LeavesPortalSection from "../EmployeeSection/levesPoartalSection";
import DeliveryManagement from "../EmployeeSection/delevitymanagement";

// CSS import hata diya
import "../EmployeeSection/EmployeeManagementWorkspace.css";

const API = "/api";

const LEAVE_TYPES = [
  { code: "CL", label: "Casual Leave (CL)", icon: Calendar, tone: "blue" },
  { code: "SL", label: "Sick Leave (SL)", icon: Calendar, tone: "green" },
  {
    code: "EL",
    label: "Emergency Leave (EL)",
    icon: AlertTriangle,
    tone: "orange",
  },
  {
    code: "LWP",
    label: "Leave Without Pay (LWP)",
    icon: Wallet,
    tone: "purple",
  },
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function pad2(n) {
  return String(n).padStart(2, "0");
}

function toISODate(d) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function daysBetweenInclusive(fromStr, toStr) {
  if (!fromStr || !toStr) return 0;
  const from = new Date(fromStr);
  const to = new Date(toStr);
  const diff = Math.round((to - from) / (1000 * 60 * 60 * 24)) + 1;
  return diff > 0 ? diff : 0;
}

function buildCalendarGrid(monthDate) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells = [];
  for (let i = startWeekday - 1; i >= 0; i--) {
    cells.push({
      day: daysInPrevMonth - i,
      inMonth: false,
      dateKey: null,
    });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      day: d,
      inMonth: true,
      dateKey: `${year}-${pad2(month + 1)}-${pad2(d)}`,
    });
  }
  while (cells.length % 7 !== 0) {
    const nextDay = cells.length - (startWeekday + daysInMonth) + 1;
    cells.push({ day: nextDay, inMonth: false, dateKey: null });
  }
  return cells;
}

export default function EmployeeManagementWorkspace() {
  const token = localStorage.getItem("adminToken");
  const employeeToken = localStorage.getItem("employeeToken") || token;
  const currentEmployee = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("currentEmployee") || "null");
    } catch {
      return null;
    }
  }, []);

  const [activeSubTab, setActiveSubTab] = useState("list");
  const [employees, setEmployees] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [rolePermissions, setRolePermissions] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [assignedTasks, setAssignedTasks] = useState([]);

  // Search and Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [toast, setToast] = useState("");

  const [employeeForm, setEmployeeForm] = useState({
    employeeId: "",
    fullName: "",
    fatherName: "",
    motherName: "",
    dob: "",
    gender: "Male",
    bloodGroup: "O+",
    maritalStatus: "Single",
    mobile: "",
    alternateMobile: "",
    email: "",
    currentAddress: "",
    permanentAddress: "",
    emergencyContact: { name: "", relation: "", phone: "" },
    department: "Sales",
    designation: "Executive",
    joiningDate: "",
    salary: "",
    shift: "9:30 AM - 6:30 PM",
    reportingManager: "",
    employmentType: "Full Time",
    photo: "",
    role: "Sales Employee",
    password: "dpt@1234",
    permissions: ["Products", "Orders", "Customers", "Leads"],
  });

  const [taskForm, setTaskForm] = useState({
    taskName: "",
    description: "",
    priority: "Medium",
    deadline: "",
    assignedTo: "",
  });

  const [payrollForm, setPayrollForm] = useState({
    employeeId: "",
    month: "July 2026",
    bonus: 0,
    incentive: 0,
    deductions: 0,
    advance: 0,
  });

  const [customRolePerm, setCustomRolePerm] = useState({
    role: "Sales Employee",
    permissions: ["Products", "Billing", "Orders", "Customers", "Leads"],
  });

  // ---------- My Dashboard (Employee self-service) state ----------
  const [dashLoading, setDashLoading] = useState(false);
  const [todayStatus, setTodayStatus] = useState({
    status: "Not Clocked In",
    clockIn: null,
    breakStart: null,
    breakEnd: null,
    clockOut: null,
  });
  const [onBreak, setOnBreak] = useState(false);
  const [activeBreakType, setActiveBreakType] = useState(null);
  const [now, setNow] = useState(new Date());
  const [gpsInfo, setGpsInfo] = useState({
    lat: null,
    lng: null,
    accuracy: null,
    status: "Checking...",
  });
  const [dashCalendarMonth, setDashCalendarMonth] = useState(new Date());
  const [myAttendanceSummary, setMyAttendanceSummary] = useState({
    present: 0,
    absent: 0,
    leave: 0,
    late: 0,
    halfDay: 0,
  });

  // ---------- Leaves & Attendance (self-service) state ----------
  const [leaveForm, setLeaveForm] = useState({
    leaveType: "Sick Leave (SL)",
    fromDate: "",
    toDate: "",
    reason: "",
    attachmentName: "",
  });
  const [leaveBalances, setLeaveBalances] = useState([
    { code: "CL", label: "Casual Leave (CL)", available: 8, total: 12 },
    { code: "SL", label: "Sick Leave (SL)", available: 6, total: 10 },
    { code: "EL", label: "Emergency Leave (EL)", available: 3, total: 5 },
    { code: "LWP", label: "Leave Without Pay (LWP)", available: 2, total: 5 },
  ]);
  const [attCalendarMonth, setAttCalendarMonth] = useState(new Date());

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 4000);
  };

  // Live clock tick for dashboard
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Fetch admin HR data
  const fetchHRData = useCallback(async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      const empRes = await fetch(`${API}/employee-admin/list`, { headers });
      if (empRes.ok) setEmployees(await empRes.json());

      const auditRes = await fetch(`${API}/employee-admin/audit-logs`, {
        headers,
      });
      if (auditRes.ok) setAuditLogs(await auditRes.json());

      const analRes = await fetch(`${API}/employee-admin/analytics`, {
        headers,
      });
      if (analRes.ok) setAnalytics(await analRes.json());

      const permRes = await fetch(`${API}/employee-admin/permissions`, {
        headers,
      });
      if (permRes.ok) setRolePermissions(await permRes.json());

      const leaveRes = await fetch(`${API}/employee-admin/leaves`, { headers });
      if (leaveRes.ok) setLeaveRequests(await leaveRes.json());

      const attRes = await fetch(`${API}/employee-hr/attendance/logs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (attRes.ok) setAttendanceRecords(await attRes.json());

      const taskRes = await fetch(`${API}/employee-admin/tasks`, { headers });
      if (taskRes.ok) setAssignedTasks(await taskRes.json());
    } catch (err) {
      console.error("Error fetching admin HR data:", err);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchHRData();
    }
  }, [token, fetchHRData]);

  // Recompute this-month summary whenever attendanceRecords changes
  useEffect(() => {
    const monthKey = `${now.getFullYear()}-${pad2(now.getMonth() + 1)}`;
    const mine = attendanceRecords.filter((r) => {
      const empMatch =
        !currentEmployee ||
        r.employeeId === currentEmployee.employeeId ||
        r.employee === currentEmployee._id;
      const dateStr = (r.date || "").toString();
      return empMatch && dateStr.startsWith(monthKey);
    });
    setMyAttendanceSummary({
      present: mine.filter((r) => r.status === "Present").length,
      absent: mine.filter((r) => r.status === "Absent").length,
      leave: mine.filter((r) => r.status === "Leave").length,
      late: mine.filter((r) => r.status === "Late").length,
      halfDay: mine.filter((r) => r.status === "Half Day").length,
    });
  }, [attendanceRecords, currentEmployee, now]);

  // ---------- My Dashboard handlers ----------
  const handleRefreshGPS = () => {
    setGpsInfo((prev) => ({ ...prev, status: "Checking..." }));
    if (!navigator.geolocation) {
      setGpsInfo({
        lat: null,
        lng: null,
        accuracy: null,
        status: "Unavailable",
      });
      showToast("GPS not supported on this device");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsInfo({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: Math.round(pos.coords.accuracy),
          status: "Verified",
        });
      },
      () => {
        setGpsInfo({ lat: null, lng: null, accuracy: null, status: "Denied" });
        showToast("Location permission denied");
      },
    );
  };

  useEffect(() => {
    handleRefreshGPS();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const postAttendanceEvent = async (type) => {
    const headers = {
      Authorization: `Bearer ${employeeToken}`,
      "Content-Type": "application/json",
    };
    try {
      const res = await fetch(`${API}/employee-hr/attendance/${type}`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          latitude: gpsInfo.lat,
          longitude: gpsInfo.lng,
        }),
      });
      if (res.ok) fetchHRData();
    } catch (err) {
      console.error(`attendance ${type} failed`, err);
    }
  };

  const handleClockIn = () => {
    setTodayStatus((prev) => ({
      ...prev,
      status: "Present",
      clockIn: new Date(),
    }));
    showToast("Clocked in successfully!");
    postAttendanceEvent("clock-in");
  };

  const handleClockOut = () => {
    setTodayStatus((prev) => ({ ...prev, clockOut: new Date() }));
    showToast("Clocked out. Have a great evening!");
    postAttendanceEvent("clock-out");
  };

  const handleStartBreak = (type) => {
    if (todayStatus.status === "Not Clocked In") {
      showToast("Please clock in first");
      return;
    }
    setOnBreak(true);
    setActiveBreakType(type);
    setTodayStatus((prev) => ({ ...prev, breakStart: new Date() }));
    showToast(`${type} break started`);
    postAttendanceEvent("break-start");
  };

  const handleEndBreak = () => {
    setOnBreak(false);
    setTodayStatus((prev) => ({ ...prev, breakEnd: new Date() }));
    showToast("Break ended, welcome back!");
    postAttendanceEvent("break-end");
  };

  const workingSeconds = useMemo(() => {
    if (!todayStatus.clockIn) return 0;
    const end = todayStatus.clockOut || now;
    return Math.max(0, Math.floor((end - todayStatus.clockIn) / 1000));
  }, [todayStatus.clockIn, todayStatus.clockOut, now]);

  const formatDuration = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    return `${h}h ${pad2(m)}m`;
  };

  // ---------- Leaves & Attendance handlers ----------
  const totalLeaveDays = daysBetweenInclusive(
    leaveForm.fromDate,
    leaveForm.toDate,
  );

  const handleSubmitLeave = async (e) => {
    e.preventDefault();
    if (!leaveForm.fromDate || !leaveForm.toDate || !leaveForm.reason) {
      showToast("Please fill leave type, dates and reason");
      return;
    }
    const headers = {
      Authorization: `Bearer ${employeeToken}`,
      "Content-Type": "application/json",
    };
    const payload = {
      leaveType: leaveForm.leaveType,
      fromDate: leaveForm.fromDate,
      toDate: leaveForm.toDate,
      reason: leaveForm.reason,
      totalDays: totalLeaveDays,
    };
    try {
      const res = await fetch(`${API}/employee-hr/leaves`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });
      let saved = null;
      if (res.ok) saved = await res.json();
      showToast("Leave application submitted!");
      setLeaveRequests((prev) => [
        saved || {
          _id: `local-${Date.now()}`,
          ...payload,
          status: "Pending",
        },
        ...prev,
      ]);
      setLeaveForm({
        leaveType: "Sick Leave (SL)",
        fromDate: "",
        toDate: "",
        reason: "",
        attachmentName: "",
      });
    } catch (err) {
      showToast("Could not submit leave, saved locally.");
      setLeaveRequests((prev) => [
        { _id: `local-${Date.now()}`, ...payload, status: "Pending" },
        ...prev,
      ]);
    }
  };

  const handleAttachFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setLeaveForm((prev) => ({ ...prev, attachmentName: file.name }));
    }
  };

  // Handle Employee Create
  const handleCreateEmployee = async (e) => {
    e.preventDefault();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      const res = await fetch(`${API}/employee-admin/create`, {
        method: "POST",
        headers,
        body: JSON.stringify(employeeForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to register employee");

      showToast("Employee registered successfully!");
      setShowAddForm(false);
      resetEmployeeForm();
      fetchHRData();
    } catch (err) {
      showToast(err.message);
    }
  };

  // Handle Employee Edit
  const handleUpdateEmployee = async (e) => {
    e.preventDefault();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      const res = await fetch(`${API}/employee-admin/edit/${selectedEmp._id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(employeeForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update employee");

      showToast("Employee details updated!");
      setShowEditForm(false);
      resetEmployeeForm();
      fetchHRData();
    } catch (err) {
      showToast(err.message);
    }
  };

  // Suspend / Activate
  const handleToggleStatus = async (emp, newStatus) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      const res = await fetch(`${API}/employee-admin/status/${emp._id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        showToast(`Employee account set to ${newStatus}`);
        fetchHRData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Reset Password
  const handleResetPassword = async (empId) => {
    const newPass = window.prompt("Enter new password for employee:");
    if (!newPass) return;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      const res = await fetch(`${API}/employee-admin/reset-password/${empId}`, {
        method: "POST",
        headers,
        body: JSON.stringify({ newPassword: newPass }),
      });
      if (res.ok) {
        showToast("Employee password has been reset successfully.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete employee
  const handleDeleteEmployee = async (empId, name) => {
    if (
      !window.confirm(
        `Are you sure you want to delete employee "${name}"? This will delete all attendance/task records.`,
      )
    )
      return;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      const res = await fetch(`${API}/employee-admin/${empId}`, {
        method: "DELETE",
        headers,
      });
      if (res.ok) {
        showToast("Employee deleted.");
        fetchHRData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Update Role Permissions config
  const handleUpdateRolePermissions = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      const res = await fetch(`${API}/employee-admin/permissions`, {
        method: "PUT",
        headers,
        body: JSON.stringify(customRolePerm),
      });
      if (res.ok) {
        showToast("Permissions updated and propagated to all employees.");
        fetchHRData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Assign Task
  const handleAssignTask = async (e) => {
    e.preventDefault();
    if (!taskForm.assignedTo || !taskForm.taskName) {
      showToast("Please choose employee and task name");
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      const resTask = await fetch(`${API}/employee-admin/tasks`, {
        method: "POST",
        headers,
        body: JSON.stringify({ ...taskForm, createdBy: "Admin" }),
      });
      const data = await resTask.json();
      if (!resTask.ok) throw new Error(data.error || "Task assignment failed");

      showToast("Task assigned successfully!");
      setTaskForm({
        taskName: "",
        description: "",
        priority: "Medium",
        deadline: "",
        assignedTo: "",
      });
      fetchHRData();
    } catch (err) {
      showToast(err.message || "Task assignment failed");
    }
  };

  // Run payroll release
  const handleProcessPayroll = async (e) => {
    e.preventDefault();
    if (!payrollForm.employeeId) return;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      const res = await fetch(`${API}/employee-admin/payroll/process`, {
        method: "POST",
        headers,
        body: JSON.stringify(payrollForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      showToast(
        `Payslip generated for ${data.payslip.fullName}! Net Take-Home: Rs ${data.payslip.netSalary.toLocaleString()}`,
      );
      setPayrollForm({
        employeeId: "",
        month: "July 2026",
        bonus: 0,
        incentive: 0,
        deductions: 0,
        advance: 0,
      });
      fetchHRData();
    } catch (err) {
      showToast(err.message);
    }
  };

  // Approve / Reject Leave
  const handleUpdateLeaveStatus = async (leaveId, newStatus) => {
    const managerComment =
      window.prompt("Enter comment/remark for employee:") || "";
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      const res = await fetch(`${API}/employee-admin/leaves/${leaveId}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ status: newStatus, managerComment }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Leave update failed");
      showToast(`Leave status updated to ${newStatus}`);
      fetchHRData();
    } catch (err) {
      showToast(err.message || "Leave update failed");
    }
  };

  const resetEmployeeForm = () => {
    setEmployeeForm({
      employeeId: "",
      fullName: "",
      fatherName: "",
      motherName: "",
      dob: "",
      gender: "Male",
      bloodGroup: "O+",
      maritalStatus: "Single",
      mobile: "",
      alternateMobile: "",
      email: "",
      currentAddress: "",
      permanentAddress: "",
      emergencyContact: { name: "", relation: "", phone: "" },
      department: "Sales",
      designation: "Executive",
      joiningDate: "",
      salary: "",
      shift: "9:30 AM - 6:30 PM",
      reportingManager: "",
      employmentType: "Full Time",
      photo: "",
      role: "Sales Employee",
      password: "dpt@1234",
      permissions: ["Products", "Orders", "Customers", "Leads"],
    });
  };

  const openEdit = (emp) => {
    setSelectedEmp(emp);
    setEmployeeForm({
      employeeId: emp.employeeId || "",
      fullName: emp.fullName || "",
      fatherName: emp.fatherName || "",
      motherName: emp.motherName || "",
      dob: emp.dob ? new Date(emp.dob).toISOString().split("T")[0] : "",
      gender: emp.gender || "Male",
      bloodGroup: emp.bloodGroup || "O+",
      maritalStatus: emp.maritalStatus || "Single",
      mobile: emp.mobile || "",
      alternateMobile: emp.alternateMobile || "",
      email: emp.email || "",
      currentAddress: emp.currentAddress || "",
      permanentAddress: emp.permanentAddress || "",
      emergencyContact: emp.emergencyContact || {
        name: "",
        relation: "",
        phone: "",
      },
      department: emp.department || "Sales",
      designation: emp.designation || "Executive",
      joiningDate: emp.joiningDate
        ? new Date(emp.joiningDate).toISOString().split("T")[0]
        : "",
      salary: emp.salary || "",
      shift: emp.shift || "9:30 AM - 6:30 PM",
      reportingManager: emp.reportingManager || "",
      employmentType: emp.employmentType || "Full Time",
      photo: emp.photo || "",
      role: emp.role || "Sales Employee",
      password: "",
      permissions: emp.permissions || [
        "Products",
        "Orders",
        "Customers",
        "Leads",
      ],
    });
    setShowEditForm(true);
    setActiveSubTab("form");
  };

  // Filtered employees
  const filteredEmployees = employees.filter((emp) => {
    const matchSearch =
      emp.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.employeeId?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDept = deptFilter === "all" || emp.department === deptFilter;
    const matchStatus = statusFilter === "all" || emp.status === statusFilter;
    return matchSearch && matchDept && matchStatus;
  });

  const departments = [
    "Sales",
    "Store",
    "HR",
    "Accounts",
    "Inventory",
    "IT",
    "Technical",
  ];
  const employeeRoles = [
    "Sales Employee",
    "Store Employee",
    "Accountant",
    "Technician",
    "Delivery Executive",
    "Manager",
    "Inventory Manager",
  ];
  const modules = [
    "Products",
    "Billing",
    "Orders",
    "Inventory",
    "Purchase",
    "Employees",
    "Reports",
    "Analytics",
    "Warranty",
    "Dispatch",
    "GST",
    "Repair",
    "Inverter Section",
  ];
  const todayKey = new Date().toISOString().split("T")[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowKey = tomorrow.toISOString().split("T")[0];
  const monthAgo = new Date();
  monthAgo.setDate(monthAgo.getDate() - 30);
  const taskStats = {
    today: assignedTasks.filter(
      (task) => task.deadline?.slice(0, 10) === todayKey,
    ).length,
    tomorrow: assignedTasks.filter(
      (task) => task.deadline?.slice(0, 10) === tomorrowKey,
    ).length,
    month: assignedTasks.filter(
      (task) => new Date(task.createdAt || task.assignedDate) >= monthAgo,
    ).length,
    onTime: assignedTasks.filter(
      (task) =>
        task.status === "Completed" &&
        (!task.deadline || new Date(task.updatedAt) <= new Date(task.deadline)),
    ).length,
  };

  const dashCells = buildCalendarGrid(dashCalendarMonth);
  const attCells = buildCalendarGrid(attCalendarMonth);

  const attendanceStatusForDate = (dateKey) => {
    const rec = attendanceRecords.find(
      (r) => (r.date || "").slice(0, 10) === dateKey,
    );
    return rec?.status || null;
  };

  const pendingLeaves = leaveRequests.filter((l) => l.status === "Pending");

  return (
    <div className="hrms-workspace">
      {/* Toast popup */}
      {toast && (
        <div className="hrms-toast">
          <ShieldCheck size={16} />
          <span>{toast}</span>
        </div>
      )}

      {/* Title */}
      <div className="hrms-admin-header">
        <div>
          <span className="hrms-eyebrow">Admin Panel</span>
          <h1>Employee Management</h1>
          <h2>Staff Management Console</h2>
          <p>
            HRMS Portal for role permissions, payroll release, GPS trails, and
            audit logs.
          </p>
        </div>
        <div className="hrms-header-actions">
          <button
            type="button"
            className="hrms-btn hrms-btn-secondary"
            onClick={fetchHRData}
          >
            <RefreshCw size={15} /> Refresh
          </button>
          <button
            type="button"
            className="hrms-btn hrms-btn-primary"
            onClick={() => {
              resetEmployeeForm();
              setSelectedEmp(null);
              setShowAddForm(true);
              setShowEditForm(false);
              setActiveSubTab("form");
            }}
          >
            <UserPlus size={15} /> Add Employee
          </button>
        </div>
      </div>

      {/* Sub Tabs navigation */}
      <div className="hrms-tabs-card">
        <div className="hrms-tabs">
          {[
            { id: "mydashboard", label: "My Dashboard", icon: LayoutDashboard },
            { id: "list", label: "Employee List", icon: Users },
            {
              id: "form",
              label: showEditForm ? "Edit Profile" : "Add Profile",
              icon: UserPlus,
              hidden: !showAddForm && !showEditForm,
            },
            { id: "permissions", label: "Role Permissions", icon: ShieldAlert },
            { id: "attendance", label: "Attendance Calendar", icon: Clock },
            {
              id: "leaveattendance",
              label: "Leaves & Attendance",
              icon: CalendarCheck2,
            },
            { id: "leaves", label: "Leave Requests", icon: Calendar },
            { id: "portal", label: "Leaves Portal", icon: Calendar },
            { id: "tasks", label: "Task Allocator", icon: Briefcase },
            { id: "payroll", label: "Payroll Releases", icon: FileText },
            { id: "gps", label: "GPS Tracking", icon: MapPin },
            { id: "delivery", label: "Delivery Section", icon: MapPin },
            { id: "analytics", label: "Analytics Dashboard", icon: TrendingUp },
            { id: "audit", label: "Audit Logs", icon: History },
          ].map((sub) => {
            if (sub.hidden) return null;
            const Icon = sub.icon;
            const isSelected = activeSubTab === sub.id;
            return (
              <button
                key={sub.id}
                type="button"
                className={`hrms-tab ${isSelected ? "is-active" : ""}`}
                onClick={() => setActiveSubTab(sub.id)}
              >
                <Icon size={14} />
                <span>{sub.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 0: My Dashboard (Employee self-service, mirrors image 2) */}
      {activeSubTab === "mydashboard" && (
        <div className="hrmsd-grid">
          {/* Today's overview */}
          <div className="hrmsd-card hrmsd-overview">
            <div className="hrmsd-card-head">
              <span className="hrmsd-eyebrow">Today's Overview</span>
            </div>
            <h3 className="hrmsd-greeting">
              Good{" "}
              {now.getHours() < 12
                ? "Morning"
                : now.getHours() < 17
                  ? "Afternoon"
                  : "Evening"}
              ,
              <br />
              {currentEmployee?.fullName || "Employee"}
            </h3>
            <p className="hrmsd-sub">
              Employee ID : {currentEmployee?.employeeId || "—"}
              <br />
              Department : {currentEmployee?.department || "—"}
            </p>

            <div className="hrmsd-shift-box">
              <span>Today's Shift</span>
              <strong>{currentEmployee?.shift || "9:00 AM - 6:00 PM"}</strong>
            </div>

            <div className="hrmsd-time-box">
              <span>Current Time</span>
              <strong>{now.toLocaleTimeString()}</strong>
            </div>

            <div className="hrmsd-status-row">
              <span>Today's Status</span>
              <span
                className={`hrms-status status-${todayStatus.status.toLowerCase().replace(/\s+/g, "")}`}
              >
                {todayStatus.status}
              </span>
            </div>

            {todayStatus.status === "Not Clocked In" ? (
              <button
                className="hrmsd-clock-btn"
                type="button"
                onClick={handleClockIn}
              >
                <LogIn size={16} /> Clock In
              </button>
            ) : !todayStatus.clockOut ? (
              <button
                className="hrmsd-clock-btn hrmsd-clock-out"
                type="button"
                onClick={handleClockOut}
              >
                <LogOut size={16} /> Clock Out
              </button>
            ) : (
              <div className="hrmsd-done-note">Shift completed for today ✓</div>
            )}
          </div>

          {/* GPS Verification */}
          <div className="hrmsd-card">
            <div className="hrmsd-card-head">
              <h4>GPS Verification</h4>
              <span
                className={`hrmsd-pill ${gpsInfo.status === "Verified" ? "is-good" : ""}`}
              >
                {gpsInfo.status === "Verified"
                  ? "Location Enabled"
                  : gpsInfo.status}
              </span>
            </div>
            <div className="hrmsd-kv">
              <span>Latitude</span>
              <strong>{gpsInfo.lat ? gpsInfo.lat.toFixed(6) : "—"}</strong>
            </div>
            <div className="hrmsd-kv">
              <span>Longitude</span>
              <strong>{gpsInfo.lng ? gpsInfo.lng.toFixed(6) : "—"}</strong>
            </div>
            <div className="hrmsd-kv">
              <span>Accuracy</span>
              <strong>
                {gpsInfo.accuracy ? `${gpsInfo.accuracy} Meter` : "—"}
              </strong>
            </div>
            <div className="hrmsd-kv">
              <span>Location Status</span>
              <strong className="hrmsd-ok">
                <CheckCircle2 size={13} /> {gpsInfo.status}
              </strong>
            </div>
            <button
              type="button"
              className="hrms-btn hrms-btn-secondary hrmsd-full"
              onClick={handleRefreshGPS}
            >
              <Navigation size={14} /> Refresh Location
            </button>

            <div className="hrmsd-selfie-row">
              <div className="hrmsd-selfie-avatar">
                <Camera size={16} />
              </div>
              <div>
                <strong>Selfie Verification</strong>
                <p>Optional face check for this clock-in</p>
              </div>
            </div>
          </div>

          {/* Today's Attendance timeline */}
          <div className="hrmsd-card">
            <div className="hrmsd-card-head">
              <h4>Today's Attendance</h4>
            </div>
            <ul className="hrmsd-timeline">
              <li className={todayStatus.clockIn ? "is-done" : ""}>
                <Sunrise size={14} />
                <span>Clock In</span>
                <strong>
                  {todayStatus.clockIn
                    ? todayStatus.clockIn.toLocaleTimeString()
                    : "--:--"}
                </strong>
              </li>
              <li className={todayStatus.breakStart ? "is-done" : ""}>
                <Coffee size={14} />
                <span>Break Start</span>
                <strong>
                  {todayStatus.breakStart
                    ? todayStatus.breakStart.toLocaleTimeString()
                    : "--:--"}
                </strong>
              </li>
              <li className={todayStatus.breakEnd ? "is-done" : ""}>
                <Coffee size={14} />
                <span>Break End</span>
                <strong>
                  {todayStatus.breakEnd
                    ? todayStatus.breakEnd.toLocaleTimeString()
                    : "--:--"}
                </strong>
              </li>
              <li className={todayStatus.clockOut ? "is-done" : ""}>
                <Sunset size={14} />
                <span>Clock Out</span>
                <strong>
                  {todayStatus.clockOut
                    ? todayStatus.clockOut.toLocaleTimeString()
                    : "--:--"}
                </strong>
              </li>
            </ul>
            <div className="hrmsd-hours-row">
              <div>
                <span>Working Time</span>
                <strong>{formatDuration(workingSeconds)}</strong>
              </div>
              <div>
                <span>Status</span>
                <strong>{todayStatus.status}</strong>
              </div>
            </div>
          </div>

          {/* Take Break */}
          <div className="hrmsd-card">
            <div className="hrmsd-card-head">
              <h4>Take Break</h4>
            </div>
            <div className="hrmsd-break-grid">
              {["Lunch", "Tea", "Meeting", "Personal"].map((b) => (
                <button
                  key={b}
                  type="button"
                  className={`hrmsd-break-btn ${activeBreakType === b && onBreak ? "is-active" : ""}`}
                  onClick={() => handleStartBreak(b)}
                  disabled={onBreak}
                >
                  <Coffee size={16} />
                  {b}
                </button>
              ))}
            </div>
            {onBreak ? (
              <button
                type="button"
                className="hrmsd-break-cta hrmsd-break-end"
                onClick={handleEndBreak}
              >
                End Break
              </button>
            ) : (
              <button
                type="button"
                className="hrmsd-break-cta"
                onClick={() => handleStartBreak("General")}
              >
                Start Break
              </button>
            )}
          </div>

          {/* Attendance summary this month */}
          <div className="hrmsd-card">
            <div className="hrmsd-card-head">
              <h4>Attendance Summary</h4>
              <span className="hrmsd-pill">This Month</span>
            </div>
            <div className="hrmsd-summary-grid">
              <div className="hrmsd-summary-box tone-green">
                <span>Present</span>
                <strong>{myAttendanceSummary.present}</strong>
              </div>
              <div className="hrmsd-summary-box tone-red">
                <span>Absent</span>
                <strong>{myAttendanceSummary.absent}</strong>
              </div>
              <div className="hrmsd-summary-box tone-blue">
                <span>Leave</span>
                <strong>{myAttendanceSummary.leave}</strong>
              </div>
              <div className="hrmsd-summary-box tone-orange">
                <span>Late</span>
                <strong>{myAttendanceSummary.late}</strong>
              </div>
              <div className="hrmsd-summary-box tone-purple">
                <span>Half Day</span>
                <strong>{myAttendanceSummary.halfDay}</strong>
              </div>
            </div>
          </div>

          {/* Monthly calendar */}
          <div className="hrmsd-card hrmsd-calendar-card">
            <div className="hrmsd-card-head">
              <h4>Monthly Attendance</h4>
              <div className="hrmsd-month-nav">
                <button
                  type="button"
                  onClick={() =>
                    setDashCalendarMonth(
                      new Date(
                        dashCalendarMonth.getFullYear(),
                        dashCalendarMonth.getMonth() - 1,
                        1,
                      ),
                    )
                  }
                >
                  <ChevronLeft size={14} />
                </button>
                <span>
                  {dashCalendarMonth.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setDashCalendarMonth(
                      new Date(
                        dashCalendarMonth.getFullYear(),
                        dashCalendarMonth.getMonth() + 1,
                        1,
                      ),
                    )
                  }
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
            <div className="hrmsd-cal-weekdays">
              {WEEKDAYS.map((w) => (
                <span key={w}>{w}</span>
              ))}
            </div>
            <div className="hrmsd-cal-grid">
              {dashCells.map((cell, i) => {
                const status = cell.dateKey
                  ? attendanceStatusForDate(cell.dateKey)
                  : null;
                const isToday = cell.dateKey === toISODate(new Date());
                return (
                  <div
                    key={i}
                    className={`hrmsd-cal-cell ${cell.inMonth ? "" : "is-muted"} ${
                      status
                        ? `status-${status.toLowerCase().replace(/\s+/g, "")}`
                        : ""
                    } ${isToday ? "is-today" : ""}`}
                  >
                    {cell.day}
                  </div>
                );
              })}
            </div>
            <div className="hrmsd-legend">
              <span className="legend-dot tone-green" /> Present
              <span className="legend-dot tone-red" /> Absent
              <span className="legend-dot tone-blue" /> Leave
              <span className="legend-dot tone-orange" /> Late
            </div>
          </div>

          {/* Live location */}
          <div className="hrmsd-card">
            <div className="hrmsd-card-head">
              <h4>Live Location</h4>
              <span className="hrmsd-pill is-good">Live</span>
            </div>
            <div className="hrmsd-map-placeholder">
              <MapPin size={32} />
              <p>
                {gpsInfo.lat
                  ? `${gpsInfo.lat.toFixed(4)}, ${gpsInfo.lng.toFixed(4)}`
                  : "Locating..."}
              </p>
            </div>
            <div className="hrmsd-kv">
              <span>Current Position</span>
              <strong>{currentEmployee?.department || "At Office"}</strong>
            </div>
            <div className="hrmsd-kv">
              <span>Network</span>
              <strong>
                <Wifi size={12} /> Online
              </strong>
            </div>
          </div>

          {/* Leave balance quick view */}
          <div className="hrmsd-card">
            <div className="hrmsd-card-head">
              <h4>Leave Balance</h4>
            </div>
            {leaveBalances.map((lb) => (
              <div className="hrmsd-leave-row" key={lb.code}>
                <span>{lb.label}</span>
                <strong>
                  {lb.available}/{lb.total}
                </strong>
              </div>
            ))}
            <button
              type="button"
              className="hrms-btn hrms-btn-secondary hrmsd-full"
              onClick={() => setActiveSubTab("leaveattendance")}
            >
              Apply / View Leaves
            </button>
          </div>
        </div>
      )}

      {/* Tab: Leaves & Attendance (self-service, mirrors image 1) */}
      {activeSubTab === "leaveattendance" && (
        <div className="hrmsl-wrap">
          <div className="hrmsl-header">
            <div>
              <h3>Leaves &amp; Attendance</h3>
              <p>Apply for leave, track status, and view your leave history.</p>
            </div>
          </div>

          {/* Leave balance cards */}
          <div className="hrmsl-balance-grid">
            {leaveBalances.map((lb) => {
              const meta =
                LEAVE_TYPES.find((t) => t.code === lb.code) || LEAVE_TYPES[0];
              const Icon = meta.icon;
              return (
                <div className="hrmsl-balance-card" key={lb.code}>
                  <div className={`hrmsl-balance-icon tone-${meta.tone}`}>
                    <Icon size={18} />
                  </div>
                  <span className="hrmsl-balance-label">{lb.label}</span>
                  <strong className="hrmsl-balance-num">{lb.available}</strong>
                  <div className="hrmsl-balance-foot">
                    <span>Available</span>
                    <span>{lb.total}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hrmsl-two-col">
            {/* Apply Leave form */}
            <div className="hrmsl-card">
              <h4>Apply Leave</h4>
              <form onSubmit={handleSubmitLeave} className="hrmsl-form">
                <div className="hrmsl-field">
                  <label>Leave Type *</label>
                  <select
                    value={leaveForm.leaveType}
                    onChange={(e) =>
                      setLeaveForm((prev) => ({
                        ...prev,
                        leaveType: e.target.value,
                      }))
                    }
                  >
                    {LEAVE_TYPES.map((t) => (
                      <option key={t.code} value={t.label}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="hrmsl-field-row">
                  <div className="hrmsl-field">
                    <label>From Date *</label>
                    <input
                      type="date"
                      value={leaveForm.fromDate}
                      onChange={(e) =>
                        setLeaveForm((prev) => ({
                          ...prev,
                          fromDate: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div className="hrmsl-field">
                    <label>To Date *</label>
                    <input
                      type="date"
                      value={leaveForm.toDate}
                      onChange={(e) =>
                        setLeaveForm((prev) => ({
                          ...prev,
                          toDate: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>
                <div className="hrmsl-field">
                  <label>Total Days</label>
                  <input
                    type="text"
                    readOnly
                    value={`${totalLeaveDays} Day${totalLeaveDays === 1 ? "" : "s"}`}
                  />
                </div>
                <div className="hrmsl-field">
                  <label>Reason *</label>
                  <textarea
                    rows={3}
                    placeholder="Briefly explain your leave reason"
                    value={leaveForm.reason}
                    onChange={(e) =>
                      setLeaveForm((prev) => ({
                        ...prev,
                        reason: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="hrmsl-field">
                  <label>Attach Document (Optional)</label>
                  <label className="hrmsl-upload">
                    <Paperclip size={14} />
                    {leaveForm.attachmentName ||
                      "Click to upload or drag and drop"}
                    <input type="file" hidden onChange={handleAttachFile} />
                  </label>
                </div>
                <div className="hrmsl-form-actions">
                  <button
                    type="button"
                    className="hrms-btn hrms-btn-secondary"
                    onClick={() =>
                      setLeaveForm({
                        leaveType: "Sick Leave (SL)",
                        fromDate: "",
                        toDate: "",
                        reason: "",
                        attachmentName: "",
                      })
                    }
                  >
                    Cancel
                  </button>
                  <button type="submit" className="hrms-btn hrms-btn-primary">
                    Submit Leave
                  </button>
                </div>
              </form>
            </div>

            {/* Leave history */}
            <div className="hrmsl-card">
              <h4>Leave History</h4>
              <div className="hrmsl-history-list">
                {leaveRequests.map((lv) => (
                  <div className="hrmsl-history-item" key={lv._id}>
                    <div className="hrmsl-history-top">
                      <strong>{lv.leaveType}</strong>
                      <span
                        className={`hrms-status status-${(lv.status || "pending").toLowerCase()}`}
                      >
                        {lv.status}
                      </span>
                    </div>
                    <p>
                      From{" "}
                      {lv.fromDate
                        ? new Date(lv.fromDate).toLocaleDateString()
                        : "-"}{" "}
                      to{" "}
                      {lv.toDate
                        ? new Date(lv.toDate).toLocaleDateString()
                        : "-"}{" "}
                      · {lv.totalDays || 1} Day
                      {(lv.totalDays || 1) === 1 ? "" : "s"}
                    </p>
                    <p className="hrmsl-history-reason">Reason: {lv.reason}</p>
                  </div>
                ))}
                {leaveRequests.length === 0 && (
                  <div className="hrms-empty-state">
                    No leave applications yet.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* My Attendance */}
          <div className="hrmsl-card">
            <div className="hrmsd-card-head">
              <h4>My Attendance</h4>
              <div className="hrmsd-month-nav">
                <button
                  type="button"
                  onClick={() =>
                    setAttCalendarMonth(
                      new Date(
                        attCalendarMonth.getFullYear(),
                        attCalendarMonth.getMonth() - 1,
                        1,
                      ),
                    )
                  }
                >
                  <ChevronLeft size={14} />
                </button>
                <span>
                  {attCalendarMonth.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setAttCalendarMonth(
                      new Date(
                        attCalendarMonth.getFullYear(),
                        attCalendarMonth.getMonth() + 1,
                        1,
                      ),
                    )
                  }
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
            <div className="hrmsl-att-layout">
              <div>
                <div className="hrmsd-cal-weekdays">
                  {WEEKDAYS.map((w) => (
                    <span key={w}>{w}</span>
                  ))}
                </div>
                <div className="hrmsd-cal-grid">
                  {attCells.map((cell, i) => {
                    const status = cell.dateKey
                      ? attendanceStatusForDate(cell.dateKey)
                      : null;
                    const isToday = cell.dateKey === toISODate(new Date());
                    return (
                      <div
                        key={i}
                        className={`hrmsd-cal-cell ${cell.inMonth ? "" : "is-muted"} ${
                          status
                            ? `status-${status.toLowerCase().replace(/\s+/g, "")}`
                            : ""
                        } ${isToday ? "is-today" : ""}`}
                      >
                        {cell.day}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="hrmsl-att-stats">
                <div className="hrmsd-summary-box tone-green">
                  <span>Present</span>
                  <strong>{myAttendanceSummary.present}</strong>
                </div>
                <div className="hrmsd-summary-box tone-red">
                  <span>Absent</span>
                  <strong>{myAttendanceSummary.absent}</strong>
                </div>
                <div className="hrmsd-summary-box tone-purple">
                  <span>Half Day</span>
                  <strong>{myAttendanceSummary.halfDay}</strong>
                </div>
                <div className="hrmsd-summary-box tone-orange">
                  <span>Late</span>
                  <strong>{myAttendanceSummary.late}</strong>
                </div>
              </div>
            </div>

            <div className="hrmsl-recent-table">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.slice(0, 6).map((log) => (
                    <tr key={log._id}>
                      <td>{log.date}</td>
                      <td>
                        {log.checkIn
                          ? new Date(log.checkIn).toLocaleTimeString()
                          : "-"}
                      </td>
                      <td>
                        {log.checkOut
                          ? new Date(log.checkOut).toLocaleTimeString()
                          : "-"}
                      </td>
                      <td>
                        <span
                          className={`hrms-status status-${(log.status || "").toLowerCase().replace(/\s+/g, "")}`}
                        >
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {attendanceRecords.length === 0 && (
                    <tr>
                      <td colSpan="4">No attendance records yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Team Leave Overview (manager view) */}
          <div className="hrmsl-card">
            <div className="hrmsd-card-head">
              <h4>Team Leave Overview (Manager View)</h4>
              <span className="hrmsd-pill">
                {pendingLeaves.length} Pending Requests
              </span>
            </div>
            <div className="hrmsl-recent-table">
              <table>
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Leave Type</th>
                    <th>From - To</th>
                    <th>Days</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.map((lv) => (
                    <tr key={lv._id}>
                      <td>
                        {lv.employeeName ||
                          currentEmployee?.fullName ||
                          "Employee"}
                      </td>
                      <td>{lv.leaveType}</td>
                      <td>
                        {lv.fromDate
                          ? new Date(lv.fromDate).toLocaleDateString()
                          : "-"}{" "}
                        -{" "}
                        {lv.toDate
                          ? new Date(lv.toDate).toLocaleDateString()
                          : "-"}
                      </td>
                      <td>{lv.totalDays || 1}</td>
                      <td>{lv.reason}</td>
                      <td>
                        <span
                          className={`hrms-status status-${(lv.status || "pending").toLowerCase()}`}
                        >
                          {lv.status}
                        </span>
                      </td>
                      <td className="hrms-row-actions">
                        {lv.status === "Pending" && (
                          <>
                            <button
                              type="button"
                              onClick={() =>
                                handleUpdateLeaveStatus(lv._id, "Approved")
                              }
                            >
                              <CheckCircle2 size={13} />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleUpdateLeaveStatus(lv._id, "Rejected")
                              }
                            >
                              <UserX size={13} />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                  {leaveRequests.length === 0 && (
                    <tr>
                      <td colSpan="7">No leave requests to review.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 1: Employee List */}
      {activeSubTab === "list" && (
        <div className="hrms-section-stack">
          {/* Filters */}
          <div className="hrms-filter-card">
            <div className="hrms-search-field">
              <Search size={15} />
              <input
                type="text"
                placeholder="Search by Employee ID or Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
            >
              <option value="all">All Departments</option>
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
              <option value="Terminated">Terminated</option>
            </select>
          </div>

          {/* List Table */}
          <div className="hrms-card hrms-table-card">
            <table>
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Dept / Desg</th>
                  <th>Mobile</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp) => (
                  <tr key={emp._id}>
                    <td>{emp.employeeId}</td>
                    <td>
                      <img
                        className="hrms-avatar"
                        src={
                          emp.photo ||
                          "https://cdn-icons-png.flaticon.com/128/912/912318.png"
                        }
                      />
                      <div>
                        <strong>{emp.fullName}</strong>
                        <p>{emp.email}</p>
                      </div>
                    </td>
                    <td>
                      <strong>{emp.department}</strong>
                      <p>
                        {emp.designation} ({emp.employmentType})
                      </p>
                    </td>
                    <td>{emp.mobile}</td>
                    <td>
                      <span
                        className={`hrms-status status-${(emp.status || "unknown").toLowerCase()}`}
                      >
                        {emp.status}
                      </span>
                    </td>
                    <td className="hrms-row-actions">
                      <button
                        type="button"
                        title="Edit employee"
                        onClick={() => openEdit(emp)}
                      >
                        <Edit size={12} />
                      </button>
                      <button
                        type="button"
                        title="Reset password"
                        onClick={() => handleResetPassword(emp._id)}
                      >
                        <Lock size={12} />
                      </button>
                      {emp.status === "Active" ? (
                        <button
                          type="button"
                          title="Suspend employee"
                          onClick={() => handleToggleStatus(emp, "Suspended")}
                        >
                          <UserX size={12} />
                        </button>
                      ) : (
                        <button
                          type="button"
                          title="Activate employee"
                          onClick={() => handleToggleStatus(emp, "Active")}
                        >
                          <UserCheck size={12} />
                        </button>
                      )}
                      <button
                        type="button"
                        title="Delete employee"
                        onClick={() =>
                          handleDeleteEmployee(emp._id, emp.fullName)
                        }
                      >
                        <Trash2 size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredEmployees.length === 0 && (
                  <tr>
                    <td colSpan="6">No employees registered.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Create / Edit Form */}
      {activeSubTab === "form" && (
        <div className="hrms-section-stack">
          <div className="hrms-card">
            <div className="hrms-card-title-row">
              <div>
                <h3>
                  {showEditForm
                    ? "Edit Employee Profile"
                    : "Register New Employee"}
                </h3>
                <p className="hrms-card-subtitle">
                  Manage employee credentials, roles, permissions, and contact
                  details.
                </p>
              </div>
            </div>

            <form
              className="hrms-form"
              onSubmit={
                showEditForm ? handleUpdateEmployee : handleCreateEmployee
              }
            >
              {/* 1. Official Details */}
              <div>
                <h4>1. Official Details</h4>
                <div>
                  <div>
                    <label>Employee ID</label>
                    <input
                      type="text"
                      placeholder="e.g. EMP102"
                      value={employeeForm.employeeId}
                      onChange={(e) =>
                        setEmployeeForm((prev) => ({
                          ...prev,
                          employeeId: e.target.value,
                        }))
                      }
                      required
                      disabled={showEditForm}
                    />
                  </div>
                  <div>
                    <label>Department</label>
                    <select
                      value={employeeForm.department}
                      onChange={(e) =>
                        setEmployeeForm((prev) => ({
                          ...prev,
                          department: e.target.value,
                        }))
                      }
                    >
                      {departments.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label>Designation</label>
                    <input
                      type="text"
                      placeholder="e.g. Sales Executive"
                      value={employeeForm.designation}
                      onChange={(e) =>
                        setEmployeeForm((prev) => ({
                          ...prev,
                          designation: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <div>
                    <label>Employment Type</label>
                    <select
                      value={employeeForm.employmentType}
                      onChange={(e) =>
                        setEmployeeForm((prev) => ({
                          ...prev,
                          employmentType: e.target.value,
                        }))
                      }
                    >
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Intern">Intern</option>
                    </select>
                  </div>
                  <div>
                    <label>Joining Date</label>
                    <input
                      type="date"
                      value={employeeForm.joiningDate}
                      onChange={(e) =>
                        setEmployeeForm((prev) => ({
                          ...prev,
                          joiningDate: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <label>Shift Hours</label>
                    <input
                      type="text"
                      placeholder="9:30 AM - 6:30 PM"
                      value={employeeForm.shift}
                      onChange={(e) =>
                        setEmployeeForm((prev) => ({
                          ...prev,
                          shift: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label>Monthly Basic Salary (INR)</label>
                    <input
                      type="number"
                      placeholder="45000"
                      value={employeeForm.salary}
                      onChange={(e) =>
                        setEmployeeForm((prev) => ({
                          ...prev,
                          salary: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <div>
                    <label>Employee Login Role</label>
                    <select
                      value={employeeForm.role}
                      onChange={(e) =>
                        setEmployeeForm((prev) => ({
                          ...prev,
                          role: e.target.value,
                        }))
                      }
                    >
                      {employeeRoles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label>Login Password</label>
                    <div>
                      <KeyRound size={14} />
                      <input
                        type="text"
                        placeholder={
                          showEditForm ? "Leave blank to keep same" : "dpt@1234"
                        }
                        value={employeeForm.password}
                        onChange={(e) =>
                          setEmployeeForm((prev) => ({
                            ...prev,
                            password: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <p>Employee can login with</p>
                    <p>
                      ID: {employeeForm.employeeId || "EMP ID"} | Password:{" "}
                      {employeeForm.password || "Saved password"}
                    </p>
                  </div>
                </div>

                <div>
                  <label>Visible Modules For This Employee</label>
                  <div>
                    {modules.map((module) => {
                      const checked =
                        employeeForm.permissions?.includes(module);
                      return (
                        <label key={module}>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => {
                              const current = employeeForm.permissions || [];
                              const updated = checked
                                ? current.filter((item) => item !== module)
                                : [...current, module];
                              setEmployeeForm((prev) => ({
                                ...prev,
                                permissions: updated,
                              }));
                            }}
                          />
                          {module}
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 2. Personal Details */}
              <div>
                <h4>2. Personal Details</h4>
                <div>
                  <div>
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={employeeForm.fullName}
                      onChange={(e) =>
                        setEmployeeForm((prev) => ({
                          ...prev,
                          fullName: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <label>Father's Name</label>
                    <input
                      type="text"
                      value={employeeForm.fatherName}
                      onChange={(e) =>
                        setEmployeeForm((prev) => ({
                          ...prev,
                          fatherName: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label>DOB</label>
                    <input
                      type="date"
                      value={employeeForm.dob}
                      onChange={(e) =>
                        setEmployeeForm((prev) => ({
                          ...prev,
                          dob: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div>
                  <div>
                    <label>Gender</label>
                    <select
                      value={employeeForm.gender}
                      onChange={(e) =>
                        setEmployeeForm((prev) => ({
                          ...prev,
                          gender: e.target.value,
                        }))
                      }
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label>Blood Group</label>
                    <input
                      type="text"
                      placeholder="O+"
                      value={employeeForm.bloodGroup}
                      onChange={(e) =>
                        setEmployeeForm((prev) => ({
                          ...prev,
                          bloodGroup: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label>Marital Status</label>
                    <select
                      value={employeeForm.maritalStatus}
                      onChange={(e) =>
                        setEmployeeForm((prev) => ({
                          ...prev,
                          maritalStatus: e.target.value,
                        }))
                      }
                    >
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  </div>
                  <div>
                    <label>Profile Photo URL</label>
                    <input
                      type="text"
                      placeholder="https://image-url..."
                      value={employeeForm.photo}
                      onChange={(e) =>
                        setEmployeeForm((prev) => ({
                          ...prev,
                          photo: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              {/* 3. Contact details */}
              <div>
                <h4>3. Contact & Address</h4>
                <div>
                  <div>
                    <label>Mobile Number</label>
                    <input
                      type="text"
                      value={employeeForm.mobile}
                      onChange={(e) =>
                        setEmployeeForm((prev) => ({
                          ...prev,
                          mobile: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <label>Alternate Mobile</label>
                    <input
                      type="text"
                      value={employeeForm.alternateMobile}
                      onChange={(e) =>
                        setEmployeeForm((prev) => ({
                          ...prev,
                          alternateMobile: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={employeeForm.email}
                      onChange={(e) =>
                        setEmployeeForm((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <div>
                    <label>Current Address</label>
                    <input
                      type="text"
                      value={employeeForm.currentAddress}
                      onChange={(e) =>
                        setEmployeeForm((prev) => ({
                          ...prev,
                          currentAddress: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <label>Permanent Address</label>
                    <input
                      type="text"
                      value={employeeForm.permanentAddress}
                      onChange={(e) =>
                        setEmployeeForm((prev) => ({
                          ...prev,
                          permanentAddress: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setShowEditForm(false);
                    setActiveSubTab("list");
                  }}
                >
                  Cancel
                </button>
                <button type="submit">
                  {showEditForm ? "Save Profile Card" : "Register Employee"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tab 3: Role & Permissions */}
      {activeSubTab === "permissions" && (
        <div>
          {/* Permissions Form */}
          <div>
            <h3>Custom Role Permissions Matrix</h3>

            <div>
              <div>
                <label>Select Role</label>
                <select
                  value={customRolePerm.role}
                  onChange={(e) =>
                    setCustomRolePerm((prev) => ({
                      ...prev,
                      role: e.target.value,
                    }))
                  }
                >
                  <option value="Sales Employee">Sales Employee</option>
                  <option value="Store Employee">Store Employee</option>
                  <option value="Accountant">Accountant</option>
                  <option value="Technician">Technician</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>

              <div>
                <label>Module Access List</label>
                <div>
                  {modules.map((module) => {
                    const exists = customRolePerm.permissions.includes(module);
                    return (
                      <label key={module}>
                        <input
                          type="checkbox"
                          checked={exists}
                          onChange={() => {
                            const current = customRolePerm.permissions;
                            const updated = exists
                              ? current.filter((p) => p !== module)
                              : [...current, module];
                            setCustomRolePerm((prev) => ({
                              ...prev,
                              permissions: updated,
                            }));
                          }}
                        />
                        <span>{module}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <button type="button" onClick={handleUpdateRolePermissions}>
                Apply & Propagate Permissions
              </button>
            </div>
          </div>

          {/* Current Roles configurations */}
          <div>
            <h3>Active Roles Overview</h3>
            <div>
              {rolePermissions.map((rp) => (
                <div key={rp._id}>
                  <div>
                    <strong>{rp.role}</strong>
                    <span>{rp.permissions.length} modules</span>
                  </div>
                  <div>
                    {rp.permissions.map((p, i) => (
                      <span key={i}>{p}</span>
                    ))}
                  </div>
                </div>
              ))}
              {rolePermissions.length === 0 && (
                <div>No custom role setups configured yet.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Attendance Calendar */}
      {activeSubTab === "attendance" && (
        <div>
          <h3>Company Attendance logs</h3>

          <div>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Employee Name</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Hours Worked</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.map((log) => (
                  <tr key={log._id}>
                    <td>{log.date}</td>
                    <td>{log.employeeName || "Employee"}</td>
                    <td>
                      {log.checkIn
                        ? new Date(log.checkIn).toLocaleTimeString()
                        : "-"}
                    </td>
                    <td>
                      {log.checkOut
                        ? new Date(log.checkOut).toLocaleTimeString()
                        : "-"}
                    </td>
                    <td>{log.workingHours || 0} Hrs</td>
                    <td>
                      <span>{log.status}</span>
                    </td>
                  </tr>
                ))}
                {attendanceRecords.length === 0 && (
                  <tr>
                    <td colSpan="6">No attendance clockings logged today.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: Leave Requests */}
      {activeSubTab === "leaves" && (
        <div>
          <h3>Pending Staff Leaves applications</h3>

          <div>
            {leaveRequests.map((leave) => (
              <div key={leave._id}>
                <div>
                  <h4>
                    {leave.employeeName || "Employee"} ({leave.leaveType})
                  </h4>
                  <p>Reason: "{leave.reason}"</p>
                  <p>
                    Duration: {new Date(leave.fromDate).toLocaleDateString()} to{" "}
                    {new Date(leave.toDate).toLocaleDateString()}
                  </p>
                </div>
                {leave.status === "Pending" ? (
                  <div>
                    <button
                      onClick={() =>
                        handleUpdateLeaveStatus(leave._id, "Approved")
                      }
                    >
                      Approve Leave
                    </button>
                    <button
                      onClick={() =>
                        handleUpdateLeaveStatus(leave._id, "Rejected")
                      }
                    >
                      Reject Leave
                    </button>
                  </div>
                ) : (
                  <span>{leave.status}</span>
                )}
              </div>
            ))}
            {leaveRequests.length === 0 && (
              <div>No pending leave requests.</div>
            )}
          </div>
        </div>
      )}

      {/* Tab 6: Leaves Portal */}
      {activeSubTab === "portal" && (
        <div>
          <LeavesPortalSection />
        </div>
      )}

      {/* Tab 7: Task Allocator */}
      {activeSubTab === "tasks" && (
        <div className="hrms-task-layout">
          {/* Create Task form */}
          <div className="hrms-card hrms-task-form-card">
            <h3>Allocate New Task</h3>
            <form className="hrms-form" onSubmit={handleAssignTask}>
              <div className="hrms-field">
                <label>Task Title</label>
                <input
                  type="text"
                  placeholder="e.g. Audit Store Stock Qty"
                  value={taskForm.taskName}
                  onChange={(e) =>
                    setTaskForm((prev) => ({
                      ...prev,
                      taskName: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div className="hrms-field">
                <label>Description</label>
                <textarea
                  placeholder="Provide instructions..."
                  value={taskForm.description}
                  onChange={(e) =>
                    setTaskForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="hrms-form-grid">
                <div className="hrms-field">
                  <label>Priority</label>
                  <select
                    value={taskForm.priority}
                    onChange={(e) =>
                      setTaskForm((prev) => ({
                        ...prev,
                        priority: e.target.value,
                      }))
                    }
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className="hrms-field">
                  <label>Deadline</label>
                  <input
                    type="date"
                    value={taskForm.deadline}
                    onChange={(e) =>
                      setTaskForm((prev) => ({
                        ...prev,
                        deadline: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
              </div>

              <div className="hrms-field">
                <label>Assign to Employee</label>
                <select
                  value={taskForm.assignedTo}
                  onChange={(e) =>
                    setTaskForm((prev) => ({
                      ...prev,
                      assignedTo: e.target.value,
                    }))
                  }
                  required
                >
                  <option value="">-- Choose Staff --</option>
                  {employees.map((e) => (
                    <option key={e._id} value={e._id}>
                      {e.fullName} ({e.employeeId})
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="hrms-btn hrms-btn-primary hrms-submit-btn"
                type="submit"
              >
                <Briefcase size={15} /> Assign Task
              </button>
            </form>
          </div>

          {/* List of mock tasks assigned */}
          <div className="hrms-card hrms-task-board">
            <div className="hrms-card-title-row">
              <h3>Active Task Board</h3>
              <span>{assignedTasks.length} assigned tasks</span>
            </div>

            <div className="hrms-task-stats">
              {[
                { label: "Today", value: taskStats.today, icon: ListChecks },
                {
                  label: "Tomorrow",
                  value: taskStats.tomorrow,
                  icon: TimerReset,
                },
                {
                  label: "Last 30 Days",
                  value: taskStats.month,
                  icon: Calendar,
                },
                {
                  label: "On-Time Done",
                  value: taskStats.onTime,
                  icon: PackageCheck,
                },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div className="hrms-task-stat" key={stat.label}>
                    <div>
                      <span>{stat.label}</span>
                      <Icon size={15} />
                    </div>
                    <p>{stat.value}</p>
                  </div>
                );
              })}
            </div>

            <div className="hrms-task-list">
              {assignedTasks.map((task) => {
                const emp = task.assignedTo || {};
                const overdue =
                  task.status !== "Completed" &&
                  task.deadline &&
                  new Date(task.deadline) < new Date();
                return (
                  <div className="hrms-task-card" key={task._id}>
                    <div>
                      <div className="hrms-task-card-head">
                        <h4>{task.taskName}</h4>
                        <span
                          className={`hrms-priority priority-${(task.priority || "medium").toLowerCase()}`}
                        >
                          {task.priority}
                        </span>
                        {overdue && (
                          <span className="hrms-overdue">Overdue</span>
                        )}
                      </div>
                      <p>
                        {task.description || "No extra instructions added."}
                      </p>
                      <div className="hrms-task-meta">
                        <span>
                          Staff: {emp.fullName || "Employee"} (
                          {emp.employeeId || "-"})
                        </span>
                        <span>
                          Deadline:{" "}
                          {task.deadline
                            ? new Date(task.deadline).toLocaleDateString(
                                "en-IN",
                              )
                            : "No deadline"}
                        </span>
                        <span>Dept: {emp.department || "-"}</span>
                      </div>
                    </div>
                    <div className="hrms-task-status-box">
                      <span
                        className={`hrms-status status-${(task.status || "pending").toLowerCase().replace(/\s+/g, "")}`}
                      >
                        {task.status}
                      </span>
                      {task.completionComment && (
                        <p>{task.completionComment}</p>
                      )}
                    </div>
                  </div>
                );
              })}
              {assignedTasks.length === 0 && (
                <div className="hrms-empty-state">
                  No tasks assigned yet. Create the first task from the left
                  panel.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 7b: Payroll Releases */}
      {activeSubTab === "payroll" && (
        <div>
          {/* Payroll releasing form */}
          <div>
            <h3>Release Salary Payslip</h3>

            <form onSubmit={handleProcessPayroll}>
              <div>
                <label>Select Employee</label>
                <select
                  value={payrollForm.employeeId}
                  onChange={(e) =>
                    setPayrollForm((prev) => ({
                      ...prev,
                      employeeId: e.target.value,
                    }))
                  }
                  required
                >
                  <option value="">-- Choose Employee --</option>
                  {employees.map((e) => (
                    <option key={e._id} value={e.employeeId}>
                      {e.fullName} ({e.employeeId})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>Month & Year</label>
                <select
                  value={payrollForm.month}
                  onChange={(e) =>
                    setPayrollForm((prev) => ({
                      ...prev,
                      month: e.target.value,
                    }))
                  }
                >
                  <option value="July 2026">July 2026</option>
                  <option value="June 2026">June 2026</option>
                  <option value="May 2026">May 2026</option>
                </select>
              </div>

              <div>
                <div>
                  <label>Bonus release (INR)</label>
                  <input
                    type="number"
                    value={payrollForm.bonus}
                    onChange={(e) =>
                      setPayrollForm((prev) => ({
                        ...prev,
                        bonus: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label>Incentive release (INR)</label>
                  <input
                    type="number"
                    value={payrollForm.incentive}
                    onChange={(e) =>
                      setPayrollForm((prev) => ({
                        ...prev,
                        incentive: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div>
                <div>
                  <label>Deductions (INR)</label>
                  <input
                    type="number"
                    value={payrollForm.deductions}
                    onChange={(e) =>
                      setPayrollForm((prev) => ({
                        ...prev,
                        deductions: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label>Advance payment (INR)</label>
                  <input
                    type="number"
                    value={payrollForm.advance}
                    onChange={(e) =>
                      setPayrollForm((prev) => ({
                        ...prev,
                        advance: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <button type="submit">Release Salary Slip</button>
            </form>
          </div>

          {/* Salary release history (mock) */}
          <div>
            <h3>Payslip Releases History</h3>
            <div>
              Run payroll releases for any active employee card from left form.
            </div>
          </div>
        </div>
      )}

      {/* Tab 8: GPS Tracking */}
      {activeSubTab === "gps" && (
        <div>
          <h3>Live Staff GPS route logs</h3>

          <div>
            {/* List active GPS emitters */}
            <div>
              <strong>Online Staff</strong>
              {employees
                .filter((e) =>
                  [
                    "Sales Employee",
                    "Technician",
                    "Delivery Executive",
                  ].includes(e.role),
                )
                .map((e) => (
                  <div key={e._id}>
                    <div></div>
                    <div>
                      <h5>{e.fullName}</h5>
                      <p>{e.role}</p>
                    </div>
                  </div>
                ))}
            </div>

            {/* Mock map visual */}
            <div>
              <div>
                <MapPin size={45} />
                <h4>GPS Route Map Simulation</h4>
                <p>
                  Live coordinates receiving: New Delhi Node (28.6139° N,
                  77.2090° E)
                </p>
              </div>
              <div>
                <p>
                  Emitters logged: <strong>1 Online</strong>
                </p>
                <p>
                  Telemetry status: <strong>Connected</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 9: Delivery Section */}
      {activeSubTab === "delivery" && (
        <div>
          <DeliveryManagement />
        </div>
      )}

      {/* Tab 10: Analytics Dashboard */}
      {activeSubTab === "analytics" && (
        <div>
          <div>
            <div>
              <span>Top Department</span>
              <h3>Sales & CRM</h3>
            </div>
            <div>
              <span>Attendance rate</span>
              <h3>96.8 %</h3>
            </div>
            <div>
              <span>Active Task Rate</span>
              <h3>84.5 %</h3>
            </div>
            <div>
              <span>Total Monthly Payroll</span>
              <h3>Rs 45,000</h3>
            </div>
          </div>

          <div>
            <h3>Employee Performance metrics</h3>
            <div>
              {analytics?.employeeDetails?.map((det, i) => (
                <div key={i}>
                  <div>
                    <h4>
                      {det.fullName} ({det.employeeId})
                    </h4>
                    <p>
                      {det.designation} | Tasks done: {det.completedTasks}/
                      {det.totalTasks}
                    </p>
                  </div>
                  <div>
                    <strong>Score: {det.performanceScore} / 100</strong>
                    <p>
                      Total Sales: Rs {det.revenueGenerated.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
              {(!analytics ||
                !analytics.employeeDetails ||
                analytics.employeeDetails.length === 0) && (
                <div>Run employee tracking reports to generate metrics.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 11: Audit Logs */}
      {activeSubTab === "audit" && (
        <div>
          <h3>System Audit trails</h3>

          <div>
            {auditLogs.map((log) => (
              <div key={log._id}>
                <div>
                  <span>
                    Module: <strong>{log.moduleName}</strong>
                  </span>
                  <span>
                    Timestamp: {new Date(log.createdAt).toLocaleString()}
                  </span>
                </div>
                <div>
                  <span>
                    User:{" "}
                    <strong>
                      {log.username} ({log.role})
                    </strong>
                  </span>
                  <span>{log.actionType}</span>
                </div>
                {log.newValues && (
                  <p>Updated params: {JSON.stringify(log.newValues)}</p>
                )}
                <div>
                  <span>
                    Device: {log.device} ({log.browser})
                  </span>
                  <span>IP: {log.ipAddress}</span>
                </div>
              </div>
            ))}
            {auditLogs.length === 0 && (
              <div>No audit logs stored. All actions will appear here.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
