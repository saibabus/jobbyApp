import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarJobs = props => {
  const {similarJobsData} = props
  const {
    companyurlLogo,
    employmentType,
    location,
    title,
    jobDiscription,
    rating,
  } = similarJobsData
  return (
    <li className="similarjobConeach">
      <div className="logo-details-Con">
        <img
          className="companyLogo"
          alt="similar job company logo"
          src={companyurlLogo}
        />
        <div className="details-con">
          <h1 className="title">{title}</h1>
          <div className="ratingCon">
            <BsFillStarFill className="startIcon" />
            <p className="ratingvalue">{rating}</p>
          </div>
        </div>
      </div>

      <h1 className="discription-head">Description</h1>
      <p className="discription">{jobDiscription}</p>
      <div className="addres-job-salary-con">
        <div className="locatCon">
          <MdLocationOn className="locationIcon" />
          <p className="label">{location}</p>
        </div>
        <div className="jobCon">
          <BsFillBriefcaseFill className="locationIcon" />
          <p className="label">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobs
