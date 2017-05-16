import { connect } from 'react-redux'
import DataView from '../components/DataView'
import * as facade from '../facade'

const mapStateToProps = (state) => {
  var tempwebsitenames = ["Please Select a Website"];
  var tempwebsitetypeids = [0];
  var tempwebsiteids = [-1];

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
     selectedDashboardTab: state.selectedDashboardTab,
     thingInstances: state.thingInstances,
     thingAttributeIdsToNamesAndTypes: state.thingAttributeIdsToNamesAndTypes,
  }
}

const mapDispatchToProps = (dispatch) => (
 {
   getWebsites: (username) => {
     dispatch(facade.getWebsites(username))
   },

   getThingInstances: (websiteName) => {
     dispatch(facade.getThingInstances(websiteName))
   }
 }
)


const DataViewContainer = connect(
 mapStateToProps,
 mapDispatchToProps
)(DataView)

export default DataViewContainer
