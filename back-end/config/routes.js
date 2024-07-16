const express = require ("express");
const router = express.Router();
const usercontroller = require("../controllers/userController")
const registerValidator = require("../middleware/registerValidator");    



router.post ("/",registerValidator,usercontroller.SignUp)
router.post ("/login/:type",usercontroller.SignUp)

module.exports=router