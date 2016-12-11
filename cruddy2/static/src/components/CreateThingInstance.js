import React from 'react'
import { Field, reduxForm, FieldArray } from 'redux-form';

class CreateThingInstance extends React.Component {
	componentDidMount() {
		this.props.getThingAttributes(this.props.params.thingId);
	}

	render(){
		console.log(this.props)
		var thingAttributes = []
		for (var i = 0; i < this.props.thingAttributeNames.length; i ++) {
			var thingAttributeType = this.props.thingAttributeTypes[i] !="3" ? "text" : "file"

				thingAttributes.push(
					<div>
						<label> {this.props.thingAttributeNames[i]} </label>
						<input type={thingAttributeType} />
					</div>
				)
		}

		return(
			<div>
				poop
				<form>
				{thingAttributes}
				</form>
			</div>
		)
	}
}

export default CreateThingInstance
