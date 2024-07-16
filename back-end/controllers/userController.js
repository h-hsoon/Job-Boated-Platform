const employee = require("../models/Schema")
const company= require('../models/')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator");

const  SignUp = (req, res) => {
    console.log('receive  call  of the api');
    console.log(req.body);
    const errors = validationResult(req);
    const errorMessages = errors.array();
    if (!errors.isEmpty()) {
        console.log(errorMessages);
        return res.status(400).json({
           SignUpError: errorMessages ,
          });
        }else{
    //create an employee
    var  employeeObj = {
        firstName: "Abd",
        lastName: "sohail",
        email: "abd@gmail.com",
    }
    const data =employee (employeeObj)
    //data.save();
    res.send(employeeObj)
}}

const loginUser = async (req, res) => {
    try {
      const type = req.params.type;
      let typeClient;
  
      if (type === "employee") {
        typeClient = employee;
      } else {
        typeClient = company;
      }
  
      let existUser = await typeClient.findOne({ email: req.body.email });
      if (!existUser) {
        return res.status(400).json({
          loginError: "Email does not exist, please register first.",
        });
      }
  
      let correctPassword = bcrypt.compareSync(req.body.password, existUser.password);
      if (!correctPassword) {
        return res.status(400).json({
          loginError: "Password is not correct",
        });
      }
  
      // Create user token
      let userDataForToken = {
        id: existUser._id,
        firstName: existUser.firstName,
        lastName: existUser.lastName,
        email: existUser.email,
      };
  
      let userToken = jwt.sign({ user: userDataForToken }, "special");
  
      res.cookie("userToken", userToken);
      res.status(200).json({
        message: "Login successful",
        token: userToken,
      });
    } catch (error) {
      res.status(500).json({
        loginError: "Internal server error",
      });
    }
  };
  
  module.exports = loginUser;





module.exports = {
    SignUp,
    loginUser
}
