const jobSeekerModel = require("../models/jobSeekerModel");
const employerModel = require("../models/employerModel");
const jobPostModel = require("../models/jobPostModel");
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
  // const token = req.headers.authorization;
  // var decoded = jwt.verify(token, "employer");
  // const { userType } = decoded.user;
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;

  const avatar = req.files.avatar ? req.files.avatar[0].path : "";
  const resume = req.files.resume ? req.files.resume[0].path : "";

  // Check if required fields are empty
  if (firstName === "" || lastName === "" || email === "") {
    console.log("Some fields are empty");
    return res.status(400).json({
      error: "Some fields are empty!!",
    });
  }

  const updatedEmployee = {
    ...req.body,
    avatar,
    resume,
  };
  // Find the employee by ID
  const employee = await jobSeekerModel
    .findByIdAndUpdate(id, updatedEmployee)
    .then((employee) => {
      return res.status(200).send({ success: true });
    })
    .catch((error) => {
      console.log(error);
    });
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

// Update employer
const updateEmployer = async (req, res) => {
  const token = req.headers.authorization;
  var decoded = jwt.verify(token, "employer");
  const { userType, id } = decoded.user;
  const { email } = req.body;
  const avatar = req.file ? req.file.path : "";
  console.log(userType);
  console.log(req.body, req.file.path);
  if (userType === "employee") {
    // await jobSeekerModel.findOneAndUpdate({ email }, { ...req.body });
    res.status(401).send({ error: "not unauthenticated" });
  } else {
    const updateEmployer = {
      ...req.body,
      avatar,
    };
    await employerModel
      .findByIdAndUpdate(id, updateEmployer)
      .then((result) => {
        res.status(200).send({ success: true, result });
      })
      .catch((err) => {
        res.status(400).send({ error: err.message });
      });
  }
};

const posts = (req, res)=>{
  jobPostModel.find().sort({ createdAt: -1 }).then(posts => {
    console.log(posts)
    res.json(posts);
  }).catch(err => console.log(err));
}
const employers = (req, res)=>{
  employerModel.find().select("-password").then(employers => {
    console.log(employers)
    res.json(employers);
  }).catch(err => console.log(err));
}
const post=async (req, res) => {
  try {
  const { id } = req.params;
 postData = await jobPostModel.findById(id);
  if (!postData) {
    console.log("postData not found")
    return res.status(404).json({ Error: "postData not found" });
  }
  res.status(200).json(postData);
  }
  catch (error) {
    console.error("Error during get post:", error);
  }

}
const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await jobSeekerModel.findById(id);
    const company = await employerModel.findById(friendId);
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      company.followers = company.followers.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      company.followers.push(id);
    }
    await user.save();
    await company.save();
   
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getfreinds = async (req, res) => {
  console.log("ok")
  try {
    const { id } = req.params;
    const user = await jobSeekerModel.findById(id);
    const friends = await Promise.all(
      user.friends.map((id) => employerModel.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, companyName, email, avatar, phone }) => {
        return { _id,  companyName, email, avatar,phone };
      }
    );  res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
module.exports = {
  SignUp,
  loginUser,
  sendUserdata,
  registerEmployer,
  UpdateEmployee,
  updateEmployer,
  posts,
  post,
  employers,
  addRemoveFriend,
  getfreinds
};
