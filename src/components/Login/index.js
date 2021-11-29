import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorStatus: false,
    errorMsg: '',
  }

  onchangepass = event => this.setState({password: event.target.value})

  onchangename = event => this.setState({username: event.target.value})

  onsuccesSubmissions = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 1})
    history.replace('/')
  }

  formSubmitin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.onsuccesSubmissions(data.jwt_token)
    } else {
      const msg = data.error_msg
      this.setState({errorMsg: msg, errorStatus: true})
    }
  }

  renderLoginForm = () => {
    const {username, password, errorMsg, errorStatus} = this.state
    console.log(username)
    console.log(password)
    return (
      <form className="formContainer" onSubmit={this.formSubmitin}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="websiteLogo"
        />
        <div className="inputsContainer">
          <label className="label" htmlFor="loginusername">
            USERNAME
          </label>
          <input
            type="text"
            id="loginusername"
            className="inputs"
            placeholder="Username"
            onChange={this.onchangename}
            value={username}
            required
          />
          <label className="label" htmlFor="loginpassword">
            PASSWORD
          </label>
          <input
            type="password"
            id="loginpassword"
            className="inputs"
            placeholder="Password"
            onChange={this.onchangepass}
            value={password}
            required
          />
          <button type="submit" className="loginbutton">
            Login
          </button>
          {errorStatus && <p className="errormsg">{errorMsg}</p>}
        </div>
      </form>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return <div className="loginContainer">{this.renderLoginForm()}</div>
  }
}
export default Login
