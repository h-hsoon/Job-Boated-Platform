const mongoose = require("mongoose");

const jobSeekerSchama = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    resume: { type: String, required: false, default: "" },
    coverLetter: { type: String, required: false, default: "" },
    phone: {
      type: String,
      required: false,
      default: "",
    },
    avatar: {
      type: String,
      required: false,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("JobSeeker", jobSeekerSchama);
