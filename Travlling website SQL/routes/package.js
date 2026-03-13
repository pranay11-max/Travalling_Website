const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/packageController");
const adminCheck = require("../middleware/adminCheck");
// const packageCtrl = require('../controllers/packageController');

// public
router.get("/", ctrl.getPackages);

// admin only
router.post("/", adminCheck, ctrl.addPackage);
router.put("/:id", adminCheck, ctrl.updatePackage);
router.delete("/:id", adminCheck, ctrl.deletePackage);
router.get("/:id", ctrl.getOne);
router.put("/sequence/update", adminCheck, ctrl.updateSequence);

// router.get('/packages', packageCtrl.getInfinitePackages);


module.exports = router;
