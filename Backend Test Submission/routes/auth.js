const express = require("express");
const router = express.Router();

const { auth } = require("../controllers/authController");

router.post("/auth", auth);

module.exports = router;
