import {Link} from 'react-router-dom'
import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const EachJob = props => {
  const {eachJobdetail} = props
  const {
    title,
    companyurlLogo,
    employmentType,
    id,
    location,
    jobDiscription,
    rating,
    packageperAnnum,
  } = eachJobdetail
  return (
    <Link to={`/jobs/${id}`} className="linkstyle">
      <li className="eachJobCon">
        <div className="logo-details-Con">
          <img
            className="companyLogo"
            alt="company logo"
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
        <div className="addres-job-salary-con">
          <div className="loc-jobCon">
            <div className="locatCon">
              <MdLocationOn className="locationIcon" />
              <p className="label">{location}</p>
            </div>
            <div className="jobCon">
              <BsFillBriefcaseFill className="locationIcon" />
              <p className="label">{employmentType}</p>
            </div>
          </div>
          <div className="salaryCon">
            <p className="salary">{packageperAnnum}</p>
          </div>
        </div>
        <h1 className="discription-head">Discription</h1>
        <p className="discription">{jobDiscription}</p>
      </li>
    </Link>
  )
}
export default EachJob
