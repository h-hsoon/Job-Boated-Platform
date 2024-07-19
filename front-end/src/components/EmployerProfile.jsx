
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
  const [noChanges, setNoChanges] = useState(true); // Track if there are no changes

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
      // Check if there are no changes
      if (
        formData.companyName === user.companyName &&
        formData.aboutCompany === user.aboutCompany &&
        formData.phone === user.phone
      ) {
        setNoChanges(true);
      } else {
        setNoChanges(false);
      }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (noChanges) {
      setError('No changes detected.');
      return;
    }
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
      const response = await axios.put('/updateEmployerProfile', formData, {
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
          <Card sx={{ width: '100%', maxWidth: 800, padding: 4, borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 4,
                }}
              >
                <Avatar sx={{ width: 150, height: 150, bgcolor: "secondary.main", fontSize: '3rem' }}>
                  {user.companyName.charAt(0)}
                </Avatar>
              </Box>
              <Typography component="h1" variant="h4" align="center" gutterBottom>
                Employer Profile
              </Typography>
              {isEditing ? (
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
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
                    sx={{ mb: 3 }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="aboutCompany"
                    label="About Company"
                    name="aboutCompany"
                    multiline
                    rows={6}
                    value={formData.aboutCompany}
                    onChange={handleChange}
                    sx={{ mb: 3 }}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    id="phone"
                    label="Company Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    sx={{ mb: 3 }}
                  />
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
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              ) : (
                <Box className="profile-details" sx={{ mt: 2 }}>
                  <Typography variant="h5" gutterBottom align="center" fontWeight="bold">
                    {user.companyName}
                  </Typography>
                  <Typography variant="h6" gutterBottom align="center" color="textSecondary">
                    <strong>Email:</strong> {user.email}
                  </Typography>
                  <Box
                    sx={{
                      mt: 2,
                      padding: 2,
                      borderRadius: 1,
                      border: '1px solid',
                      borderColor: 'grey.300',
                      backgroundColor: 'grey.100',
                    }}
                  >
                    <Typography
                      variant="body1"
                      align="center"
                      color="textPrimary"
                      sx={{ fontWeight: 'medium' }}
                    >
                      <strong>About Company:</strong>
                    </Typography>
                    <Typography
                      variant="body1"
                      align="center"
                      color="textPrimary"
                      sx={{ mt: 1, fontSize: '1rem' }}
                    >
                      {user.aboutCompany}
                    </Typography>
                  </Box>
                  {user.phone && (
                    <Typography variant="body1" gutterBottom align="center" color="textSecondary">
                      <strong>Company Phone:</strong> {user.phone}
                    </Typography>
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: 3,
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
