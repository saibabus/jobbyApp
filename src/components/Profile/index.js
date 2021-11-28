import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apistatusConst = {
  initial: 'INITIAL',
  process: 'PROCESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Profile extends Component {
  state = {
    profileDetails: {},
    apiStatus: apistatusConst.initial,
  }

  componentDidMount() {
    this.getprofiledetails()
  }

  getprofiledetails = async () => {
    this.setState({apiStatus: apistatusConst.process})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    const data = await response.json()

    if (response.ok) {
      const fetcheddata = data.profile_details
      const updateddata = {
        name: fetcheddata.name,
        imageUrl: fetcheddata.profile_image_url,
        shortBio: fetcheddata.short_bio,
      }
      this.setState({
        profileDetails: updateddata,
        apiStatus: apistatusConst.success,
      })
    } else {
      this.setState({apiStatus: apistatusConst.failure})
    }
  }

  renderprofileagain = () => {
    this.getprofiledetails()
  }

  renderSuccessView = () => {
    const {profileDetails} = this.state
    return (
      <div className="profileCon">
        <img
          src={profileDetails.imageUrl}
          alt="profile"
          className="profileImg"
        />
        <h1 className="prof-heading">{profileDetails.name}</h1>
        <p className="prof-description">{profileDetails.shortBio}</p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <button
      className="retryBtn"
      type="button"
      onClick={this.renderprofileagain}
    >
      Retry
    </button>
  )

  renderingAllStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apistatusConst.success:
        return this.renderSuccessView()
      case apistatusConst.process:
        return this.renderLoadingView()
      case apistatusConst.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderingAllStatus()}</>
  }
}
export default Profile
