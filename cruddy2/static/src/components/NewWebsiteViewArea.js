import React, { PropTypes } from 'react'

class NewWebisteViewArea extends React.Component {
  render(){
    var disp = this.props.currentState == this.props.stateName ? 'block' : 'none';
      return(
        <div style={{display: disp}}>
          {this.props.children}
        </div>
    );
    }
}

export default NewWebisteViewArea
