import Header from '../Header'
import './index.css'

const text = `We're sorry,the page you requested could not be found`
const NotFound = () => (
  <div className="naotfoundCont">
    <Header />
    <div className="naotfoundshowcon">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="notfound-img"
      />
      <h1 className="heading">Page Not Found</h1>
      <p className="description">{text}</p>
    </div>
  </div>
)
export default NotFound
