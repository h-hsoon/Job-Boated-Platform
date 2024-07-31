import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "../axiosConfig";
import { useParams, useNavigate } from "react-router-dom";
import ApplyNow from "../applyNow/ApplyNow";
import {
  BsHeart,
  BsHeartFill,
  BsBriefcase,
  BsBuilding,
  BsGeoAlt,
  BsCurrencyDollar,
  BsCardChecklist,
  BsClockHistory,
  BsPerson,
} from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";

const PostDetails = ({ companies }) => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [applers, setApplers] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const Datatoken = () => {
    const storedUser = Cookies.get("Datatoken");
    return storedUser ? JSON.parse(storedUser) : null;
  };
  const user = Datatoken();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/posts/${id}`);
        console.log(response);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    const fetchApplers = async () => {
      const response = await axios.get(`/applers/${id}`);
      setApplers(response.data);
      console.log(response.data);
    };
    fetchApplers();
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

  if (!post) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  const { name: companyName, avatar: companyAvatar } = getCompanyInfo(
    post.employer
  );

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-7">
          <div className="card mb-4 p-3 shadow-sm">
            <div className="card-body">
              {post.avatar && (
                <div className="row mb-3">
                  <div className="col-auto">
                    <img
                      src={`http://localhost:5000/${post.avatar}`}
                      className="rounded-circle"
                      width="64"
                      height="64"
                      alt="Post avatar"
                    />
                  </div>
                  <div className="col">
                    <h4 className="card-title">{post.jobTitle}</h4>
                  </div>
                </div>
              )}

              <div className="row mb-3">
                {user && user.userType === "employee"
                  ? modalOpen && (
                      <ApplyNow setOpenModal={setModalOpen} jobId={id} />
                    )
                  : null}

                {companyAvatar && (
                  <div className="col-auto">
                    <img
                      src={companyAvatar}
                      className="rounded-circle"
                      width="64"
                      height="64"
                      alt="Company avatar"
                      onClick={() => handleClick(post.employer)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                )}
                <div className="col">
                  <h6
                    className="card-subtitle mb-2 text-muted"
                    onClick={() => handleClick(post.employer)}
                    style={{ cursor: "pointer" }}
                  >
                    <BsBuilding color="#ff9800" /> <strong>Company:</strong>{" "}
                    {companyName}
                  </h6>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={() => toggleFavorite(post._id)}
                  >
                    {favorites.includes(post._id)
                      ? "Remove from Favorites"
                      : "Add to Favorites"}
                  </button>
                  <button
                    className="btn btn-link ms-2"
                    onClick={() => toggleFavorite(post._id)}
                  >
                    {favorites.includes(post._id) ? (
                      <BsHeartFill color="red" />
                    ) : (
                      <BsHeart />
                    )}
                  </button>
                </div>
                <div>
                  <button
                    className="btn btn-primary ms-2"
                    onClick={() => {
                      setModalOpen(true);
                    }}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
              <p className="card-text mt-3">
                <strong>Description:</strong> {post.jobDescription}
              </p>
              <p className="card-text">
                <strong>Responsibilities:</strong> {post.jobResponsibilities}
              </p>
              <p className="card-text">
                <strong>Requirements:</strong> {post.jobRequirements}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="card mb-4 p-3 shadow-sm">
            <div className="card-body">
              <p className="card-text">
                <strong>
                  <BsCardChecklist color="#2196f3" /> Skills:
                </strong>{" "}
                {post.skills.join(", ")}
              </p>
              <p className="card-text">
                <strong>
                  <BsGeoAlt color="#4caf50" /> Location:
                </strong>{" "}
                {post.jobLocation}
              </p>
              <p className="card-text">
                <strong>
                  <BsCurrencyDollar color="#f44336" /> Salary:
                </strong>{" "}
                ${post.offerSalary} / Month
              </p>
              <p className="card-text">
                <strong>
                  <BsBriefcase color="#9c27b0" /> Type:
                </strong>{" "}
                {post.jobType}
              </p>
              <p className="card-text">
                <strong>
                  <BsCardChecklist color="#ffeb3b" /> Category:
                </strong>{" "}
                {post.jobCategory}
              </p>
              <p className="card-text">
                <strong>
                  <BsClockHistory color="#00bcd4" /> Experience:
                </strong>{" "}
                {post.experience} years
              </p>
              <p className="card-text">
                <strong>
                  <BsPerson color="#ff5722" /> Position:
                </strong>{" "}
                {post.jobPosition}
              </p>
              {applers && (
                <div className="col">
                  {applers.map((appler, index) => {
                    return (
                      <div key={index} className="card mb-4 p-3 shadow-sm">
                        <div className="card-body">
                          <div className="col-auto">
                            <img
                              src={`http://localhost:5000/${appler.avatar}`}
                              className="rounded-circle"
                              width="64"
                              height="64"
                              alt="appler avatar"
                            />
                            <div className="col">
                              <h4 className="card-title">
                                Name: {appler.firstName} {appler.lastName}
                              </h4>
                            </div>
                            {user && user.userType === "employer"
                              ? appler.resume && (
                                  <a
                                    class="btn btn-primary"
                                    href={`http://localhost:5000/${appler.resume}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    role="button"
                                  >
                                    resume
                                  </a>
                                )
                              : null}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
