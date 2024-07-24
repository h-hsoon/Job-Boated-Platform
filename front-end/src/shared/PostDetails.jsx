
import React, { useEffect, useState } from "react";
import axios from '../axiosConfig';
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button, Avatar, IconButton, Box, CssBaseline, Container } from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LoadingSpinner from "../shared/LoadingSpinner";


const theme = createTheme();

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(4),
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  marginBottom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const PostDetails = ({ companies }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
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

  if (!post) {
    return <LoadingSpinner />;
  }

  const { name: companyName, avatar: companyAvatar } = getCompanyInfo(post.employer);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="md">
        <StyledCard>
          <CardContent>
            {post.avatar && (
              <StyledAvatar
                src={`http://localhost:5000/${post.avatar}`}
                alt="Post avatar"
              />
            )}
            <Typography variant="h4" gutterBottom>{post.jobTitle}</Typography>
            <Box display="flex" alignItems="center" mb={2}>
              {companyAvatar && (
                <Avatar
                  src={companyAvatar}
                  alt="Company avatar"
                  onClick={() => handleClick(post.employer)}
                  sx={{ width: 56, height: 56, cursor: "pointer", marginRight: 2 }}
                />
              )}
              <Typography variant="h6" onClick={() => handleClick(post.employer)} sx={{ cursor: "pointer", marginBottom: 2 }}>
                <strong>Company:</strong> {companyName}
              </Typography>
            </Box>
            <Typography variant="body1" paragraph><strong>Description:</strong> {post.jobDescription}</Typography>
            <Typography variant="body1" paragraph><strong>Responsibilities:</strong> {post.jobResponsibitirs}</Typography>
            <Typography variant="body1" paragraph><strong>Requirements:</strong> {post.jobRequirements}</Typography>
            <Typography variant="body1" paragraph><strong>Skills:</strong> {post.skills.join(", ")}</Typography>
            <Typography variant="body1" paragraph><strong>Location:</strong> {post.jobLocation}</Typography>
            <Typography variant="body1" paragraph><strong>Salary:</strong> ${post.offerSalary} / Month</Typography>
            <Typography variant="body1" paragraph><strong>Type:</strong> {post.jobType}</Typography>
            <Typography variant="body1" paragraph><strong>Category:</strong> {post.jobCategory}</Typography>
            <Typography variant="body1" paragraph><strong>Experience:</strong> {post.experience} years</Typography>
            <Typography variant="body1" paragraph><strong>Position:</strong> {post.jobPosition}</Typography>
            <Box display="flex" alignItems="center">
              <StyledButton variant="contained" color="primary" onClick={() => toggleFavorite(post._id)}>
                {favorites.includes(post._id) ? "Remove from Favorites" : "Add to Favorites"}
              </StyledButton>
              <IconButton onClick={() => toggleFavorite(post._id)} sx={{ marginLeft: 1 }}>
                {favorites.includes(post._id) ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
              </IconButton>
            </Box>
          </CardContent>
        </StyledCard>
      </Container>
    </ThemeProvider>
  );
};

export default PostDetails;
