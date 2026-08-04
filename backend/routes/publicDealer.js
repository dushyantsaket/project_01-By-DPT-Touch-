import express from "express";
import DealerApplication from "../models/DealerApplication.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

const allowedUpdateFields = [
  "fullName",
  "phone",
  "email",
  "shopName",
  "gstNumber",
  "panNumber",
  "address",
  "state",
  "city",
  "pincode",
  "website",
  "productCategories",
  "currentBrands",
  "monthlySales",
  "deliveryVehicles",
  "bankDetails",
  "salesGoal",
  "marketingSupport",
  "growthNotes",
  "applicationStep",
  "verificationSent",
  "verified",
];

const sanitizeUpdate = (body) => {
  const safeData = {};
  for (const key of Object.keys(body)) {
    if (allowedUpdateFields.includes(key)) {
      safeData[key] = body[key];
    }
  }
  return safeData;
};

// Public: create or update draft dealer application
router.post(
  "/draft",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("phone").notEmpty().withMessage("Phone required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, errors: errors.array() });

    try {
      const draftData = sanitizeUpdate(req.body);
      const existing = await DealerApplication.findOne({
        email: draftData.email,
        phone: draftData.phone,
        isDeleted: false,
      });
      if (existing) {
        const updated = await DealerApplication.findByIdAndUpdate(
          existing._id,
          { $set: draftData },
          { new: true },
        );
        return res.json({
          success: true,
          data: updated,
          message: "Draft application updated",
        });
      }

      const newDraft = await DealerApplication.create({
        ...draftData,
        status: "pending",
      });
      return res
        .status(201)
        .json({
          success: true,
          data: newDraft,
          message: "Draft application created",
        });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
);

// Public: patch dealer application progress by id
router.patch("/:id", async (req, res) => {
  try {
    const data = sanitizeUpdate(req.body);
    const app = await DealerApplication.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { $set: data },
      { new: true },
    );
    if (!app)
      return res
        .status(404)
        .json({ success: false, error: "Application not found" });
    return res.json({ success: true, data: app });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Public: submit dealer application
router.post(
  "/",
  [
    body("fullName").notEmpty().withMessage("Full name required"),
    body("phone").notEmpty().withMessage("Phone required"),
    body("email").isEmail().withMessage("Valid email required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, errors: errors.array() });
    try {
      const data = sanitizeUpdate(req.body);
      const existing = await DealerApplication.findOne({
        email: data.email,
        phone: data.phone,
        isDeleted: false,
      });
      if (existing) {
        const updated = await DealerApplication.findByIdAndUpdate(
          existing._id,
          { $set: data },
          { new: true },
        );
        return res.json({
          success: true,
          data: updated,
          message: "Existing application updated",
        });
      }
      const app = await DealerApplication.create({
        ...data,
        status: "pending",
      });
      res.status(201).json({ success: true, data: app });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
);

export default router;
