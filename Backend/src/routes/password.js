const express = require("express");
const passwordRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");
const sendEmail = require("../utils/sendEmail");

passwordRouter.post("/forgetpassword/verifyemail", async (req, res) => {
  const emailId = req.body.emailId;
  const user = await User.findOne({ emailId: emailId });
  if (!user) {
    return res.status(400).json({ message: "Email not Found!" });
  }

  const actualOtp = `${Math.floor(Math.random() * 9000)}`.padStart(4, 0);
  user.otp = actualOtp;
  await user.save();
  const sent = await sendEmail(
    emailId,
    "OTP to Change Password",
    `Your OTP is ${actualOtp}`
  );

  if (!sent) {
    return res.status(500).json({ message: "Failed to send email" });
  }

  res.json({ message: "Email verified" });
});
passwordRouter.post("/forgetpassword/verifyotp", async (req, res) => {
  try {
    const emailId = req.body.emailId;
    const otp = req.body.otp;

    const user = await User.findOne({ emailId: emailId });
    if (user.otp !== otp.toString()) {
      return res.status(400).json({ message: "Invalid Otp" });
    }
    res.json({ message: "OTP Verified" });
  } catch (err) {
    res.status(400).json(err);
  }
});

passwordRouter.post("/forgetpassword/changepassword", async (req, res) => {
  const newPassword = req.body.password;
  const emailId = req.body.emailId;

  if (newPassword?.length == 0) {
    return res.status(400).json({ message: "Password is Required" });
  }
  if (
    !validator.isStrongPassword(newPassword, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    return res.status(400).json({ message: "Password is not Strong!" });
  }
  const passwordHash = await bcrypt.hash(newPassword, 10);

  const user = await User.findOne({ emailId: emailId });
  user.password = passwordHash;
  await user.save();
  res.json({ message: "Password updated" });
});

module.exports = passwordRouter;
