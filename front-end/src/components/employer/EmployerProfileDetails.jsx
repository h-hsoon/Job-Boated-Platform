import React from 'react';
import { Typography, Box, Button, Grid, Avatar, Card, CardContent } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
const EmployerProfileDetails = ({ userProfile, avatarPreview, followers, isOwner, onEditClick }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/employee/${id}`);
  };
  return (
    <Box className="profile-details" sx={{ mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 4,
        }}
      >
        <img
          src={avatarPreview}
          alt="Avatar"
          style={{ width: '150px', height: '150px', borderRadius: '50%', border: '1px solid #ddd' }}
        />
      </Box>
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
              onClick={onEditClick}
            >
              Edit Profile
            </Button>
          </Grid>
        </Grid>
      )}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom align="center" fontWeight="bold">
          Followers
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {followers.map((follower) => (
            <Grid item xs={12} sm={6} md={4} key={follower._id}>
              <Card sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
                <Avatar
                  src={`http://localhost:5000/${follower.avatar}`}
                  alt={`${follower.firstName} ${follower.lastName}`}
                  sx={{ width: 56, height: 56, marginRight: 2 }}
                  onClick={() => handleClick(follower._id)}
                />
                <CardContent>
                  <Typography variant="body1"  onClick={() => handleClick(follower._id)} fontWeight="bold">
                    {follower.firstName} {follower.lastName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {follower.email}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default EmployerProfileDetails;
