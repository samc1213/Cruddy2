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
    this.getPixelsInRange = this.getPixelsInRange.bind(this);
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

    this.state = { options: [{cssStyle: 'borderStyle', choices: ['None', 'Dotted', 'Dashed', 'Solid', 'Double'], title: 'Border Style', default: 'None'},
     {cssStyle: 'borderColor', choices: colors, title: 'Border Color', default: 'Black'},
     {cssStyle: 'borderWidth', choices: this.getPixelsInRange(1, 20), title: 'Border Thickness', default: '2px'},
     {cssStyle: 'borderRadius', choices: this.getPixelsInRange(0, 200), title: 'Border Radius', default: '0px'},
     {cssStyle: 'color', choices: colors, title: 'Text Color', default: 'Black'},
     {cssStyle: 'fontSize', choices: this.getPixelsInRange(5, 60), title: 'Text Size', default: '15px'},
     {cssStyle: 'textAlign', choices: ['Left', 'Right', 'Center'], title: 'Text Alignment', default: 'Left'},
     {cssStyle: 'fontFamily', choices: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Lucida Sans Unicode', 'Palatino Linotype', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana'], title: 'Font Style', default: 'Arial'},
     {cssStyle: 'fontWeight', choices: ['Normal', 'Bold'], title: 'Text Weight', default: 'normal'},
     {cssStyle: 'backgroundColor', choices: nonAbledColors, title: 'Background Color', default: 'None'}],
    websiteDesign: [], repeatingDesign: [], currentDesignState: 'repeatingunit', selectedDivID: null, size: 12,
    borderColor: 'None', color: 'Black', backgroundColor: 'None', borderWidth: '2px'};

    this.state.options.forEach((option) => {
      this.state[option.cssStyle] = option.default;
    });
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
    this.state.options.forEach((option) => {
      var style = elementThatClicked.props.style[option.cssStyle];
      this.setState({[option.cssStyle]: style});
    })
    var borderWidth = elementThatClicked.props.style['borderWidth'];
    this.setState({
      selectedDivID: id,
      size: size,
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

  getPixelsInRange = (start, end) => {
    var options = [];
    for (var i = start; i < end; i++){
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
        var cssStyle = this.state.options[0].cssStyle;
        var style = {'height': '100px', 'contentEditable': 'true'}
        this.state.options.forEach((option) =>{
          style[option.cssStyle] = option.default;
        })
        var newElement = <div onClick={() => this.onDivClicked(id)} id={id} contentEditable className="col-md-12" style={style}></div>;
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

    if (this.state.selectedDivID != null){
      this.state.options.forEach((option) => {
        var styleChoices = [];
        option.choices.forEach((choice) => {
          styleChoices.push(<option value = {choice}> {choice} </option>);
        })
        selects.push(<div> {option.title} </div>)
        selects.push(<select onChange = {(e) => this.changeColor(e, option.cssStyle)} value = {this.state[option.cssStyle]}> {styleChoices} </select>);
      })
      var divSizeOptions = [];
      for (var i = 1; i < 13; i ++){
        divSizeOptions.push(<option value ={i}> {i} </option>);
      }
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
