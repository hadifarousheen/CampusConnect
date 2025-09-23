const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");

authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password, gender } = req.body;
  try {
    if (firstName.length == 0) {
      return res.status(400).json({ message: "First Name is Required" });
    }
    if (lastName.length == 0) {
      return res.status(400).json({ message: "Last Name is Required" });
    }
    if (gender.length == 0) {
      return res.status(400).json({ message: "Gender is Required" });
    }
    if (emailId.length == 0) {
      return res.status(400).json({ message: "Email is Required" });
    }
    if (password.length == 0) {
      return res.status(400).json({ message: "Password is Required" });
    }
    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return res.status(400).json({ message: "Password is not Strong!" });
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
    res.status(400).json({message:"Invalid Credentials"});
  }
  try {
    const ispasswordValid = await user.validatePassword(password);
    if (!ispasswordValid) {
      res.status(400).json({message:"Invalid Credentials"});
    } else {
      const token = await user.getJWT();
      res.cookie("token", token);
      res.send(user);
    }
  } catch (err) {
    res.status(400).json({message:err});
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successfull");
});

module.exports = authRouter;
