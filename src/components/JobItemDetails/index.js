import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {GoLinkExternal} from 'react-icons/go'

import Cookies from 'js-cookie'
import Header from '../Header'
import Skills from '../Skills'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apistatusConst = {
  initial: 'INITIAL',
  process: 'PROCESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apistatusConst.initial,
    jobDetailseach: {},
    skillsData: [],
    lifeAtCompanyData: {},
    similarJobsData: [],
  }

  componentDidMount() {
    this.getDetailsofJob()
  }

  getDetailsofJob = async () => {
    console.log(this.props)
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const fetchedData = {
        companyurlLogo: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        location: data.job_details.location,
        id: data.job_details.id,
        title: data.job_details.title,
        jobDiscription: data.job_details.job_description,
        rating: data.job_details.rating,
        packageperAnnum: data.job_details.package_per_annum,
      }
      const lifeAtCompany = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }
      const skills = data.job_details.skills.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      }))
      const similarJobs = data.similar_jobs.map(each => ({
        companyurlLogo: each.company_logo_url,
        employmentType: each.employment_type,
        location: each.location,
        id: each.id,
        title: each.title,
        jobDiscription: each.job_description,
        rating: each.rating,
      }))

      this.setState({
        jobDetailseach: fetchedData,
        skillsData: skills,
        apiStatus: apistatusConst.success,
        lifeAtCompanyData: lifeAtCompany,
        similarJobsData: similarJobs,
      })
    } else {
      this.setState({apiStatus: apistatusConst.failure})
    }
  }

  renderSuccessView = () => {
    const {
      jobDetailseach,
      lifeAtCompanyData,
      skillsData,
      similarJobsData,
    } = this.state
    return (
      <>
        <div className="jobdetailsCon" testid="loader">
          <div className="logo-details-Con">
            <img
              className="companyLogo"
              alt="job details company logo"
              src={jobDetailseach.companyurlLogo}
            />
            <div className="details-con">
              <h1 className="title">{jobDetailseach.title}</h1>
              <div className="ratingCon">
                <BsFillStarFill className="startIcon" />
                <p className="ratingvalue">{jobDetailseach.rating}</p>
              </div>
            </div>
          </div>
          <div className="addres-job-salary-con">
            <div className="loc-jobCon">
              <div className="locatCon">
                <MdLocationOn className="locationIcon" />
                <p className="label">{jobDetailseach.location}</p>
              </div>
              <div className="jobCon">
                <BsFillBriefcaseFill className="locationIcon" />
                <p className="label">{jobDetailseach.employmentType}</p>
              </div>
            </div>
            <div className="salaryCon">
              <p className="salary">{jobDetailseach.packageperAnnum}</p>
            </div>
          </div>
          <div className="link-headind-con">
            <h1 className="discription-head">Description</h1>

            <a href={jobDetailseach.companyWebsiteUrl} className="visitLink">
              Visit
              <GoLinkExternal className="extralink" />
            </a>
          </div>
          <p className="discription">{jobDetailseach.jobDiscription}</p>

          <h1 className="skills-hea">Skills</h1>
          <ul className="skillsCon">
            {skillsData.map(each => (
              <Skills skills={each} key={each.name} />
            ))}
          </ul>
          <h1 className="life-head">Life at Company</h1>
          <div className="life_container">
            <p className="life-disc">{lifeAtCompanyData.description}</p>
            <img
              src={lifeAtCompanyData.imageUrl}
              alt="life at company"
              className="lifeImage"
            />
          </div>
        </div>
        <h1 className="life-head">Similar Jobs</h1>
        <ul className="similarJobCon">
          {similarJobsData.map(each => (
            <SimilarJobs key={each.id} similarJobsData={each} />
          ))}
        </ul>
      </>
    )
  }

  retryAgain = () => {
    this.getDetailsofJob()
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

      <button type="button" className="retrybtn" onClick={this.retryAgain}>
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
      <div className="detailsCon">
        <Header />
        <div className="detailshowCon" testid="loader">
          {this.renderAllViews()}
        </div>
      </div>
    )
  }
}
export default JobItemDetails
