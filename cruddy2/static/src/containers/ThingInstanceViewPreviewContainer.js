import { connect } from 'react-redux'
import ThingInstanceViewPreview from '../components/ThingInstanceViewPreview'

const mapStateToProps = (state) =>
({
  thingAttributeNames: state.form.newThingForm.values != null ? state.form.newThingForm.values.members.map((value) => value.thingattributename) : [],
  thingAttributeExamples: state.form.newThingForm.values != null ? state.form.newThingForm.values.members.map((value) => value.thingattributeexample) : [],
  thingAttributeTypeIds: state.form.newThingForm.values != null ? state.form.newThingForm.values.members.map((value) => value.thingattributetypeid) : []
})

const ThingInstanceViewPreviewContainer = connect(
  mapStateToProps,
  null
)(ThingInstanceViewPreview)

export default ThingInstanceViewPreviewContainer
