const employer = require("../models/employerModel");
const employerValidator = async (req, res, next) => {
  const { companyName, email, password, aboutCompany } = req.body;
  if (
    companyName === "" &&
    email === "" &&
    password === "" &&
    aboutCompany === ""
  ) {
    return res.status(400).json({ error: "All fields are required" });
  } else if (companyName === "") {
    return res.status(400).json({ error: "company name is required" });
  } else if (email === "") {
    return res.status(400).json({ error: "email is required" });
  } else if (password === "") {
    return res.status(400).json({ error: "password is required" });
  } else if (aboutCompany === "") {
    return res.status(400).json({
      error:
        "about company is required and please make sure that there are more than 50 words",
    });
  } else if (aboutCompany.length < 50) {
    return res.status(400).json({
      error:
        "please make sure that there are more than 50 words in the about company",
    });
  } else {
    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "password must be at least 8 characters long" });
    } else {
      const eicesstUser = await employer.findOne({ email: email });
      if (eicesstUser) {
        return res.status(401).send({ error: "Email already exists." });
      } else {
        next();
      }
    }
  }
};

module.exports = employerValidator;
