import React, { useState,useEffect } from "react";
import axios from './axiosConfig'
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LogIn";
import Register from "./components/Register";
import Cookies from "js-cookie";
import getTokenData from "./auth/auth";
import RegisterEmployee from "./components/RegisterEmployee";
import EmployerProfile from './components/employer/EmployerProfile';
import EmployeeProfile from './components/EmployeeProfile';
import Header from "./shared/Header";
import Parent from "./shared/Parent";
import PostDetails from "./shared/PostDetails";
import AddPost from "./shared/AddPost";
import AllPosts from "./shared/AllPosts";
import Favorites from "./shared/Favorites";
import Posts from "./shared/Posts";
import CompanyPosts from "./components/CompanyPosts";
import FollowingPage from "./components/FollwingPage";
function App() {
  const [loggedIn, setLoggedIn] = useState(!!Cookies.get('token'));
  const [Datatoken, setDatatoken] = useState(() => {
    const storedUser = Cookies.get('Datatoken');
      return storedUser ? JSON.parse(storedUser) : null;
  });
  const [posts, setPosts] = useState([]);
  const [companies, setCompanies] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
              const response = await axios.get('/posts'); 
              setPosts(response.data);
              console.log(response.data)
            } catch (error) {
              console.error('Error fetching posts:', error);
            }
          };
          const fetchuEmployer = async () => {
            try {
              const response = await axios.get('/employers'); 
              setCompanies(response.data);
              console.log(response.data)
            } catch (error) {
              console.error('Error fetching posts:', error);
            }
          };
      fetchPosts();
      fetchuEmployer();
    }, []);
  
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
        {<Header handleLogout={handleLogout} loggedIn={loggedIn} Datatoken={Datatoken} />}
        <Routes>
          <Route path="/" element ={<Parent/>} />
          <Route path="/post" element={<AddPost/>}/>
      
          <Route path="/login" element={loggedIn ? <Navigate to={Datatoken?.userType === 'employee' ? `/employee/${Datatoken.id}` : `/employer/${Datatoken.id}`} /> : <LoginForm onLogin={onLogin} />} />

          <Route path="/registerEmployer" element={<Register />} />
          <Route path="/registerEmployee" element={<RegisterEmployee />} />
          <Route path="/employee/:id" element={ <EmployeeProfile tokenId={Datatoken?.id}/> } />
          <Route path="/employer/:id" element={ <EmployerProfile tokenId={Datatoken?.id} /> }/>
          <Route path="/allposts" element={<AllPosts posts={posts} companies={companies} Datatoken={Datatoken}/>} />
          <Route path="/posts/:searchValue" element={<Posts posts={posts} companies={companies}  Datatoken={Datatoken}/>} />
          <Route path="/Categoriesposts/:categoryName" element={<Posts posts={posts}  Datatoken={Datatoken}/>} />
          <Route path="/post/:id" element={<PostDetails  companies={companies}/>} />
          <Route path="/favorites" element={<Favorites posts={posts} companies={companies}  Datatoken={Datatoken} />} />
          <Route path="/CompanyPosts" element={<CompanyPosts posts={posts} companies={companies} tokenId={Datatoken?.id} />} />
          <Route path="/follow" element={<FollowingPage tokenId={Datatoken?.id} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
