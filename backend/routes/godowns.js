import express from 'express';
import Godown from '../models/Godown.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

router.use(verifyAdmin);

// Create Godown
router.post('/', async (req, res) => {
  try {
    const godown = new Godown(req.body);
    await godown.save();
    res.status(201).json({ success: true, data: godown });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get all Godowns
router.get('/', async (req, res) => {
  try {
    const godowns = await Godown.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: godowns });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
