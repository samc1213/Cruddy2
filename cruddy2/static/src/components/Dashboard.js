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
              <span> {this.props.websiteNames[i]} </span> <span> <a href={`/${this.props.websiteNames[i]}/creatething`}> New thing </a> </span>
            </div>
          )
        }
				if (websitedivs.length == 0)
				{
					websitedivs.push(<div className="text-xs-center"> Your websites will appear here</div>)
				}

        return (
            <div className="text-xs-center">
                <h2 className="text-xs-center">Welcome To Your Dashboard </h2>
                {websitedivs}
                <a className="btn btn-primary" href="/createwebsite" role="button">Create New Website</a>

            </div>
            )
      }
    }
}


export default Dashboard