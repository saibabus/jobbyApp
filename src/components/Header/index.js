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
      <ul className="unorderdlists">
        <Link to="/" className="link-style">
          <li>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="websiteLogo"
            />
          </li>
        </Link>
        <div className="navOptions">
          <Link to="/" className="link-style">
            <li>
              <h1 className="navoptionsLabels">Home</h1>
            </li>
          </Link>
          <Link to="/jobs" className="link-style">
            <li>
              <h1 className="navoptionsLabels">Jobs</h1>
            </li>
          </Link>
        </div>
        <button className="logOutBtn" type="button" onClick={onclicklogout}>
          Logout
        </button>
      </ul>
    </nav>
  )
}
export default withRouter(Header)
