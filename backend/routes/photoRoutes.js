const express = require("express");
const multer = require("multer");
const Photo = require("../models/Photo");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ================= MULTER CONFIG =================
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ================= UPLOAD PHOTO =================
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, caption, location, people } = req.body;

      if (!req.file || !title) {
        return res.status(400).json({ message: "Image and title required" });
      }

      const photo = await Photo.create({
        title,
        caption,
        location,
        people,
        imageUrl: `http://localhost:5000/uploads/${req.file.filename}`, // ✅ ADD THIS
        creator: req.user.id,
      });

      res.status(201).json(photo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Upload failed" });
    }
  }
);

// ================= GET MY PHOTOS =================
router.get("/my", authMiddleware, async (req, res) => {
  const photos = await Photo.find({ creator: req.user.id });
  res.json(photos);
});

// ================= PUBLIC GALLERY =================
router.get("/", async (req, res) => {
  const photos = await Photo.find().sort({ createdAt: -1 });
  res.json(photos);
});

module.exports = router;
