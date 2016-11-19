import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import ThingAttributesRegion from '../components/ThingAttributesRegion'

const mapStateToProps = (state) => ({
  thingattributes: state.thingAttributes
})

const ThingAttributes = connect(
  mapStateToProps,
  null
)(ThingAttributesRegion)

export default ThingAttributes
