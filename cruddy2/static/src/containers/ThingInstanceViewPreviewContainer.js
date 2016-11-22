import { connect } from 'react-redux'
import ThingInstanceViewPreview from '../components/ThingInstanceViewPreview'

const mapStateToProps = (state) => ({
  thingattributes: state.form.newThingForm
})

const ThingInstanceViewPreviewContainer = connect(
  mapStateToProps,
  null
)(ThingInstanceViewPreview)

export default ThingInstanceViewPreviewContainer
