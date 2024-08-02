import React from "react";
import { Button, TextField, Box, Typography, Grid } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

const EmployerProfileEdit = ({
  formData,
  avatarPreview,
  error,
  handleChange,
  handleFileChange,
  handleSubmit,
  handleCancel,
  handleDeleteAvatar,
}) => {
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 4,
        }}
      >
        <img
          src={avatarPreview || "/path/to/default/avatar.png"} // Optional: Add a default image if none is available
          alt="Avatar"
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            border: "1px solid #ddd",
          }}
        />
      </Box>
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
      <Button variant="contained" component="label" sx={{ mb: 3 }}>
        Upload Avatar
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
      </Button>
      {/* {avatarPreview && (
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteAvatar}
          sx={{ mb: 3 }}
        >
          Delete Avatar
        </Button>
      )} */}
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
  );
};

export default EmployerProfileEdit;
