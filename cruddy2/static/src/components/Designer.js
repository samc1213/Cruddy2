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
    this.changeColor = this.changeColor.bind(this);
    this.state = { websiteDesign: [], repeatingDesign: [], currentDesignState: 'repeatingunit', selectedDivID: null, size: 12, borderColor: 'None', color: 'Black', backgroundColor: 'None', borderStyle: 'None', borderWidth: '2px'};
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
    newDesign.forEach((design, i) => {
      var newDesignStyle = Object.assign({}, design.props.style)
      newDesignStyle['outlineColor'] = 'None'
      newDesignStyle['outlineStyle'] = 'None'
      newDesign[i] = React.cloneElement(design, {style: newDesignStyle});
    });
    var elementThatClicked = newDesign.filter(design =>  design.props.id == id)[0];
    console.log(elementThatClicked);
    var size = elementThatClicked.props.className.slice(7);
    var borderColor = elementThatClicked.props.style['borderColor'];
    var color = elementThatClicked.props.style['color'];
    var backgroundColor = elementThatClicked.props.style['backgroundColor'];
    var borderStyle = elementThatClicked.props.style['borderStyle'];
    var borderWidth = elementThatClicked.props.style['borderWidth'];
    this.setState({
      selectedDivID: id,
      size: size,
      borderColor: borderColor,
      color: color,
      backgroundColor: backgroundColor,
      borderStyle: borderStyle,
      borderWidth: borderWidth
    });
    var newStyle = Object.assign({}, elementThatClicked.props.style);
    newStyle['outlineColor'] = 'red';
    newStyle['outlineStyle'] = 'dashed';
    newStyle['outlineWidth'] = '2.5px';
    var elementThatClickedCopy = React.cloneElement(elementThatClicked, {style: newStyle});
    newDesign[newDesign.findIndex(design =>  design.props.id == id)] = elementThatClickedCopy;
    this.updateState(newDesign, () => true);
  }

  onSubmit = () => {
    if (this.state.currentDesignState == 'repeatingunit'){
      var repeatingDesignCopy = this.state.repeatingDesign.slice();
      repeatingDesignCopy.forEach((design, i) => {
        var newDesignStyle = Object.assign({}, design.props.style)
        newDesignStyle['outlineColor'] = 'None'
        newDesignStyle['outlineStyle'] = 'None'
        repeatingDesignCopy[i] = React.cloneElement(design, {style: newDesignStyle});
      });
      var repeatingUnitCustom = this.getCustomLayout(repeatingDesignCopy);
      this.setState({
        currentDesignState: 'website',
        repeatingUnitCustomLayout: repeatingUnitCustom
      })
    }
    else{
      var websiteDesignCopy = this.state.websiteDesign.slice();
      websiteDesignCopy.forEach((design, i) => {
        var newDesignStyle = Object.assign({}, design.props.style)
        newDesignStyle['outlineColor'] = 'None'
        newDesignStyle['outlineStyle'] = 'None'
        if (design.props.className.includes('repeatingArea'))
        {
          newDesignStyle['borderStyle'] = 'None'
        }
        websiteDesignCopy[i] = React.cloneElement(design, {style: newDesignStyle});
      });
      var result = {};
      result['websitelayout'] = this.getCustomLayout(websiteDesignCopy);
      result['repeatinglayout'] = this.state.repeatingUnitCustomLayout;
      this.props.submitWebsiteDesign({layout: JSON.stringify(result), websiteName: this.props.websiteName});
    }
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
      var elementThatClicked = newDesign.filter(design =>  design.props.id == this.state.selectedDivID)[0];
      var newClassName = "col-md-" + event.target.value;
      var elementThatClickedCopy = React.cloneElement(elementThatClicked, {className: newClassName});
      newDesign[newDesign.findIndex(design =>  design.props.id == this.state.selectedDivID)] = elementThatClickedCopy;
      this.updateState(newDesign, (state) => true);
    }
  }

  changeColor = (event, styleName, thingToAppend='') =>
  {
    this.setState({
      [styleName]: event.target.value,
    })
    if (this.state.selectedDivID !=null){
      var newDesign = this.getDesign();
      var elementThatClicked = newDesign.filter(design =>  design.props.id == this.state.selectedDivID)[0];
      var newStyle = Object.assign({}, elementThatClicked.props.style);
      newStyle[styleName] = event.target.value;
      var elementThatClickedCopy = React.cloneElement(elementThatClicked, {style: newStyle});
      newDesign[newDesign.findIndex(design =>  design.props.id == this.state.selectedDivID)] = elementThatClickedCopy;
      this.updateState(newDesign, () => true);
    }
  }

  onBtnClick = (newItem) =>
  {
    switch (newItem)
    {
      case 'row':
        var id = this.getId();
        var newElement = <div onClick={() => this.onDivClicked(id)} id={id} contentEditable className="col-md-12" style={{'height': '100px', 'borderStyle': 'None', 'contentEditable': 'true', 'borderColor':'Black', 'color':'Black', 'backgroundColor':'None', 'borderWidth': '2px'}}></div>;
        var newDesign = this.getDesign();
        newDesign.push(newElement);
        this.updateState(newDesign, () => this.onDivClicked(id));

        break;
      case 'repeatingArea':
        var id = this.getId();
        var newElement = <div id={id} className="col-md-12 repeatingArea" style={{'borderColor': 'green', 'borderStyle': 'solid', 'contentEditable': 'true'}}> Repeating Area Bitch</div>;
        var newDesign = this.getDesign();
        newDesign.push(newElement);
        this.updateState(newDesign, () => true);
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
    var selects = [];
    var colors = ['AliceBlue','AntiqueWhite','Aqua','Aquamarine','Azure','Beige','Bisque','Black','BlanchedAlmond','Blue','BlueViolet','Brown','BurlyWood','CadetBlue','Chartreuse','Chocolate','Coral','CornflowerBlue','Cornsilk','Crimson','Cyan','DarkBlue','DarkCyan','DarkGoldenRod'
    ,'DarkGray','DarkGrey','DarkGreen','DarkKhaki','DarkMagenta','DarkOliveGreen','DarkOrange','DarkOrchid','DarkRed','DarkSalmon','DarkSeaGreen','DarkSlateBlue','DarkSlateGray','DarkSlateGrey','DarkTurquoise','DarkViolet','DeepPink','DeepSkyBlue','DimGray','DimGrey','DodgerBlue','FireBrick','FloralWhite','ForestGreen','Fuchsia'
    ,'Gainsboro','GhostWhite','Gold','GoldenRod','Gray','Grey','Green','GreenYellow','HoneyDew','HotPink','IndianRed','Indigo','Ivory','Khaki','Lavender','LavenderBlush','LawnGreen','LemonChiffon','LightBlue','LightCoral',
    'LightCyan','LightGoldenRodYellow','LightGray','LightGrey','LightGreen','LightPink','LightSalmon','LightSeaGreen','LightSkyBlue','LightSlateGray','LightSlateGrey','LightSteelBlue','LightYellow','Lime','LimeGreen','Linen','Magenta','Maroon','MediumAquaMarine','MediumBlue','MediumOrchid','MediumPurple','MediumSeaGreen','MediumSlateBlue','MediumSpringGreen',
    'MediumTurquoise','MediumVioletRed','MidnightBlue','MintCream','MistyRose','Moccasin','NavajoWhite','Navy','OldLace','Olive','OliveDrab','Orange','OrangeRed','Orchid',
    'PaleGoldenRod','PaleGreen','PaleTurquoise','PaleVioletRed','PapayaWhip','PeachPuff','Peru','Pink','Plum','PowderBlue','Purple','RebeccaPurple','Red','RosyBrown','RoyalBlue',
    'SaddleBrown','Salmon','SandyBrown','SeaGreen','SeaShell','Sienna','Silver','SkyBlue','SlateBlue','SlateGray','SlateGrey','Snow','SpringGreen','SteelBlue','Tan','Teal','Thistle',
    'Tomato','Turquoise','Violet','Wheat','White','WhiteSmoke','Yellow','YellowGreen']
    var nonAbledColors = colors.slice();
    var borderStyles = ['None', 'Dotted', 'Dashed', 'Solid', 'Double'];
    nonAbledColors.unshift('None');
    if (this.state.selectedDivID != null){
      var divSizeOptions = [];
      var thicknessOptions = [];
      var colorOptions = [];
      var nonAbledColorOptions = [];
      var borderStyleOptions = [];
      for (var i = 1; i < 13; i ++){
        divSizeOptions.push(<option value ={i}> {i} </option>);
      }
      for (var i =1; i < 20; i++){
        thicknessOptions.push(<option value = {i + 'px'}>{i+'px'} </option>)
      }
      colors.forEach((color) => {
        colorOptions.push(<option value={color}> {color} </option>);
      })
      nonAbledColors.forEach((color) =>{
        nonAbledColorOptions.push(<option value = {color}> {color} </option>);
      })
      borderStyles.forEach((borderStyle) =>{
        borderStyleOptions.push(<option value = {borderStyle}> {borderStyle} </option>);
      })
      selects.push(<div> Border Style </div>)
      selects.push(<select onChange = {(e) => this.changeColor(e, 'borderStyle')} value = {this.state.borderStyle}> {borderStyleOptions} </select>);
      selects.push(<div>Border Color</div>)
      selects.push(<select onChange = {(e) => this.changeColor(e, 'borderColor')} value={this.state.borderColor}>{colorOptions}</select>);
      selects.push(<div> Border Thickness </div>)
      selects.push(<select onChange = {(e) => this.changeColor(e, 'borderWidth')} value = {this.state.borderWidth}> {thicknessOptions}</select>)
      selects.push(<div>Text Color</div>)
      selects.push(<select onChange = {(e) => this.changeColor(e, 'color')} value={this.state.color}>{colorOptions}</select>);
      selects.push(<div>Background Color</div>)
      selects.push(<select onChange = {(e) => this.changeColor(e, 'backgroundColor')} value={this.state.backgroundColor}>{nonAbledColorOptions}</select>);
      selects.push(<div>Width (out of 12)</div>)
      selects.push(<select onChange = {this.changeSize} value = {this.state.size}>{divSizeOptions}</select>);


    }

    return (
        <div>
          <div style={{position: 'absolute', width: '200px', right:'0', height: '100%', backgroundColor: 'gray', zIndex: 3}}>
            {selects}
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
