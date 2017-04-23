import React from 'react'
import * as ThingAttributeDisplayerFactory from '../ThingAttributeDisplayerFactory'
import ThingAttributeTextDisplayer from '../ThingAttributeTextDisplayer'


class Designer extends React.Component {
  constructor(props) {
    super(props);
    this.onBtnClick = this.onBtnClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateState = this.updateState.bind(this);
    this.getDesign = this.getDesign.bind(this);
    this.state = { websiteDesign: [], repeatingDesign: [], currentDesignState: 'repeatingunit' };
  }

  onSubmit = () => {
    if (this.state.currentDesignState == 'repeatingunit'){
      this.setState({
        currentDesignState: 'website'
      })
    }
    else{
      var stateCopy = this.state.websiteDesign.slice();
      console.log(JSON.stringify(stateCopy));
      var result = {};
      result['websitelayout'] = [];
      stateCopy.forEach((design) => {
        var newDesign = {}
        newDesign.element = design.type;
        newDesign.text = document.getElementById(design.props.id).innerText;
        newDesign.props = design.props;
        result.websitelayout.push(newDesign);
      }
      );
      result['repeatinglayout'] = this.state.repeatingDesign.slice();
      this.props.submitWebsiteDesign({layout: JSON.stringify(result), websiteName: this.props.websiteName});
    }
  }

  updateState = (design) => {
    if (this.state.currentDesignState == 'website')
    {
      this.setState({
        websiteDesign: design,
      })
    }
    else {
      this.setState({
        repeatingDesign: design,
      })
    }
  }

  getDesign = () =>{
    if(this.state.currentDesignState == 'website')
    {
      return this.state.websiteDesign.slice();
    }
    else{
      return this.state.repeatingDesign.slice();
    }
  }

  onBtnClick = (newItem) =>
  {
    switch (newItem)
    {
      case 'row':
        var newDesign = this.getDesign();
        var newElement = <div id={newDesign.length} contentEditable className="row form-control" style={{'borderColor': 'black', 'height': '100px', 'borderStyle': 'solid', 'contentEditable': 'true'}}><div className="innerDiv"></div> <div className="secondInnerDiv"></div></div>;
        newDesign.push(newElement);
        this.updateState(newDesign);
        break;
      case 'repeatingArea':
        var newDesign = this.getDesign();
        var newElement = <div id={newDesign.length} contentEditable className="row form-control repeatingArea" style={{'borderColor': 'green', 'height': '100px', 'borderStyle': 'solid', 'contentEditable': 'true'}}></div>;
        newDesign.push(newElement);
        this.updateState(newDesign);
        break;
    }
  }

  render() {
    var design;
    if (this.state.currentDesignState == 'website')
    {
      design = this.state.websiteDesign;
    }
    else {
      design = this.state.repeatingDesign;
    }
    return (
        <div>
          <div id="designarea">
            {design}
          </div>
          <button onClick = {() => this.onBtnClick('row')}> Add New Row</button>
          <button onClick = {this.onSubmit}>Submit</button>
        </div>
    );
  }
  }



export default Designer
