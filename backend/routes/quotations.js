import express from 'express';
import Quotation from '../models/Quotation.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

router.use(verifyAdmin);

// Create Quotation
router.post('/', async (req, res) => {
  try {
    const quotation = new Quotation(req.body);
    await quotation.save();
    res.status(201).json({ success: true, data: quotation });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get all Quotations
router.get('/', async (req, res) => {
  try {
    const quotations = await Quotation.find().populate('party', 'name phone email').sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: quotations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single Quotation
router.get('/:id', async (req, res) => {
  try {
    const quotation = await Quotation.findById(req.params.id).populate('party');
    if (!quotation) return res.status(404).json({ success: false, message: 'Quotation not found' });
    res.status(200).json({ success: true, data: quotation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
