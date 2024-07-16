const express = require ("express");
const router = express.Router();
const usercontroller = require("../controllers/userController")
    



router.post ("/",usercontroller.SignUp)


module.exports=router