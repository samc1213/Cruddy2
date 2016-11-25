import React, { PropTypes } from 'react'
import CraigslistCardPreview from './CraigslistCardPreview'

const ThingInstanceViewPreview = ({ thingattributes }) => {
  return (
    <div>
      <CraigslistCardPreview thingAttributes={thingattributes} />
    </div>
  )
}

export default ThingInstanceViewPreview
