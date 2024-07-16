const employee = require("../models/Schema");
const employerModel = require("../models/employerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerEmployer = (req, res) => {
  const { companyName, email, aboutCompany, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  if (!hashedPassword) {
    res.status(400).send({ error: "Password is not valid" });
  } else {
    const employer = new employerModel({
      companyName,
      email,
      password: hashedPassword,
      aboutCompany,
    });
    employer
      .save()
      .then(() => {
        res.send({ massge: "now you can log in" });
      })

      .catch((error) => {
        res.send(error);
      });
  }
};

const SignUp = (req, res) => {
  console.log("receive  call  of the api");
  console.log(req.body);

  //create an employee
  var employeeObj = {
    firstName: "Abd",
    lastName: "sohail",
    email: "abd@gmail.com",
  };
  const data = employee(employeeObj);
  //data.save();
  res.send(employeeObj);
};

const loginUser = async (req, res) => {
  try {
    let existUser = await employee.findOne({ email: req.body.email });
    if (!existUser) {
      return res.status(400).json({
        loginError: "Email does not exist, please register first.",
      });
    }

    let correctPassword = bcrypt.compareSync(
      req.body.password,
      existUser.password
    );
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

module.exports = {
  SignUp,
  loginUser,
  registerEmployer,
};
