const jobSeekerModel = require("../models/jobSeekerModel");
const employerModel = require("../models/employerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerEmployer = (req, res) => {
  const { companyName, email, aboutCompany, password, phone } = req.body;
  const avatar = req.file ? req.file.path : "";
  const hashedPassword = bcrypt.hashSync(password, 10);
  if (!hashedPassword) {
    return res.status(400).send({ error: "Password is not valid" });
  }
  const employer = new employerModel({
    companyName,
    email,
    password: hashedPassword,
    aboutCompany,
    phone,
    avatar,
  });
  employer
    .save()
    .then(() => {
      res.status(200).send({ massge: "now you can log in" });
    })
    .catch((e) => {
      res.status(400).send({ error: e.message });
    });
};

const SignUp = async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, email, password, confirmPassword, phone } =
    req.body;
  const avatar = req.file ? req.file.path : "";
  if (
    firstName === "" ||
    lastName === "" ||
    password === "" ||
    confirmPassword === "" ||
    email === ""
  ) {
    return res.status(400).json({
      error: "The fields are empty!!",
    });
  } else {
    if (password.length < 5) {
      return res.status(400).json({
        error: "The password is short!!",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        error: "Password and confirmation password do not match!!",
      });
    }

    const existuser = await jobSeekerModel.findOne({ email });

    if (existuser) {
      return res.status(400).json({
        error: "Email already exist!!",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    if (!hashedPassword) {
      return res.status(400).send({ error: "Password is not valid" });
    }

    const newuser = new jobSeekerModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      avatar,
    });
    newuser
      .save()
      .then(() => {
        return res.status(201).json({
          succes: "user has been added you can log in now",
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(400).json({
          error: "Something wrong with saving user!",
        });
      });
  }
};

// update employee:
const UpdateEmployee = async (req, res) => {
  console.log("Received call to update employee API");
  console.log(req.body);

  // Check if required fields are empty
  if (
    req.body.firstname === "" ||
    req.body.lastname === "" ||
    req.body.email === "" ||
    req.body.profile === "" ||
    req.body.phone === ""
  ) {
    console.log("Some fields are empty");
    return res.status(400).json({
      error: "Some fields are empty!!",
    });
  }

  try {
    // Find the employee by ID
    let employee = await jobSeekerModel.findById(req.params.id);

    if (!employee) {
      console.log("Employee not found");
      return res.status(404).json({
        error: "Employee not found",
      });
    }

    // Update employee fields
    employee.firstname = req.body.firstname;
    employee.lastname = req.body.lastname;
    employee.email = req.body.email;
    employee.profile = req.body.profile;
    employee.phone = req.body.phone;

    // Save the updated employee
    await employee.save();

    console.log("Employee updated successfully");
    return res.status(200).json({
      success: "Employee updated successfully",
    });
  } catch (error) {
    console.error("Error updating employee:", error.message);
    return res.status(500).json({
      error: "Error updating employee",
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
  let userDataForToken;

  userDataForToken = {
    id: existUser._id,
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

const sendUserdata = async (req, res) => {
  try {
    const { userId, userType } = req.body;
    if (!userId) {
      return res.status(400).json({ loginError: "User ID is required" });
    }
    let userData;

    if (userType === "employer") {
      userData = await employerModel.findById(userId).select("-password");
    } else {
      userData = await jobSeekerModel.findById(userId).select("-password");
    }
    if (!userData) {
      return res.status(404).json({ loginError: "User not found" });
    }

    res.status(200).json(userData);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ loginError: "Internal Server Error" });
  }
};

// Update user
const updateUserProfaile = async (req, res) => {
  const token = req.headers.authorization;
  var decoded = jwt.verify(token, "employer");
  const { userType } = decoded.user;
  const { email } = req.body;
  console.log(userType);
  console.log(req.body);
  if (userType === "employee") {
    // await jobSeekerModel.findOneAndUpdate({ email }, { ...req.body });
    res.status(401).send({ error: "not unauthenticated" });
  } else {
    await employerModel
      .findOneAndUpdate({ email }, { ...req.body })
      .then((result) => {
        res.status(200).send({ success: true, result });
      })
      .catch((err) => {
        res.status(400).send({ error: err.message });
      });
  }
};

module.exports = {
  SignUp,
  loginUser,
  sendUserdata,
  registerEmployer,
  UpdateEmployee,
  updateUserProfaile,
};
