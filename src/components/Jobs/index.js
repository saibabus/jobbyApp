import {Component} from 'react'
import Loader from 'react-loader-spinner'
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
  state = {
    jobDetails: [],
    apiStatus: apistatusConst.initial,
    salaryRangeValue: '',
    serachValue: '',
    employementType: '',
  }

  componentDidMount() {
    this.getAllJobdetails()
  }

  getAllJobdetails = async () => {
    const {employementType, salaryRangeValue, serachValue} = this.state
    console.log(employementType)
    this.setState({apiStatus: apistatusConst.process})
    const jwtToken = Cookies.get('jwt_token')
    // const url = 'https://apis.ccbp.in/jobs'
    const url2 = `https://apis.ccbp.in/jobs?employment_type=${employementType}&minimum_package=${salaryRangeValue}&search=${serachValue}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url2, options)
    const data = await response.json()
    // console.log(response)
    // console.log(data)
    console.log(employementType)

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

  renderNojobs = () => (
    <div className="failureCon">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="failureImg"
      />
      <h1 className="failure-head">No Jobs Found</h1>
      <p className="failureDis">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

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

  employemtfilter = employmentTypeId => {
    this.setState({employementType: employmentTypeId}, this.getAllJobdetails)
  }

  salaryrangevalueis = salaryRangeId => {
    this.setState({salaryRangeValue: salaryRangeId}, this.getAllJobdetails)
  }

  retryagin = () => {
    this.getAllJobdetails()
  }

  renderFailureView = () => (
    <div className="failureCon">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failureImg"
      />
      <h1 className="failure-head">Oops! Something Went Wrong</h1>
      <p className="failureDis">
        We cannot seem to find the page you are looking for
      </p>

      <button type="button" className="retrybtn" onClick={this.retryagin}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderAllViews = () => {
    const {apiStatus, jobDetails} = this.state
    switch (apiStatus) {
      case apistatusConst.process:
        return this.renderLoadingView()

      case apistatusConst.success:
        if (jobDetails.length === 0) {
          return this.renderNojobs()
        }
        return this.renderSuccessView()
      case apistatusConst.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  changesearchInput = event => {
    this.setState({serachValue: event.target.value})
  }

  clicksearchbutton = () => {
    this.getAllJobdetails()
  }

  render() {
    const {serachValue} = this.state
    console.log(serachValue)
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
                salaryrangevalueis={this.salaryrangevalueis}
                employemtfilter={this.employemtfilter}
              />
            </div>
          </div>
          <div className="seach-job-con">
            <div className="search-btn-con">
              <input
                type="search"
                className="searchis"
                placeholder="search"
                value={serachValue}
                onChange={this.changesearchInput}
              />

              <button
                type="button"
                className="searchBtn"
                testid="searchButton"
                onClick={this.clicksearchbutton}
              >
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
