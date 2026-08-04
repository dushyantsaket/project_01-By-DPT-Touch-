import express from 'express';
import Invoice from '../models/Invoice.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

router.use(verifyAdmin);

// Create Invoice
router.post('/', async (req, res) => {
  try {
    const invoice = new Invoice(req.body);
    await invoice.save();
    res.status(201).json({ success: true, data: invoice });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get all Invoices
router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find().populate('party', 'name phone email').sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: invoices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get Dashboard Analytics (Last 365 Days)
router.get('/analytics', async (req, res) => {
  try {
    const oneYearAgo = new Date();
    oneYearAgo.setDate(oneYearAgo.getDate() - 365);
    
    const invoices = await Invoice.find({ date: { $gte: oneYearAgo } });
    
    // Simple sum calculation for demo
    const totalSales = invoices.reduce((sum, inv) => sum + inv.grandTotal, 0);
    const totalInvoices = invoices.length;

    res.status(200).json({ 
      success: true, 
      data: {
        totalSales,
        totalInvoices,
        last365DaysCount: invoices.length
      } 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single Invoice
router.get('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate('party');
    if (!invoice) return res.status(404).json({ success: false, message: 'Invoice not found' });
    res.status(200).json({ success: true, data: invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Generate PDF for Invoice
router.get('/:id/pdf', async (req, res) => {
  try {
    // Note: Use a library like pdfkit or puppeteer here to generate PDF
    // For now returning a placeholder response
    res.status(200).json({ success: true, message: 'PDF Generation logic goes here.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
