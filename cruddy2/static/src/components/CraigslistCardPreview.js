import React, { PropTypes } from 'react'
import * as ThingAttributeDisplayerFactory from '../ThingAttributeDisplayerFactory'
import ThingAttributeTextDisplayer from '../ThingAttributeTextDisplayer'

const CraigslistCardPreview = ({ thingAttributes }) => {
  var rows = [];
  console.log(thingAttributes);
  for (var thingAttributeName in thingAttributes)
  {
    console.log(thingAttributeName);
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
