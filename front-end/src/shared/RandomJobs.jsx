import { useEffect, useState } from "react";
import axios from "../axiosConfig";

function RandomJobs() {
  const [allJobs, setAllJobs] = useState([]);
  const [displayJobs, setDisplayJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [activeTab, setActiveTab] = useState("recent-jobs");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`/posts`);
        setAllJobs(response.data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`/employers`);
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies details:", error);
      }
    };

    fetchJobs();

    fetchCompanies();
  }, []);

  const getRecentJobs = (e) => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const recentJobs = allJobs.filter((job) => {
      const jobDate = new Date(job.createdAt);
      return jobDate >= twoDaysAgo;
    });

    setDisplayJobs(recentJobs);
    setActiveTab("recent-jobs");
  };

  const getFullTimeJobs = (e) => {
    const fullTimeJobs = allJobs.filter((job) => job.jobType === "Full Time");
    setDisplayJobs(fullTimeJobs);
    setActiveTab("full-time");
  };

  const getPartTimeJobs = (e) => {
    const fullTimeJobs = allJobs.filter((job) => job.jobType === "Part Time");
    setDisplayJobs(fullTimeJobs);
    setActiveTab("part-time");
  };

  const getFeaturedJobs = (e) => {
    const freelanceJobs = allJobs.filter(
      (job) => job.jobCategory === "Featured"
    );
    setDisplayJobs(freelanceJobs);
    setActiveTab("featured");
  };
  const getFreelanceJobs = (e) => {
    const freelanceJobs = allJobs.filter((job) => job.jobType === "Freelance");
    setDisplayJobs(freelanceJobs);
    setActiveTab("freelance");
  };

  function getCompany(companyId) {
    return companies.find((comp) => comp._id === companyId);
  }
  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <h2>New & Random Jobs</h2>
        <p>
          {" "}
          Post a job to tell us about your project. We'll quickly match you with
          the right freelancers.
        </p>
        <ul
          className="job-list-menu nav nav-pills nav-justified flex-column flex-sm-row mb-4"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${
                activeTab === "recent-jobs" ? "active" : ""
              }`}
              data-bs-toggle="pill"
              data-bs-target="#recent-jobs"
              type="button"
              role="tab"
              aria-controls="recent-jobs"
              aria-selected="false"
              onClick={getRecentJobs}
            >
              Recent Jobs
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${activeTab === "featured" ? "active" : ""}`}
              data-bs-toggle="pill"
              data-bs-target="#featured-jobs"
              type="button"
              role="tab"
              aria-controls="featured-jobs"
              aria-selected="false"
              onClick={getFeaturedJobs}
            >
              Featured Jobs
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${
                activeTab === "freelance" ? "active" : ""
              }`}
              data-bs-toggle="pill"
              data-bs-target="#freelancer"
              type="button"
              role="tab"
              aria-controls="freelancer"
              aria-selected="false"
              onClick={getFreelanceJobs}
            >
              Freelancer
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${
                activeTab === "part-time" ? "active" : ""
              }`}
              data-bs-toggle="pill"
              data-bs-target="#part-time"
              type="button"
              role="tab"
              aria-controls="part-time"
              aria-selected="false"
              onClick={getPartTimeJobs}
            >
              Part Time
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link ${
                activeTab === "full-time" ? "active" : ""
              }`}
              data-bs-toggle="pill"
              data-bs-target="#full-time"
              type="button"
              role="tab"
              aria-controls="full-time"
              aria-selected="false"
              onClick={getFullTimeJobs}
            >
              Full Time
            </button>
          </li>
        </ul>
        <div className="JobsToApply">
          {displayJobs.length > 0
            ? displayJobs.map((job) => {
                return (
                  <div className="p-4 border rounded" key={job._id}>
                    <div className="row align-items-center">
                      <div className="col-md-2">
                        <div className="text-center mb-4 mb-md-0">
                          <a href={`/post/${job._id}`}>
                            <img
                              src={`http://localhost:5000/${job.avatar}`}
                              alt=""
                              className="img-fluid rounded-3"
                            />
                          </a>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-2 mb-md-0">
                          <h5 className="fs-18 mb-1">
                            <a href={`/post/${job._id}`} className="text-dark">
                              {job.jobTitle}
                            </a>
                          </h5>
                          <p className="text-muted fs-14 mb-0">
                            {getCompany(job.employer).companyName}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="d-flex mb-2">
                          <div className="flex-shrink-0">
                            <i className="mdi mdi-map-marker text-primary me-1"></i>
                          </div>
                          <p className="text-muted mb-0">
                            {getCompany(job.employer).phone}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div>
                          <p className="text-muted mb-2">
                            <span className="text-primary">$</span>
                            {job.offerSalary}/m{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : // <div className="p-4 border rounded">
              //   {" "}
              //   <p>No corresponding jobs</p>
              // </div>
              allJobs.slice(0, 4).map((job) => {
                return (
                  <div className="p-4 border rounded" key={job._id}>
                    <div className="row align-items-center">
                      <div className="col-md-2">
                        <div className="text-center mb-4 mb-md-0">
                          <a href={`/post/${job._id}`}>
                            <img
                              src={`http://localhost:5000/${job.avatar}`}
                              alt=""
                              className="img-fluid rounded-3"
                            />
                          </a>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-2 mb-md-0">
                          <h5 className="fs-18 mb-1">
                            <a href={`/post/${job._id}`} className="text-dark">
                              {job.jobTitle}
                            </a>
                          </h5>
                          <p className="text-muted fs-14 mb-0">
                            {getCompany(job.employer).companyName}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="d-flex mb-2">
                          <div className="flex-shrink-0">
                            <i className="mdi mdi-map-marker text-primary me-1"></i>
                          </div>
                          <p className="text-muted mb-0">
                            {getCompany(job.employer).phone}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <div>
                          <p className="text-muted mb-2">
                            <span className="text-primary">$</span>
                            {job.offerSalary}/m{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}

export default RandomJobs;
