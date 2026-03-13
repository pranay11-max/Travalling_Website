const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");


const adminCheck = (req, res, next) => {
  if (req.headers.role === "admin") {
    next();
  } else {
    res.status(403).json({ msg: "Access Denied! You are not an admin." });
  }
};

// 🚀 राऊट्स
router.post("/", feedbackController.addFeedback); 
router.get("/", adminCheck, feedbackController.getAllFeedbacks); 
router.put("/:id", adminCheck, feedbackController.acceptFeedback); 

module.exports = router;