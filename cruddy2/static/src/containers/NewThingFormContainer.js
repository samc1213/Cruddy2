import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import NewThingForm from '../components/NewThingForm'

const mapStateToProps = (state) => ({
  thingAttributeTypes: state.thingAttributeTypes
})

const NewThingFormContainer = connect(
  mapStateToProps,
  null
)(NewThingForm)

export default NewThingFormContainer
