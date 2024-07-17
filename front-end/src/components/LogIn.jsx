
  import React, { useState } from 'react';
  import { Avatar, Button, TextField, FormControlLabel, Grid, Box, Typography, Container, CssBaseline, Link, Radio, RadioGroup, FormControl, FormLabel } from '@mui/material';
  import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
  import axios from '../axiosConfig';
  import { createTheme, ThemeProvider } from '@mui/material/styles';
  
  const theme = createTheme();
  
  const LoginForm = ({onLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('employee');
    const [error, setError] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setError('');
      if (!email || !password) {
          setError('Both email and password are required.');
          return;
        }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          setError('Please enter a valid email address.');
          return;
        }
      try {
        const response = await axios.post(`login/`, { email, password ,userType });
        console.log("Login successful", response.data);
        console.log(response.data.token);
        onLogin(response.data.token)
        // Handle login success (e.g., store token in cookies, redirect user, etc.)
      } catch (error) {
        if (error.response) {
          setError(error.response.data.loginError);
        } else if (error.request) {
          setError('No response received');
        } else {
          setError(error.message);
        }
      }
    };
  
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
               <FormControl component="fieldset" sx={{ mt: 2 }}>
                <FormLabel component="legend">User Type</FormLabel>
                <RadioGroup
                  row
                  aria-label="userType"
                  name="userType"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                >
                  <FormControlLabel value="employee" control={<Radio />} label="employee" />
                  <FormControlLabel value="employer" control={<Radio />} label="employer" />
                </RadioGroup>
              </FormControl>
              {error && <Typography color="error" align="center">{error}</Typography>}
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  };
  
  export default LoginForm;
  