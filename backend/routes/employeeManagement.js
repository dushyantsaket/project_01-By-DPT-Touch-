import express from "express";
import Employee from "../models/Employee.js";
import Attendance from "../models/Attendance.js";
import Leave from "../models/Leave.js";
import Task from "../models/Task.js";
import AuditLog from "../models/AuditLog.js";
import RolePermission from "../models/RolePermission.js";
import Order from "../models/Order.js";
import Lead from "../models/Lead.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// Helper to log audit actions
const logAction = async (req, action, moduleName, oldVal, newVal) => {
  try {
    const userAgent = req.headers["user-agent"] || "";
    let deviceName = "Unknown Device";
    if (userAgent.includes("Mobi")) deviceName = "Mobile Device";
    else if (userAgent.includes("Windows")) deviceName = "Windows PC";
    else if (userAgent.includes("Macintosh")) deviceName = "Mac Device";

    let browserName = "Unknown Browser";
    if (userAgent.includes("Chrome")) browserName = "Chrome";
    else if (userAgent.includes("Safari")) browserName = "Safari";
    else if (userAgent.includes("Firefox")) browserName = "Firefox";

    await AuditLog.create({
      userId: req.user ? req.user.username : "admin",
      username: req.user ? req.user.name || req.user.username : "Admin",
      role: req.user ? req.user.role : "admin",
      moduleName,
      actionType: action,
      oldValues: oldVal,
      newValues: newVal,
      ipAddress: req.ip || req.socket.remoteAddress,
      device: deviceName,
      browser: browserName,
    });
  } catch (err) {
    console.error("Audit logging failed:", err);
  }
};

// 1. List all employees
router.get("/list", protect, adminOnly, async (req, res) => {
  try {
    const { department, status, role, search } = req.query;
    const filter = {};

    if (department) filter.department = department;
    if (status) filter.status = status;
    if (role) filter.role = role;
    if (search) {
      filter.$or = [
        { fullName: new RegExp(search, "i") },
        { employeeId: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
        { mobile: new RegExp(search, "i") },
      ];
    }

    const employees = await Employee.find(filter).sort({ employeeId: 1 });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Create new employee
router.post("/create", protect, adminOnly, async (req, res) => {
  try {
    const data = req.body;
    if (!data.employeeId || !data.fullName || !data.email || !data.mobile || !data.salary || !data.department || !data.designation) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check unique employee ID
    const existsId = await Employee.findOne({ employeeId: data.employeeId.toUpperCase().trim() });
    if (existsId) {
      return res.status(400).json({ error: "Employee ID already exists" });
    }

    // Check unique email
    const existsEmail = await Employee.findOne({ email: data.email.toLowerCase().trim() });
    if (existsEmail) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Default password to "dpt@1234" if not specified
    if (!data.password) {
      data.password = "dpt@1234";
    }

    const employee = await Employee.create(data);
    await logAction(req, "Create", "Employee Master", null, { employeeId: employee.employeeId, name: employee.fullName });

    res.status(201).json({ message: "Employee registered successfully", employee });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Edit employee details
router.put("/edit/:id", protect, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    const oldValues = employee.toObject();

    // Prevent changing unique fields to duplicates
    if (data.email && data.email.toLowerCase() !== employee.email) {
      const emailExists = await Employee.findOne({ email: data.email.toLowerCase() });
      if (emailExists) return res.status(400).json({ error: "Email is already taken" });
    }

    // Update fields
    Object.assign(employee, data);
    await employee.save();

    await logAction(req, "Update", "Employee Master", { id: employee.employeeId }, data);

    res.json({ message: "Employee details updated", employee });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Suspend or Activate employee
router.patch("/status/:id", protect, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // "Active", "Suspended"

    if (!["Active", "Suspended", "Terminated"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const employee = await Employee.findById(id);
    if (!employee) return res.status(404).json({ error: "Employee not found" });

    const oldStatus = employee.status;
    employee.status = status;
    
    // Clear active sessions if suspended
    if (status !== "Active") {
      employee.activeSessions = [];
    }
    
    await employee.save();

    await logAction(req, "Update", "Employee Master Status", { employeeId: employee.employeeId, status: oldStatus }, { status });

    res.json({ message: `Employee status changed to ${status}`, employee });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Reset Password
router.post("/reset-password/:id", protect, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) return res.status(400).json({ error: "New password is required" });

    const employee = await Employee.findById(id);
    if (!employee) return res.status(404).json({ error: "Employee not found" });

    employee.password = newPassword; // Will trigger pre-save hashing
    employee.activeSessions = []; // Logout all sessions
    await employee.save();

    await logAction(req, "Update", "Employee Reset Password", { employeeId: employee.employeeId }, { action: "password_reset" });

    res.json({ message: "Employee password has been reset successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Delete Employee
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) return res.status(404).json({ error: "Employee not found" });

    await Employee.findByIdAndDelete(id);

    // Remove attendance & leaves too
    await Attendance.deleteMany({ employee: id });
    await Leave.deleteMany({ employee: id });
    await Task.deleteMany({ assignedTo: id });

    await logAction(req, "Delete", "Employee Master", { employeeId: employee.employeeId, name: employee.fullName }, null);

    res.json({ message: "Employee deleted successfully along with all related logs" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 7. Role & Permissions Management
router.get("/permissions", protect, adminOnly, async (req, res) => {
  try {
    const configs = await RolePermission.find();
    res.json(configs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/permissions", protect, adminOnly, async (req, res) => {
  try {
    const { role, permissions } = req.body;
    if (!role || !permissions) {
      return res.status(400).json({ error: "Role and Permissions array required" });
    }

    let config = await RolePermission.findOne({ role });
    let oldVal = null;
    if (!config) {
      config = new RolePermission({ role, permissions });
    } else {
      oldVal = config.permissions;
      config.permissions = permissions;
    }
    await config.save();

    // Propagate custom permissions to all active employees in this role
    await Employee.updateMany({ role }, { permissions });

    await logAction(req, "Update", "Role Permissions Config", { role, oldPermissions: oldVal }, { permissions });

    res.json({ message: "Permissions updated successfully", config });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. Audit Logs Access
router.get("/audit-logs", protect, adminOnly, async (req, res) => {
  try {
    const logs = await AuditLog.find().sort({ createdAt: -1 }).limit(500);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 9. Employee Analytics
router.get("/analytics", protect, adminOnly, async (req, res) => {
  try {
    // 1. Attendance percentage
    // 2. Task completion rate
    // 3. Top performers (using mock metrics or sales targets)
    const employees = await Employee.find({ status: "Active" }).lean();
    const employeeCount = employees.length;

    const data = await Promise.all(
      employees.map(async (emp) => {
        const totalTasks = await Task.countDocuments({ assignedTo: emp._id });
        const completedTasks = await Task.countDocuments({ assignedTo: emp._id, status: "Completed" });
        const attendanceDays = await Attendance.countDocuments({ employee: emp._id, status: "Present" });
        const lateDays = await Attendance.countDocuments({ employee: emp._id, lateEntry: true });
        
        // Calculate basic revenue from assigned orders
        const orders = await Order.find({ "assignedTo": emp._id, status: "delivered" }); // assume employee ID matching
        const revenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

        return {
          employeeId: emp.employeeId,
          fullName: emp.fullName,
          department: emp.department,
          designation: emp.designation,
          attendanceDays,
          lateDays,
          totalTasks,
          completedTasks,
          taskCompletionPct: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 100,
          revenueGenerated: revenue,
          performanceScore: emp.performanceScore || 100,
        };
      })
    );

    res.json({
      totalEmployees: employeeCount,
      employeeDetails: data,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 10. Generate Payroll Payslip Mock Data (Payroll engine)
router.post("/payroll/process", protect, adminOnly, async (req, res) => {
  try {
    const { employeeId, month, bonus, incentive, deductions, advance } = req.body;
    if (!employeeId || !month) return res.status(400).json({ error: "Employee ID and Month required" });

    const emp = await Employee.findOne({ employeeId: employeeId.toUpperCase().trim() });
    if (!emp) return res.status(404).json({ error: "Employee not found" });

    const basicSalary = emp.salary || 0;
    const netSalary = basicSalary + Number(bonus || 0) + Number(incentive || 0) - Number(deductions || 0) - Number(advance || 0);

    const payslip = {
      employeeId: emp.employeeId,
      fullName: emp.fullName,
      department: emp.department,
      designation: emp.designation,
      month,
      basicSalary,
      bonus: Number(bonus || 0),
      incentive: Number(incentive || 0),
      deductions: Number(deductions || 0),
      advance: Number(advance || 0),
      netSalary,
      createdAt: new Date(),
    };

    // Store in audit logs as mock archive
    await logAction(req, "Create", "Payroll Release", null, payslip);

    res.json({ message: "Salary processed successfully", payslip });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/leaves", protect, adminOnly, async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("employee", "employeeId fullName department designation photo")
      .sort({ createdAt: -1 });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/leaves/:id", protect, adminOnly, async (req, res) => {
  try {
    const { status, managerComment } = req.body;
    if (!["Approved", "Rejected", "Pending"].includes(status)) {
      return res.status(400).json({ error: "Invalid leave status" });
    }

    const leave = await Leave.findById(req.params.id).populate("employee", "employeeId fullName");
    if (!leave) return res.status(404).json({ error: "Leave request not found" });

    const oldStatus = leave.status;
    leave.status = status;
    leave.managerComment = managerComment || leave.managerComment;
    await leave.save();

    await logAction(
      req,
      "Update",
      "Leave Request",
      { leaveId: leave._id, status: oldStatus },
      { status, managerComment, employee: leave.employee?.employeeId },
    );

    res.json({ message: `Leave ${status.toLowerCase()}`, leave });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/tasks", protect, adminOnly, async (req, res) => {
  try {
    const { taskName, description, priority, deadline, assignedTo } = req.body;
    if (!taskName || !assignedTo) {
      return res.status(400).json({ error: "Task title and employee are required" });
    }

    const employee = await Employee.findById(assignedTo);
    if (!employee) return res.status(404).json({ error: "Employee not found" });

    const task = await Task.create({
      taskName,
      description,
      priority,
      deadline,
      assignedTo,
      assignedBy: req.user?.username || req.user?.name || "Admin",
    });

    await logAction(
      req,
      "Create",
      "Task Assignment",
      null,
      { taskName, assignedTo: employee.employeeId, deadline, priority },
    );

    res.status(201).json({ message: "Task assigned successfully", task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/tasks", protect, adminOnly, async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "employeeId fullName department designation photo")
      .sort({ deadline: 1, createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
