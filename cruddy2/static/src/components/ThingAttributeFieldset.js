import React, { Component } from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const renderThingAttributes = ({ fields, meta: { touched, error } }) => (
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
          component={renderField}
          label="ThingAttribute Name"/>
        <Field
          name={`${thingAttribute}.thingattributetype`}
          type="text"
          component={renderField}
          label="ThingAttribute Type"/>
      </li>
    )}
  </ul>
)


const FieldArraysForm = ({ handleSubmit, pristine, reset, submitting }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Field name="thingname" type="text" component={renderField} label="Thing Name"/>
      <FieldArray name="members" component={renderThingAttributes}/>
    </form>
   )
 }


export default reduxForm({
   form: 'fieldArrays'     // a unique identifier for this form
 })(FieldArraysForm)
