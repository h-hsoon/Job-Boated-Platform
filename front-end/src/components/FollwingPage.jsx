import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Avatar, Button, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from '../axiosConfig';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
}));

const FollowingPage = ({ tokenId}) => {
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchfreinds = async () => {
        try {
          const response = await axios.get(`/friends/${tokenId}`);
          const initialCompanies = response.data.map(company => ({
            _id: company._id,
            companyName: company.companyName,
            avatar: company.avatar ? `http://localhost:5000/${company.avatar}` : null,
            phone:company.phone,
            email:company.email,
            followers: company.followers.length,
            isFollowing: true,
          }));
          setFriends(initialCompanies);
        console.log(response.data)
        } catch (error) {
          console.error('Error fetching Friends:', error);
        }
      };
  
      fetchfreinds();
  }, []);

 
  const toggleFriend = async (companyId) => {
    try {
      await axios.patch(`/users/${tokenId}/${companyId}`, {});

      setFriends(prevState =>
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
  const handleCompany = (id) => {
    navigate(`/employer/${id}`);
  };

  const handleClick = (id) => {
    navigate(`/CompaniesPosts/${id}`);
  };

  return (
    <div>
      {friends.length > 0 ? (
        friends.map((company) => (
          <StyledCard key={company._id}>
            {company.avatar && (
              <Avatar
                src={company.avatar}
                alt="Company avatar"
                sx={{ width: 56, height: 56, marginRight: 2 }}
                onClick={() => handleCompany(company._id)}
              />
            )}
            <CardContent>
              <Typography variant="h5">{company.companyName}
              <IconButton
                          onClick={() => toggleFriend(company._id)}
                          sx={{ ml: 1, color: company.isFollowing ? 'red' : 'green' }}
                        >
                          {company.isFollowing ? <PersonRemoveIcon color="primary" /> : <PersonAddIcon />}
                        </IconButton>
              </Typography>
              <Typography variant="subtitle1" onClick={() => handleCompany(company._id)} sx={{ cursor: "pointer" }}>
                <strong>Company:</strong> {company.companyName} ({company.followers} followers)
              </Typography>
              <Typography><strong>Email:</strong> {company.email}</Typography>
              <Typography><strong>Phone:</strong> {company.phone}</Typography>
              <Button onClick={() => handleClick(company._id)} variant="contained" color="primary" sx={{ marginTop: 2 }}>
                View Company's posts
              </Button>
            </CardContent>
          </StyledCard>
        ))
      ) : (
        <Typography>No followed companies found.</Typography>
      )}
    </div>
  );
};

export default FollowingPage;
