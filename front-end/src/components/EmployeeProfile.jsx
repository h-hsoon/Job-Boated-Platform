import React, { useState, useEffect } from "react";
import axios from "../axiosConfig";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  Container,
  CssBaseline,
  Card,
  CardContent,
  Grid,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoadingSpinner from "../shared/LoadingSpinner";

const theme = createTheme();

const EmployeeProfile = ({ tokenId }) => {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    profilePicture: "",
    resume: "",
  });
  const [avatarPreview, setAvatarPreview] = useState("");
  const [resumePreview, setResumePreview] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.post("/dataUser", {
          userId: id,
          userType: "employee",
        });
        const currentUser = tokenId;
        console.log(response.data);
        setUserProfile(response.data);
        setFormData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phone: response.data.phone || "",
          profilePicture: response.data.avatar || "",
          resume: response.data.resume || "",
        });
        setAvatarPreview(
          response.data.avatar
            ? `http://localhost:5000/${response.data.avatar}`
            : ""
        );
        setResumePreview(
          response.data.resume
            ? `http://localhost:5000/${response.data.resume}`
            : ""
        );
        setIsOwner(response.data._id === currentUser);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchProfile();
  }, [id, tokenId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" && value.trim() !== "" && !/^\d{10,15}$/.test(value)) {
      setError(
        "Phone number must contain only digits and be 10 to 15 characters long."
      );
    } else {
      setError("");
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (name === "profilePicture") {
      setAvatarPreview(URL.createObjectURL(file));
    } else if (name === "resume") {
      setResumePreview(URL.createObjectURL(file));
    }
    setError("");

    setFormData({
      ...formData,
      [name]: file,
    });
  };

  const handleDeleteFile = (field) => {
    setFormData({
      ...formData,
      [field]: "",
    });
    if (field === "profilePicture") {
      setAvatarPreview("");
    } else if (field === "resume") {
      setResumePreview("");
    }
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError("First Name and Last Name cannot be empty.");
      return;
    }
    if (formData.firstName.trim().length > 20) {
      setError("First Name is too long.");
      return;
    }
    if (formData.lastName.trim().length > 20) {
      setError("Last Name is too long.");
      return;
    }

    if (
      formData.firstName === userProfile.firstName &&
      formData.lastName === userProfile.lastName &&
      formData.phone === (userProfile.phone || "") &&
      formData.profilePicture === userProfile.profilePic &&
      (formData.profilePicture === userProfile.profilePic ||
        !formData.profilePicture) &&
      (formData.resume === userProfile.resume || !formData.resume)
    ) {
      setError("No changes detected.");
      return;
    }

    if (error) {
      alert("Please fix the error before saving.");
      return;
    }

    const token = Cookies.get("token");
    const submitData = new FormData();
    submitData.append("firstName", formData.firstName);
    submitData.append("lastName", formData.lastName);
    submitData.append("email", formData.email);
    submitData.append("phone", formData.phone);
    if (formData.profilePicture && formData.profilePicture instanceof File) {
      submitData.append("avatar", formData.profilePicture);
    }
    if (formData.resume && formData.resume instanceof File) {
      submitData.append("resume", formData.resume);
    }

    try {
      const response = await axios.put(
        `/updateEmployeeProfile/${id}`,
        submitData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.data.success) {
        alert("Profile updated successfully!");
        setUserProfile({
          ...userProfile,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          avatarPreview: formData.profilePicture,
          resumePreview: formData.resume,
        });
        setIsEditing(false);
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      email: userProfile.email,
      phone: userProfile.phone || "",
      profilePicture: userProfile.profilePic || "",
      resume: userProfile.resume || "",
    });
    setAvatarPreview(
      userProfile.profilePic
        ? `http://localhost:5000/${userProfile.profilePic}`
        : ""
    );
    setResumePreview(
      userProfile.resume ? `http://localhost:5000/${userProfile.resume}` : ""
    );
    setIsEditing(false);
    setError("");
  };

  if (userProfile === null) {
    return <LoadingSpinner />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card
            sx={{
              width: "100%",
              maxWidth: 800,
              padding: 4,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: 4,
                }}
              >
                <Avatar
                  sx={{
                    width: 150,
                    height: 150,
                    bgcolor: "secondary.main",
                    mb: 2,
                  }}
                  src={
                    avatarPreview ||
                    (formData.profilePicture &&
                    formData.profilePicture instanceof File
                      ? URL.createObjectURL(formData.profilePicture)
                      : "")
                  }
                >
                  {!avatarPreview &&
                    !formData.profilePicture &&
                    `${formData.firstName.charAt(0)}${formData.lastName.charAt(
                      0
                    )}`}
                </Avatar>
                <Typography
                  component="h1"
                  variant="h4"
                  align="center"
                  gutterBottom
                >
                  Employee Profile
                </Typography>
              </Box>
              {isEditing ? (
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 2 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoComplete="firstName"
                    autoFocus
                    value={formData.firstName}
                    onChange={handleChange}
                    sx={{ mb: 3 }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    sx={{ mb: 3 }}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    disabled
                    sx={{ mb: 3 }}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    id="phone"
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    sx={{ mb: 3 }}
                  />
                  <Box sx={{ mb: 3 }}>
                    <Button
                      variant="contained"
                      component="label"
                      fullWidth
                      startIcon={<PhotoCamera />}
                      sx={{ mb: 2 }}
                    >
                      Upload Profile Picture
                      <input
                        type="file"
                        hidden
                        name="profilePicture"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </Button>
                    {/* {avatarPreview && (
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteFile('profilePicture')}
                        aria-label="delete profile picture"
                      >
                        <DeleteIcon />
                      </IconButton>
                    )} */}
                  </Box>
                  <Box sx={{ mb: 3 }}>
                    <Button
                      variant="contained"
                      component="label"
                      fullWidth
                      sx={{ mb: 2 }}
                    >
                      Upload Resume
                      <input
                        type="file"
                        hidden
                        name="resume"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                      />
                    </Button>
                    {/* {resumePreview && (
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteFile('resume')}
                        aria-label="delete resume"
                      >
                        <DeleteIcon />
                      </IconButton>
                    )} */}
                  </Box>
                  {error && (
                    <Typography color="error" align="center" sx={{ mb: 3 }}>
                      {error}
                    </Typography>
                  )}
                  <Grid container spacing={3} justifyContent="center">
                    <Grid item>
                      <Button
                        type="submit"
                        variant="contained"
                        startIcon={<SaveIcon />}
                        sx={{ mb: 3 }}
                      >
                        Save Changes
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<CancelIcon />}
                        sx={{ mb: 3 }}
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              ) : (
                <Box className="profile-details" sx={{ mt: 2 }}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    align="center"
                    fontWeight="bold"
                  >
                    {formData.firstName} {formData.lastName}
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                    align="center"
                    color="textSecondary"
                  >
                    {formData.email}
                  </Typography>
                  <Typography variant="body1" align="center">
                    {formData.phone}
                  </Typography>

                  {resumePreview && (
                    <Box sx={{ mt: 3, textAlign: "center" }}>
                      <Typography variant="subtitle1">Resume</Typography>
                      <a
                        href={resumePreview}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="contained">View Resume</Button>
                      </a>
                    </Box>
                  )}
                  {isOwner && (
                    <Box sx={{ mt: 3, textAlign: "center" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<EditIcon />}
                        onClick={() => setIsEditing(true)}
                      >
                        Edit
                      </Button>
                    </Box>
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default EmployeeProfile;
