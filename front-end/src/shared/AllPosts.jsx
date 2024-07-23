import React from "react";
import { Link } from "react-router-dom";

const AllPosts = ({ posts }) => {
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
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default AllPosts;
