const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/leadController");
const adminCheck = require("../middleware/adminCheck");

// user
router.post("/", ctrl.createLead);

// admin
router.get("/", adminCheck, ctrl.getLeads);
router.put("/:id", adminCheck, ctrl.updateLead);
router.delete("/:id", adminCheck, ctrl.deleteLead);

module.exports = router;

