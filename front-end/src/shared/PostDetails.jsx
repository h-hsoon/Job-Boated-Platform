import React, { useEffect, useState } from "react";
import axios from '../axiosConfig';
import { useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

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

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {post.avatar && <img src={`http://localhost:5000/${post.avatar}`} alt="avatar" style={{ width: "100px", height: "100px" }} />}
      <h1>{post.jobTitle}</h1>
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
    </div>
  );
};

export default PostDetails;
