import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from '../axiosConfig';
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Card, CardContent, Typography, Button, Avatar, IconButton, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
}));

const CompanyInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(1),
}));

const Posts = ({ posts, Datatoken }) => {
  const [favorites, setFavorites] = useState([]);
  const [companiesState, setCompaniesState] = useState([]);
  const navigate = useNavigate();
  const token = Cookies.get('token');
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);

    const fetchEmployers = async () => {
      try {
        const response = await axios.get('/employers');
        setCompanies(response.data);

        // Initialize companies state
        const initialCompaniesState = response.data.map(company => ({
          _id: company._id,
          followers: company.followers.length,
          isFollowing: company.followers.includes(Datatoken.id),
        }));
        setCompaniesState(initialCompaniesState);
      } catch (error) {
        console.error('Error fetching employers:', error);
      }
    };

    fetchEmployers();
  }, [Datatoken.id]);

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

  const toggleFriend = async (companyId) => {
    try {
      await axios.patch(`/users/${Datatoken.id}/${companyId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCompaniesState(prevState =>
        prevState.map(company =>
          company._id === companyId
            ? {
                ...company,
                followers: company.isFollowing ? company.followers - 1 : company.followers + 1,
                isFollowing: !company.isFollowing,
              }
            : company
        )
      );
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const getCompanyInfo = (employerId) => {
    const company = companies.find((company) => company._id === employerId);
    const companyState = companiesState.find((company) => company._id === employerId);
    if (company && companyState) {
      return {
        name: company.companyName,
        followers: companyState.followers,
        isFollowing: companyState.isFollowing,
        avatar: company.avatar ? `http://localhost:5000/${company.avatar}` : null,
      };
    }
    return {
      name: "Unknown Company",
      followers: 0,
      isFollowing: false,
      avatar: null,
    };
  };

  const handleClick = (id) => {
    navigate(`/employer/${id}`);
  };

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => {
          const { name: companyName, followers: companyFollowers, isFollowing, avatar: companyAvatar } = getCompanyInfo(post.employer);

          return (
            <StyledCard key={post._id}>
              {post.avatar && (
                <Avatar
                  src={`http://localhost:5000/${post.avatar}`}
                  alt="Post avatar"
                  sx={{ width: 56, height: 56, marginRight: 2 }}
                />
              )}
              <CardContent sx={{ flex: 1 }}>
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
                    <strong>Company:</strong> {companyName} ({companyFollowers} followers)
                  </Typography>
                  {Datatoken && Datatoken.userType === 'employee' && (
                    <IconButton
                      onClick={() => toggleFriend(post.employer)}
                      sx={{ ml: 1, color: isFollowing ? 'red' : 'green' }}
                    >
                      {isFollowing ? <PersonRemoveOutlined /> : <PersonAddOutlined />}
                    </IconButton>
                  )}
                </CompanyInfo>
                <Typography><strong>Location:</strong> {post.jobLocation}</Typography>
                <Typography><strong>Salary:</strong> ${post.offerSalary} / Month</Typography>
                <Typography><strong>Type:</strong> {post.jobType}</Typography>
                <Typography><strong>Experience:</strong> {post.experience} years</Typography>
                <Typography><strong>Category:</strong> {post.jobCategory}</Typography>
                <Button component={Link} to={`/post/${post._id}`} variant="contained" color="primary" sx={{ marginTop: 2 }}>
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
        <Typography>No posts found.</Typography>
      )}
    </div>
  );
};

export default Posts;

