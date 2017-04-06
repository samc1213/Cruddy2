import React from 'react'
import CustomCard from './CustomCard'
import Walkthrough from './Walkthrough'

class CraigslistView extends React.Component {
  componentDidMount() {
    this.props.getThingInstances(this.props.params.websiteName);
    this.props.getLayout(this.props.params.websiteName);
  }
  render() {
    var cards = [];

    if (this.props.layout.data != null && this.props.thingInstances != null )
    {
      for (var index in this.props.thingInstances)
      {
        var thingInstance = this.props.thingInstances[index];
        console.log(thingInstance);
        var newLayoutDataInfo = []
        var thingAttributeNames = Object.keys(thingInstance)

        for (var i = 0; i < this.props.layout.data.length; i++)
        {
          var layoutString = this.props.layout.data[i].slice(0);
          var replacedString = layoutString;
          thingAttributeNames.forEach((thingAttributeName) => {
            var thingAttributeValue = thingInstance[thingAttributeName].value;
            var magicBracketString = '{' + thingAttributeName + '}';
            console.log(magicBracketString)
            replacedString = replacedString.replace(new RegExp(magicBracketString, 'g'), thingAttributeValue);
          })

          newLayoutDataInfo.push(replacedString)
        }
        cards.push(
          <div className="col-md-6" key={index}>
            <div className="col-md-2" />
            <div className="col-md-8">
              <CustomCard
              cardLayout={newLayoutDataInfo} />
            </div>
            <div className="col-md-2" />
          </div>
        )
    }

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
