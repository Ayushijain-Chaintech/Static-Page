const express = require("express");
const {
CreateContent,
GetContent,
UpdateContent,
DeleteContent,
GetSingleContent,
} = require("../controller/page");
const { authenticate } = require("../middleware/auth");
const router = express.Router();

// create post route
router.post("/", authenticate, CreateContent);

// get route
router.get("/", authenticate, GetContent);

// get content by params route
router.get("/:slug", authenticate, GetSingleContent);

// update route
router.put("/:slug", authenticate, UpdateContent);

// Delete route
router.delete("/:slug", authenticate, DeleteContent);

module.exports = router;