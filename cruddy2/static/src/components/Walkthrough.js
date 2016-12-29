import React, { PropTypes } from 'react'

class Walkthrough extends React.Component {
  render(){
      return(
        <div className="col-md-12 text-xs-center">
          <div className="col-md-4"></div>
          <div className="col-md-4" style={{border: '1px solid black', borderRadius: '5px', backgroundColor: 'rgba(235, 235, 235, 1)', margin: '5px'}}>
            <h3>{this.props.bigText}</h3>
            <p>{this.props.helpText}</p>
          </div>
          <div className="col-md-4"></div>
        </div>
    );
    }
}
export default Walkthrough
