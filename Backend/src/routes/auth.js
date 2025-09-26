const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validation");

authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password, gender } = req.body;
  try {
    const validationError = validateSignUpData(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      gender,
    });
    await user.save();
    const token = await user.getJWT();
    res.cookie("token", token);
    res.send(user);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (err.name === "ValidationError") {
      const firstError = Object.values(err.errors)[0].message;
      return res.status(400).json({ message: firstError });
    }
  }
});

authRouter.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  const user = await User.findOne({ emailId: emailId });
  if (!user) {
    res.status(400).json({ message: "Invalid Credentials" });
  }
  try {
    const ispasswordValid = await user.validatePassword(password);
    if (!ispasswordValid) {
      res.status(400).json({ message: "Invalid Credentials" });
    } else {
      const token = await user.getJWT();
      res.cookie("token", token);
      res.send(user);
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successfull");
});

module.exports = authRouter;
