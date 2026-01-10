const express = require("express");
const {
  registerCreator,
  loginCreator,
} = require("../controllers/creatorController");

const router = express.Router();

router.post("/register", registerCreator);
router.post("/login", loginCreator);

module.exports = router;
