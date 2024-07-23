import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Posts = ({ posts }) => {
  const [favorites, setFavorites] = useState([]);

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

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            {post.avatar && <img src={`http://localhost:5000/${post.avatar}`} alt="avatar" style={{ width: "50px", height: "50px" }} />}
            <h2>{post.jobTitle}</h2>
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
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default Posts;
