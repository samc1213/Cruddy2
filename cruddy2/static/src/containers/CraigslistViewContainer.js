import { connect } from 'react-redux'
import CraigslistView from '../components/CraigslistView'
import * as facade from '../facade'

const mapStateToProps = (state) => ({
  thingInstances: state.thingInstances,
  selectedExampleType: state.form.newThingForm ? state.form.newThingForm.values.members.map((member) => member.thingattributetypeid) : {}
})

const mapDispatchToProps = (dispatch) => ({
    getThingInstances: (thingId) => {
      dispatch(facade.getThingInstances(thingId))
    }
})

const CraigslistViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CraigslistView)

export default CraigslistViewContainer
