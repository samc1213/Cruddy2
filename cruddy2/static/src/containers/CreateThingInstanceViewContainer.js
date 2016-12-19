import { connect } from 'react-redux'
import CreateThingInstance from '../components/createThingInstance'
import * as actions from '../actions/index'



const mapStateToProps = (state) => {
  var tempthingAttributeTypes = [];
  var tempthingAttributeNames = [];
  var tempthingAttributeIds = [];

  for (var thingattributeid in state.thingAttributes){
    tempthingAttributeNames.push(state.thingAttributes[thingattributeid].name);
    tempthingAttributeTypes.push(state.thingAttributes[thingattributeid].typeid);
    tempthingAttributeIds.push(thingattributeid);
  }
  return{
    thingAttributeTypes: tempthingAttributeTypes,
    thingAttributeNames: tempthingAttributeNames,
    thingAttributeIds: tempthingAttributeIds,
  }
}


const mapDispatchToProps = (dispatch) => (
  {
    getThingAttributes: (thingId) => {
    	dispatch(actions.getThingAttributes(thingId))
    },
		
		submitNewThingInstance: (form) => {
			dispatch(actions.submitNewThingInstance(form))
		}
  }
)

const CreateThingInstanceViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateThingInstance)

export default CreateThingInstanceViewContainer
