import React from 'react'
import { Field, reduxForm, FieldArray } from 'redux-form';

class CreateThingInstance extends React.Component {
	componentDidMount() {
		this.props.getThingAttributes(this.props.params.thingId);
	}
	
  constructor(props) {
    super(props);
		
		this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    var form = document.getElementById('newThingInstanceForm');
    this.props.submitNewThingInstance(form);
  }

	render(){
		var thingAttributes = []
		for (var i = 0; i < this.props.thingAttributeNames.length; i ++) {
			var name = `thingattributeid.${this.props.thingAttributeIds[i]}`;
			var thingAttributeType = this.props.thingAttributeTypes[i] !="3" ? <input type="text" className="form-control" name={name}/> 
				: <input type="file" className="form-control-file" accept="image/*" name={name} />

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
				<input type="hidden" name="thingid" value={this.props.params.thingId} />
				<input type="hidden" name="websitename" value={this.props.params.websiteName} />
				{thingAttributes}
				<button type="submit"> Submit </button>
				</form>
			</div>
		)
	}
}

export default CreateThingInstance
