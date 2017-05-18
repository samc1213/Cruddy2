import React from 'react'

class AdminBarTab extends React.Component {
  constructor(props) {
    super(props);
    this.setTab = this.setTab.bind(this);
  }

  setTab() {
    this.props.setSelectedTab(this.props.text);
  }

  render() {
    var returnDiv = []

    var backgroundColor;
    if (this.props.text == this.props.selected)
    {
        backgroundColor = 'rgb(219, 0, 3)';
    }
    else {
      backgroundColor = 'grey';
    }

    return(
      <div style={{
        width: '100%',
        height: '65px',
        borderTop: '1px solid black',
        borderBottom: '1px solid black',
        display: 'flex',
        backgroundColor: backgroundColor,
        alignItems: 'center',
        paddingLeft: '10px',
        cursor: 'pointer',
        zIndex: 3
      }}
      onClick={this.setTab}
      > <a > {this.props.text} </a> </div>
    )
  }
}

export default AdminBarTab
