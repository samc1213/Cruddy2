import React from 'react'
import * as ThingAttributeDisplayerFactory from '../ThingAttributeDisplayerFactory'
import ThingAttributeTextDisplayer from '../ThingAttributeTextDisplayer'
import * as NewJsxFactory from './NewJsxFactory'


class Designer extends React.Component {
  constructor(props) {
    super(props);
    this.onAddNewRow = this.onAddNewRow.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateState = this.updateState.bind(this);
    this.getId = this.getId.bind(this);
    this.getDesign = this.getDesign.bind(this);
    this.changeSize = this.changeSize.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
    this.getPixelsInRange = this.getPixelsInRange.bind(this);
    this.onAddThingAttributeName = this.onAddThingAttributeName.bind(this);
    this.getDesignBarSelects = this.getDesignBarSelects.bind(this);
    this.changeButtonText = this.changeButtonText.bind(this);
    var colors = ['AliceBlue','AntiqueWhite','Aqua','Aquamarine','Azure','Beige','Bisque','Black','BlanchedAlmond','Blue','BlueViolet','Brown','BurlyWood','CadetBlue','Chartreuse','Chocolate','Coral','CornflowerBlue','Cornsilk','Crimson','Cyan','DarkBlue','DarkCyan','DarkGoldenRod'
    ,'DarkGray','DarkGrey','DarkGreen','DarkKhaki','DarkMagenta','DarkOliveGreen','DarkOrange','DarkOrchid','DarkRed','DarkSalmon','DarkSeaGreen','DarkSlateBlue','DarkSlateGray','DarkSlateGrey','DarkTurquoise','DarkViolet','DeepPink','DeepSkyBlue','DimGray','DimGrey','DodgerBlue','FireBrick','FloralWhite','ForestGreen','Fuchsia'
    ,'Gainsboro','GhostWhite','Gold','GoldenRod','Gray','Grey','Green','GreenYellow','HoneyDew','HotPink','IndianRed','Indigo','Ivory','Khaki','Lavender','LavenderBlush','LawnGreen','LemonChiffon','LightBlue','LightCoral',
    'LightCyan','LightGoldenRodYellow','LightGray','LightGrey','LightGreen','LightPink','LightSalmon','LightSeaGreen','LightSkyBlue','LightSlateGray','LightSlateGrey','LightSteelBlue','LightYellow','Lime','LimeGreen','Linen','Magenta','Maroon','MediumAquaMarine','MediumBlue','MediumOrchid','MediumPurple','MediumSeaGreen','MediumSlateBlue','MediumSpringGreen',
    'MediumTurquoise','MediumVioletRed','MidnightBlue','MintCream','MistyRose','Moccasin','NavajoWhite','Navy','OldLace','Olive','OliveDrab','Orange','OrangeRed','Orchid',
    'PaleGoldenRod','PaleGreen','PaleTurquoise','PaleVioletRed','PapayaWhip','PeachPuff','Peru','Pink','Plum','PowderBlue','Purple','RebeccaPurple','Red','RosyBrown','RoyalBlue',
    'SaddleBrown','Salmon','SandyBrown','SeaGreen','SeaShell','Sienna','Silver','SkyBlue','SlateBlue','SlateGray','SlateGrey','Snow','SpringGreen','SteelBlue','Tan','Teal','Thistle',
    'Tomato','Turquoise','Violet','Wheat','White','WhiteSmoke','Yellow','YellowGreen']
    var nonAbledColors = colors.slice();
    nonAbledColors.unshift('None');

    this.state = {
      buttonOptions: [{cssStyle: 'color', choices:['Black', 'Blue'], title: 'Color', default: 'Blue', affectsButton:'true'},
      ],

      divOptions: [{cssStyle: 'borderStyle', choices: ['None', 'Dotted', 'Dashed', 'Solid', 'Double'], title: 'Border Style', default: 'None'},
     {cssStyle: 'borderColor', choices: colors, title: 'Border Color', default: 'Black'},
     {cssStyle: 'borderWidth', choices: this.getPixelsInRange(1, 20), title: 'Border Thickness', default: '2px'},
     {cssStyle: 'borderRadius', choices: this.getPixelsInRange(0, 200), title: 'Border Radius', default: '0px'},
     {cssStyle: 'color', choices: colors, title: 'Text Color', default: 'Black'},
     {cssStyle: 'fontSize', choices: this.getPixelsInRange(5, 60), title: 'Text Size', default: '15px'},
     {cssStyle: 'textAlign', choices: ['Left', 'Right', 'Center'], title: 'Text Alignment', default: 'Left'},
     {cssStyle: 'fontFamily', choices: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Lucida Sans Unicode', 'Palatino Linotype', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana'], title: 'Text Style', default: 'Arial'},
     {cssStyle: 'fontWeight', choices: ['Normal', 'Bold'], title: 'Text Weight', default: 'normal'},
     {cssStyle: 'backgroundColor', choices: nonAbledColors, title: 'Background Color', default: 'None'},
     {cssStyle: 'height', choices: this.getPixelsInRange(5, 400), title: 'Height', default: '100px'}],
    websiteDesign: [], repeatingDesign: [], currentDesignState: 'repeatingunit', selectedDivID: null, buttonText:'button', selectedDivIsButtonDiv: false, size: 12};

    this.state.divOptions.forEach((option) => {
      this.state[option.cssStyle] = option.default;
    });
  }

  changeButtonText = (e) =>{
    if (this.state.selectedDivID != null && this.state.selectedDivIsButtonDiv){
      var newDesign = this.getDesign();
      var id = this.state.selectedDivID.slice(0);
      var divID = id.slice(0, id.length -3);
      var divThatClicked = newDesign.filter(design =>  design.id == divID)[0];
      newDesign[newDesign.findIndex(design =>  design.id == divID)].children[divThatClicked.children.findIndex(child => child.id == id)].text = e.target.value;
      this.setState({
        buttonText: e.target.value
      })


    }
  }

  onDelete = () => {
    if (this.state.selectedDivID != null)
    {
      if (this.state.selectedDivIsButtonDiv){
        var newDesign = this.getDesign();
        var id = this.state.selectedDivID.slice(0);
        var divID = id.slice(0, id.length -3);
        var divThatClicked = newDesign.filter(design =>  design.id == divID)[0];
        console.log("what");

        newDesign[newDesign.findIndex(design =>  design.id == divID)].children = divThatClicked.children.filter((child) => child.id !== id);
        this.updateState(newDesign, ()=>this.onDivClicked(null, null));
      }
      else{
        var newDesign = this.getDesign();
        this.updateState(newDesign.filter((design) => design.id !== this.state.selectedDivID), ()=>this.onDivClicked(null, null));

      }
    }
  }

  onDivClicked = (e, id, isButtonDiv = false) => {
    if (e != null)
    {
      e.stopPropagation();
    }

    var newDesign = this.getDesign();
    newDesign.forEach((design, i) => {
      var newDesignStyle = Object.assign({}, design.style)
      newDesignStyle['outlineColor'] = 'WhiteSmoke'
      newDesignStyle['outlineStyle'] = 'dashed'
      newDesign[i].style = newDesignStyle;
      design.children.forEach((child, j) =>{
        var newDesignStyle = Object.assign({}, child.style)
        newDesignStyle['outlineColor'] = 'transparent'
        newDesignStyle['outineStyle'] = 'none'
        newDesign[i].children[j].style = newDesignStyle;
      })
    });
    if (id == null)
    {
      this.setState({
        selectedDivID: id,
        selectedDivIsButtonDiv: false,
        size: 12,
      });
      return;
    }
    let divID = id;
    if(isButtonDiv){
      divID = id.slice(0, id.length-3);
    }
    let buttonText = '';
    var divThatClicked = newDesign.filter(design =>  design.id == divID)[0];
    var size = divThatClicked.className.slice(7);
    if (!isButtonDiv)
    {
      this.state.divOptions.forEach((option) => {
        var style = divThatClicked.style[option.cssStyle];
        this.setState({[option.cssStyle]: style});
      })
      var newStyle = Object.assign({}, divThatClicked.style);
      newStyle['outlineColor'] = 'red';
      newStyle['outlineStyle'] = 'dashed';
      newStyle['outlineWidth'] = '2.5px';
      newDesign[newDesign.findIndex(design =>  design.id == divID)].style = newStyle;

    }
    else {
      var elementThatClicked = divThatClicked.children.filter(child => child.id == id)[0];
      console.log(elementThatClicked);
      this.state.buttonOptions.forEach((option) => {
        var style = elementThatClicked.style[option.cssStyle];
        this.setState({[option.cssStyle]: style});
      })
      var newStyle = Object.assign({}, elementThatClicked.style);
      newStyle['outlineColor'] = 'red';
      newStyle['outlineStyle'] = 'dashed';
      newStyle['outlineWidth'] = '2.5px';
      buttonText = elementThatClicked.text;
      newDesign[newDesign.findIndex(design =>  design.id == divID)].children[divThatClicked.children.findIndex(design => design.id == id)].style = newStyle;

    }
    this.setState({
      selectedDivID: id,
      selectedDivIsButtonDiv: isButtonDiv,
      buttonText: buttonText,
      size: size,
    });
    console.log(this.state.buttonText);
    this.updateState(newDesign, () => true);
    if (e == null){
      $('#designarea').scrollTop($('#designarea')[0].scrollHeight);
    }
  }

  onSubmit = () => {
    if (this.state.currentDesignState == 'repeatingunit'){
      var repeatingDesignCopy = this.state.repeatingDesign.slice();
      repeatingDesignCopy.forEach((design, i) => {
        var newDesign = Object.assign({}, design);
        newDesign.style['outlineColor'] = 'None'
        newDesign.style['outlineStyle'] = 'None'
        newDesign.contentEditable = false;
        repeatingDesignCopy[i] = newDesign
      });
      this.setState({
        currentDesignState: 'website',
        repeatingUnitCustomLayout: repeatingDesignCopy
      })
    }
    else{
      var websiteDesignCopy = this.state.websiteDesign.slice();
      websiteDesignCopy.forEach((design, i) => {
        var newDesign = Object.assign({}, design);
        newDesign.style['outlineColor'] = 'None'
        newDesign.style['outlineStyle'] = 'None'
        newDesign.contentEditable = false;
        if (design.props.className.includes('repeatingArea'))
        {
          newDesign.style['borderStyle'] = 'None';
        }
        websiteDesignCopy[i] = newDesign;
      });
      var result = {};
      result['websitelayout'] = websiteDesignCopy;
      result['repeatinglayout'] = this.state.repeatingUnitCustomLayout;
      this.props.submitWebsiteDesign({layout: JSON.stringify(result), websiteName: this.props.websiteName});
    }
  }

  getPixelsInRange = (start, end) => {
    var options = [];
    for (var i = start; i <= end; i++){
      options.push(i + 'px');
    }
    return options;
  }

  updateState = (design, callback) => {
    if (this.state.currentDesignState == 'website')
    {
      this.setState({
        websiteDesign: design,
      }, callback)
    }
    else {
      this.setState({
        repeatingDesign: design,
      }, callback)

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
      var elementThatClicked = newDesign.filter(design =>  design.id == this.state.selectedDivID)[0];
      var newClassName = "col-md-" + event.target.value;
      elementThatClicked.className = newClassName;
      newDesign[newDesign.findIndex(design =>  design.id == this.state.selectedDivID)] = elementThatClicked;
      this.updateState(newDesign, (state) => true);
    }
  }

  changeStyle = (event, styleName, affectsButton, thingToAppend='') =>
  {
    this.setState({
      [styleName]: event.target.value,
    })
    if (this.state.selectedDivID !=null){
      if (!affectsButton){
        var newDesign = this.getDesign();
        var elementThatClicked = newDesign.filter(design =>  design.id == this.state.selectedDivID)[0];
        var newStyle = Object.assign({}, elementThatClicked.style);
        newStyle[styleName] = event.target.value;
        newDesign[newDesign.findIndex(design =>  design.id == this.state.selectedDivID)].style = newStyle;
        this.updateState(newDesign, () => true);
      }
      else{
        var id = this.state.selectedDivID.slice(0);
        var divID = id.slice(0, id.length-3);
        var newDesign = this.getDesign();
        var divThatClicked = newDesign.filter(design =>  design.id == divID)[0];
        var elementThatClicked = divThatClicked.children.filter(child => child.id = id)[0];
        var newStyle = Object.assign({}, elementThatClicked.style);
        newStyle[styleName] = event.target.value;
        newDesign[newDesign.findIndex(design =>  design.id == divID)].children[divThatClicked.children.findIndex(child => child.id == id)].style = newStyle;
        this.updateState(newDesign, () => true);
      }

    }
  }

  onAddNewRow = (newItem) =>
  {
    switch (newItem)
    {
      case 'row':
        var id = this.getId();
        var style = {'contentEditable': 'true', 'overflow':'hidden'}
        this.state.divOptions.forEach((option) =>{
          style[option.cssStyle] = option.default;
        })
        var customElementRepresentation = { style: style, id: id, contentEditable: true, text:"", className: "col-md-12", element: "div", children: [] }
        // var newElement = <div onClick={() => this.onDivClicked(id)} id={id} contentEditable className="col-md-12" style={style}></div>;
        var newDesign = this.getDesign();
        newDesign.push(customElementRepresentation);
        this.updateState(newDesign, () => this.onDivClicked(null, id));

        break;
      case 'repeatingArea':
        var id = this.getId();
        var newElement = <div id={id} className="col-md-12 repeatingArea" style={{'borderColor': 'green', 'borderStyle': 'solid', 'contentEditable': 'true'}}> Repeating Area Bitch</div>;
        var newDesign = this.getDesign();
        newDesign.push(newElement);
        this.updateState(newDesign, () => true);
        break;
      case 'button':

        var id = this.state.selectedDivID.slice()+'but';
        var style = {'overflow':'hidden'}
        this.state.buttonOptions.forEach((option) =>{
          style[option.cssStyle] = option.default;
        });
        var customElementRepresentation = { style: style, id: id, text:"button", className: "btn btn-default", contentEditable:false, element: "button"}
        var newDesign = this.getDesign();
        newDesign[newDesign.findIndex(design =>  design.id == this.state.selectedDivID)].children.push(customElementRepresentation);
        this.updateState(newDesign, () => true);
        break;
    }
  }

  onAddThingAttributeName = (thingAttributeName) =>
  {
    if (this.state.selectedDivID != null){
      console.log(thingAttributeName)
      document.getElementById(this.state.selectedDivID).innerText += '{' + thingAttributeName + '}';
    }
  }

  getDesignBarSelects(options) {
    var selects = [];
    options.forEach((option) => {
      var styleChoices = [];
      option.choices.forEach((choice) => {
        styleChoices.push(<option value = {choice}> {choice} </option>);
      })
      selects.push(<div> {option.title} </div>)
      let affectsButton = false
      if( 'affectsButton' in option){
        affectsButton = option.affectsButton;
      }

      selects.push(<select onChange = {(e) => this.changeStyle(e, option.cssStyle, affectsButton)} value = {this.state[option.cssStyle]}> {styleChoices} </select>);
    })

    return selects;
  }

  render() {
    console.log("yothisadumbbitch")
    var design;
    var websitedesignbuttons = null;
    if (this.state.currentDesignState == 'website')
    {
      console.log("inwebsitedesign")
      design = NewJsxFactory.GetJSX(this.state.websiteDesign, this.onDivClicked, null, null);

      websitedesignbuttons = [<button onClick = {() => this.onAddNewRow('repeatingArea')}> Add New Repeating Unit</button>]
    }
    else {
      console.log(this.state.repeatingDesign)
      design = NewJsxFactory.GetJSX(this.state.repeatingDesign, this.onDivClicked, null, null);
      console.log(design)
      if (this.state.selectedDivID != null && !this.state.selectedDivIsButtonDiv){
        websitedesignbuttons = [<span >Add Thing Attribute:</span>];
        for (let thingattributeid in this.props.thingAttributes){
          websitedesignbuttons.push( <button className="btn btn-secondary" onClick = {() => this.onAddThingAttributeName(this.props.thingAttributes[thingattributeid].name.slice())}> {this.props.thingAttributes[thingattributeid].name.slice()} </button>);
        }
        websitedesignbuttons.push(<button className="btn btn-secondary" onClick = {() => this.onAddNewRow('button')}> Add New Button </button>);
      }
    }

    let selects = [];
    if (this.state.selectedDivID != null){
      var divSizeOptions = [];
      for (var i = 1; i < 13; i ++){
        divSizeOptions.push(<option value ={i}> {i} </option>);
      }

      if (!this.state.selectedDivIsButtonDiv)
      {
        selects = this.getDesignBarSelects(this.state.divOptions);
        selects.push(<div>Width (out of 12)</div>)
        selects.push(<select onChange = {this.changeSize} value = {this.state.size}>{divSizeOptions}</select>);

      }
      else {
        selects = this.getDesignBarSelects(this.state.buttonOptions);
        selects.push(<div> Button Text </div>);
        selects.push(<input type = 'text' value ={this.state.buttonText} onChange = {(e) => this.changeButtonText(e)}></input>)
      }

      selects.push(<div><button className="btn btn-danger" onClick = {this.onDelete}>Delete</button></div>);
    }
    else if (this.state.selectedButtonID != null)
    {
      console.log(this.state.selectedButtonID);
    }

    return (
        <div>
          <div style={{position: 'absolute', width: '200px', top:'0', bottom:'0', paddingTop:'54px', paddingBottom:'54px', right:'0', backgroundColor: 'gray', zIndex: 1, overflowY: 'scroll', overflowX: 'hidden'}}>
            {selects}
          </div>
          <div id="designarea" onClick = {(e) => this.onDivClicked(e, null)} style={{ marginBottom: '40px', marginRight: "210px", padding: "20px", position: 'absolute', top:'50px', bottom:'0', right: '0', left: '200px', overflowY: 'scroll', overflowX: 'hidden'}}>
            <div className="row">
              {design}
            </div>
          </div>
          <div id="bottomarea" style={{position: 'fixed',
          zIndex: '5',
          bottom: '0',
          left: '0',
          width: '100%',
          height: '50px',
          backgroundColor: 'gray',
          borderTop: '3px solid black'}}>
            <button className="btn btn-default" onClick = {() => this.onAddNewRow('row')}> Add New Row</button>
            {websitedesignbuttons}
            <button style={{float: 'right'}} className="btn btn-default" onClick = {this.onSubmit}>Submit</button>
          </div>
        </div>
    );
  }
  }



export default Designer
