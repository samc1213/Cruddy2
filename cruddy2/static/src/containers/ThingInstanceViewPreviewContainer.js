import { connect } from 'react-redux'
import ThingInstanceViewPreview from '../components/ThingInstanceViewPreview'

const mapStateToProps = (state) =>
({
  thingattributes: state.form.newThingForm.values != null ? state.form.newThingForm.values.members : []
})

const ThingInstanceViewPreviewContainer = connect(
  mapStateToProps,
  null
)(ThingInstanceViewPreview)

export default ThingInstanceViewPreviewContainer
