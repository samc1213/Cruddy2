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

class thingAttributes extends React.Component {
  createExampleField(exampleTypeId, thingAttribute) {
    if (exampleTypeId != "3") {
      return (
        <Field
          name={`${thingAttribute}.thingattributeexample`}
          type="text"
          component={renderTextField}
          label="ThingAttribute Example" />
      )
    }
    else {
      return (
        <Field
         name={`${thingAttribute}.thingattributeexample`}
         type="file"
         className="form-control btn-file"
         component={renderTextField}
         label="ThingAttribute Example File"
         accept="image/*" />
      )
    }
  }

  render() {
    return (
      <div>
        <div>
          <button className="btn btn-primary" type="button" onClick={() => this.props.fields.push({})}>Add Thing Attribute</button>
          {this.props.touched && error && <span>{error}</span>}
        </div>
        {this.props.fields.map((thingAttribute, index) =>
            <div key={index} className="thingattributeformgroup">
                <div>
                  <h4 style={{display: "inline-block"}}>ThingAttribute #{index + 1}</h4>
                  <button
                    style={{float: "right"}}
                    type="button"
                    className="btn btn-primary"
                    type="button"
                    title="Remove ThingAttribute"
                    onClick={() => this.props.fields.remove(index)}
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
                {Object.keys(this.props.thingAttributeTypes).map((key, index) =>
                  <option value={this.props.thingAttributeTypes[key]} key={index}>{key}</option>
                )}
              </Field>
              {this.createExampleField(this.props.selectedExampleType[index], thingAttribute)}
          </div>
        )}
      </div>
    )
  }
}

const NewThingForm = ({ handleSubmit, pristine, reset, submitting, thingAttributeTypes, selectedExampleType, ...initialValues }) => {
  return (
    <form role="form" action="/postnewthing" method="post" className="form-group">
      <Field name="thingname" type="text" component={renderTextField} label="Thing Name"/>
      <FieldArray name="members" component={thingAttributes} thingAttributeTypes={thingAttributeTypes} selectedExampleType={selectedExampleType}/>
      <button  className="btn btn-primary" type="submit" > Submit </button>
    </form>
   )
 }


export default reduxForm({
   form: 'newThingForm',
   initialValues: {
     thingname: 'Car',
     members: [
      {
        thingattributename: 'Make',
        thingattributetypeid: '1',
        thingattributeexample: 'Toyota'
      },
      {
        thingattributename: 'Model',
        thingattributetypeid: '1',
        thingattributeexample: 'Corolla'
      },
      {
        thingattributename: 'Year',
        thingattributetypeid: '2',
        thingattributeexample: '1995'
      },
      {
        thingattributename: 'Picture',
        thingattributetypeid: '3',
        'thingattributeexample': ''
      }
]
   }    // a unique identifier for this form
 })(NewThingForm)
