  import React, { useState } from 'react';
  import axios from '../axiosConfig';

const LogIn = ({onLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post('/login/employee', { email, password });
      console.log("Login successful", response.data);
       onLogin(response.data.token)
      // Proceed with the login success (e.g., saving the token, redirecting the user, etc.)
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        setError(error.response.data.loginError);
      } else if (error.request) {
        // The request was made but no response was received
        setError('No response received');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError(error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LogIn;
