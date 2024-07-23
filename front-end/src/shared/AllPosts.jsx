import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Posts = ({ posts, companies }) => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
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
  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => {
          const { name: companyName, avatar: companyAvatar } = getCompanyInfo(post.employer);

          return (
            <div key={post._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
              {post.avatar && <img src={`http://localhost:5000/${post.avatar}`} alt="Post avatar"  style={{ width: "50px", height: "50px" }} />}
              <h2>{post.jobTitle}</h2>
              {companyAvatar && <img src={companyAvatar} alt="Company avatar" onClick={() => handleClick(post.employer)} style={{ width: "50px", height: "50px", borderRadius: "50%" }} />}
              <p onClick={() => handleClick(post.employer)}><strong>Company:</strong> {companyName}</p>
              <p><strong>Location:</strong> {post.jobLocation}</p>
              <p><strong>Salary:</strong> ${post.offerSalary} / Month</p>
              <p><strong>Type:</strong> {post.jobType}</p>
              <p><strong>Experience:</strong> {post.experience} years</p>
              <p><strong>Category:</strong> {post.jobCategory}</p>
              <Link to={`/post/${post._id}`}>Read more</Link>
              <button onClick={() => toggleFavorite(post._id)}>
                {favorites.includes(post._id) ? "Remove from Favorites" : "Add to Favorites"}
              </button>
            </div>
          );
        })
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default Posts;
