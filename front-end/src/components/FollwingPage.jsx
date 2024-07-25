import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Avatar, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from '../axiosConfig';

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
          setFriends(response.data);
        console.log(response.data)
        } catch (error) {
          console.error('Error fetching Friends:', error);
        }
      };
  
      fetchfreinds();
  }, []);

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
                src={`http://localhost:5000/${company.avatar}`}
                alt="Company avatar"
                sx={{ width: 56, height: 56, marginRight: 2 }}
              />
            )}
            <CardContent>
              <Typography variant="h5">{company.companyName}</Typography>
              <Typography variant="subtitle1" onClick={() => handleClick(company._id)} sx={{ cursor: "pointer" }}>
                <strong>Company:</strong> {company.companyName}
              </Typography>
              <Typography><strong>Email:</strong> {company.email}</Typography>
              <Typography><strong>Phone:</strong> {company.phone}</Typography>
              <Button onClick={() => handleClick(company._id)} variant="contained" color="primary" sx={{ marginTop: 2 }}>
                View Profile
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
