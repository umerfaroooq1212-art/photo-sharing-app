const express = require("express");
const router = express.Router();
const { registerCreator } = require("../controllers/creatorAuthController");

router.post("/register", registerCreator);

module.exports = router;
