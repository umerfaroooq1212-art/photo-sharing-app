const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema(
  {
    title: String,
    caption: String,
    location: String,
    people: String,
    imageUrl: String,     // ✅ REQUIRED
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Creator",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Photo", photoSchema);
