import { connect } from 'react-redux'
import AdminBarTab from '../components/AdminBarTab'
import * as actions from '../actions/index'

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
    setSelectedTab: (tabName) => {
      dispatch(actions.selectDashboardTab(tabName))
    }
})

const AdminBarTabContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminBarTab)

export default AdminBarTabContainer
