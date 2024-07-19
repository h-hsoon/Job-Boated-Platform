import React, { useState,useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from './axiosConfig'
import Home from "./Home";
import LoginForm from "./components/LogIn";
import Register from "./components/Register";
import Cookies from "js-cookie";
import getTokenData from "./auth/auth";
import RegisterEmployee from "./components/RegisterEmployee";
import EmployerProfile from './components/EmployerProfile';
import EmployeeProfile from './components/EmployeeProfile';

function App() {
  const [loggedIn, setLoggedIn] = useState(!!Cookies.get('token'));
  const [Datatoken, setDatatoken] = useState(() => {
    const storedUser = Cookies.get('Datatoken');
      return storedUser ? JSON.parse(storedUser) : null;
  });
  const [dataUser, setdataUser] = useState(() => {
    const storedDataUser = Cookies.get('dataUser');
      return storedDataUser ? JSON.parse(storedDataUser) : null;
  });
 
  useEffect(() => {
    const fetchData = async () => {
      if (loggedIn && Datatoken) {
        console.log('User ID:', Datatoken.id); 
        try {
          const response = await axios.post('/dataUser', {
            userId: Datatoken.id,
            userType: Datatoken.userType
          });
          console.log("get data successful", response.data);
          setdataUser(response.data);
          Cookies.set('dataUser', JSON.stringify(response.data));
        } catch (error) {
          if (error.response) {
            console.log(error.response.data.loginError);
          } else if (error.request) {
            console.log("No response received");
          } else {
            console.log(error.message);
          }
        } 
      }
    };
    fetchData();
  }, [loggedIn, Datatoken]);
  
  
  const onLogin = (token) => {
    Cookies.set('token', token);
    const tokenData = getTokenData();
    setLoggedIn(true);
    setDatatoken(tokenData);
    Cookies.set('Datatoken', JSON.stringify(tokenData));
  };

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('Datatoken');
    Cookies.remove('dataUser');
    setLoggedIn(false);
    setDatatoken(null);
    setdataUser(null);
  };

 

  return (
    <BrowserRouter>
      <div className="App">
        {loggedIn && <button onClick={handleLogout}>Logout</button>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={loggedIn ? (Datatoken?.userType === 'employee' ? <Navigate to="/employee" /> : <Navigate to="/employer" />) : <LoginForm onLogin={onLogin} />} />

          <Route path="/registerEmployer" element={<Register />} />
          <Route path="/registerEmployee" element={<RegisterEmployee />} />
     
          <Route
            path="/employee"
            element={Datatoken?.userType === 'employee' && dataUser ? <EmployeeProfile user={dataUser} /> : <Navigate to="/login" />}
          />
          <Route
            path="/employer"
            element={Datatoken?.userType === 'employer' && dataUser ? <EmployerProfile user={dataUser} /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
