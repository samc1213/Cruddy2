import React, { PropTypes } from 'react'

const ThingAttributeTypes = ({ thingAttributeTypes, label }) => {
  var options = [];
  var thingAttrNames = Object.keys(thingAttributeTypes);
  for (var i = 0; i < thingAttrNames.length; i++) {
    options.push(<option value={thingAttributeTypes[thingAttrNames[i]]} key={i}>{thingAttrNames[i]}</option>)
  }

  return (
    <Field
      name={`${thingAttribute}.thingattributetypeid`}
      type="text"
      component ="select"
      label="ThingAttribute Type">
      {getOptions(thingAttributeTypes)}
    </Field>
  )
}

ThingAttributeTypes.propTypes = {
  thingAttributeTypes: PropTypes.object.isRequired,
}

export default ThingAttributeTypes
