import {Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'

const Home = () => (
  <div className="homeContainer">
    <Header />
    <div className="homeShowcont">
      <h1 className="home-heading">
        Find The Job That
        <br /> Fits Your Life
      </h1>
      <p className="home-description">
        Millions of people are searching for jobs,salary information,company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button type="button" className="findJobsBtn">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)
export default Home
