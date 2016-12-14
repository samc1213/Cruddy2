import React, { PropTypes } from 'react'

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getWebsites();
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
        return (
            <div>
                {this.props.loggedInUser}'s Dashboard
                <a className="btn btn-primary" href="/createwebsite" role="button">Create New Website</a>
            </div>
            )
      }
    }
}

export default Dashboard
