const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/userController");
const employerValidator = require("../middleware/employerValidator");

router.post("/register/employee", usercontroller.SignUp);
router.post("/login/", usercontroller.loginUser);
router.post(
  "/register/employer",
  employerValidator,
  usercontroller.registerEmployer
);

module.exports = router;
