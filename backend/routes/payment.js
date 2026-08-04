
import express from "express";
import crypto from "crypto";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import Cart from "../models/Cart.js"; // ADD THIS MISSING IMPORT
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Get payment options
router.get("/options", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate(
      "items.productId",
      "sellingPrice",
    );

    let amountPayable = 0;
    if (cart && cart.items.length > 0) {
      const sellingPriceTotal = cart.items.reduce(
        (sum, item) => sum + item.productId.sellingPrice * item.quantity,
        0,
      );
      amountPayable = sellingPriceTotal + 7; // platform fee
    }

    const paymentOptions = {
      recommended: {
        title: "Recommended for You",
        options: [
          {
            type: "COD",
            title: "Cash on Delivery",
            fee: Math.max(21, Math.ceil(amountPayable * 0.02)),
            message: `Due to handling costs, a nominal fee of ₹${Math.max(21, Math.ceil(amountPayable * 0.02))} will be charged`,
          },
        ],
      },
      onlinePayments: {
        title: "Online Payments",
        options: [
          {
            type: "CREDIT_CARD",
            title: "Credit / Debit / ATM Card",
            offers: "Save upto ₹406",
          },
          { type: "EMI", title: "EMI", subtext: "Credit Card EMI" },
          { type: "UPI", title: "UPI" },
        ],
      },
      giftCard: {
        title: "Have a Flipkart Gift Card?",
        addBtnText: "Add",
      },
    };

    res.json({ success: true, data: paymentOptions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Initiate payment
router.post("/initiate", protect, async (req, res) => {
  try {
    const { orderId, paymentMethod, cardDetails, upiId, emiDetails } = req.body;

    const order = await Order.findOne({ orderId, userId: req.user._id });
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    const payment = new Payment({
      orderId: order._id,
      userId: req.user._id,
      amount: order.amountPayable,
      method: paymentMethod,
      status: "INITIATED",
    });

    if (paymentMethod === "CREDIT_CARD" || paymentMethod === "DEBIT_CARD") {
      payment.cardLastFour = cardDetails?.lastFour;
      payment.cardType = cardDetails?.type;
      payment.cardNetwork = cardDetails?.network;
    } else if (paymentMethod === "UPI") {
      payment.upiId = upiId;
    } else if (paymentMethod === "EMI") {
      payment.emiBankCode = emiDetails?.bankCode;
      payment.emiTenure = emiDetails?.tenure;
      payment.emiMonthlyAmount = emiDetails?.monthlyAmount;
    }

    await payment.save();

    const paymentOrderId = `PAY_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`;
    payment.gatewayOrderId = paymentOrderId;
    await payment.save();

    res.json({
      success: true,
      data: {
        paymentId: payment.paymentId,
        paymentOrderId,
        amount: order.amountPayable,
        currency: "INR",
        orderId: order.orderId,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Confirm payment (webhook/callback)
router.post("/confirm", async (req, res) => {
  try {
    const { paymentOrderId, status, transactionId, signature } = req.body;

    const payment = await Payment.findOne({ gatewayOrderId: paymentOrderId });
    if (!payment) {
      return res
        .status(404)
        .json({ success: false, message: "Payment not found" });
    }

    payment.status = status === "SUCCESS" ? "SUCCESS" : "FAILED";
    payment.gatewayPaymentId = transactionId;
    payment.gatewaySignature = signature;

    if (status === "FAILED") {
      payment.failureCode = req.body.failureCode;
      payment.failureMessage = req.body.failureMessage;
    }

    await payment.save();

    const order = await Order.findById(payment.orderId);
    if (order) {
      if (status === "SUCCESS") {
        order.paymentStatus = "COMPLETED";
        order.orderStatus = "CONFIRMED";
        order.paymentId = payment.paymentId;
        order.paymentDetails = {
          method: payment.method,
          transactionId: payment.gatewayPaymentId,
          paymentGatewayResponse: req.body,
        };
      } else {
        order.paymentStatus = "FAILED";
      }
      await order.save();
    }

    res.json({ success: true, message: "Payment confirmed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get payment status
router.get("/status/:orderId", protect, async (req, res) => {
  try {
    const order = await Order.findOne({
      orderId: req.params.orderId,
      userId: req.user._id,
    });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    const payment = await Payment.findOne({ orderId: order._id });

    res.json({
      success: true,
      data: {
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,
        amountPayable: order.amountPayable,
        payment: payment
          ? {
              status: payment.status,
              paymentId: payment.paymentId,
              gatewayPaymentId: payment.gatewayPaymentId,
            }
          : null,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;