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
  if (jobTitle === "") {
    return res.status(400).json({ error: "Job Title is required" });
  } else if (jobDescription === "") {
    return res.status(400).json({ error: "Job Description is required" });
  } else if (jobDescription.length < 25) {
    return res
      .status(400)
      .json({ error: "Job Description  must be at least 15 characters" });
  } else if (jobResponsibitirs === "") {
    return res.status(400).json({ error: "Job Responsibitirs is required" });
  } else if (jobResponsibitirs.length < 15) {
    return res
      .status(400)
      .json({ error: "Job Responsibitirs must be at least 15 characters" });
  } else if (jobRequirements === "") {
    return res.status(400).json({ error: "Job Requirements is required" });
  } else if (jobRequirements.length < 10) {
    return res
      .status(400)
      .json({ error: "Job Requirements must be at least 10 characters" });
  } else if (skills === "") {
    return res.status(400).json({ error: "Skills is required" });
  } else if (jobLocation === "") {
    return res.status(400).json({ error: "Job Location is required" });
  } else if (offerSalary === "") {
    return res.status(400).json({ error: "Offer Salary is required" });
  } else if (typeof offerSalary !== "number") {
    return res.status(400).json({ error: "Offer Salary must be a number" });
  } else if (jobType === "") {
    return res.status(400).json({ error: "Job Type is required" });
  } else if (jobCategory === "") {
    return res.status(400).json({ error: "Job Category is required" });
  } else if (experience === "") {
    return res.status(400).json({ error: "Experience is required" });
  } else if (typeof experience !== "number") {
    return res.status(400).json({ error: "Offer Salary must be a number" });
  } else if (jobPosition === "") {
    return res.status(400).json({ error: "Job Position is required" });
  } else {
    return next();
  }
};

module.exports = jobPostValidate;
