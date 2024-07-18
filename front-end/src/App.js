import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import LoginForm from "./components/LogIn";
import Register from "./components/Register";
import Cookies from "js-cookie";
import getTokenType from "./auth/auth";
import RegisterEmployee from "./components/RegisterEmployee";
import EmployerProfile from './components/EmployerProfile';
import EmployeeProfile from './components/EmployeeProfile';

function App() {
  const [loggedIn, setLoggedIn] = useState(!!Cookies.get('token'));

  const [user, setUser] = useState(() => {
    const storedUser = Cookies.get('userData');
      return storedUser ? JSON.parse(storedUser) : null;
  });
 
  const onLogin = (token) => {
    Cookies.set('token', token);
    const tokenData = getTokenType();
    setLoggedIn(true);
    setUser(tokenData);
    Cookies.set('userData', JSON.stringify(tokenData));
  };

  const handleLogout = () => {
    Cookies.remove('token');
    setLoggedIn(false);
    setUser(null);
    Cookies.remove('userData');
  };

  return (
    <BrowserRouter>
      <div className="App">
        {loggedIn && <button onClick={handleLogout}>Logout</button>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={loggedIn ? (user?.userType === 'employee' ? <Navigate to="/employee" /> : <Navigate to="/employer" />) : <LoginForm onLogin={onLogin} />} />


          <Route path="/registerEmployer" element={<Register />} />
          <Route path="/registerEmployee" element={<RegisterEmployee />} />
          <Route path="/employee" element={user?.userType === 'employee' ? <EmployeeProfile user={user} /> : <Navigate to="/login" />} />
          <Route path="/employer" element={user?.userType === 'employer' ? <EmployerProfile user={user} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
