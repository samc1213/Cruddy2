import { connect } from 'react-redux'
import Dashboard from '../components/Dashboard'

const mapStateToProps = (state) => ({
 	loggedInUser: state.loggedInUser
 })

const DashboardContainer = connect(
  mapStateToProps,
  undefined
)(Dashboard)

export default DashboardContainer
