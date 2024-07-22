// src/components/EmployerProfileDetails.jsx
import React from 'react';
import { Typography, Box, Button, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const EmployerProfileDetails = ({ userProfile,  avatarPreview, isOwner, onEditClick }) => {
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
    </Box>
  );
};

export default EmployerProfileDetails;
