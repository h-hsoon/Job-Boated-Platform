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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import FileUploader from "../FileUploader/FileUploader";
import axios from "axios";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../auth/inputValidate.js";

const theme = createTheme();

export default function RegisterEmployee() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState();
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onSelectFileHandler = (e) => {
    setAvatar(e.target.files[0]);
  };

  const onDeleteFileHandler = () => {
    setAvatar(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      firstName === "" &&
      lastName === "" &&
      email === "" &&
      password === "" &&
      confirmPassword === ""
    ) {
      setError(
        "First Name, Last Name, Email, Password and Confirm Password are required"
      );
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
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phone,
      avatar
    );
  };

  const addUser = (
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    phone,
    avatar
  ) => {
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("phone", phone);
    formData.append("avatar", avatar);
    axios
      .post("http://localhost:5000/register/employee", formData)
      .then(() => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
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
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register Employee
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
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="text"
              autoFocus
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="text"
              autoFocus
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
              label="confirmPassword"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
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
