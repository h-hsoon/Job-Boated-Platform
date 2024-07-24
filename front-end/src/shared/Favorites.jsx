import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button, Avatar, IconButton, Box, CssBaseline, Container } from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Cookies from 'js-cookie';
import axios from '../axiosConfig';

const theme = createTheme();

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  borderRadius: theme.spacing(2),
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
}));
const CompanyInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(1),
}));

const Favorites = ({ posts, companies, Datatoken }) => {
  const [favorites, setFavorites] = useState([]);
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();
  const token = Cookies.get('token');

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
    const savedFriends = JSON.parse(localStorage.getItem("friends")) || [];
    setFriends(savedFriends);
  }, []);

  const toggleFavorite = (postId) => {
    let updatedFavorites;
    if (favorites.includes(postId)) {
      updatedFavorites = favorites.filter((id) => id !== postId);
    } else {
      updatedFavorites = [...favorites, postId];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const toggleFriend = async (friendId) => {
    let updatedFriends;
    if (friends.includes(friendId)) {
      updatedFriends = friends.filter((id) => id !== friendId);
    } else {
      updatedFriends = [...friends, friendId];
    }
    setFriends(updatedFriends);
    localStorage.setItem("friends", JSON.stringify(updatedFriends));
    try {
      await axios.patch(`/users/${Datatoken.id}/${friendId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const favoritePosts = posts.filter((post) => favorites.includes(post._id));

  const getCompanyInfo = (employerId) => {
    const company = companies.find((company) => company._id === employerId);
    if (company) {
      return {
        name: company.companyName,
        avatar: company.avatar ? `http://localhost:5000/${company.avatar}` : null,
      };
    }
    return {
      name: "Unknown Company",
      avatar: null,
    };
  };

  const handleClick = (id) => {
    navigate(`/employer/${id}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Favorites
          </Typography>
          {favoritePosts.length > 0 ? (
            favoritePosts.map((post) => {
              const { name: companyName, avatar: companyAvatar } = getCompanyInfo(post.employer);

              return (
                <StyledCard key={post._id}>
                  {post.avatar && (
                    <Avatar
                      src={`http://localhost:5000/${post.avatar}`}
                      alt="Post avatar"
                      sx={{ width: 56, height: 56, marginRight: 2 }}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h5">{post.jobTitle}</Typography>
                     <CompanyInfo>
                  {companyAvatar && (
                    <Avatar
                      src={companyAvatar}
                      alt="Company avatar"
                      onClick={() => handleClick(post.employer)}
                      sx={{ width: 40, height: 40, cursor: "pointer", marginRight: 1 }}
                    />
                  )}
                  <Typography variant="subtitle1" onClick={() => handleClick(post.employer)} sx={{ cursor: "pointer" }}>
                    <strong>Company:</strong> {companyName}
                  </Typography>
                  {Datatoken.userType === 'employee' && (
                  <IconButton 
                  onClick={() => toggleFriend(post.employer)} 
                  sx={{ ml: 1, color: friends.includes(post.employer) ? 'red' : 'green' }}>
                  {friends.includes(post.employer) ? <PersonRemoveIcon color="primary" /> : <PersonAddIcon />}
                </IconButton>
              )}
                  
                </CompanyInfo>
                    <Typography variant="body1"><strong>Location:</strong> {post.jobLocation}</Typography>
                    <Typography variant="body1"><strong>Salary:</strong> ${post.offerSalary} / Month</Typography>
                    <Typography variant="body1"><strong>Type:</strong> {post.jobType}</Typography>
                    <Typography variant="body1"><strong>Experience:</strong> {post.experience} years</Typography>
                    <Typography variant="body1"><strong>Category:</strong> {post.jobCategory}</Typography>
                    <Button component={Link} to={`/post/${post._id}`} variant="contained" color="primary" sx={{ mt: 2 }}>
                      Read more
                    </Button>
                    <IconButton onClick={() => toggleFavorite(post._id)} sx={{ marginTop: 2 }}>
                  {favorites.includes(post._id) ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                </IconButton>
                  </CardContent>
                </StyledCard>
              );
            })
          ) : (
            <Typography variant="h6" align="center" sx={{ mt: 4 }}>No favorite posts found.</Typography>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Favorites;
