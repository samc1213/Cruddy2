import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import ThingAttributeTypes from '../components/ThingAttributeTypes'

const mapStateToProps = (state) => ({
  thingAttributeTypes: state.thingAttributeTypes
})

const ThingAttributeTypeOptions = connect(
  mapStateToProps,
  null
)(ThingAttributeTypes)

export default ThingAttributeTypeOptions
