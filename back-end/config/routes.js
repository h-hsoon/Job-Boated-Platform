const express = require("express");
const multer = require("multer");
const router = express.Router();
const usercontroller = require("../controllers/userController");
const employerValidator = require("../middleware/employerValidator");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/register/employee", usercontroller.SignUp);
router.put("/register/employee/:id", usercontroller.UpdateEmployee);

router.post("/login/", usercontroller.loginUser);
router.post(
  "/register/employer",
  upload.single("avatar"),
  employerValidator,
  usercontroller.registerEmployer
);
router.put("/updateProfile", usercontroller.updateUserProfaile);

module.exports = router;
