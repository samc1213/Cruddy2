import { connect } from 'react-redux'
import CreateWebsite from '../components/CreateWebsite'
import * as actions from '../actions/index'

const mapDispatchToProps = (dispatch) => (
  {
    submitCreateWebsite: (websitetypeid, websitename, username) => {
      dispatch(actions.submitCreateWebsite(websitetypeid, websitename, username))
    }
  }
)


const mapStateToProps = (state) => ({
   loggedInUser: state.loggedInUser
 })

const CreateWebsiteViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateWebsite)

export default CreateWebsiteViewContainer
