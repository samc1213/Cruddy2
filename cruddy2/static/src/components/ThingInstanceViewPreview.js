import React, { PropTypes } from 'react'

const ThingInstanceViewPreview = ({ thingattributes }) => {
  var tatrrs = JSON.stringify(thingattributes);
  console.log(thingattributes);
  return (
    <div>
      {tatrrs}
    </div>
  )
}

ThingInstanceViewPreview.propTypes = {
  thingattributes: PropTypes.object.isRequired,
}

export default ThingInstanceViewPreview
