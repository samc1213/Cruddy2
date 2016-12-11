import { connect } from 'react-redux'
import CreateThingInstance from '../components/createThingInstance'
import * as actions from '../actions/index'



const mapStateToProps = (state) => {
  var tempthingAttributeTypes = [];
  var tempthingAttributeNames = [];
  for (var thingattributeid in state.thingAttributes){
    tempthingAttributeNames.push(state.thingAttributes[thingattributeid].name)
    tempthingAttributeTypes.push(state.thingAttributes[thingattributeid].typeid)
  }
  return{
    thingAttributeTypes: tempthingAttributeTypes,
    thingAttributeNames: tempthingAttributeNames
  }
}


const mapDispatchToProps = (dispatch) => (
  {
    getThingAttributes: (thingId) => {
    	dispatch(actions.getThingAttributes(thingId))
    }
  }
)

const CreateThingInstanceViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateThingInstance)

export default CreateThingInstanceViewContainer
