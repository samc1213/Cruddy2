import React, { PropTypes } from 'react'
import CraigslistCardPreview from './CraigslistCardPreview'

const ThingInstanceViewPreview = ({ thingattributes }) => {
  console.log(thingattributes)
  return (
    <div>
      <div className="col-md-2">
      </div>
      <div className="col-md-8">
        <h4>Example Craigslist Card</h4>
        <p>This is what your things will look like!</p>
        <CraigslistCardPreview thingAttributes={thingattributes} />
      </div>
      <div className="col-md-2">
      </div>
    </div>
  )
}

export default ThingInstanceViewPreview
