import searchJob from './images/searchjob.jpg'

function Search() {


    return (
       
       
            <div className="container mt-5">
              <div className="row justify-content-center align-items-center">
                <div className="col-md-6">
                  <h1 className="text-center mb-4">Find your dream jobs with Us</h1>
                  <h5 className="text-center mb-4">Find jobs, create trackable resumes and enrich your applications. Carefully crafted after analyzing the needs of different industries.</h5>
                  <form>
                    <div className="input-group mb-3">
                      <input type="text" className="form-control" placeholder="Enter keywords..." />
                      <button className="btn btn-primary">Find job</button>
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
