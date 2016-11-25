import React, { PropTypes } from 'react'


const CraigslistCardPreview = ({ thingAttributes }) => (
  <div className="square">
  {thingAttributes.map((thingAttribute, index) =>
    <div className="incard" key={index}>
      {thingAttribute.thingattributename}
    </div>
  )}
  </div>
)

CraigslistCardPreview.propTypes = {
  thingAttributes: PropTypes.array.isRequired,
}

export default CraigslistCardPreview
