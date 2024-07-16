const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/userController");

router.post("/",  usercontroller.SignUp);
router.post("/login/employee", usercontroller.loginUser);
router.post("/register/employer", usercontroller.registerEmployer);

module.exports = router;
