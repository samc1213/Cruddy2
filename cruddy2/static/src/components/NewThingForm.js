import React, { Component } from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import ThingAttributeTypeOptions from '../containers/ThingAttributeTypeOptions'

const renderTextField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

function getOptions(thingAttributeTypes) {
  var options = []
  console.log(thingAttributeTypes);
  for (var key in thingAttributeTypes) {
    console.log(key);
    console.log(thingAttributeTypes[key]);
    options.push(<option value={thingAttributeTypes[key]}>{key}</option>)
  }
  console.log(options);
}

const renderThingAttributes = ({ fields, thingAttributeTypes, meta: { touched, error } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>Add Thing Attribute</button>
      {touched && error && <span>{error}</span>}
    </li>
    {fields.map((thingAttribute, index) =>
      <li key={index}>
        <button
          type="button"
          title="Remove ThingAttribute"
          onClick={() => fields.remove(index)}>
          Remove
        </button>
        <h4>ThingAttribute #{index + 1}</h4>
        <Field
          name={`${thingAttribute}.thingattributename`}
          type="text"
          component={renderTextField}
          label="ThingAttribute Name"/>
        <Field
          name={`${thingAttribute}.thingattributetypeid`}
          type="text"
          component ="select"
          label="ThingAttribute Type">
          {getOptions(thingAttributeTypes)}
        </Field>
      </li>

    )}
  </ul>
)


const NewThingForm = ({ handleSubmit, pristine, reset, submitting, thingAttributeTypes }) => {
  return (
    <form action="/postnewthing" method="post">
      <Field name="thingname" type="text" component={renderTextField} label="Thing Name"/>
      <FieldArray name="members" component={renderThingAttributes} thingAttributeTypes={thingAttributeTypes}/>
      <button type="submit" > Submit </button>
    </form>
   )
 }


export default reduxForm({
   form: 'newThingForm'     // a unique identifier for this form
 })(NewThingForm)
