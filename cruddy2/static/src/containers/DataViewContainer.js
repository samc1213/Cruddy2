import { connect } from 'react-redux'
import DataView from '../components/DataView'
import * as facade from '../facade'

const mapStateToProps = (state) => {
  var tempwebsitenames = [];
  var tempwebsitetypeids = [];
  var tempwebsiteids = [];
  var tempthingids = [];
  console.log(state.websites);

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

   getThingInstances: (thingId) => {
     dispatch(facade.getThingInstances(thingId))
   }
 }
)


const DataViewContainer = connect(
 mapStateToProps,
 mapDispatchToProps
)(DataView)

export default DataViewContainer
