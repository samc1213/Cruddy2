import { connect } from 'react-redux'
import CreateThing from '../components/CreateThing'
import * as actions from '../actions/index'


const mapDispatchToProps = (dispatch) => (
  {
    getCurrentWebsiteName: (websiteName) => {
    	dispatch(actions.getCurrentWebsiteName(websiteName))
    }
  }
)

const CreateThingContainer = connect(
  null,
  mapDispatchToProps
)(CreateThing)

export default CreateThingContainer
