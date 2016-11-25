import React, { PropTypes } from 'react'
import CraigslistCardPreview from './CraigslistCardPreview'

const ThingInstanceViewPreview = ({ thingattributes }) => {
  var tatrrs = JSON.stringify(thingattributes);
  console.log(thingattributes);
  return (
    <div>
      <CraigslistCardPreview thingAttributes={thingattributes} />
    </div>
  )
}

ThingInstanceViewPreview.propTypes = {
  thingattributes: PropTypes.array.isRequired,
}

export default ThingInstanceViewPreview
