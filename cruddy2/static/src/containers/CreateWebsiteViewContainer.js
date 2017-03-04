import { connect } from 'react-redux'
import CreateWebsite from '../components/CreateWebsite'
import * as facade from '../facade'
import * as actions from '../actions/index'

const mapDispatchToProps = (dispatch) => (
  {
    submitCreateWebsite: (websitetypeid, websitename, username) => {
      dispatch(facade.submitCreateWebsite(websitetypeid, websitename, username))
    },
    changeState: (newState) => {
    	dispatch(actions.selectCurrentState(newState))
    },
    setCurrentWebsiteName: (websiteName) => {
      dispatch(actions.setCurrentWebsiteName(websiteName))
    }
  }
)


const mapStateToProps = (state) => ({
   loggedInUser: state.loggedInUser,
   currentState: state.selectedCurrentState,
   websiteName: state.websiteName
 })

const CreateWebsiteViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateWebsite)

export default CreateWebsiteViewContainer
