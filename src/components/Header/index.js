import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onclicklogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="navBar">
      <Link to="/" className="link-style">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="websiteLogo"
        />
      </Link>
      <div className="navOptions">
        <Link to="/" className="link-style">
          <h1 className="navoptionsLabels">Home</h1>
        </Link>
        <Link to="/jobs" className="link-style">
          <h1 className="navoptionsLabels">Jobs</h1>
        </Link>
      </div>
      <button className="logOutBtn" type="button" onClick={onclicklogout}>
        Logout
      </button>
    </nav>
  )
}
export default withRouter(Header)
