import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";
import ApartmentIcon from "@mui/icons-material/Apartment";
import axios from "../axiosConfig";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, Link } from "react-router-dom";
import FileUploader from "../FileUploader/FileUploader";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../auth/inputValidate.js";

const theme = createTheme();

export default function Rejestier() {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState();
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const onSelectFileHandler = (e) => {
    setAvatar(e.target.files[0]);
  };

  const onDeleteFileHandler = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      companyName === "" &&
      email === "" &&
      password === "" &&
      confirmPassword === "" &&
      aboutCompany === ""
    ) {
      setError(
        "Company Name, Email, About Company, Password and Confirm Password are required"
      );
    } else if (aboutCompany.length < 50) {
      setError("About Company must be at least 50 characters long");
    } else {
      if (!validateEmail(email)) {
        setError("Please enter a valid email address.");
        return;
      }
      if (!validatePassword(password)) {
        setError(
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
        );
        return;
      }
      if (phone !== "") {
        if (!validatePhoneNumber(phone)) {
          setError("Please enter a valid phone number.");
          return;
        }
      }
    }

    addUser(
      companyName,
      email,
      password,
      confirmPassword,
      aboutCompany,
      phone,
      avatar
    );
  };

  const addUser = (
    companyName,
    email,
    password,
    confirmPassword,
    aboutCompany,
    phone,
    avatar
  ) => {
    const formData = new FormData();
    formData.append("companyName", companyName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("aboutCompany", aboutCompany);
    formData.append("phone", phone);
    formData.append("avatar", avatar);
    axios
      .post("http://localhost:5000/register/employer", formData)
      .then(() => {
        setCompanyName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setAboutCompany("");
        setPhone("");
        setAvatar();
        setError("");
        navigate("/login");
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <ApartmentIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register Employer
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="companyName"
              label="company Name"
              name="companyName"
              autoComplete="text"
              autoFocus
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              multiline={true}
              margin="normal"
              required
              fullWidth
              id="aboutCompany"
              label="About Company"
              name="aboutCompany"
              autoFocus
              value={aboutCompany}
              onChange={(e) => setAboutCompany(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="phone"
              label="company phone"
              name="phone"
              autoFocus
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
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
                Avatar
              </label>
            </div>
            <FileUploader
              accept="image/png,image/jpg,image/jpeg"
              onSelectFile={onSelectFileHandler}
              onDeleteFile={onDeleteFileHandler}
            />
            {error && (
              <Typography color="error" align="center">
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/login" variant="body2">
                  {"I have an account? Log In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
