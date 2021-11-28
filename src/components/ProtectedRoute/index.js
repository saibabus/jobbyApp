import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = props => {
  const jwtToekn = Cookies.get('jwt_token')
  if (jwtToekn !== undefined) {
    return <Route {...props} />
  }

  return <Redirect to="/login" />
}
export default ProtectedRoute
