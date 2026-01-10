const Creator = require("../models/Creator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================
exports.registerCreator = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if creator already exists
    const existingCreator = await Creator.findOne({ email });
    if (existingCreator) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create creator
    const creator = await Creator.create({
      name,
      email,
      password: hashedPassword,
      role: "creator",
    });

    res.status(201).json({
      message: "Creator registered successfully",
      creator,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error.message);
    res.status(500).json({ message: "Registration failed" });
  }
};

// ================= LOGIN =================
exports.loginCreator = async (req, res) => {
  try {
    const { email, password } = req.body;

    const creator = await Creator.findOne({ email });
    if (!creator) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, creator.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: creator._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error.message);
    res.status(500).json({ message: "Login failed" });
  }
};
