const express = require("express");
const {
  CreateContent,
  GetContent,
  UpdateContent,
  DeleteContent,
} = require("../controller/page");
const router = express.Router();

// create post route
router.post("/", CreateContent);

// get route
router.get("/", GetContent);

// update route
router.put("/", UpdateContent);

// Delete route
router.delete("/", DeleteContent);

module.exports = router;
