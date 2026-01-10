const mongoose = require("mongoose");

const creatorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "creator" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Creator", creatorSchema);
