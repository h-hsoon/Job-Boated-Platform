import {
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  Container,
  CssBaseline,
  MenuItem,
} from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUploader from "../FileUploader/FileUploader";
import axios from "axios";
import Cookies from "js-cookie";

function AddPost({ Datatoken }) {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobResponsibitirs, setJobResponsibitirs] = useState("");
  const [jobRequirements, setJobRequirements] = useState("");
  const [skills, setSkills] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [offerSalary, setOfferSalary] = useState();
  const [jobType, setJobType] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [experience, setExperience] = useState();
  const [jobPosition, setJobPosition] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const theme = createTheme();

  const onSelectFileHandler = (e) => {
    setAvatar(e.target.files[0]);
  };

  const onDeleteFileHandler = () => {
    setAvatar();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (jobTitle === "") {
      return setError("Job Title is required");
    } else if (jobDescription === "") {
      return setError("Job Description is required");
    } else if (jobDescription.length < 25) {
      return setError("Job Description  must be at least 15 characters");
    } else if (jobResponsibitirs === "") {
      return setError("Job Responsibitirs is required");
    } else if (jobResponsibitirs.length < 15) {
      return setError("Job Responsibitirs must be at least 15 characters");
    } else if (jobRequirements === "") {
      return setError("Job Requirements is required");
    } else if (jobRequirements.length < 10) {
      return setError("Job Requirements must be at least 10 characters");
    } else if (skills === "") {
      return setError("Skills is required");
    } else if (jobLocation === "") {
      return setError("Job Location is required");
    } else if (offerSalary === "") {
      return setError("Offer Salary is required");
    } else if (
      typeof Number(offerSalary) !== "number" &&
      Number(offerSalary) > 0
    ) {
      return setError("Offer Salary must be a number");
    } else if (jobType === "") {
      return setError("Job Type is required");
    } else if (jobCategory === "") {
      return setError("Job Category is required");
    } else if (experience === "") {
      return setError("Experience is required");
    } else if (
      typeof Number(experience) !== "number" &&
      Number(experience) > 0
    ) {
      return setError("Offer Salary must be a number");
    } else if (jobPosition === "") {
      return setError("Job Position is required");
    }

    const token = Cookies.get("token");
    const formData = new FormData();
    formData.append("jobTitle", jobTitle);
    formData.append("jobDescription", jobDescription);
    formData.append("jobResponsibitirs", jobResponsibitirs);
    formData.append("jobRequirements", jobRequirements);
    formData.append("skills", skills);
    formData.append("jobLocation", jobLocation);
    formData.append("offerSalary", offerSalary);
    formData.append("jobType", jobType);
    formData.append("jobCategory", jobCategory);
    formData.append("experience", experience);
    formData.append("jobPosition", jobPosition);
    formData.append("avatar", avatar);

    await axios
      .post("http://localhost:5000/newJob", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      })
      .then(() => {
        setJobTitle("");
        setJobDescription("");
        setJobResponsibitirs("");
        setJobRequirements("");
        setSkills("");
        setJobLocation("");
        setOfferSalary("");
        setJobType("");
        setJobCategory("");
        setExperience("");
        setJobPosition("");
        setAvatar("");
        alert("Job Added successfully!");
        setError("");
        navigate("/allposts");
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            marginBottom: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="div"
            sx={{
              mr: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <PostAddIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add New Job
            </Typography>
            {error && (
              <Typography color="error" align="center">
                {error}
              </Typography>
            )}
          </Box>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}
          >
            <Box
              container
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
              }}
            >
              <Box
                component="div"
                sx={{
                  width: "49%",
                }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="jobTitle"
                  label="Job Title"
                  name="jobTitle"
                  autoFocus
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
                <TextField
                  margin="normal"
                  multiline={true}
                  minRows={4}
                  required
                  fullWidth
                  id="JobDescription"
                  label="Job Description"
                  name="JobDescription"
                  autoFocus
                  sx={{
                    mb: 3,
                  }}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
                <TextField
                  margin="normal"
                  multiline={true}
                  minRows={4}
                  required
                  fullWidth
                  id="JobResponsibilities"
                  label="Job Responsibilities"
                  name="JobResponsibilities"
                  autoFocus
                  sx={{
                    mt: 1,
                    mb: 3,
                  }}
                  value={jobResponsibitirs}
                  onChange={(e) => setJobResponsibitirs(e.target.value)}
                />
                <TextField
                  margin="normal"
                  multiline={true}
                  minRows={4}
                  required
                  fullWidth
                  id="JobRequirements"
                  label="Job Requirements"
                  name="JobRequirements"
                  autoFocus
                  value={jobRequirements}
                  onChange={(e) => setJobRequirements(e.target.value)}
                />
              </Box>
              <Box
                component="div"
                sx={{
                  width: "50%",
                }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="Skills"
                  label="Skills (comma separated)"
                  type="text"
                  id="Skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="Location"
                  label="Location"
                  type="text"
                  id="Location"
                  value={jobLocation}
                  onChange={(e) => setJobLocation(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="OfferSalary"
                  label="Offer Salary"
                  type="number"
                  id="OfferSalary"
                  value={offerSalary}
                  onChange={(e) => setOfferSalary(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  select
                  fullWidth
                  name="JobType"
                  label="Job Type"
                  id="JobType"
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                >
                  <MenuItem value="Full Time">Full Time</MenuItem>
                  <MenuItem value="Part Time">Part Time</MenuItem>
                  <MenuItem value="Recent Jobs">Recent Jobs</MenuItem>
                  <MenuItem value="Featured Jobs">Featured Jobs</MenuItem>
                  <MenuItem value="Freelancer">Freelancer</MenuItem>
                </TextField>
                <TextField
                  margin="normal"
                  required
                  select
                  fullWidth
                  name="JobCategory"
                  label="Job Category"
                  id="JobCategory"
                  value={jobCategory}
                  onChange={(e) => setJobCategory(e.target.value)}
                >
                  <MenuItem value="IT & Software">IT & Software</MenuItem>
                  <MenuItem value="Technology">Technology</MenuItem>
                  <MenuItem value="Government">Government</MenuItem>
                  <MenuItem value="Accounting/Finance">
                    Accounting/Finance
                  </MenuItem>
                  <MenuItem value="Construction/Facilities">
                    Construction/Facilities
                  </MenuItem>
                  <MenuItem value="Tele-communications">
                    Tele-communications
                  </MenuItem>
                  <MenuItem value="Design & Multimedia">
                    Design & Multimedia
                  </MenuItem>
                  <MenuItem value="Human Resource">Human Resource</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
                <TextField
                  margin="normal"
                  required
                  select
                  fullWidth
                  name="JobPosition"
                  label="Job Position"
                  id="JobPosition"
                  value={jobPosition}
                  onChange={(e) => setJobPosition(e.target.value)}
                >
                  <MenuItem value="Senior">Senior</MenuItem>
                  <MenuItem value="Junior">Junior</MenuItem>
                  <MenuItem value="Intern">Intern</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                  <MenuItem value="Director">Director</MenuItem>
                  <MenuItem value="CEO">CEO</MenuItem>
                  <MenuItem value="CFO">CFO</MenuItem>
                  <MenuItem value="CTO">CTO</MenuItem>
                </TextField>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="Experience"
                  label="Experience (years)"
                  type="number"
                  id="Experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
              </Box>
            </Box>
            <div
              style={{
                marginTop: "10px",

                borderTop: "1px solid black",
              }}
            >
              <label
                style={{
                  marginTop: "5px",
                }}
              >
                Image
              </label>
            </div>
            <FileUploader
              accept="image/png,image/jpg,image/jpeg"
              onSelectFile={onSelectFileHandler}
              onDeleteFile={onDeleteFileHandler}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Job
            </Button>
            {/* <Grid container>
              <Grid item>
                <Link to="/login" variant="body2">
                  {"I have an account? Log In"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default AddPost;
