import React, { PropTypes } from 'react'
import ThingAttributeDisplayer from '../ThingAttributeDisplayer'

const CraigslistCardPreview = ({ thingAttributes }) => {
  var rows = [];
  console.log(thingAttributes);
  for (var thingAttributeName in thingAttributes)
  {
    console.log(thingAttributeName);
    rows.push(<ThingAttributeDisplayer value={thingAttributes[thingAttributeName].value} />)
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
