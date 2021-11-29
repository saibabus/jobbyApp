import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import './index.css'
import Profile from '../Profile'
import FilterGroup from '../FilterGroup'
import EachJob from '../EachJob'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apistatusConst = {
  initial: 'INITIAL',
  process: 'PROCESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {jobDetails: [], apiStatus: apistatusConst.initial}

  componentDidMount() {
    this.getAllJobdetails()
  }

  getAllJobdetails = async () => {
    this.setState({apiStatus: apistatusConst.process})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/jobs'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)
    console.log(data)
    if (response.ok) {
      const fetchedData = data.jobs.map(each => ({
        companyurlLogo: each.company_logo_url,
        employmentType: each.employment_type,
        location: each.location,
        id: each.id,
        title: each.title,
        jobDiscription: each.job_description,
        rating: each.rating,
        packageperAnnum: each.package_per_annum,
      }))
      this.setState({
        jobDetails: fetchedData,
        apiStatus: apistatusConst.success,
      })
    } else {
      this.setState({apiStatus: apistatusConst.failure})
    }
  }

  renderSuccessView = () => {
    const {jobDetails} = this.state
    return (
      <ul className="succesCon">
        {jobDetails.map(each => (
          <EachJob eachJobdetail={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failureCon">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failureImg"
      />
      <h1 className="failure-head">Opps! Something Went Wrong</h1>
      <p className="failureDis">
        We can seem to find the page your looking for.
      </p>
      <Link to="/jobs">
        <button type="button" className="retrybtn">
          Retry
        </button>
      </Link>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderAllViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apistatusConst.process:
        return this.renderLoadingView()
      case apistatusConst.success:
        return this.renderSuccessView()
      case apistatusConst.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobsCont">
        <Header />
        <div className="jobsshowCon">
          <div className="profile-options-con">
            <div className="procon">
              <Profile />
            </div>
            <div className="filtercon">
              <FilterGroup
                employmentTypesList={employmentTypesList}
                salaryRangesList={salaryRangesList}
              />
            </div>
          </div>
          <div className="seach-job-con">
            <div className="search-btn-con">
              <input type="search" className="searchis" placeholder="search" />
              <button type="button" className="searchBtn" testid="searchButton">
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="allJobsListCon">{this.renderAllViews()}</div>
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
