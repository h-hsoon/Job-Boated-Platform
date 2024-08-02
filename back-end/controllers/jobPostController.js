const { Promise } = require("mongoose");
const employerModel = require("../models/employerModel");
const jobPostModel = require("../models/jobPostModel");
const jobSeekerModel = require("../models/jobSeekerModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const newJobPost = async (req, res) => {
  const token = req.headers.authorization;
  var decoded = jwt.verify(token, "employer");
  const { userType, id } = decoded.user;
  // const id = req.headers.authorization;
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

  const jobPost = new jobPostModel({
    jobTitle,
    jobDescription,
    jobResponsibitirs,
    jobRequirements,
    skills: skills.split(","),
    jobLocation,
    offerSalary,
    jobType,
    jobCategory,
    experience,
    jobPosition,
    avatar,
    employer: employer._id,
  });
  jobPost
    .save()
    .then((data) => {
      console.log(data);
      res
        .status(200)
        .json({ message: "job post created successfully", data: data });
    })
    .catch((err) => {
      res.status(400).json({ error: "job post not created", err: err });
    });

  //   console.log(typeof skills.split(","));

  // res.status(200).json({ massge: "test is good" });
};

const applyToJob = async (req, res) => {
  const { jobId, candidateId } = req.body;
  const job = await jobPostModel.findById(jobId);
  const candidate = await jobSeekerModel.findById(candidateId);
  if (!job) {
    return res.status(400).json({ error: "job not found" });
  }
  job.applers.push(candidate._id);
  job.save();
  res.status(200).json({ message: "job applied successfully" });
};

const getApplers = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await jobPostModel.findById(jobId).populate("applers");

    const formattedApplers = job.applers.map(
      ({ firstName, lastName, resume, avatar }) => {
        return { firstName, lastName, resume, avatar };
      }
    );
    res.status(200).send(formattedApplers);
  } catch (err) {
    res.status(400).json({ error: "applers not found", err: err });
  }
};

module.exports = {
  newJobPost,
  applyToJob,
  getApplers,
};
