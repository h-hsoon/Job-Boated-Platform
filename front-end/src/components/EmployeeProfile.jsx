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
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const EmployeeProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone || '',
    profilePicture: user.profilePic,
    resume: user.resume,
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
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

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleDeleteFile = async (fileType) => {
    const token = Cookies.get('token');
    try {
      await axios.delete(`/delete${fileType}`, {
        headers: {
          Authorization: token,
        },
      });
      setFormData({
        ...formData,
        [fileType.toLowerCase()]: null,
      });
      alert(`${fileType} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting ${fileType}:`, error);
      alert(`An error occurred while deleting ${fileType}.`);
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
    const submitData = new FormData();
    submitData.append('firstName', formData.firstName);
    submitData.append('lastName', formData.lastName);
    submitData.append('email', formData.email);
    submitData.append('phone', formData.phone);
    if (formData.profilePicture && typeof formData.profilePicture !== 'string') {
      submitData.append('profilePicture', formData.profilePicture);
    }
    if (formData.resume && typeof formData.resume !== 'string') {
      submitData.append('resume', formData.resume);
    }

    try {
      const response = await axios.put('/updateEmployeeProfile', submitData, {
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
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: 4,
                }}
              >
                <Avatar
                  sx={{ width: 150, height: 150, bgcolor: "secondary.main", mb: 2 }}
                  src={formData.profilePicture ? formData.profilePicture : null}
                >
                  {!formData.profilePicture && `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`}
                </Avatar>
                <Typography component="h1" variant="h4" align="center" gutterBottom>
                  Employee Profile
                </Typography>
              </Box>
              {isEditing ? (
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
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
                    {formData.profilePicture && (
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteFile('ProfilePicture')}
                        aria-label="delete profile picture"
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
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
                    {formData.resume && (
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteFile('Resume')}
                        aria-label="delete resume"
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
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
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography variant="h6" gutterBottom align="center" color="textSecondary">
                    <strong>Email:</strong> {user.email}
                  </Typography>
                  {user.phone && (
                    <Typography variant="h6" gutterBottom align="center" color="textSecondary">
                      <strong>Phone:</strong> {user.phone}
                    </Typography>
                  )}
                  {formData.resume && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                      <a href={formData.resume} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                        View Resume
                      </a>
                    </Box>
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

export default EmployeeProfile;
