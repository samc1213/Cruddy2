import React from 'react'
import * as ThingAttributeDisplayerFactory from '../ThingAttributeDisplayerFactory'
import ThingAttributeTextDisplayer from '../ThingAttributeTextDisplayer'


class Designer extends React.Component {
  constructor(props) {
    super(props);
    this.onBtnClick = this.onBtnClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { design: [] };
  }

  onSubmit = () => {
    this.props.submitWebsiteDesign(JSON.stringify(this.state.design), this.props.websiteName);
  }

  onBtnClick = (newItem) =>
  {
    console.log('BUTTON CLICK IN DESIGNER');
    switch (newItem)
    {
      case 'row':
        var newDesign = this.state.design.slice();
        var newElement = <div contentEditable className="row form-control" style={{'borderColor': 'black', 'height': '100px', 'borderStyle': 'solid', 'contentEditable': 'true'}}></div>;
        newDesign.push(newElement);
        this.setState({
          design: newDesign,
        })
        break;
      case 'repeatingArea':
        var newDesign = this.state.design.slice();
        var newElement = <div contentEditable className="row form-control" style={{'borderColor': 'green', 'height': '100px', 'borderStyle': 'solid', 'contentEditable': 'true'}}></div>;
        newDesign.push(newElement);
        this.setState({
          design: newDesign
        })
        break;
    }
  }

  render() {

    return (
        <div>
          <div id="designarea">
            {this.state.design}
          </div>
          <button onClick = {() => this.onBtnClick('row')}> Add New Row</button>
          <button onClick = {this.onSubmit}>Submit</button>
        </div>
    );
  }
  }



export default Designer
