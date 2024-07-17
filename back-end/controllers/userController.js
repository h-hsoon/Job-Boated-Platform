const jobSeekerModel = require("../models/jobSeekerModel");
const employerModel = require("../models/employerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerEmployer = (req, res) => {
  const { companyName, email, aboutCompany, password, phone } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  if (!hashedPassword) {
    res.status(400).send({ error: "Password is not valid" });
  } else {
    const employer = new employerModel({
      companyName,
      email,
      password: hashedPassword,
      aboutCompany,
      phone,
    });
    employer.save().then(() => {
      res.send({ massge: "now you can log in" });
    });
  }
};
const SignUp = async (req, res) => {
  console.log("receive  call  of the api");
  console.log(req.body);

  if (
    req.body.firstname === "" ||
    req.body.lastname === "" ||
    req.body.password === "" ||
    req.body.email === "" ||
    req.body.profile === "" ||
    req.body.phone === ""
  ) {
    console.log("Some fields are empty");
    return res.status(400).json({
      error: "The fields are empty!!",
    });
  } else {
    if (req.body.password.length < 5) {
      console.log("password is short");
      return res.status(400).json({
        error: "The password is short!!",
      });
    }

    let existuser = await jobSeekerModel.findOne({
      email: req.body.email,
    });
    console.log(existuser);

    if (existuser) {
      console.log("email already exist");
      return res.status(400).json({
        error: "Email already exist!!",
      });
    }

    const hash = bcrypt.hashSync(req.body.password, 10);
    //console to see hashing password
    console.log(req.body.password);
    console.log(hash);

    let userobj = {
      ...req.body,
      password: hash,
    };

    let newuser = new jobSeekerModel(userobj);
    newuser
      .save()
      .then(() => {
        console.log("user has been received");
        return res.status(201).json({
          succes: "user has been added you can log in now",
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(201).json({
          error: "Something wrong with saving user!",
        });
      });
  }
};

//Log in :

const loginUser = async (req, res) => {
  try {
    let existUser = await jobSeekerModel.findOne({ email: req.body.email });
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
