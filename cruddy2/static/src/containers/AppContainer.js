import { connect } from 'react-redux'
import App from '../components/App'
import * as actions from '../actions/index'

const mapStateToProps = (state) => ({
 	loggedInUser: state.loggedInUser
 })

const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => {
    	dispatch(actions.userLoggedOut())
    }
})

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer
