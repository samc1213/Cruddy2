import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm'
import * as actions from '../actions/index'


const mapDispatchToProps = (dispatch) => (
  {
    submitLogin: (username, password) => {
    	dispatch(actions.submitLogin(username, password))
    }
  }
)

const LoginFormContainer = connect(
  null,
  mapDispatchToProps
)(LoginForm)

export default LoginFormContainer
