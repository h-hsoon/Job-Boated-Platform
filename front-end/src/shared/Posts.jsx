import React, { useState } from 'react';

function Posts (){

  const [jobs, setJobs] = useState([]);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobResponsibilities, setJobResponsibilities] = useState('');
  const [jobRequirements, setJobRequirements] = useState('');
  const [skills, setSkills] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [offerSalary, setOfferSalary] = useState('');
  const [jobType, setJobType] = useState('');
  const [jobCategory, setJobCategory] = useState('');
  const [experience, setExperience] = useState('');
  const [jobPosition, setJobPosition] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = {
      jobTitle,
      jobDescription,
      jobResponsibilities,
      jobRequirements,
      skills: skills.split(',').map(skill => skill.trim()),
      jobLocation,
      offerSalary,
      jobType,
      jobCategory,
      experience,
      jobPosition
    };
    setJobs([...jobs, newJob]);
    setJobTitle('');
    setJobDescription('');
    setJobResponsibilities('');
    setJobRequirements('');
    setSkills('');
    setJobLocation('');
    setOfferSalary('');
    setJobType('');
    setJobCategory('');
    setExperience('');
    setJobPosition('');
  };

  return (
    <div className="job-posting-page">
      <h1>Job Postings</h1>
           <form onSubmit={handleSubmit} className="job-form">
        <div className="form-group">
          <label>Job Title:</label>
          <input 
            type="text" 
            value={jobTitle} 
            onChange={(e) => setJobTitle(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Job Description:</label>
          <textarea 
            value={jobDescription} 
            onChange={(e) => setJobDescription(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Job Responsibilities:</label>
          <textarea 
            value={jobResponsibilities} 
            onChange={(e) => setJobResponsibilities(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Job Requirements:</label>
          <textarea 
            value={jobRequirements} 
            onChange={(e) => setJobRequirements(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Skills (comma separated):</label>
          <input 
            type="text" 
            value={skills} 
            onChange={(e) => setSkills(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input 
            type="text" 
            value={jobLocation} 
            onChange={(e) => setJobLocation(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Offer Salary:</label>
          <input 
            type="number" 
            value={offerSalary} 
            onChange={(e) => setOfferSalary(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Job Type:</label>
          <input 
            type="text" 
            value={jobType} 
            onChange={(e) => setJobType(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Job Category:</label>
          <input 
            type="text" 
            value={jobCategory} 
            onChange={(e) => setJobCategory(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Experience (years):</label>
          <input 
            type="number" 
            value={experience} 
            onChange={(e) => setExperience(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Job Position:</label>
          <input 
            type="text" 
            value={jobPosition} 
            onChange={(e) => setJobPosition(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Post Job</button>
      </form>
      <div className="job-list">
        <h2>Available Jobs</h2>
        {jobs.length > 0 ? (
          <ul>
            {jobs.map((job, index) => (
              <li key={index}>
                <h3>{job.title}</h3>
                <p>{job.description}</p>
                <p><strong>Location:</strong> {job.location}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No jobs posted yet.</p>
        )}
      </div>
    </div>
  );
}





export default Posts;