import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
}));

const CompanyPosts = ({ posts, companies, tokenId }) => {
  const navigate = useNavigate();

  const getCompanyInfo = (employerId) => {
    const company = companies.find((company) => company._id === employerId);
    if (company) {
      return {
        name: company.companyName,
        avatar: company.avatar
          ? `http://localhost:5000/${company.avatar}`
          : null,
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

  const filteredPosts = posts.filter((post) => post.employer === tokenId);

  return (
    <div>
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => {
          const { name: companyName, avatar: companyAvatar } = getCompanyInfo(
            post.employer
          );

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
                      sx={{
                        width: 40,
                        height: 40,
                        cursor: "pointer",
                        marginRight: 1,
                      }}
                    />
                  )}
                  <Typography
                    variant="subtitle1"
                    onClick={() => handleClick(post.employer)}
                    sx={{ cursor: "pointer" }}
                  >
                    <strong>Company:</strong> {companyName}
                  </Typography>
                </div>
                <Typography>
                  <strong>Location:</strong> {post.jobLocation}
                </Typography>
                <Typography>
                  <strong>Salary:</strong> ${post.offerSalary} / Month
                </Typography>
                <Typography>
                  <strong>Type:</strong> {post.jobType}
                </Typography>
                <Typography>
                  <strong>Experience:</strong> {post.experience} years
                </Typography>
                <Typography>
                  <strong>Category:</strong> {post.jobCategory}
                </Typography>
                <Button
                  component={Link}
                  to={`/post/${post._id}`}
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2 }}
                >
                  Read more
                </Button>
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

export default CompanyPosts;
