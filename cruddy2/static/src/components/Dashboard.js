import React, { PropTypes } from 'react'
import Walkthrough from './Walkthrough'
import AdminBarContainer from '../containers/AdminBarContainer'
import CreateWebsiteViewContainer from '../containers/CreateWebsiteViewContainer'
import DashboardArea from './DashboardArea'
import CreateWebsite from './CreateWebsite'
import AdminBarTabContainer from '../containers/AdminBarTabContainer'
import DataViewContainer from '../containers/DataViewContainer'


class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getWebsites(localStorage.getItem('loggedinuser'));
    document.title = 'Dashboard - Cruddy2';
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
              <span> {this.props.websiteNames[i]} </span> <span> <a href={`/api/getview/${this.props.websiteIds[i]}`}> Go to Website </a> </span>
            </div>
          )
        }
        if (websitedivs.length == 0)
        {
          websitedivs.push(<div key="empt" className="text-xs-center"> Your websites will appear here</div>)
        }

        return (
            <div onClick= {() => console.log("absorb")} style={{height: '100%', width: '100%'}}>

              <AdminBarContainer />
              <DashboardArea selectedTab={this.props.selectedDashboardTab} tabName='Apps'>
                <div className="text-xs-center">
                  <Walkthrough bigText="Welcome to your Dashboard" helpText="The Dashboard is your hub for managing your apps, and creating new ones."/>
                  {websitedivs}
                </div>
              </DashboardArea>
              <DashboardArea selectedTab={this.props.selectedDashboardTab} tabName='Create New Website'>
                <CreateWebsiteViewContainer />
              </DashboardArea>
              <DashboardArea selectedTab={this.props.selectedDashboardTab} tabName='Data'>
                <DataViewContainer />
              </DashboardArea>
            </div>
            )
      }
    }
}


export default Dashboard
