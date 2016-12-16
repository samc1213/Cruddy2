import React from 'react'
import { Field, reduxForm, FieldArray } from 'redux-form';

class CreateThingInstance extends React.Component {
	componentDidMount() {
		this.props.getCurrentWebsiteName(this.props.params.thingId);
	}

	render(){
		var thingAttributes = []
		for (var i = 0; i < this.props.thingAttributeNames.length; i ++) {
			var name = `thingattributeid.${this.props.thingAttributeIds[i]}`;
			var thingAttributeType = this.props.thingAttributeTypes[i] !="3" ? <input type="text" name={name}/> 
				: <input type="file" accept="image/*" name={name} />

			thingAttributes.push(
				<div key={i}>
					<label> {this.props.thingAttributeNames[i]} </label>
					{thingAttributeType}
				</div>
			)
		}

		return(
			<div>
				<form action="/api/postnewthinginstance" method="POST" encType="multipart/form-data">
				<input type="hidden" name="thingid" value={this.props.params.thingId} />
				{thingAttributes}
				<button type="submit"> Submit </button>
				</form>
			</div>
		)
	}
}

export default CreateThingInstance
