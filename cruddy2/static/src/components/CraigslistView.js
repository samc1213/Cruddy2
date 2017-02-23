import React from 'react'
import CraigslistCardPreview from './CraigslistCardPreview'
import Walkthrough from './Walkthrough'

class CraigslistView extends React.Component {
  componentDidMount() {
    this.props.getThingInstances(this.props.params.websiteName);
  }
  render() {
    var cards = [];
    for (var index in this.props.thingInstances)
    {
      var thingInstance = this.props.thingInstances[index];
      console.log(thingInstance);
      cards.push(
        <div className="col-md-6" key={index}>
          <div className="col-md-2" />
          <div className="col-md-8">
            <CraigslistCardPreview
            thingAttributes={thingInstance} />
          </div>
          <div className="col-md-2" />
        </div>
        )
    }

    if (cards.length == 0)
    {
      cards.push(<Walkthrough bigText="This is your website" helpText="There's nothing here yet. Go ahead and create the first instance of your Thing." />)
    }

    return (
      <div className="col-md-12">
        {cards}
      </div>
    );
  }
  }



export default CraigslistView
