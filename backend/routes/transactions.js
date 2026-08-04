import express from 'express';
import Transaction from '../models/Transaction.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

router.use(verifyAdmin);

// Create Transaction
router.post('/', async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).json({ success: true, data: transaction });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get all Transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
