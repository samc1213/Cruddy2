import React from 'react'
import CustomCard from './CustomCard'
import Walkthrough from './Walkthrough'
import * as JsxFactory from '../JsxFactory'

class CraigslistView extends React.Component {
  componentDidMount() {
    this.props.getThingInstances(this.props.params.websiteName);
    this.props.getLayout(this.props.params.websiteName);
  }
  render() {
    var cards = [];
    if (this.props.layout.data != null)
    {
      console.log(this.props.layout.data)
      var data = JSON.parse(this.props.layout.data)
      console.log(data)
      var website = JsxFactory.GetJSX(data.websitelayout, data.repeatinglayout, this.props.thingInstances);
      console.log(website);

      return (
        <div className="col-md-12">
          {website}
        </div>
      );
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
