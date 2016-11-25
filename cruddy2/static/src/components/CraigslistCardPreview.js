import React, { PropTypes } from 'react'


const CraigslistCardPreview = ({ thingAttributes }) => {
  var rows = []
  if (thingAttributes != null) {
    rows = thingAttributes.map((thingAttribute, index) =>
      <div className="incard" key={index}>
        {thingAttribute.thingattributename}
      </div>)
  }
  return (
    <div className="square">
      {rows}
    </div>
  )
}

export default CraigslistCardPreview
