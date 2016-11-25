import React, { Component } from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';

const renderTextField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} className="form-control"/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const renderThingAttributes = ({ fields, thingAttributeTypes, meta: { touched, error } }) => (
  <div>
    <div>
      <button className="btn btn-default" type="button" onClick={() => fields.push({})}>Add Thing Attribute</button>
      {touched && error && <span>{error}</span>}
    </div>
    {fields.map((thingAttribute, index) =>
      <div key={index} className="thingattributeformgroup">
          <div>
            <h4 style={{display: "inline-block"}}>ThingAttribute #{index + 1}</h4>
            <button
              style={{float: "right"}}
              type="button"
              className="btn btn-default"
              type="button"
              title="Remove ThingAttribute"
              onClick={() => fields.remove(index)}
              aria-label="Left Align">
              <span
                className="glyphicon glyphicon-remove-circle"
                style={{color: "red"}} />
            </button>
          </div>

        <Field
          name={`${thingAttribute}.thingattributename`}
          type="text"
          component={renderTextField}
          label="ThingAttribute Name"/>
        <label>ThingAttribute Type</label>
        <Field
          className="form-control"
          name={`${thingAttribute}.thingattributetypeid`}
          type="text"
          component ="select"
          label="ThingAttribute Type">
          {Object.keys(thingAttributeTypes).map((key, index) =>
            <option value={thingAttributeTypes[key]} key={index}>{key}</option>
          )}
        </Field>
      </div>
    )}
  </div>
)

const NewThingForm = ({ handleSubmit, pristine, reset, submitting, thingAttributeTypes, ...initialValues }) => {
  return (
    <form action="/postnewthing" method="post" className="form-group">
      <Field name="thingname" type="text" component={renderTextField} label="Thing Name"/>
      <FieldArray name="members" component={renderThingAttributes} thingAttributeTypes={thingAttributeTypes}/>
      <button  className="btn btn-default" type="submit" > Submit </button>
    </form>
   )
 }


export default reduxForm({
   form: 'newThingForm'     // a unique identifier for this form
 })(NewThingForm)
