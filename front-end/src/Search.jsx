import { useState } from 'react';
import searchJob from './images/searchjob.jpg'
import { useNavigate } from 'react-router-dom';
function Search() {
const [searchValue,setSearchValue]=useState('')
const navigate = useNavigate();
const handleClick=(e)=>{
  console.log(searchValue)
  e.preventDefault();
  navigate(`/posts/${searchValue}`)
}

    return (
       
            <div className="container mt-5">
              <div className="row justify-content-center align-items-center">
                <div className="col-md-6">
                  <h1 className="text-center mb-4">Find your dream jobs with Us</h1>
                  <h5 className="text-center mb-4">Find jobs, create trackable resumes and enrich your applications. Carefully crafted after analyzing the needs of different industries.</h5>
                  <form onSubmit={handleClick}>
                    <div className="input-group mb-3">
                      <input type="text" className="form-control" placeholder="Enter keywords..." required
                       onChange={(e) => setSearchValue(e.target.value) }/>
                      <button className="btn btn-primary"
                        type='submit'
                        >Find job
                      </button>
                    </div>
                  </form>
                </div>
                <div className="col-md-6">
                  <img src={searchJob} className="img-fluid" alt="Search Job" />
                </div>
              </div>           
            </div>
          );
     
};

export default Search; 
