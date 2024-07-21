import React from 'react';
import { Box, Typography, Container, CssBaseline } from "@mui/material";
import { RingLoader } from 'react-spinners';
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const LoadingSpinner = () => {
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
            justifyContent: "center",
            height: '100vh',
          }}
        >
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Loading...
          </Typography>
          <RingLoader size={150} color="#1976d2" loading />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoadingSpinner;
