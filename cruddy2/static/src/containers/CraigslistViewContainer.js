import { connect } from 'react-redux'
import CraigslistView from '../components/CraigslistView'
import * as actions from '../actions/index'

const mapStateToProps = (state) => ({
  thingAttributeTypes: state.thingAttributeTypes,
  thingInstances: state.thingInstances,
  thingAttributeIdsToNames: state.thingAttributeIdsToNames,
  selectedExampleType: state.form.newThingForm ? state.form.newThingForm.values.members.map((member) => member.thingattributetypeid) : {}
})

const mapDispatchToProps = (dispatch) => ({
    getThingInstances: (thingId) => {
    	dispatch(actions.getThingInstances(thingId))
    }
})

const CraigslistViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CraigslistView)

export default CraigslistViewContainer