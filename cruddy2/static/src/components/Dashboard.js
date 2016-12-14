import React, { PropTypes } from 'react'

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getWebsites(localStorage.getItem('loggedinuser'));
  }

  render(){
      if (this.props.loggedInUser == null)
      {
        return(
        <div>
            please login Dudda
        </div>
        )
      }
      else
      {
        var websitedivs = []
        for (var i = 0; i < this.props.websiteIds.length; i ++) {
          var name = `websiteid.${this.props.websiteIds[i]}`;
          websitedivs.push(
            <div key={name}>
              <label> {this.props.websiteNames[i]} </label>
            </div>
          )
        }
 
        return (
            <div>
                {this.props.loggedInUser}'s Dashboard
                {websitedivs}
                <a className="btn btn-primary" href="/createwebsite" role="button">Create New Website</a>

            </div>
            )
      }
    }
}

export default Dashboard
