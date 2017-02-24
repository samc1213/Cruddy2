import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm'
import * as facade from '../facade'


const mapDispatchToProps = (dispatch) => (
  {
    submitLogin: (username, password) => {
    	dispatch(facade.submitLogin(username, password))
    }
  }
)

const LoginFormContainer = connect(
  null,
  mapDispatchToProps
)(LoginForm)

export default LoginFormContainer
