import { connect } from 'react-redux'
import App from '../components/App'
import * as facade from '../facade'

const mapStateToProps = (state) => ({
 	loggedInUser: state.loggedInUser
 })

const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => {
    	dispatch(facade.userLoggedOut())
    }
})

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer
