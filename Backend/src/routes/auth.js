const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validation");
const {userAuth}=require("../middlewares/auth")
const jwt=require('jsonwebtoken');

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
      user.online=true;
     await user.save();
      res.send(user);
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
});


authRouter.post("/logout", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not logged in" });
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.online = false;
    await user.save();

    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0),
      path: "/",
    });

    res.json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ message: "Logout failed" });
  }
});


module.exports = authRouter;
