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
    this.changeSize = this.changeSize.bind(this);
    this.state = { websiteDesign: [], repeatingDesign: [], currentDesignState: 'repeatingunit', selectedDivID: null, size: 12};
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

  onDivClicked = (id) => {
    var newDesign = this.getDesign();
    newDesign.forEach((design) => {
      design.props.style['outlineColor'] = 'None'
      design.props.style['outlineStyle'] = 'None'
      design.props.style['borderColor'] = 'black'
    });
    var elementThatClicked = newDesign.filter(design =>  design.props.id == id)[0];
    var size = elementThatClicked.props.className.slice(7);
    this.setState({
      selectedDivID: id,
      size: size
    });
    var newStyle = Object.assign({}, elementThatClicked.props.style);
    newStyle['outlineColor'] = 'red';
    newStyle['outlineStyle'] = 'dashed';
    newStyle['outlineWidth'] = '2.5px';
    var elementThatClickedCopy = React.cloneElement(elementThatClicked, {style: newStyle});
    newDesign[newDesign.findIndex(design =>  design.props.id == id)] = elementThatClickedCopy;
    this.updateState(newDesign);
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
      result['repeatinglayout'] = this.state.repeatingUnitCustomLayout;
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

  changeSize = (event) =>
  {
    this.setState({
      size: event.target.value,
    })
    if (this.state.selectedDivID != null)
    {
      var newDesign = this.getDesign();
      var elementThatClicked = newDesign.filter(design =>  design.props.id == this.state.selectedDivID)[0];
      var newClassName = "col-md-" + event.target.value;
      var elementThatClickedCopy = React.cloneElement(elementThatClicked, {className: newClassName});
      newDesign[newDesign.findIndex(design =>  design.props.id == this.state.selectedDivID)] = elementThatClickedCopy;
      this.updateState(newDesign);
    }
  }

  onBtnClick = (newItem) =>
  {
    switch (newItem)
    {
      case 'row':
        var id = this.getId();
        var newElement = <div onClick={() => this.onDivClicked(id)}id={id} contentEditable className="col-md-12" style={{'borderColor': 'black', 'height': '100px', 'borderStyle': 'solid', 'contentEditable': 'true'}}></div>;
        var newDesign = this.getDesign();
        newDesign.push(newElement);
        this.updateState(newDesign);
        break;
      case 'repeatingArea':
        var id = this.getId();
        var newElement = <div id={id} className="col-md-12 repeatingArea" style={{'borderColor': 'green', 'borderStyle': 'solid', 'contentEditable': 'true'}}> Repeating Area Bitch</div>;
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
    var options = [];
    var select = [];
    if (this.state.selectedDivID != null){
      for (var i = 1; i < 13; i ++){
        options.push(<option value ={i}> {i} </option>);
      }
      select.push(<select onChange = {this.changeSize} value = {this.state.size}>{options}</select>);
    }

    return (
        <div>
          <div style={{position: 'absolute', width: '200px', right:'0', height: '100%', backgroundColor: 'gray', zIndex: 3}}>
            {select}
          </div>
          <div id="designarea" style={{ marginRight: "210px"}}>
            <div className="row">
              {design}
            </div>
            <button onClick = {() => this.onBtnClick('row')}> Add New Row</button>
            <button onClick = {this.onSubmit}>Submit</button>
            {websitedesignbuttons}
          </div>

        </div>
    );
  }
  }



export default Designer
