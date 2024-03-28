const express = require("express");
const { Register, Login } = require("../controller/user");
const router = express.Router();

// register route
router.post("/reg", Register);

// login route
router.post("/login", Login);

module.exports = router;
