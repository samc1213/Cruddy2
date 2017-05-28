import React from 'react'
import { Field, reduxForm, FieldArray } from 'redux-form';

class CreateThingInstance extends React.Component {
  componentDidMount() {
    this.props.getThingAttributes(this.props.params.websiteName);
  }

  constructor(props) {
    super(props);
    this.state = {submitError: ''}
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getNumberValidationSpan = this.getNumberValidationSpan.bind(this);
    this.validateNumber = this.validateNumber.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    for (var i = 0; i < this.props.thingAttributeNames.length; i ++) {
      let name = `thingattributeid.${this.props.thingAttributeIds[i]}`;
      if (name in this.state) {
        if (!this.state[name]) {
          this.setState({
            submitError: 'One of your fields is incorrect.'
          });
          return;
        }
      }
    }
    var form = document.getElementById('newThingInstanceForm');
    this.props.submitNewThingInstance(form);
  }

  getNumberValidationSpan(name) {
    if (name in this.state) {
      if (!this.state[name]) {
        return (<span style={{color: 'red'}}>That isn't a number.</span>)
      }
    }
    return (<span></span>);
  }


  validateNumber(event, name) {
    var number = event.target.value;
    var valid = (number.match(/^-?\d*(\.\d+)?$/));
    if (valid)
    {
      this.setState({[name]: true});
      return;
    }
    this.setState({[name]: false});
  }

  render(){
    var thingAttributes = []
    for (var i = 0; i < this.props.thingAttributeNames.length; i ++) {
      let name = `thingattributeid.${this.props.thingAttributeIds[i]}`;
      let thingAttributeType;
      switch(parseInt(this.props.thingAttributeTypes[i])) {
        case 1:
          thingAttributeType = [<input type="text" className="form-control" name={name}/>,
          this.getNumberValidationSpan(name)];
          break;
        case 2:
          thingAttributeType = [<input type="text" className="form-control" name={name} onChange={(e) => this.validateNumber(e, name)}/>,
          this.getNumberValidationSpan(name)];
          break;
        case 3:
          thingAttributeType = <input type="file" className="form-control-file" accept="image/*" name={name}/>
          break;
        default:
          thingAttributeType = [<input type="text" className="form-control" name={name}/>,
            <span>{this.state[name] ? this.state[name]: "None"}</span>];
      }


      thingAttributes.push(
        <div key={i}>
          <label> {this.props.thingAttributeNames[i]} </label>
          {thingAttributeType}
        </div>
      )
    }

    return(
      <div>
      <h2 className="text-xs-center">Create A New Instance of Your Thing</h2>
        <form id="newThingInstanceForm" onSubmit={this.handleSubmit} encType="multipart/form-data">
        <input type="hidden" name="websitename" value={this.props.params.websiteName} />
        {thingAttributes}
        <button type="submit" className="btn btn-default"> Submit </button>
        <div style={{color: 'red'}}> {this.state.submitError}</div>
        </form>
      </div>
    )
  }
}

export default CreateThingInstance
