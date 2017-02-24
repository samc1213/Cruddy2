import { connect } from 'react-redux'
import CreateThing from '../components/CreateThing'
import * as facade from '../facade'


const mapDispatchToProps = (dispatch) => (
  {
    getCurrentWebsiteName: (websiteName) => {
    	dispatch(facade.getCurrentWebsiteName(websiteName))
    }
  }
)

const CreateThingContainer = connect(
  null,
  mapDispatchToProps
)(CreateThing)

export default CreateThingContainer
