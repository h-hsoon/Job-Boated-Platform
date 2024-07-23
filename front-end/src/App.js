import React, { useState, } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import LoginForm from "./components/LogIn";
import Register from "./components/Register";
import Cookies from "js-cookie";
import getTokenData from "./auth/auth";
import RegisterEmployee from "./components/RegisterEmployee";
import EmployerProfile from './components/EmployerProfile';
import EmployeeProfile from './components/EmployeeProfile';
import Header from "./shared/Header";
import Parent from "./shared/Parent";
import Posts from './shared/Posts'

function App() {
  const [loggedIn, setLoggedIn] = useState(!!Cookies.get('token'));
  const [Datatoken, setDatatoken] = useState(() => {
    const storedUser = Cookies.get('Datatoken');
      return storedUser ? JSON.parse(storedUser) : null;
  });
  
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
    setLoggedIn(false);
    setDatatoken(null);
  };

  return (
    <BrowserRouter>
      <div className="App">
        {<Header handleLogout={handleLogout} loggedIn={loggedIn} />}
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element ={<Parent/>} />
          <Route path="/post" element={<Posts/>}/>
      
          <Route path="/login" element={loggedIn ? <Navigate to={Datatoken?.userType === 'employee' ? `/employee/${Datatoken.id}` : `/employer/${Datatoken.id}`} /> : <LoginForm onLogin={onLogin} />} />

          <Route path="/registerEmployer" element={<Register />} />
          <Route path="/registerEmployee" element={<RegisterEmployee />} />
          <Route path="/employee/:id" element={ <EmployeeProfile tokenId={Datatoken?.id}/> }
          />
          <Route path="/employer/:id" element={ <EmployerProfile tokenId={Datatoken?.id} /> }/>
        
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
