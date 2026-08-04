import express from "express";
import Attendance from "../models/Attendance.js";
import Leave from "../models/Leave.js";
import Task from "../models/Task.js";
import Announcement from "../models/Announcement.js";
import Message from "../models/Message.js";
import Order from "../models/Order.js";
import Lead from "../models/Lead.js";
import Employee from "../models/Employee.js";
import AuditLog from "../models/AuditLog.js";
import { verifyEmployee } from "./employee.js";

const router = express.Router();

// Helper to log audit actions
const logAction = async (employee, action, moduleName, oldVal, newVal, req) => {
  try {
    await AuditLog.create({
      userId: employee.employeeId,
      username: employee.fullName,
      role: employee.role,
      moduleName,
      actionType: action,
      oldValues: oldVal,
      newValues: newVal,
      ipAddress: req.ip || req.socket.remoteAddress,
      device: req.headers["user-agent"] ? (req.headers["user-agent"].includes("Mobi") ? "Mobile" : "PC") : "Unknown",
      browser: "Web Browser",
    });
  } catch (err) {
    console.error("Audit logging failed:", err);
  }
};

// ── ATTENDANCE MODULE ───────────────────────────────────────────────────

// Check In
router.post("/attendance/check-in", verifyEmployee, async (req, res) => {
  try {
    const employee = req.employee;
    const { latitude, longitude } = req.body;
    const todayStr = new Date().toISOString().split("T")[0];

    let attendance = await Attendance.findOne({ employee: employee._id, date: todayStr });
    if (attendance) {
      return res.status(400).json({ error: "Already checked in today" });
    }

    // Check if late (Shift: 9:30 AM default)
    const now = new Date();
    const shiftStart = new Date();
    shiftStart.setHours(9, 30, 0, 0);
    const lateEntry = now > shiftStart;

    attendance = await Attendance.create({
      employee: employee._id,
      date: todayStr,
      checkIn: now,
      checkInLocation: { latitude, longitude },
      lateEntry,
      status: lateEntry ? "Late" : "Present",
    });

    await logAction(employee, "Create", "Attendance", null, { checkIn: now, lateEntry }, req);

    res.json({ message: "Checked in successfully", attendance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Break
router.post("/attendance/break-start", verifyEmployee, async (req, res) => {
  try {
    const employee = req.employee;
    const todayStr = new Date().toISOString().split("T")[0];

    const attendance = await Attendance.findOne({ employee: employee._id, date: todayStr });
    if (!attendance || !attendance.checkIn) {
      return res.status(400).json({ error: "Must check in first" });
    }

    if (attendance.checkOut) {
      return res.status(400).json({ error: "Already checked out today" });
    }

    // Verify last break is closed
    const activeBreak = attendance.breaks.find(b => !b.end);
    if (activeBreak) {
      return res.status(400).json({ error: "Break already in progress" });
    }

    attendance.breaks.push({ start: new Date() });
    await attendance.save();

    res.json({ message: "Break started", attendance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// End Break
router.post("/attendance/break-end", verifyEmployee, async (req, res) => {
  try {
    const employee = req.employee;
    const todayStr = new Date().toISOString().split("T")[0];

    const attendance = await Attendance.findOne({ employee: employee._id, date: todayStr });
    if (!attendance) return res.status(400).json({ error: "No attendance log found" });

    const activeBreak = attendance.breaks.find(b => !b.end);
    if (!activeBreak) {
      return res.status(400).json({ error: "No active break to end" });
    }

    activeBreak.end = new Date();
    
    // Recalculate total break duration in minutes
    let totalMinutes = 0;
    attendance.breaks.forEach(b => {
      if (b.start && b.end) {
        totalMinutes += Math.round((new Date(b.end) - new Date(b.start)) / 60000);
      }
    });
    attendance.breakTime = totalMinutes;

    await attendance.save();
    res.json({ message: "Break ended", attendance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Check Out
router.post("/attendance/check-out", verifyEmployee, async (req, res) => {
  try {
    const employee = req.employee;
    const { latitude, longitude } = req.body;
    const todayStr = new Date().toISOString().split("T")[0];

    const attendance = await Attendance.findOne({ employee: employee._id, date: todayStr });
    if (!attendance || !attendance.checkIn) {
      return res.status(400).json({ error: "Must check in first" });
    }
    if (attendance.checkOut) {
      return res.status(400).json({ error: "Already checked out today" });
    }

    const now = new Date();
    attendance.checkOut = now;
    attendance.checkOutLocation = { latitude, longitude };

    // Close open break if any
    const activeBreak = attendance.breaks.find(b => !b.end);
    if (activeBreak) {
      activeBreak.end = now;
    }

    // Recalculate break time
    let totalBreakMinutes = 0;
    attendance.breaks.forEach(b => {
      if (b.start && b.end) {
        totalBreakMinutes += Math.round((new Date(b.end) - new Date(b.start)) / 60000);
      }
    });
    attendance.breakTime = totalBreakMinutes;

    // Calculate total working hours (decimal hours)
    const rawHours = (now - new Date(attendance.checkIn)) / 3600000;
    const breakHours = totalBreakMinutes / 60;
    const workingHours = Math.max(0, rawHours - breakHours);
    attendance.workingHours = Math.round(workingHours * 100) / 100;

    // Calculate overtime (standard shift is 8 hours)
    if (workingHours > 8) {
      attendance.overtime = Math.round((workingHours - 8) * 100) / 100;
    }

    // Check early exit (Shift end: 6:00 PM)
    const shiftEnd = new Date();
    shiftEnd.setHours(18, 0, 0, 0);
    attendance.earlyExit = now < shiftEnd;

    await attendance.save();

    await logAction(employee, "Update", "Attendance", { checkIn: attendance.checkIn }, { checkOut: now, workingHours: attendance.workingHours }, req);

    res.json({ message: "Checked out successfully", attendance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get My Attendance Logs
router.get("/attendance/logs", verifyEmployee, async (req, res) => {
  try {
    const logs = await Attendance.find({ employee: req.employee._id }).sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ── LEAVE MANAGEMENT MODULE ─────────────────────────────────────────────

// Apply Leave
router.post("/leave/apply", verifyEmployee, async (req, res) => {
  try {
    const { leaveType, reason, fromDate, toDate, attachment } = req.body;
    if (!leaveType || !reason || !fromDate || !toDate) {
      return res.status(400).json({ error: "Missing leave fields" });
    }

    const leave = await Leave.create({
      employee: req.employee._id,
      leaveType,
      reason,
      fromDate,
      toDate,
      attachment,
    });

    await logAction(req.employee, "Create", "Leave Request", null, { leaveId: leave._id, type: leaveType }, req);

    res.status(201).json({ message: "Leave applied successfully", leave });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Leave History
router.get("/leave/history", verifyEmployee, async (req, res) => {
  try {
    const history = await Leave.find({ employee: req.employee._id }).sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Leave Balances
router.get("/leave/balances", verifyEmployee, async (req, res) => {
  // Static HR balances minus approved leaves
  try {
    const leaves = await Leave.find({ employee: req.employee._id, status: "Approved" });
    
    const balance = {
      casual: 12,
      sick: 8,
      paid: 10,
      emergency: 5,
    };

    leaves.forEach(l => {
      const days = Math.round((new Date(l.toDate) - new Date(l.fromDate)) / (1000 * 60 * 60 * 24)) + 1;
      if (l.leaveType.includes("Casual")) balance.casual = Math.max(0, balance.casual - days);
      else if (l.leaveType.includes("Sick")) balance.sick = Math.max(0, balance.sick - days);
      else if (l.leaveType.includes("Paid")) balance.paid = Math.max(0, balance.paid - days);
      else if (l.leaveType.includes("Emergency")) balance.emergency = Math.max(0, balance.emergency - days);
    });

    res.json(balance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ── TASK MANAGEMENT MODULE ──────────────────────────────────────────────

// Get My Tasks
router.get("/tasks", verifyEmployee, async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.employee._id }).sort({ deadline: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Task Status & Proof
router.patch("/tasks/:id/status", verifyEmployee, async (req, res) => {
  try {
    const { status, proofAttachment, completionComment } = req.body;
    const task = await Task.findOne({ _id: req.params.id, assignedTo: req.employee._id });
    if (!task) return res.status(404).json({ error: "Task not found" });

    const oldStatus = task.status;
    task.status = status;
    if (proofAttachment) task.proofAttachment = proofAttachment;
    if (completionComment) task.completionComment = completionComment;

    await task.save();
    await logAction(req.employee, "Update", "Task", { taskId: task._id, status: oldStatus }, { status, completionComment }, req);

    res.json({ message: "Task status updated successfully", task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ── PERSONAL TO-DO LIST ─────────────────────────────────────────────────

// Personal To-Do is saved on the Employee model under dynamic parameters or we can use local storage simulation.
// To keep things database persistent, we can create mock storage in memory or store on the Employee object.
// Let's create an array on the employee record for To-Do if needed.
// Better yet, we can support simple CRUD on Employee model by adding a `todoList` schema.
// Since we didn't add it in the schema, let's allow saving it in a custom array on Employee model.
// Let's define the routes:
router.get("/todo", verifyEmployee, async (req, res) => {
  try {
    // If not exists, return empty array
    res.json(req.employee.todoList || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/todo/create", verifyEmployee, async (req, res) => {
  try {
    const { title, dueDate, priority, reminder } = req.body;
    const employee = req.employee;
    
    if (!employee.todoList) employee.todoList = [];

    const newTodo = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      dueDate,
      priority: priority || "Medium",
      reminder: !!reminder,
      completed: false,
    };

    // Since we dynamically append, let's mark the field as modified
    employee.todoList = [...(employee.todoList || []), newTodo];
    employee.markModified("todoList");
    await employee.save();

    res.json({ message: "To-do item created", todo: newTodo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/todo/:id", verifyEmployee, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, dueDate, priority, reminder, completed } = req.body;
    const employee = req.employee;

    const todoIndex = (employee.todoList || []).findIndex(t => t.id === id);
    if (todoIndex === -1) return res.status(404).json({ error: "Item not found" });

    const todo = employee.todoList[todoIndex];
    if (title !== undefined) todo.title = title;
    if (dueDate !== undefined) todo.dueDate = dueDate;
    if (priority !== undefined) todo.priority = priority;
    if (reminder !== undefined) todo.reminder = reminder;
    if (completed !== undefined) todo.completed = completed;

    employee.markModified("todoList");
    await employee.save();

    res.json({ message: "To-do updated", todo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/todo/:id", verifyEmployee, async (req, res) => {
  try {
    const { id } = req.params;
    const employee = req.employee;

    employee.todoList = (employee.todoList || []).filter(t => t.id !== id);
    employee.markModified("todoList");
    await employee.save();

    res.json({ message: "To-do deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ── ORDER & LEAD ASSIGNMENTS ────────────────────────────────────────────

// Get Assigned Orders
router.get("/assigned-orders", verifyEmployee, async (req, res) => {
  try {
    // Return orders where assignedTo = employee._id
    const orders = await Order.find({ assignedTo: req.employee._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Assigned Order Status
router.patch("/assigned-orders/:id", verifyEmployee, async (req, res) => {
  try {
    const { status, deliveryProof } = req.body; // status: "SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"
    const order = await Order.findOne({ _id: req.params.id, assignedTo: req.employee._id });
    if (!order) return res.status(404).json({ error: "Order not assigned to you" });

    const oldStatus = order.orderStatus;
    order.orderStatus = status;
    order.deliveryStatus = status;
    
    if (status === "DELIVERED") {
      order.deliveredAt = new Date();
      order.paymentStatus = "COMPLETED"; // auto mark paid on COD deliver
    }

    if (deliveryProof) {
      order.orderNotes = (order.orderNotes || "") + `\nProof of delivery uploaded: ${deliveryProof}`;
    }

    await order.save();
    await logAction(req.employee, "Update", "Order Status (Employee)", { orderId: order.orderId, status: oldStatus }, { status }, req);

    res.json({ message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Assigned Leads
router.get("/assigned-leads", verifyEmployee, async (req, res) => {
  try {
    // Match by full name since Lead holds assignedTo as String (Name)
    const leads = await Lead.find({
      $or: [
        { assignedTo: req.employee.fullName },
        { assignedTo: req.employee.employeeId }
      ]
    }).sort({ updatedAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Assigned Lead Status
router.patch("/assigned-leads/:id", verifyEmployee, async (req, res) => {
  try {
    const { status, callStatus, meetingStatus, interestLevel, followUpDate, notes } = req.body;
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ error: "Lead not found" });

    const oldStatus = lead.status;
    if (status) lead.status = status;
    if (notes) {
      lead.notes = (lead.notes || "") + `\nUpdate: ${notes}`;
      lead.leadNotes.push({ note: notes, by: req.employee.fullName, at: new Date() });
    }

    await lead.save();

    await logAction(
      req.employee,
      "Update",
      "Lead Status (Employee)",
      { leadId: lead.leadId, status: oldStatus },
      { status, callStatus, meetingStatus, interestLevel, followUpDate },
      req
    );

    res.json({ message: "Lead updated successfully", lead });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ── INTERNAL CHAT MODULE ────────────────────────────────────────────────

// Fetch chat messages
router.get("/messages/:receiverId", verifyEmployee, async (req, res) => {
  try {
    const { receiverId } = req.params;
    const employeeIdStr = req.employee._id.toString();

    // Query messages where sender is current employee and receiver is target, or vice versa
    const messages = await Message.find({
      $or: [
        { senderId: employeeIdStr, receiverId: receiverId },
        { senderId: receiverId, receiverId: employeeIdStr },
        { senderId: req.employee.employeeId, receiverId: receiverId }, // backup check
        { senderId: receiverId, receiverId: req.employee.employeeId },
      ],
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Send Chat Message
router.post("/messages/send", verifyEmployee, async (req, res) => {
  try {
    const { receiverId, receiverModel, message, attachment } = req.body;
    if (!receiverId || (!message && !attachment)) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const newMessage = await Message.create({
      senderId: req.employee._id.toString(),
      senderModel: "Employee",
      receiverId,
      receiverModel: receiverModel || "Admin",
      message,
      attachment,
    });

    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ── ANNOUNCEMENTS MODULE ───────────────────────────────────────────────

router.get("/announcements", verifyEmployee, async (req, res) => {
  try {
    const list = await Announcement.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin-level Announcements Creator (mounted in HR for convenience)
router.post("/announcements/create", async (req, res) => {
  try {
    const { title, content, type, createdBy } = req.body;
    if (!title || !content) return res.status(400).json({ error: "Title and Content required" });

    const item = await Announcement.create({ title, content, type, createdBy });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
