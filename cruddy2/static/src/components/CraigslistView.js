import React from 'react'
import CraigslistCardPreview from './CraigslistCardPreview'

class CraigslistView extends React.Component {
	componentDidMount() {
		this.props.getThingInstances(this.props.params.thingId);
	}
	render() {
		var cards = [];
		var conversion = this.props.thingAttributeIdsToNames;
		console.log("CONV");
		console.log(conversion);
		console.log(this.props);
		for (var index in this.props.thingInstances)
		{
			var thingInstance = this.props.thingInstances[index];
			var thingAttributeNames = [];
			var thingAttributeTypeIds = [];
			var thingAttributeExamples = [];
			console.log("thingInstance");
			console.log(thingInstance);
			for (var thingAttributeId in thingInstance)
			{
				console.log("tattrid");
				console.log(thingAttributeId);
				thingAttributeNames.push(conversion[thingAttributeId].name);
				thingAttributeTypeIds.push(conversion[thingAttributeId].typeid);
				thingAttributeExamples.push(thingInstance[thingAttributeId]);
			}
			cards.push(
				<div className="col-md-6">
					<div className="col-md-2" />
					<div className="col-md-8">
						<CraigslistCardPreview key={index}
						thingAttributeNames={thingAttributeNames}
						thingAttributeTypeIds={thingAttributeTypeIds}
						thingAttributeExamples={thingAttributeExamples} />
					</div>
					<div className="col-md-2" />
				</div>
				)
		}
		return (
			<div className="col-md-12">
				{cards}
			</div>
		);
	}
  }



export default CraigslistView
