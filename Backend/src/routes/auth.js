const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password, gender } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  try {
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
    res.status(400).send(err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  const user = await User.findOne({ emailId: emailId });
  if (!user) {
    res.status(400).send("Invalid Credentials");
  }
  try {
    const ispasswordValid = await user.validatePassword(password);
    if (!ispasswordValid) {
      res.status(400).send("Invalid Credentials");
    } else {
      const token = await user.getJWT();
      res.cookie("token", token);
      res.send(user);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successfull");
});

module.exports = authRouter;
