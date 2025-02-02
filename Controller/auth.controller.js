require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Model/user");

exports.register = async (req, res) => {
  const { Name, Email, Password, Phone, Address, Gender } = req.body;
  try {
    const hashpwd = await bcrypt.hash(Password, 10);

    // Create new user
    const user = await User.create({
      Name,
      Email,
      Password: hashpwd,
      Phone,
      Address,
      Gender,
      borrowBooks: [],
      usedPasswords: [],
      userRole: "user",
      isActive: true,
    });

    console.log(user);
    res.status(201).json({ message: "User Created Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to Create User" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.Password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};

exports.createAdmin = async (req, res) => {
  const { Name, Email, Password, Phone, Address, Gender } = req.body;
  try {
    const hashpwd = await bcrypt.hash(Password, 10);

    const existingAdmin = await User.findOne({ userRole: "admin" });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const user = await User.create({
      Name,
      Email,
      Password: hashpwd,
      Phone,
      Address:"",
      Gender,
      borrowBooks: [],
      usedPasswords: [],
      userRole: "admin",
      isActive: true,
    });

    console.log(user);
    res.status(201).json({ message: "Admin Created Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to Create Admin" });
  }
};

exports.adminLogin = async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const user = await User.findOne({ Email, userRole: "admin" });
    if (!user) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.userRole }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
}
