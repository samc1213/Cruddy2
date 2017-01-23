import { connect } from 'react-redux'
import AdminBar from '../components/AdminBar'
import * as actions from '../actions/index'

const mapStateToProps = (state) => ({
  selectedDashboardTab: state.selectedDashboardTab
})

const mapDispatchToProps = (dispatch) => ({
})

const AdminBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminBar)

export default AdminBarContainer
