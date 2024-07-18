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
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="confirmPassword"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
            /> */}
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

  // return (
  //   <div className="container">
  //     {eicessterror && <Link to="/login">Go to Log In</Link>}
  //     <form
  //       onSubmit={handleSubmit}
  //       className="w-50 h-100 mt-3 mb-5 p-5 border border-primary border-5 rounded-2 d-flex flex-column"
  //     >
  //       {error && <p className="text-danger fw-bold fs-3">{error}</p>}
  //       <div className="mb-3">
  //         <label htmlFor="companyName" className="form-label">
  //           Company Name
  //         </label>
  //         <input
  //           type="text"
  //           className="form-control"
  //           id="companyName"
  //           value={companyName}
  //           onChange={(e) => setCompanyName(e.target.value)}
  //         />
  //       </div>
  //       <div className="mb-3">
  //         <label htmlFor="exampleInputEmail1" className="form-label">
  //           Email address
  //         </label>
  //         <input
  //           type="email"
  //           className="form-control"
  //           id="exampleInputEmail1"
  //           aria-describedby="emailHelp"
  //           value={email}
  //           onChange={(e) => setEmail(e.target.value)}
  //         />
  //         <div id="emailHelp" className="form-text">
  //           We'll never share your email with anyone else.
  //         </div>
  //       </div>
  //       <div className="mb-3">
  //         <label htmlFor="exampleInputPassword1" className="form-label">
  //           Password
  //         </label>
  //         <input
  //           type="password"
  //           className="form-control"
  //           id="exampleInputPassword1"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //         />
  //       </div>
  //       <div className="mb-3">
  //         <label htmlFor="exampleFormControlTextarea1" className="form-label">
  //           About the Company
  //         </label>
  //         <textarea
  //           className="form-control"
  //           id="exampleFormControlTextarea1"
  //           rows="3"
  //           value={aboutCompany}
  //           onChange={(e) => setAboutCompany(e.target.value)}
  //         ></textarea>
  //       </div>
  //       <div className="mb-3">
  //         <label htmlFor="phone" className="form-label">
  //           Phone Number
  //         </label>
  //         <input
  //           type="text"
  //           className="form-control"
  //           id="phone"
  //           value={phone}
  //           onChange={(e) => setPhone(e.target.value)}
  //         />
  //       </div>
  //       <button type="submit" className="btn btn-primary">
  //         Rejestier
  //       </button>
  //     </form>
  //   </div>
  // );
}
