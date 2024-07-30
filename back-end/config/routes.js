const express = require("express");
const multer = require("multer");
const router = express.Router();
const usercontroller = require("../controllers/userController");
const jobPostController = require("../controllers/jobPostController");
const employerValidator = require("../middleware/employerValidator");
const jobPostValidate = require("../middleware/jobpostValidator");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/avatar");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
const upload1 = multer({ storage: storage1 });

router.post(
  "/register/employee",
  upload1.single("avatar"),
  usercontroller.SignUp
);
router.put(
  "/updateEmployeeProfile/:id",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  usercontroller.UpdateEmployee
);

router.post("/login/", usercontroller.loginUser);
router.post("/dataUser", usercontroller.sendUserdata);
router.post(
  "/register/employer",
  upload1.single("avatar"),
  employerValidator,
  usercontroller.registerEmployer
);
router.put(
  "/updateEmployerProfile",
  upload1.single("avatar"),
  usercontroller.updateEmployer
);
router.post(
  "/newJob",
  upload1.single("avatar"),
  jobPostValidate,
  jobPostController.newJobPost
);
//
router.get("/posts", usercontroller.posts);
router.get("/employers", usercontroller.employers);
router.get("/posts/:id", usercontroller.post);
router.patch("/users/:id/:friendId", usercontroller.addRemoveFriend);
router.get("/friends/:id", usercontroller.getfreinds);

router.post("/apply", jobPostController.applyToJob);
router.get("/applers/:id", jobPostController.getApplers);

module.exports = router;
