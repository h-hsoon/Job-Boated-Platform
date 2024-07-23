import firstLogo from '../images/firstLogoJob.png'
import secondogo from '../images/second-logo.avif'
import thirdLogo from '../images/thirdlogo.jpg'


function RandomJobs() {



  return (

    <div className="row justify-content-center">

      <div className="col-lg-8">
        <h2>New & Random Jobs</h2>
        <p> Post a job to tell us about your project. We'll quickly match you with the right freelancers.</p>
        <ul className="job-list-menu nav nav-pills nav-justified flex-column flex-sm-row mb-4" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link" data-bs-toggle="pill" data-bs-target="#recent-jobs" type="button" role="tab" aria-controls="recent-jobs" aria-selected="false">Recent Jobs</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" data-bs-toggle="pill" data-bs-target="#featured-jobs" type="button" role="tab" aria-controls="featured-jobs" aria-selected="false">Featured Jobs</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" data-bs-toggle="pill" data-bs-target="#freelancer" type="button" role="tab" aria-controls="freelancer" aria-selected="false">Freelancer</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" data-bs-toggle="pill" data-bs-target="#part-time" type="button" role="tab" aria-controls="part-time" aria-selected="false">Part Time</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link active" data-bs-toggle="pill" data-bs-target="#full-time" type="button" role="tab" aria-controls="full-time" aria-selected="true">Full Time</button>
          </li>
        </ul>
        <div className='JobsToApply'>
          <div class="p-4 border rounded">
            <div class="row align-items-center">
              <div class="col-md-2">
                <div class="text-center mb-4 mb-md-0">
                  <a href=""><img src={firstLogo} alt="" class="img-fluid rounded-3" /></a>
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-2 mb-md-0">
                  <h5 class="fs-18 mb-1"><a href="" class="text-dark">Web Developer</a></h5>
                  <p class="text-muted fs-14 mb-0">Web Technology pvt.Ltd</p>
                </div>
              </div>
              <div class="col-md-3">
                <div class="d-flex mb-2">
                  <div class="flex-shrink-0">
                    <i class="mdi mdi-map-marker text-primary me-1"></i>
                  </div>
                  <p class="text-muted mb-0">Oakridge Lane Richardson</p>
                </div>
              </div>
              <div class="col-md-2">
                <div>
                  <p class="text-muted mb-2"><span class="text-primary">$</span>1000-1200/m </p>
                </div>
              </div>
            </div>
          </div>
          <div class="p-4 border rounded">
            <div class="row align-items-center">
              <div class="col-md-2">
                <div class="text-center mb-4 mb-md-0">
                  <a href=""><img src={secondogo} alt="" class="img-fluid rounded-3" /></a>
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-2 mb-md-0">
                  <h5 class="fs-18 mb-1"><a href="" class="text-dark">
                    Business Associate</a></h5>
                  <p class="text-muted fs-14 mb-0">Pixel Technology pvt.Ltd</p>
                </div>
              </div>
              <div class="col-md-3">
                <div class="d-flex mb-2">
                  <div class="flex-shrink-0">
                    <i class="mdi mdi-map-marker text-primary me-1"></i>
                  </div>
                  <p class="text-muted mb-0">Dodge City, Louisiana</p>
                </div>
              </div>
              <div class="col-md-2">
                <div>
                  <p class="text-muted mb-2"><span class="text-primary">$</span>800-1800/m </p>
                </div>
              </div>
            </div>
          </div>
          <div class="p-4 border rounded">
            <div class="row align-items-center">
              <div class="col-md-2">
                <div class="text-center mb-4 mb-md-0">
                  <a href=""><img src={thirdLogo} alt="" class="img-fluid rounded-3" /></a>
                </div>
              </div>
              <div class="col-md-3">
                <div class="mb-2 mb-md-0">
                  <h5 class="fs-18 mb-1"><a href="" class="text-dark">Digital Marketing Manager</a></h5>
                  <p class="text-muted fs-14 mb-0">Web Technology pvt.Ltd</p>
                </div>
              </div>
              <div class="col-md-3">
                <div class="d-flex mb-2">
                  <div class="flex-shrink-0">
                    <i class="mdi mdi-map-marker text-primary me-1"></i>
                  </div>
                  <p class="text-muted mb-0">Phoenix, Arizona</p>
                </div>
              </div>
              <div class="col-md-2">
                <div>
                  <p class="text-muted mb-2"><span class="text-primary">$</span>1500-2400/m</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default RandomJobs;