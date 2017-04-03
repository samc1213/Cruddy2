import { connect } from 'react-redux'
import NewThingForm from '../components/NewThingForm'
import * as facade from '../facade'
import * as actions from '../actions/index'

const mapStateToProps = (state) => {
	return{
	  thingAttributeTypes: state.thingAttributeTypes,
	  websiteName: state.websiteName,
	  selectedExampleType: state.form.newThingForm ? state.form.newThingForm.values.members.map((member) => member.thingattributetypeid) : {}
	}
}

const mapDispatchToProps = (dispatch) => (
  {
    submitNewThing: (form) => {
    	dispatch(facade.submitNewThing(form))
    },
		changeState: (newState) => {
    	dispatch(actions.selectCurrentState(newState))
    }
  }
)

const NewThingFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewThingForm)

export default NewThingFormContainer
