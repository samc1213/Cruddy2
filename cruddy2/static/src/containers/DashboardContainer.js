import { connect } from 'react-redux'
import Dashboard from '../components/Dashboard'
import * as actions from '../actions/index'


const mapStateToProps = (state) => {
	var tempwebsitenames = [];
	var tempwebsitetypeids = [];
	var tempwebsiteids = [];


	for (var websiteid in state.websites){
		tempwebsitenames.push(state.websites[websiteid].websitename)
		tempwebsitetypeids.push(state.websites[websiteid].websitetypeid)
		tempwebsiteids.push(websiteid)

	}
	return{
	 	loggedInUser: state.loggedInUser,
	 	websiteNames: tempwebsitenames,
	 	websiteTypeIds: tempwebsitetypeids,
	 	websiteIds: tempwebsiteids
	}
 }

 const mapDispatchToProps = (dispatch) => (
  {
    getWebsites: (username) => {
    	dispatch(actions.getWebsites(username))
    },

    rehydrate: () => {
    	dispatch(actions.rehydrateLoggedInUser())
    }
  }
)


const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

export default DashboardContainer
