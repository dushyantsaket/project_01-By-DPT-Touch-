import express from 'express';
import WarrantyClaim from '../models/WarrantyClaim.js';

const router = express.Router();

router.post('/claims', async (req, res) => {
  try {
    const body = req.body || {};
    const claim = await WarrantyClaim.create({
      productName: body.productName,
      modelNo: body.modelNo,
      invoiceNo: body.invoiceNo,
      customerName: body.customerName || body.name || body.customerEmail?.split('@')[0] || 'Customer',
      customerEmail: body.customerEmail,
      contactPhone: body.contactPhone || body.phone,
      address: body.address,
      purchaseDate: body.purchaseDate || undefined,
      reasons: body.reasons || [],
      description: body.description || body.mainIssue,
      severity: body.severity || 'Medium',
      photos: body.photos || {},
      status: 'Pending',
    });

    res.status(201).json({ success: true, data: claim });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.get('/claims/:claimId', async (req, res) => {
  try {
    const claim = await WarrantyClaim.findOne({
      $or: [{ claimId: req.params.claimId }, { _id: req.params.claimId }],
    });
    if (!claim) return res.status(404).json({ success: false, error: 'Claim not found' });
    res.json({ success: true, data: claim });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
