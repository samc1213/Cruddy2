import React, { PropTypes } from 'react'

const ThingAttributesRegion = ({ thingattributes }) => (
  <div>
  {thingattributes.map( (thingattribute, id) =>
    <div key={id}>
      {thingattribute}
    </div>
  )}
  </div>
)

ThingAttributesRegion.propTypes = {
  thingattributes: PropTypes.arrayOf(
      PropTypes.string.isRequired
    ).isRequired,
}


export default ThingAttributesRegion
