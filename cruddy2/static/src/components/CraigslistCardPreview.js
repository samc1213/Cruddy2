import React, { PropTypes } from 'react'


const CraigslistCardPreview = ({ thingAttributes }) => {
  var rows = []
  console.log('oop')
  console.log(thingAttributes);
  if (thingAttributes != null) {
    rows = thingAttributes.map((thingAttribute, index) =>
    <li className="list-group-item" key={index}><b>{thingAttribute.thingattributename}</b>: {thingAttribute.thingattributeexample}</li>
    )
  }
  return (
    <div className="card">
      <div className="card-block">
        <ul className="list-group list-group-flush">
          {rows}
        </ul>
      </div>
    </div>
  )
}

export default CraigslistCardPreview
