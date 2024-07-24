var validator = require("validator");

const jobPostValidate = (req, res, next) => {
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
  if (validator.isEmpty(jobTitle)) {
    return res.status(400).json({ error: "Job Title is required" });
  }
  if (validator.isEmpty(jobDescription)) {
    return res.status(400).json({ error: "Job Description is required" });
  } else if (validator.isLength(jobDescription, { min: 20 })) {
    return res
      .status(400)
      .json({ error: "Job Description must be at least 30 characters" });
  }
  if (validator.isEmpty(jobResponsibitirs)) {
    return res.status(400).json({ error: "Job Responsibitirs is required" });
  } else if (validator.isLength(jobResponsibitirs, { min: 15 })) {
    return res
      .status(400)
      .json({ error: "Job Responsibitirs must be at least 15 characters" });
  }
  if (validator.isEmpty(jobRequirements)) {
    return res.status(400).json({ error: "Job Requirements is required" });
  } else if (validator.isLength(jobRequirements, { min: 10 })) {
    return res
      .status(400)
      .json({ error: "Job Requirements must be at least 10 characters" });
  }
  if (validator.isEmpty(skills)) {
    return res.status(400).json({ error: "Skills is required" });
  }
  if (validator.isEmpty(jobLocation)) {
    return res.status(400).json({ error: "Job Location is required" });
  }
  if (validator.isEmpty(offerSalary)) {
    return res.status(400).json({ error: "Offer Salary is required" });
  } else if (validator.isNumeric(offerSalary)) {
    return res.status(400).json({ error: "Offer Salary must be a number" });
  }
  if (validator.isEmpty(jobType)) {
    return res.status(400).json({ error: "Job Type is required" });
  }
  if (validator.isEmpty(jobCategory)) {
    return res.status(400).json({ error: "Job Category is required" });
  }
  if (validator.isEmpty(experience)) {
    return res.status(400).json({ error: "Experience is required" });
  } else if (validator.isNumeric(experience)) {
    return res.status(400).json({ error: "Offer Salary must be a number" });
  }
  if (validator.isEmpty(jobPosition)) {
    return res.status(400).json({ error: "Job Position is required" });
  }
  next();
};

module.exports = jobPostValidate;
