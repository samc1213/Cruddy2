import React, { PropTypes } from 'react'
import CraigslistCardPreview from './CraigslistCardPreview'

const ThingInstanceViewPreview = ({ thingAttributeNames, thingAttributeExamples, thingAttributeTypeIds }) => {
  return (
    <div>
      <div className="col-md-2">
      </div>
      <span className="col-md-8" style={{width:'400px', position:'fixed'}}>
        <h4>Example Card</h4>
        <p>This is what your things will look like!</p>
        <CraigslistCardPreview thingAttributeNames={thingAttributeNames} thingAttributeExamples={thingAttributeExamples}
        thingAttributeTypeIds={thingAttributeTypeIds} isPreview={true} />
      </span>
      <div className="col-md-2">
      </div>
    </div>
  )
}

export default ThingInstanceViewPreview
