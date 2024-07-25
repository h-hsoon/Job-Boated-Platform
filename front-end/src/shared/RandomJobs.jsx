import { useEffect, useState } from 'react'
import axios from '../axiosConfig';
import firstLogo from '../images/firstLogoJob.png'


function RandomJobs() {

  const [allJobs, setAllJobs] = useState([]);
  const [displayJobs, setDisplayJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`/posts`);
        setAllJobs(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchJobs();
  }, []);


  const getRecentJobs = (e) => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const recentJobs = allJobs.filter((job) => {
      const jobDate = new Date(job.createdAt);
      return jobDate >= twoDaysAgo;
    });

    setDisplayJobs(recentJobs);
  };

  const getFullTimeJobs = (e) => {
    const fullTimeJobs = allJobs.filter((job) => job.jobType === 'Full Time');
    setDisplayJobs(fullTimeJobs);
  };

  const getPartTimeJobs = (e) => {
    const fullTimeJobs = allJobs.filter((job) => job.jobType === 'Part Time');
    setDisplayJobs(fullTimeJobs);
  };

  const getFeaturedJobs = (e) => {
    const freelanceJobs = allJobs.filter((job) => job.jobCategory === 'Featured');
    setDisplayJobs(freelanceJobs);
  };
  const getFreelanceJobs = (e) => {
    const freelanceJobs = allJobs.filter((job) => job.jobType === 'Freelance');
    setDisplayJobs(freelanceJobs);
  };

  return (

    <div className="row justify-content-center">

      <div className="col-lg-8">
        <h2>New & Random Jobs</h2>
        <p> Post a job to tell us about your project. We'll quickly match you with the right freelancers.</p>
        <ul className="job-list-menu nav nav-pills nav-justified flex-column flex-sm-row mb-4" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link" data-bs-toggle="pill" data-bs-target="#recent-jobs" type="button" role="tab" aria-controls="recent-jobs" aria-selected="false" onClick={getRecentJobs}>Recent Jobs</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" data-bs-toggle="pill" data-bs-target="#featured-jobs" type="button" role="tab" aria-controls="featured-jobs" aria-selected="false" onClick={getFeaturedJobs}>Featured Jobs</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" data-bs-toggle="pill" data-bs-target="#freelancer" type="button" role="tab" aria-controls="freelancer" aria-selected="false" onClick={getFreelanceJobs}>Freelancer</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" data-bs-toggle="pill" data-bs-target="#part-time" type="button" role="tab" aria-controls="part-time" aria-selected="false" onClick={getPartTimeJobs}>Part Time</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link active" data-bs-toggle="pill" data-bs-target="#full-time" type="button" role="tab" aria-controls="full-time" aria-selected="false" onClick={getFullTimeJobs} >Full Time</button>
          </li>
        </ul>
        <div className='JobsToApply'>
          {
            displayJobs.length > 0 ? (
              displayJobs.map((job) => {
                return (
                  <div class="p-4 border rounded">
                    <div class="row align-items-center">
                      <div class="col-md-2">
                        <div class="text-center mb-4 mb-md-0">
                          <a href=""><img src={job.avatar} alt="" class="img-fluid rounded-3" /></a>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="mb-2 mb-md-0">
                          <h5 class="fs-18 mb-1"><a href="" class="text-dark">{job.jobTitle}</a></h5>
                          <p class="text-muted fs-14 mb-0">{job.employer.companyName}</p>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="d-flex mb-2">
                          <div class="flex-shrink-0">
                            <i class="mdi mdi-map-marker text-primary me-1"></i>
                          </div>
                          <p class="text-muted mb-0">{job.employer.phone}</p>
                        </div>
                      </div>
                      <div class="col-md-2">
                        <div>
                          <p class="text-muted mb-2"><span class="text-primary">$</span>{job.offerSalary}/m </p>
                        </div>
                      </div>
                    </div>
                  </div>)
              }))
              :
              (
                <div class="p-4 border rounded"> <p>No corresponding jobs</p></div>
              )}

        </div>
      </div>
    </div>
  );
};


export default RandomJobs;