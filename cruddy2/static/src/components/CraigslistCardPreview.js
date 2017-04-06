import React, { PropTypes } from 'react'
import * as ThingAttributeDisplayerFactory from '../ThingAttributeDisplayerFactory'
import ThingAttributeTextDisplayer from '../ThingAttributeTextDisplayer'

const CraigslistCardPreview = ({ thingAttributes }) => {
  var rows = [];
  for (var thingAttributeName in thingAttributes)
  {
    rows.push(ThingAttributeDisplayerFactory.GetThingAttributeDisplayer(thingAttributes[thingAttributeName].value, thingAttributes[thingAttributeName].typeid));
  }

  return (
    <div className="card" style={{textAlign:'left'}} >
      <div className="card-block">
        <ul className="list-group list-group-flush">
          {rows}
        </ul>
      </div>
    </div>
  )
}

export default CraigslistCardPreview
