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

const theme = createTheme();

export default function Rejestier() {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(companyName, email, password, aboutCompany, phone);
  };

  const addUser = (companyName, email, password, aboutCompany, phone) => {
    axios
      .post("http://localhost:5000/register/employer", {
        companyName,
        email,
        password,
        aboutCompany,
        phone,
      })
      .then(() => {
        setCompanyName("");
        setEmail("");
        setPassword("");
        setAboutCompany("");
        setPhone("");
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
              required
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
