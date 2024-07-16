import React, { useState } from 'react';
import { BrowserRouter, Routes ,Route } from "react-router-dom";
import Home from "./Home";
import LoginForm from "./components/LogIn";
import Cookies from 'js-cookie';
function App() {
  const [loggedInEmployee, setLoggedInEmployee] = useState(!!Cookies.get('employeeToken'));

  const onLogin=(token)=>{
    Cookies.set('employeeToken',token)
    setLoggedInEmployee(true);
  }

  const handleLogout = () => {
    Cookies.remove('employeeToken'); // Remove token from cookies
    setLoggedInEmployee(false);
  };
  return (
    <BrowserRouter>

      <div className="App">
        <button onClick={handleLogout}>logOut</button>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<LoginForm onLogin={onLogin}/>} />
          <Route path="/new" element={loggedInEmployee?<p>you are log in</p>:<p>you are not log in</p>} />
        </Routes>
      </div>
      </BrowserRouter>
        );
}

        export default App;
