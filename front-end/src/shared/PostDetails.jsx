import React, { useEffect, useState } from "react";
import axios from '../axiosConfig';
import Cookies from 'js-cookie';
import { useParams, useNavigate } from "react-router-dom";
import { BsHeart, BsHeartFill, BsBriefcase, BsBuilding, BsGeoAlt, BsCurrencyDollar, BsCardChecklist, BsClockHistory, BsPerson } from 'react-icons/bs';
import { IconButton} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import 'bootstrap/dist/css/bootstrap.min.css';

const PostDetails = ({ Datatoken }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();
  const token = Cookies.get('token');

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

  if (!post) {
    return <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>;
  }

  const { name: companyName, avatar: companyAvatar, followers, isFollowing } = getCompanyInfo(post.employer);

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-7">
          <div className="card mb-4 p-3 shadow-sm">
            <div>
              {post.avatar && (
                <div className="row mb-3">
                  <div className="col-auto">
                    <img src={`http://localhost:5000/${post.avatar}`} className="rounded-circle" width="64" height="64" alt="Post avatar" />
                  </div>
                  <div className="col">
                    <h4 className="card-title">{post.jobTitle}</h4>
                  </div>
                </div>
              )}
              <div className="row mb-3">
                {companyAvatar && (
                  <div className="col-auto">
                    <img
                      src={companyAvatar}
                      className="rounded-circle"
                      width="64"
                      height="64"
                      alt="Company avatar"
                      onClick={() => handleClick(post.employer)}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                )}
                <div className="col">
                  <h6 className="card-subtitle mb-2 text-muted" onClick={() => handleClick(post.employer)} style={{ cursor: 'pointer' }}>
                    <BsBuilding color="#ff9800" /> <strong>Company:</strong> {companyName} ({followers} followers)
                  </h6>
                  {Datatoken && Datatoken.userType === 'employee' && (
                    <>
                    <IconButton 
                          onClick={() => toggleFriend(post.employer)}
                          sx={{ ml: 1, color: isFollowing ? 'red' : 'green' }}
                        >
                          {isFollowing ? <PersonRemoveIcon color="primary" /> : <PersonAddIcon />}
                        </IconButton>  <div className="d-flex align-items-center">
                <button className="btn btn-primary" onClick={() => toggleFavorite(post._id)}>
                  {favorites.includes(post._id) ? "Remove from Favorites" : "Add to Favorites"}
                </button>
                <button className="btn btn-link ms-2" onClick={() => toggleFavorite(post._id)}>
                  {favorites.includes(post._id) ? <BsHeartFill color="red" /> : <BsHeart />}
                </button>
              </div>
                    </>
                        
                      )}
                </div>
              </div>
              {/* <div className="d-flex align-items-center">
                <button className="btn btn-primary" onClick={() => toggleFavorite(post._id)}>
                  {favorites.includes(post._id) ? "Remove from Favorites" : "Add to Favorites"}
                </button>
                <button className="btn btn-link ms-2" onClick={() => toggleFavorite(post._id)}>
                  {favorites.includes(post._id) ? <BsHeartFill color="red" /> : <BsHeart />}
                </button>
              </div> */}
              <p className="card-text mt-3"><strong>Description:</strong> {post.jobDescription}</p>
              <p className="card-text"><strong>Responsibilities:</strong> {post.jobResponsibilities}</p>
              <p className="card-text"><strong>Requirements:</strong> {post.jobRequirements}</p>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="card mb-4 p-3 shadow-sm">
            <div>
              <p className="card-text"><strong><BsCardChecklist color="#2196f3" /> Skills:</strong> {post.skills.join(', ')}</p>
              <p className="card-text"><strong><BsGeoAlt color="#4caf50" /> Location:</strong> {post.jobLocation}</p>
              <p className="card-text"><strong><BsCurrencyDollar color="#f44336" /> Salary:</strong> ${post.offerSalary} / Month</p>
              <p className="card-text"><strong><BsBriefcase color="#9c27b0" /> Type:</strong> {post.jobType}</p>
              <p className="card-text"><strong><BsCardChecklist color="#ffeb3b" /> Category:</strong> {post.jobCategory}</p>
              <p className="card-text"><strong><BsClockHistory color="#00bcd4" /> Experience:</strong> {post.experience} years</p>
              <p className="card-text"><strong><BsPerson color="#ff5722" /> Position:</strong> {post.jobPosition}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
