import React from 'react'
import * as ThingAttributeDisplayerFactory from '../ThingAttributeDisplayerFactory'
import ThingAttributeTextDisplayer from '../ThingAttributeTextDisplayer'


class Designer extends React.Component {
  constructor(props) {
    super(props);
    this.onBtnClick = this.onBtnClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateState = this.updateState.bind(this);
    this.getId = this.getId.bind(this);
    this.getDesign = this.getDesign.bind(this);
    this.getCustomLayout = this.getCustomLayout.bind(this);
    this.state = { websiteDesign: [], repeatingDesign: [], currentDesignState: 'repeatingunit' };
  }

  getCustomLayout = (layout) => {
    var result = []
    layout.forEach((design) => {
      var newDesign = {}
      newDesign.element = design.type;
      newDesign.text = document.getElementById(design.props.id).innerText;
      newDesign.props = design.props;
      result.push(newDesign);
    });
    return result;
  }

  onSubmit = () => {
    if (this.state.currentDesignState == 'repeatingunit'){
      var repeatingUnitCustom = this.getCustomLayout(this.state.repeatingDesign);
      this.setState({
        currentDesignState: 'website',
        repeatingUnitCustomLayout: repeatingUnitCustom
      })
    }
    else{
      var websiteDesignCopy = this.state.websiteDesign.slice();
      var repeatingDesignCopy = this.state.repeatingDesign.slice();
      var result = {};
      result['websitelayout'] = this.getCustomLayout(websiteDesignCopy);
      console.log(result);
      result['repeatinglayout'] = this.state.repeatingUnitCustomLayout;
      console.log(result);
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

  getId = () =>{
    return this.state.currentDesignState + this.getDesign().length;
  }

  getDesign = () => {
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
        var id = this.getId();
        var newElement = <div id={id} contentEditable className="row form-control" style={{'borderColor': 'black', 'height': '100px', 'borderStyle': 'solid', 'contentEditable': 'true'}}></div>;
        var newDesign = this.getDesign();
        newDesign.push(newElement);
        this.updateState(newDesign);
        break;
      case 'repeatingArea':
        var id = this.getId();
        var newElement = <div id={id} className="row form-control repeatingArea" style={{'borderColor': 'green', 'height': '100px', 'borderStyle': 'solid', 'contentEditable': 'true'}}> Repeating Area Bitch</div>;
        var newDesign = this.getDesign();
        newDesign.push(newElement);
        this.updateState(newDesign);
        break;
    }
  }

  render() {
    var design;
    var websitedesignbuttons = null;
    if (this.state.currentDesignState == 'website')
    {
      design = this.state.websiteDesign;
      websitedesignbuttons = [<button onClick = {() => this.onBtnClick('repeatingArea')}> Add New Repeating Unit</button>]
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
          {websitedesignbuttons}
        </div>
    );
  }
  }



export default Designer
