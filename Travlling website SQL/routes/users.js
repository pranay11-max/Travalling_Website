const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// 🚀 छोटासा सिक्युरिटी गार्ड (हा फक्त Admin लाच पासवर्ड बदलू देईल)
const adminCheck = (req, res, next) => {
  if (req.headers.role === "admin") {
    next();
  } else {
    res.status(403).json({ msg: "Access Denied! You are not an admin." });
  }
};

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

// 🚀 इथे आपण 'ctrl' च्या जागी 'userController' केलंय!
router.put("/update-admin", adminCheck, userController.updateAdmin);

module.exports = router;