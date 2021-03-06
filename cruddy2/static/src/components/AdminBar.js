import React from 'react'
import AdminBarTabContainer from '../containers/AdminBarTabContainer'


class AdminBar extends React.Component {
  render() {
    return (
      <div style={{position: 'absolute', width: '200px', top: '50px', bottom: '0', backgroundColor: 'gray', zIndex: 3}}>
        <AdminBarTabContainer text="Apps" link="" />
        <AdminBarTabContainer text="Create New Website" link="" />
        <AdminBarTabContainer text="Data" link="" />
      </div>
    )
  }
}

export default AdminBar
