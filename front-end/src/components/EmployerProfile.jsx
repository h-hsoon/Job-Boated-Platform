import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import { useParams } from 'react-router-dom';
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
import LoadingSpinner from '../shared/LoadingSpinner';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const EmployerProfile = ({ tokenId }) => {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    aboutCompany: '',
    phone: '',
    avatar: '',
  });
  const [avatarPreview, setAvatarPreview] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.post('/dataUser', {
          userId: id,
          userType: "employer"
        });
        const currentUser = tokenId;
        setUserProfile(response.data);
        setFormData({
          companyName: response.data.companyName,
          aboutCompany: response.data.aboutCompany,
          email: response.data.email,
          phone: response.data.phone || '',
          avatar: response.data.avatar ? `http://localhost:5000/${response.data.avatar}` : '',
        });

        setAvatarPreview(response.data.avatar ? `http://localhost:5000/${response.data.avatar}` : '');

        setIsOwner(response.data._id === currentUser);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchProfile();
  }, [id, tokenId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone' && value.trim() !== '' && !/^\d{10,15}$/.test(value)) {
      setError('Phone number must contain only digits and be 10 to 15 characters long.');
    } else {
      setError('');
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // Example: 5MB
        setError('Image size should be less than 5MB.');
        return;
      }
      setFormData({
        ...formData,
        avatar: file,
      });
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.companyName === userProfile.companyName &&
      formData.aboutCompany === userProfile.aboutCompany &&
      formData.phone === (userProfile.phone || '') &&
      !formData.avatar
    ) {
      setError('No changes detected.');
      return;
    }

    if (!formData.companyName.trim()) {
      setError('Company Name cannot be empty.');
      return;
    }
    if (formData.companyName.length > 20) {
      setError('Company name is too long.');
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

    const formDataToSend = new FormData();
    formDataToSend.append('companyName', formData.companyName);
    formDataToSend.append('aboutCompany', formData.aboutCompany);
    formDataToSend.append('phone', formData.phone);
    if (formData.avatar) {
      formDataToSend.append('avatar', formData.avatar);
    }

    try {
      const response = await axios.put('/updateEmployerProfile', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      });

      if (response.data.success) {
        setUserProfile({
          ...userProfile,
          companyName: formData.companyName,
          aboutCompany: formData.aboutCompany,
          phone: formData.phone,
          avatar: formData.avatar ? URL.createObjectURL(formData.avatar) : userProfile.avatar,
        });
        alert('Profile updated successfully!');
        setIsEditing(false);
      } else {
        alert('Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleCancel = () => {
    setFormData({
      companyName: userProfile.companyName,
      aboutCompany: userProfile.aboutCompany,
      phone: userProfile.phone || "",
      avatar: '',
    });
    setAvatarPreview(userProfile.avatar ? `http://localhost:5000/${userProfile.avatar}` : '');
    setIsEditing(false);
    setError('');
  };

  if (userProfile === null) {
    return (
      <LoadingSpinner />
    );
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
          <Card sx={{ width: '100%', maxWidth: 800, padding: 4, borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 4,
                }}
              >
                <Avatar
                  src={avatarPreview}
                  sx={{ width: 150, height: 150, bgcolor: "secondary.main", fontSize: '3rem' }}
                >
                  {userProfile.companyName.charAt(0)}
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
                  <Button
                    variant="contained"
                    component="label"
                    sx={{ mb: 3 }}
                  >
                    Upload Avatar
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </Button>
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
                  <Typography variant="h5" gutterBottom align="center" fontWeight="bold">
                    {userProfile.companyName}
                  </Typography>
                  <Typography variant="h6" gutterBottom align="center" color="textSecondary">
                    <strong>Email:</strong> {userProfile.email}
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
                      {userProfile.aboutCompany}
                    </Typography>
                  </Box>
                  {userProfile.phone && (
                    <Typography variant="body1" gutterBottom align="center" color="textSecondary">
                      <strong>Company Phone:</strong> {userProfile.phone}
                    </Typography>
                  )}
                  {isOwner && (
                    <Grid container spacing={3} justifyContent="center" sx={{ mt: 3 }}>
                      <Grid item>
                        <Button
                          variant="contained"
                          startIcon={<EditIcon />}
                          onClick={() => setIsEditing(true)}
                        >
                          Edit Profile
                        </Button>
                      </Grid>
                    </Grid>
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

export default EmployerProfile;
