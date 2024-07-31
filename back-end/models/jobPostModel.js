const mongoose = require("mongoose");

const jobPostsSchama = new mongoose.Schema(
  {
    //Ex Web Developer , Product Director
    jobTitle: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    jobResponsibitirs: {
      type: String,
      required: true,
    },
    jobRequirements: {
      type: String,
      required: true,
    },
    //Ex ["c#","c++","php","html",.........]
    skills: [
      {
        type: String,
        required: true,
      },
    ],
    jobLocation: {
      type: String,
      required: true,
    },
    //EX $2150/ Month
    offerSalary: {
      type: Number,
      required: true,
    },
    //Ex Full Time ,
    jobType: {
      type: String,
      required: true,
    },
    //Ex It / Software Jobs, Bank Jobs, Health Care Jobs,.......
    jobCategory: {
      type: String,
      required: true,
    },
    //Ex 5 years
    experience: {
      type: Number,
      required: true,
    },
    //Ex Senior,
    jobPosition: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
      default: "",
    },
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employer",
    },
    applers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobSeeker",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("JobPosts", jobPostsSchama);
