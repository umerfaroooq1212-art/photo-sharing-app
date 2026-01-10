const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// ✅ middleware
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://photosharingfrontend.z1.web.core.windows.net"
  ]
}));
// Routes
app.use("/api/creator", require("./routes/creatorRoutes"));
app.use("/api/photos", require("./routes/photoRoutes"));

// Serve uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
