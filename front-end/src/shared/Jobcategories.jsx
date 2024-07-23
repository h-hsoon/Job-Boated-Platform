import logo1 from '../images/it.png';
import logo2 from '../images/hr.png';
import logo3 from '../images/telecommunications.png';
import logo4 from '../images/briefcase.png';



function Jobcategories() {



  const categories = [

    { name: "IT & Software", logo: logo1 },
    { name: "Technology", logo: logo2 },
    { name: "Government", logo: logo3 },
    { name: "Accounting/Finance", logo: logo4 },
    { name: "Construction/Facilities", logo: logo4 },
    { name: "Tele-communications", logo: logo3 },
    { name: "Design & Multimedia", logo: logo2 },
    { name: "Human Resource", logo: logo1 }
  ];

  return (
    <div className="row justify-content-center">

      <div className="col-lg-8">
        <h1>Browser Jobs Categories</h1>
        <p>Post a job to tell us about your project. We'll quickly match you with the right freelancers.</p>
        <div className="container mt-5">
          <div className="row">
            {categories.map((category, index) => (
              <div key={index} className="col-md-3 mb-4">
                <div className="card">
                  <img src={category.logo} className="card-img-top logo-small" alt={category.name} />
                  <div className="card-body">
                    <h5 className="card-title">{category.name}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobcategories;