import React, { PropTypes } from 'react'

class NewWebisteViewArea extends React.Component {
  render(){
  	console.log('cState' + this.props.currentState);
  	console.log('sName' + this.props.stateName);
    var disp = this.props.currentState == this.props.stateName ? 'block' : 'none';
    console.log(disp);
      return(
        <div style={{display: disp}}>
          {this.props.children}
        </div>
    );
    }
}

export default NewWebisteViewArea
