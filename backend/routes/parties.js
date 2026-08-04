import express from 'express';
import Party from '../models/Party.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// Apply admin middleware to all routes
router.use(verifyAdmin);

// Create Party
router.post('/', async (req, res) => {
  try {
    const party = new Party(req.body);
    await party.save();
    res.status(201).json({ success: true, data: party });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get all Parties
router.get('/', async (req, res) => {
  try {
    const parties = await Party.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: parties });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single Party
router.get('/:id', async (req, res) => {
  try {
    const party = await Party.findById(req.params.id);
    if (!party) return res.status(404).json({ success: false, message: 'Party not found' });
    res.status(200).json({ success: true, data: party });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update Party
router.put('/:id', async (req, res) => {
  try {
    const party = await Party.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!party) return res.status(404).json({ success: false, message: 'Party not found' });
    res.status(200).json({ success: true, data: party });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete Party
router.delete('/:id', async (req, res) => {
  try {
    const party = await Party.findByIdAndDelete(req.params.id);
    if (!party) return res.status(404).json({ success: false, message: 'Party not found' });
    res.status(200).json({ success: true, message: 'Party deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
