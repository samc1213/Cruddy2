import React from 'react'
import AdminBarTabContainer from '../containers/AdminBarTabContainer'


class AdminBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{position: 'absolute', width: '200px', top: '50px', bottom: '0', backgroundColor: 'gray', zIndex: 3}}>
        <AdminBarTabContainer text="Apps" selected={this.props.selectedDashboardTab} link="" />
        <AdminBarTabContainer text="Create New Website"  selected={this.props.selectedDashboardTab}link="" />
        <AdminBarTabContainer text="Data" selected={this.props.selectedDashboardTab} link="" />
      </div>
    )
  }
}

export default AdminBar
