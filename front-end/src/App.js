
import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import LoginForm from './components/LogIn';
import Register from './components/Register';
import Cookies from 'js-cookie';
import  getTokenType  from './auth/auth';

function App() {
  const [loggedInEmployee, setLoggedInEmployee] = useState(!!Cookies.get('token'));
  const [userType, setUserType] = useState(()=>{
    const storedUserType = Cookies.get('userType');
     return (storedUserType)? storedUserType:null
  });

  const onLogin = (token) => {
    Cookies.set('token', token);
    const tokenType = getTokenType();
    setLoggedInEmployee(true);
    setUserType(tokenType);
    Cookies.set('userType', tokenType);
  };

  const handleLogout = () => {
    Cookies.remove('token'); 
    setLoggedInEmployee(false);
    setUserType(null); 
    Cookies.remove('userType'); 
  };

  return (
    <BrowserRouter>
      <div className="App">
        {loggedInEmployee && <button onClick={handleLogout}>Logout</button>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm onLogin={onLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/employee" element={userType === 'employee' ? <p>you are employee</p> : <Navigate to="/login" />} />
          <Route path="/employer" element={userType === 'employer' ? <p>you are employer</p> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
