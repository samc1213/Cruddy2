import { connect } from 'react-redux'
import NewThingForm from '../components/NewThingForm'

const mapStateToProps = (state) => {
	console.log(state.websiteName)
	return{
	  thingAttributeTypes: state.thingAttributeTypes,
	  websiteName: state.websiteName,
	  selectedExampleType: state.form.newThingForm ? state.form.newThingForm.values.members.map((member) => member.thingattributetypeid) : {}
	}
}



const NewThingFormContainer = connect(
  mapStateToProps,
  null
)(NewThingForm)

export default NewThingFormContainer
