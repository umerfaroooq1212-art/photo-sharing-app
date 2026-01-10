const Creator = require("../models/Creator");
const bcrypt = require("bcryptjs");

exports.registerCreator = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if creator already exists
    const creatorExists = await Creator.findOne({ email });
    if (creatorExists) {
      return res.status(400).json({ message: "Creator already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create creator
    const creator = await Creator.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Creator registered successfully",
      creator,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
