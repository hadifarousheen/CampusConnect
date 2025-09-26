const express = require("express");
const { userAuth } = require("../middlewares/auth");
const paymentRouter = express.Router();
const razorpayInstance = require("../utils/razorpay");
const { memberShipAmount } = require("../utils/constants");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");
const User = require("../models/user");
const Payment = require("../models/payment");

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    const { memberShipType } = req.body;
    const { firstName, lastName, emailId } = req.user;
    const order = await razorpayInstance.orders.Create({
      amount: memberShipAmount[memberShipType] * 1000,
      curreny: "INR",
      receipt: "receipt#1",
      notes: {
        firstName: firstName,
        lastName: lastName,
        emailId: emailId,
        memberShipType: memberShipType,
      },
    });

    const payment = new Payment({
      userId: req.user_id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });

    const savedPayment = await payment.save();
    res.json({ ...savedPayment.toJSON() });
  } catch (err) {
    console.log(err);
  }
});

paymentRouter.post("/payment/webhook", userAuth, async (req, res) => {
  try {
    const webhookSignature = req.headers("X-Razorpay-Signature");
    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.WEBHOOK_SECRET
    );
    if (!isWebhookValid) {
      return res.status(400).json({ msg: "webhook signature is invalid" });
    }
    // if(req.body.event==="payment.captured"){}
    // if(req.body.event==="payment.failed"){}
    const paymentDetails = req.body.payload.payment.entity;

    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
    payment.status = paymentDetails.status;
    await payment.save();
   
    const user = await User.findOne({ _id: payment.userId });
    user.isPremium = true;
    user.memberShipType = payment.notes.memberShipType;
   

    await user.save();
  } catch (err) {
    console.log(err);
  }
});

paymentRouter.get("/premium/verify", userAuth, async (req, res) => {
  const user = req.user.toJSON();
  if (user.isPremium) {
    return res.json({ isPremium: true });
  }
  return res.json({ isPremium: false });
});

module.exports = paymentRouter;
