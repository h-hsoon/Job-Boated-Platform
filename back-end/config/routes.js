const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/userController");
//const registerValidator = require("../middleware/registerValidator");
const employerValidator = require("../middleware/employerValidator");

router.post("/",  usercontroller.SignUp);
router.post("/login/", usercontroller.loginUser);
router.post(
  "/register/employer",
  employerValidator,
  usercontroller.registerEmployer
);

module.exports = router;
