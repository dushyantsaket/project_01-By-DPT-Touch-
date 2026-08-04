import express from 'express';
import Inventory from '../models/Inventory.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

router.use(verifyAdmin);

// Get godown-wise inventory
router.get('/', async (req, res) => {
  try {
    const inventory = await Inventory.find().populate('product', 'name price').populate('godown', 'name');
    res.status(200).json({ success: true, data: inventory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
