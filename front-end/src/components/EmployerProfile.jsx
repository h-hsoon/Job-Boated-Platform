
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

const EmployerProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: user.companyName,
    aboutCompany: user.aboutCompany,
    phone: user.phone,
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate phone number format only if value is not empty
    if (name === 'phone' && value.trim() !== '') {
      if (!/^\d{10,15}$/.test(value)) {
        setError('Phone number must contain only digits and be 10 to 15 characters long.');
      } else {
        setError(''); // Clear error message if valid
      }
    } else {
      setError(''); // Clear error message if valid
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.companyName.trim()) {
      setError('Company Name cannot be empty.');
      return;
    }
    if (formData.aboutCompany.length < 50) {
      setError('Company description must be at least 50 characters long.');
      return;
    }
    if (error) {
      alert('Please fix the error before saving.');
      return;
    }
    const token = Cookies.get('token');

    try {
      const response = await axios.put('/updateProfile', formData, {
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
                  {user.companyName.charAt(0)}
                </Avatar>
              </Box>
              <Typography component="h1" variant="h5" align="center" gutterBottom>
                Employer Profile
              </Typography>
              {isEditing ? (
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="companyName"
                    label="Company Name"
                    name="companyName"
                    autoFocus
                    value={formData.companyName}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="aboutCompany"
                    label="About Company"
                    name="aboutCompany"
                    multiline
                    rows={4}
                    value={formData.aboutCompany}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    id="phone"
                    label="Company Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
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
                    {user.companyName}
                  </Typography>
                  <Typography variant="body1" gutterBottom align="center">
                    <strong>Email:</strong> {user.email}
                  </Typography>
                  <Typography variant="body1" gutterBottom align="center">
                    <strong>About Company:</strong> {user.aboutCompany}
                  </Typography>
                  {user.phone && (
                    <Typography variant="body1" gutterBottom align="center">
                      <strong>Company Phone:</strong> {user.phone}
                    </Typography>
                  )}
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

export default EmployerProfile;
