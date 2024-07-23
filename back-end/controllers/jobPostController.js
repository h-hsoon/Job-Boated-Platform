const employerModel = require("../models/employerModel");
const jobPostModel = require("../models/jobPostModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const newJobPost = async (req, res) => {
  // const token = req.headers.authorization;
  // var decoded = jwt.verify(token, "employer");
  // const { userType, id } = decoded.user;
  const id = req.headers.authorization;
  const {
    jobTitle,
    jobDescription,
    jobResponsibitirs,
    jobRequirements,
    skills,
    jobLocation,
    offerSalary,
    jobType,
    jobCategory,
    experience,
    jobPosition,
  } = req.body;
  const avatar = req.file ? req.file.path : "";
  const employer = await employerModel.findById(id);
  if (!employer) {
    return res.status(400).json({ message: "employer not found" });
  }

  const jobPost = await jobPostModel
    .create({
      jobTitle,
      jobDescription,
      jobResponsibitirs,
      jobRequirements,
      skills,
      jobLocation,
      offerSalary,
      jobType,
      jobCategory,
      experience,
      jobPosition,
      avatar,
      employer: id,
    })
    .then((data) => {
      console.log(data);
      res
        .status(200)
        .json({ message: "job post created successfully", data: data });
    })
    .catch((err) => {
      res.status(400).json({ message: "job post not created", err: err });
    });
  //   console.log(req.body, req.headers.authorization);

  //   res.status(200).json({ massge: "test is good" });
};

module.exports = {
  newJobPost,
};
