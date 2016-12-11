import React from 'react'
import CraigslistCardPreview from './CraigslistCardPreview'

class CraigslistView extends React.Component {
	componentDidMount() {
		this.props.getThingInstances(this.props.params.thingId);
	}
	render() {
		var cards = [];
		var conversion = this.props.thingAttributeIdsToNamesAndTypes;
		for (var index in this.props.thingInstances)
		{
			var thingInstance = this.props.thingInstances[index];
			var thingAttributeNames = [];
			var thingAttributeTypeIds = [];
			var thingAttributeExamples = [];
			for (var thingAttributeId in thingInstance)
			{
				thingAttributeNames.push(conversion[thingAttributeId].name);
				thingAttributeTypeIds.push(conversion[thingAttributeId].typeid);
				if (conversion[thingAttributeId].typeid == "3")
				{
					thingAttributeExamples.push([thingInstance[thingAttributeId], false]);
				}
				else
				{
					thingAttributeExamples.push(thingInstance[thingAttributeId]);
				}
			}
			cards.push(
				<div className="col-md-6">
					<div className="col-md-2" />
					<div className="col-md-8">
						<CraigslistCardPreview key={index}
						thingAttributeNames={thingAttributeNames}
						thingAttributeTypeIds={thingAttributeTypeIds}
						thingAttributeExamples={thingAttributeExamples}
						isPreview={false} />
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
