import React, { PropTypes } from 'react'

class DashboardArea extends React.Component {
  render(){
    var disp = this.props.selectedTab == this.props.tabName ? 'block' : 'none';
      return(
        <div style={{display: disp, marginLeft: "200px"}}>
          {this.props.children}
        </div>
    );
    }
}

export default DashboardArea
