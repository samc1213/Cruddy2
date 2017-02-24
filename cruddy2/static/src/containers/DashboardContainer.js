import { connect } from 'react-redux'
import Dashboard from '../components/Dashboard'
import * as facade from '../facade'


const mapStateToProps = (state) => {
  var tempwebsitenames = [];
  var tempwebsitetypeids = [];
  var tempwebsiteids = [];
  var tempthingids = [];
  console.log( state.websites);

  for (var websiteid in state.websites){
    tempwebsitenames.push(state.websites[websiteid].websitename)
    tempwebsitetypeids.push(state.websites[websiteid].websitetypeid)
    tempwebsiteids.push(websiteid)
  }

  return{
     loggedInUser: state.loggedInUser,
     websiteNames: tempwebsitenames,
     websiteTypeIds: tempwebsitetypeids,
     websiteIds: tempwebsiteids,
     selectedDashboardTab: state.selectedDashboardTab
  }
 }

 const mapDispatchToProps = (dispatch) => (
  {
    getWebsites: (username) => {
      dispatch(facade.getWebsites(username))
    }  
  }
)


const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

export default DashboardContainer
