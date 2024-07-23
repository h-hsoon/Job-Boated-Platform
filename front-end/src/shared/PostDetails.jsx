import React, { useEffect, useState } from "react";
import axios from '../axiosConfig';
import {  useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

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
  const handleClick=(id)=>{
    navigate(`/employer/${id}`)
}

  if (!post) {
    return <p>Loading...</p>;
  }

  const { name: companyName, avatar: companyAvatar } = getCompanyInfo(post.employer);

  return (
    <div>
      {post.avatar && <img src={`http://localhost:5000/${post.avatar}`} alt="Post avatar" style={{ width: "100px", height: "100px" }} />}
      <h1>{post.jobTitle}</h1>
      {companyAvatar && <img src={companyAvatar} alt="Company avatar" onClick={() => handleClick(post.employer)} style={{ width: "50px", height: "50px", borderRadius: "50%" }} />}
      <p onClick={() => handleClick(post.employer)}><strong>Company:</strong> {companyName}</p>
      <p><strong>Description:</strong> {post.jobDescription}</p>
      <p><strong>Responsibilities:</strong> {post.jobResponsibitirs}</p>
      <p><strong>Requirements:</strong> {post.jobRequirements}</p>
      <p><strong>Skills:</strong> {post.skills.join(", ")}</p>
      <p><strong>Location:</strong> {post.jobLocation}</p>
      <p><strong>Salary:</strong> ${post.offerSalary} / Month</p>
      <p><strong>Type:</strong> {post.jobType}</p>
      <p><strong>Category:</strong> {post.jobCategory}</p>
      <p><strong>Experience:</strong> {post.experience} years</p>
      <p><strong>Position:</strong> {post.jobPosition}</p>
      <button onClick={() => toggleFavorite(post._id)}>
                {favorites.includes(post._id) ? "Remove from Favorites" : "Add to Favorites"}
              </button>
    </div>
  );
};

export default PostDetails;
