
import React, { useState } from 'react';
import axios from '../axiosConfig';
import Cookies from 'js-cookie';
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
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const EmployeeProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (value.trim() !== '') {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError('First Name and Last Name cannot be empty.');
      return;
    }
    if (error) {
      alert('Please fix the error before saving.');
      return;
    }
    const token = Cookies.get('token');

    try {
      const response = await axios.put('/updateEmployeeProfile', formData, {
        headers: {
          Authorization: token,
        },
      });

      if (response.data.success) {
        alert('Profile updated successfully!');
        setIsEditing(false); // Exit edit mode on success
      } else {
        alert('Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card sx={{ minWidth: 275, padding: 3 }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 2,
                }}
              >
                <Avatar sx={{ width: 120, height: 120, bgcolor: "secondary.main" }}>
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </Avatar>
              </Box>
              <Typography component="h1" variant="h5" align="center" gutterBottom>
                Employee Profile
              </Typography>
              {isEditing ? (
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                    sx={{ mb: 2 }}
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
                    sx={{ mb: 2 }}
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
                    sx={{ mb: 2 }}
                  />
                  {error && (
                    <Typography color="error" align="center" sx={{ mb: 2 }}>
                      {error}
                    </Typography>
                  )}
                  <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                      <Button
                        type="submit"
                        variant="contained"
                        startIcon={<SaveIcon />}
                        sx={{ mb: 2 }}
                      >
                        Save Changes
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<CancelIcon />}
                        sx={{ mb: 2 }}
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              ) : (
                <Box className="profile-details" sx={{ mt: 1 }}>
                  <Typography variant="h6" gutterBottom align="center">
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography variant="body1" gutterBottom align="center">
                    <strong>Email:</strong> {user.email}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      startIcon={<EditIcon />}
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  </Box>
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
