import express from 'express';
import BuyLead from '../models/BuyLead.js';
import Order from '../models/Order.js';
import { dealerOnly, protect } from '../middleware/auth.js';

const router = express.Router();

const ok = (res, data, extra = {}) => res.json({ success: true, data, ...extra });
const fail = (res, status, message) => res.status(status).json({ success: false, error: message, message });

const paging = (query) => {
  const page = Math.max(Number(query.page || 1), 1);
  const limit = Math.min(Math.max(Number(query.limit || 20), 1), 100);
  return { page, limit, skip: (page - 1) * limit };
};

router.use(protect, dealerOnly);

router.get('/buyleads', async (req, res) => {
  try {
    const { page, limit, skip } = paging(req.query);
    const filter = { isDeleted: { $ne: true }, status: 'active' };
    if (req.query.category) filter.category = new RegExp(req.query.category, 'i');
    if (req.query.location) filter.location = new RegExp(req.query.location, 'i');
    if (req.query.tab === 'export') filter.isExport = true;

    const [leads, total] = await Promise.all([
      BuyLead.find(filter).sort({ relevanceScore: -1, createdAt: -1 }).skip(skip).limit(limit),
      BuyLead.countDocuments(filter),
    ]);
    ok(res, leads, { pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (error) {
    fail(res, 500, error.message);
  }
});

router.get('/buyleads/shortlisted', async (req, res) => {
  try {
    const leads = await BuyLead.find({
      shortlistedBy: req.user._id,
      isDeleted: { $ne: true },
      status: { $ne: 'deleted' },
    }).sort({ createdAt: -1 });
    ok(res, leads);
  } catch (error) {
    fail(res, 500, error.message);
  }
});

router.post('/buyleads/:id/shortlist', async (req, res) => {
  try {
    const lead = await BuyLead.findById(req.params.id);
    if (!lead || lead.isDeleted) return fail(res, 404, 'Buy lead not found');

    const userId = String(req.user._id);
    if (!lead.shortlistedBy.some((id) => String(id) === userId)) {
      lead.shortlistedBy.push(req.user._id);
      lead.shortlistCount = lead.shortlistedBy.length;
      await lead.save();
    }
    ok(res, lead);
  } catch (error) {
    fail(res, 400, error.message);
  }
});

router.delete('/buyleads/:id/shortlist', async (req, res) => {
  try {
    const lead = await BuyLead.findById(req.params.id);
    if (!lead || lead.isDeleted) return fail(res, 404, 'Buy lead not found');

    lead.shortlistedBy = lead.shortlistedBy.filter((id) => String(id) !== String(req.user._id));
    lead.shortlistCount = lead.shortlistedBy.length;
    await lead.save();
    ok(res, lead);
  } catch (error) {
    fail(res, 400, error.message);
  }
});

router.post('/buyleads/:id/interest', async (req, res) => {
  try {
    const lead = await BuyLead.findById(req.params.id);
    if (!lead || lead.isDeleted) return fail(res, 404, 'Buy lead not found');

    const existing = lead.interests.find((interest) => String(interest.dealerId) === String(req.user._id));
    if (existing) {
      existing.message = req.body.message || existing.message;
      existing.quotedPrice = req.body.quotedPrice ?? existing.quotedPrice;
      existing.expressedAt = new Date();
    } else {
      lead.interests.push({
        dealerId: req.user._id,
        dealerName: req.user.companyName || req.user.name,
        message: req.body.message,
        quotedPrice: req.body.quotedPrice,
      });
    }
    lead.interestCount = lead.interests.length;
    await lead.save();
    ok(res, lead);
  } catch (error) {
    fail(res, 400, error.message);
  }
});

router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find({ dealerId: req.user._id })
      .populate('customerId', 'name email phone')
      .populate('productId', 'name image price_inr')
      .sort({ createdAt: -1 });
    ok(res, orders);
  } catch (error) {
    fail(res, 500, error.message);
  }
});

router.put('/orders/:id/quote', async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, dealerId: req.user._id });
    if (!order) return fail(res, 404, 'Order not found');

    order.totalAmount = Number(req.body.quotedPrice || order.totalAmount || 0);
    order.status = 'quoted';
    order.timeline.push({
      status: 'quoted',
      changedBy: req.user._id,
      note: req.body.message || 'Dealer quote submitted',
    });
    await order.save();
    ok(res, order);
  } catch (error) {
    fail(res, 400, error.message);
  }
});

router.get('/transactions', async (req, res) => {
  try {
    const orders = await Order.find({ dealerId: req.user._id, status: { $in: ['accepted', 'delivered'] } })
      .populate('customerId', 'name email phone')
      .populate('productId', 'name image price_inr')
      .sort({ updatedAt: -1 });
    ok(res, orders);
  } catch (error) {
    fail(res, 500, error.message);
  }
});

export default router;
