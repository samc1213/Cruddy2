import { connect } from 'react-redux'
import CraigslistView from '../components/CraigslistView'
import * as facade from '../facade'

const mapStateToProps = (state) => ({
  thingInstances: state.thingInstances,
  layout: state.layout,
  selectedExampleType: state.form.newThingForm ? state.form.newThingForm.values.members.map((member) => member.thingattributetypeid) : {}
})

const mapDispatchToProps = (dispatch) => ({
    getThingInstances: (thingId) => {
      dispatch(facade.getThingInstances(thingId))
    },
    getLayout: (thingId) =>{
      dispatch(facade.getLayout(thingId))
    },
    incrementThingAttribute: (thingAttributeId, thingInstanceId) =>{
      dispatch(facade.incrementThingAttribute(thingAttributeId, thingInstanceId))
    }
})

const CraigslistViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CraigslistView)

export default CraigslistViewContainer
