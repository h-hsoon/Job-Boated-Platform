import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, Typography, Button, Avatar, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import axios from '../axiosConfig';
const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
}));

const CompaniesPosts = ({ posts, Datatoken}) => {
    const {companyId}= useParams()
  const [favorites, setFavorites] = useState([]);
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
    const fetchEmployers = async () => {
      try {
        const response = await axios.get('/employers');
        const initialCompanies = response.data.map(company => ({
          _id: company._id,
          companyName: company.companyName,
          avatar: company.avatar ? `http://localhost:5000/${company.avatar}` : null,
          followers: company.followers.length,
          isFollowing: Datatoken && company.followers.includes(Datatoken.id),
        }));
        setCompanies(initialCompanies);
      } catch (error) {
        console.error('Error fetching employers:', error);
      }
    };

    fetchEmployers();
  }, []);

  const toggleFavorite = (postId) => {
    const updatedFavorites = favorites.includes(postId)
      ? favorites.filter((id) => id !== postId)
      : [...favorites, postId];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };
  const toggleFriend = async (companyId) => {
    try {
      await axios.patch(`/users/${Datatoken.id}/${companyId}`, {});

      setCompanies(prevState =>
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
    if (company) {
      return {
        name: company.companyName,
        avatar: company.avatar,
        followers: company.followers,
        isFollowing: company.isFollowing,
      };
    }
    return {
      name: "Unknown Company",
      avatar: null,
      followers: 0,
      isFollowing: false,
    };
  };

  const handleClick = (id) => {
    navigate(`/employer/${id}`);
  };

  const filteredPosts = posts.filter((post) => post.employer === companyId);

  return (
    <div>
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => {
          const { name: companyName, avatar: companyAvatar, followers, isFollowing } = getCompanyInfo(post.employer);

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
                <div style={{ display: "flex", alignItems: "center" }}>
                  {companyAvatar && (
                    <Avatar
                      src={companyAvatar}
                      alt="Company avatar"
                      onClick={() => handleClick(post.employer)}
                      sx={{ width: 40, height: 40, cursor: "pointer", marginRight: 1 }}
                    />
                  )}
                  <Typography variant="subtitle1" onClick={() => handleClick(post.employer)} sx={{ cursor: "pointer" }}>
                  <strong>Company:</strong> {companyName} ({followers} followers)
                  </Typography>
                  {Datatoken && Datatoken.userType === 'employee' && (
                        <IconButton
                          onClick={() => toggleFriend(post.employer)}
                          sx={{ ml: 1, color: isFollowing ? 'red' : 'green' }}
                        >
                          {isFollowing ? <PersonRemoveIcon color="primary" /> : <PersonAddIcon />}
                        </IconButton>
                      )}
                </div>
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
        <Typography>No posts found for this company.</Typography>
      )}
    </div>
  );
};

export default CompaniesPosts;
