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

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({
        error: "Password and confirmation password do not match!!",
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
  const { email, password, userType } = req.body;

  let existUser;

  if (userType === "employer") {
    existUser = await employerModel.findOne({ email });
  } else {
    existUser = await jobSeekerModel.findOne({ email });
  }

  if (!existUser) {
    return res.status(400).json({
      loginError: "Email does not exist. Please register first.",
    });
  }

  const correctPassword = bcrypt.compareSync(password, existUser.password);

  if (!correctPassword) {
    return res.status(400).json({
      loginError: "Password is not correct.",
    });
  }

  const userDataForToken = {
    id: existUser._id,
    firstName: existUser.firstName,
    lastName: existUser.lastName,
    email: existUser.email,
    userType: userType,
  };

  let token;
  if (userType === "employer") {
    token = jwt.sign({ user: userDataForToken }, "employer");
  } else {
    token = jwt.sign({ user: userDataForToken }, "employee");
  }

  return res.json({ success: true, token });
};

// Update user
const updateUserProfaile = async (req, res) => {
  const { userType } = req.body;
  if (userType === "employee") {
    await jobSeekerModel.findOneAndUpdate({ email }, { ...req.body });
  } else {
    await employerModel.findOneAndUpdate({ email }, { ...req.body });
  }

  res.status(202).send({ massege: "update profile" });
};

module.exports = {
  SignUp,
  loginUser,
  registerEmployer,
  updateUserProfaile,
};
