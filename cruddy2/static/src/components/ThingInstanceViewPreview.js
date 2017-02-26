import React, { PropTypes } from 'react'
import CraigslistCardPreview from './CraigslistCardPreview'

const ThingInstanceViewPreview = ({ thingAttributes }) => {
  return (
      <div style={{width:'400px', position:'fixed'}}>
        <h4>Example Card</h4>
        <p>This is what your things will look like!</p>
        <CraigslistCardPreview thingAttributes={thingAttributes} />
      </div>
  )
}

export default ThingInstanceViewPreview
