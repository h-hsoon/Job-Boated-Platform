import logo1 from '../images/it.png'; 



function Jobcategories() {


   
    const categories = [

        { name: "IT & Software", logo: logo1},
        { name: "Technology", logo: logo1},
        { name: "Government", logo: logo1},
        { name: "Accounting/Finance", logo: logo1},
        { name: "Construction/Facilities" , logo: logo1},
        { name: "Tele-communications" , logo: logo1},
        { name: "Design & Multimedia", logo: logo1},
        { name: "Human Resource", logo: logo1}
      ];
    
      return (
       <div>
        <h1>Browser Jobs Categories</h1>
        <p>Post a job to tell us about your project. We'll quickly match you with the right freelancers.</p>
        <div className="container mt-5">
          <div className="row">
            {categories.map((category, index) => (
              <div key={index} className="col-md-3 mb-4">
                <div className="card">
                  <img src={category.logo}  className="card-img-top logo-small" alt={category.name} />
                  <div className="card-body">
                    <h5 className="card-title">{category.name}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      );
    };
    
    export default Jobcategories;