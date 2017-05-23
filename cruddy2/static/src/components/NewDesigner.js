import React from 'react'
import * as ThingAttributeDisplayerFactory from '../ThingAttributeDisplayerFactory'
import ThingAttributeTextDisplayer from '../ThingAttributeTextDisplayer'
import * as NewJsxFactory from './NewJsxFactory'


class Designer extends React.Component {
  constructor(props) {
    super(props);
    this.onAddNewRow = this.onAddNewRow.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.updateDesignState = this.updateDesignState.bind(this);
    this.getAndIncrementId = this.getAndIncrementId.bind(this);
    this.getDesign = this.getDesign.bind(this);
    this.changeSize = this.changeSize.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
    this.getPixelsInRange = this.getPixelsInRange.bind(this);
    this.onAddThingAttributeName = this.onAddThingAttributeName.bind(this);
    this.getDesignBarSelects = this.getDesignBarSelects.bind(this);
    this.changeElementInnerText = this.changeElementInnerText.bind(this);
    this.updateElementInDesign = this.updateElementInDesign.bind(this);
    this.appendChildInDesign = this.appendChildInDesign.bind(this);
    this.wipeSelectionStyle = this.wipeSelectionStyle.bind(this);
    this.getActionSelects = this.getActionSelects.bind(this);
    this.changeAction = this.changeAction.bind(this);
    this.getThingAttributeSelects = this.getThingAttributeSelects.bind(this);
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
      buttonOptions: [{cssStyle: 'color', choices:['Black', 'Blue'], title: 'Color', default: 'Blue'},
    ],
      buttonActions: {'none': 'None', 'incrementBy1': 'Increment Field By 1'},
      textOptions: [{cssStyle: 'color', choices: colors, title: 'Text Color', default: 'Black'},
      {cssStyle: 'fontSize', choices: this.getPixelsInRange(5, 60), title: 'Text Size', default: '15px'},
      {cssStyle: 'fontFamily', choices: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Lucida Sans Unicode', 'Palatino Linotype', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana'], title: 'Text Style', default: 'Arial'},
      {cssStyle: 'fontWeight', choices: ['Normal', 'Bold'], title: 'Text Weight', default: 'normal'},],
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
    selectedAction: 'none', websiteDesign: [], repeatingDesign: [], currentDesignState: 'repeatingunit', selectedElementID: null, elementInnerText:'button', selectedElementType: 'div', size: 12, idCount: 0};

    this.state.divOptions.forEach((option) => {
      this.state[option.cssStyle] = option.default;
    });
  }

  changeElementInnerText = (e) =>{
    if (this.state.selectedElementID != null && (this.state.selectedElementType == 'button' || this.state.selectedElementType == 'text')){
      var updateCallback = (element, parent) =>  {
        element.text = e.target.value;
      }
      this.updateElementInDesign(this.state.selectedElementID, updateCallback);
      this.setState({
        elementInnerText: e.target.value
      })
    }
  }

  onDelete = () => {
    if (this.state.selectedElementID != null)
    {
        var updateCallback = (element, parent) =>{
          if ('children' in parent)
          {
            parent.children.splice(parent.children.indexOf((child) => child.id == element.id), 1);
            this.onElementClicked(null, parent.id, () => true);
          }
          else {
            parent.splice(parent.indexOf((child) => child.id == element.id), 1);
            this.setState({selectedElementID: null});
          }
        };
        this.updateElementInDesign(this.state.selectedElementID, updateCallback);

      }
  }

  appendChildInDesign = (parentId, newChild, selectItem = true) => {
    var design = this.getDesign();
    if (parentId == null){
      design.push(newChild);
    }
    else{
      var updateCallback = (element) => {
        element.children.push(newChild);
      }
      this.wipeSelectionStyle(() =>this.updateElementInDesign(parentId, updateCallback));

    }
    if (selectItem){
      this.updateDesignState(design, () => this.onElementClicked(null, newChild.id, newChild.element));
    }
    else{
      this.updateDesignState(design, () => true);
    }
  }

  wipeSelectionStyle = (callback, onSubmit = false) => {
    var stack = [];
    var design = this.getDesign();
    design.forEach((topLevelElement, index) => {
      var newStyle = Object.assign({}, topLevelElement.style)
      if (onSubmit){
        newStyle['outlineColor'] = 'transparent'
        newStyle['outlineStyle'] = 'None'

      }
      else{
        newStyle['outlineColor'] = 'WhiteSmoke'
        newStyle['outlineStyle'] = 'dashed'

      }
      topLevelElement.style = newStyle;
      stack.push(topLevelElement)
    })
    while (stack.length != 0) {
      var element = stack.pop();
        element.children.forEach((child, index) =>{
        var newStyle = Object.assign({}, child.style)
        if (onSubmit){
          newStyle['outlineColor'] = 'transparent'
          newStyle['outlineStyle'] = 'None'
        }
        else{
          newStyle['outlineColor'] = 'WhiteSmoke'
          newStyle['outlineStyle'] = 'dashed'
        }
        child.style = newStyle;
        stack.push(child);
        });
    }

    this.updateDesignState(design, callback);
  }

  wipeSelectionStyleClear = (callback) => {
    var stack = [];
    var design = this.getDesign();
    design.forEach((topLevelElement, index) => {
      var newStyle = Object.assign({}, topLevelElement.style)
      newStyle['outlineColor'] = 'transparent'
      newStyle['outlineStyle'] = 'None'
      topLevelElement.style = newStyle;
      stack.push(topLevelElement)
    })
    while (stack.length != 0) {
      var element = stack.pop();
        element.children.forEach((child, index) =>{
        var newStyle = Object.assign({}, child.style)
        newStyle['outlineColor'] = 'transparent'
        newStyle['outlineStyle'] = 'None'
        child.style = newStyle;
        stack.push(child);
        });
    }

    this.updateDesignState(design, callback);
  }

  updateElementInDesign = (id, elementUpdateCallback) => {
   var stack = [];
   var design = this.getDesign();
   design.forEach((topLevelElement, index) => {
     stack.push({element: topLevelElement, index: index, parentIndexTracker: [index], parent: design})
   });
   while (stack.length != 0) {
     var elementIndex = stack.pop();
     if (elementIndex.element.id != id) {
       elementIndex.element.children.forEach((child, index) =>{
         var currentParentIndexTracker = elementIndex.parentIndexTracker.slice();
         currentParentIndexTracker.push(index);
         stack.push({element: child, index: index, parentIndexTracker: currentParentIndexTracker, parent: elementIndex.element})
       })
     }
     else {
       var pathToElement = elementIndex.parentIndexTracker.slice();
       var index = pathToElement.shift();
       var element = design[index];
       while (pathToElement.length > 0) {
         index = pathToElement.shift();
         element = element.children[index];
       }
       elementUpdateCallback(element, elementIndex.parent);
       this.updateDesignState(design, () => true);
       return true;
     }
   }
    return false;
  }

  onElementClicked = (e, id, elementType = 'div') => {
    if (e != null)
    {
      e.stopPropagation();
    }

    var newDesign = this.getDesign();
    if (id == null)
    {
      this.setState({
        selectedElementID: id,
        selectedElementType: elementType,
        size: 12,
      });
      this.wipeSelectionStyle(()=> true);
      return;
    }
    let elementInnerText = '';
    var updateCallback = (element, parent) => {
      switch (element.element) {
        case 'div':
          this.state.divOptions.forEach((option) => {
            var style = element.style[option.cssStyle];
            this.setState({[option.cssStyle]: style});
          })
        break;
        case 'button':
          this.state.buttonOptions.forEach((option) =>{
            var style = element.style[option.cssStyle];
            this.setState({[option.cssStyle]: style})
          })
        break;
        case 'text':
          this.state.textOptions.forEach((option) =>{
            var style = element.style[option.cssStyle];
            this.setState({[option.cssStyle]: style})
          })
        break;
      }
      var newStyle = Object.assign({}, element.style);
      newStyle['outlineColor'] = 'red';
      newStyle['outlineStyle'] = 'dashed';
      newStyle['outlineWidth'] = '2.5px';
      element.style = newStyle;
      var size = element.className.slice(7);
      this.setState({
        selectedElementID: element.id,
        selectedElementType: element.element,
        elementInnerText: element.text,
        size: size,
      });

    }
    this.wipeSelectionStyle(() => this.updateElementInDesign(id, updateCallback, false));
    if (e == null && elementType == 'div'){
      $('#designarea').scrollTop($('#designarea')[0].scrollHeight);
    }
  }

  onSubmit = () => {
    if (this.state.currentDesignState == 'repeatingunit'){
      var callback = () =>{
        this.setState({
          currentDesignState: 'website',
          repeatingUnitCustomLayout: this.getDesign(),
          selectedElementID: null
        })
      }
      this.wipeSelectionStyle(callback, true);
    }
    else{
      var callback = () =>{
        var websiteDesignCopy = this.state.websiteDesign.slice();
        var result = {};
        result['websitelayout'] = websiteDesignCopy;
        result['repeatinglayout'] = this.state.repeatingUnitCustomLayout;
        this.props.submitWebsiteDesign({layout: JSON.stringify(result), websiteName: this.props.websiteName});
      }
      this.wipeSelectionStyle(callback, true);
    }
  }

  getPixelsInRange = (start, end) => {
    var options = [];
    for (var i = start; i <= end; i++){
      options.push(i + 'px');
    }
    return options;
  }

  updateDesignState = (design, callback) => {
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

  getAndIncrementId = (callback) => {
    var idString = this.state.currentDesignState.slice() + this.state.idCount;
    this.setState({idCount: this.state.idCount+ 1}, callback(idString))
  }

  getDesign = () => {
    if(this.state.currentDesignState == 'website')
    {
      return this.state.websiteDesign.map(d => Object.assign({}, d));
    }
    else{
      return this.state.repeatingDesign.map(d => Object.assign({}, d));
    }
  }

  changeSize = (event) =>
  {
    this.setState({
      size: event.target.value,
    })
    if (this.state.selectedElementID != null)
    {
      var updateCallback = (element, parent) => {
        var newClassName = "col-md-" + event.target.value;
        element.className = newClassName;
      }
      this.updateElementInDesign(this.state.selectedElementID, updateCallback);
    }
  }

  changeStyle = (event, styleName, thingToAppend='') =>
  {
    this.setState({
      [styleName]: event.target.value,
    })
    if (this.state.selectedElementID !=null){
      var updateCallback = (element, parent) => {
        var newStyle = Object.assign({}, element.style);
        newStyle[styleName] = event.target.value;
        element.style = newStyle;
      }
      this.updateElementInDesign(this.state.selectedElementID, updateCallback);
    }
  }

  onAddNewRow = (newItem) =>
  {
    this.setState({
      selectedElementType: newItem,
    })
    switch (newItem)
    {
      case 'div':
        this.getAndIncrementId((id) => {
          var style = { 'overflow':'hidden'}
          this.state.divOptions.forEach((option) =>{
            style[option.cssStyle] = option.default;
          })
          var customElementRepresentation = { style: style, id: id, text:"", className: "col-md-12", element: "div", children: [] }
          // var newElement = <div onClick={() => this.onElementClicked(id)} id={id} contentEditable className="col-md-12" style={style}></div>;
          this.appendChildInDesign(this.state.selectedElementID, customElementRepresentation)
        });
        break;
      case 'repeatingArea':
        this.getAndIncrementId((id) => {
          var style = {'borderColor': 'green', 'borderStyle': 'solid'}
          var customElementRepresentation = {style: style, id: id, text:"repeatingArea", className:"repeatingArea col-md-12", element:"repeatingArea", children:[]}
          var newDesign = this.getDesign();
          this.appendChildInDesign(this.state.selectedElementID, customElementRepresentation, false)
        });
        break;
      case 'button':
        this.getAndIncrementId((id) => {
          var style = {'overflow':'hidden'}
          this.state.buttonOptions.forEach((option) =>{
            style[option.cssStyle] = option.default;
          });
          var customElementRepresentation = { style: style, id: id, text:'button', className: "btn btn-default", element: "button", children:[], actionInfo: {type: 'None', affectedThingAttributeId: 'None'}};
          this.appendChildInDesign(this.state.selectedElementID, customElementRepresentation);
        });
        break;
      case 'text':
      this.getAndIncrementId((id) => {
        var style = {'overflow':'hidden'}
        this.state.textOptions.forEach((option) =>{
          style[option.cssStyle] = option.default;
        });
        var customElementRepresentation = { style: style, id: id, text:'text', className: '', element: "text", children: []}
        this.appendChildInDesign(this.state.selectedElementID, customElementRepresentation);
      });
      break;
    }
  }

  onAddThingAttributeName = (thingAttributeName) =>
  {
    if (this.state.selectedElementID != null && (this.state.selectedElementType == 'text' || this.state.selectedElementType == 'button')){
      var updateCallback = (element, parent) =>  {
        var newText = element.text.slice(0);
        newText = newText + '{'+ thingAttributeName+'}';
        element.text = newText;
        this.setState({
          elementInnerText: newText,
        });

      }
      this.updateElementInDesign(this.state.selectedElementID, updateCallback);
    }

  }

  getDesignBarSelects = (options) => {
    var selects = [];
    options.forEach((option) => {
      var styleChoices = [];
      option.choices.forEach((choice) => {
        styleChoices.push(<option value = {choice}> {choice} </option>);
      })
      selects.push(<div> {option.title} </div>)

      selects.push(<select onChange = {(e) => this.changeStyle(e, option.cssStyle)} value = {this.state[option.cssStyle]}> {styleChoices} </select>);
    })

    return selects;
  }

  changeAction = (event) => {
    var updateCallback = (button) => {
        button.actionInfo.type = event.target.value;
        this.setState({selectedAction: event.target.value});
    }
    this.updateElementInDesign(this.state.selectedElementID, updateCallback);
  }

  changeAffectedThingAttribute = (event) => {
    var updateCallback = (button) => {
      button.actionInfo.affectedThingAttributeId = event.target.value;
      this.setState({selectedAffectedThingAttributeId: event.target.value});
    }

    this.updateElementInDesign(this.state.selectedElementID, updateCallback);
  }

  getThingAttributeSelects = (thingAttributes) => {
    var choices = [];
    console.log("SELECTS")
    console.log(thingAttributes);
    for (let thingAttributeId in thingAttributes) {
      choices.push(<option value = {thingAttributeId}> {thingAttributes[thingAttributeId].name} </option>);
    }

    return (<select onChange = {(e) => this.changeAffectedThingAttribute(e)} value = {this.state.selectedAffectedThingAttributeId}> {choices} </select>);
  }

  getActionSelects = (actions) => {
    var choices = [];
    Object.keys(actions).forEach((type) => {
        choices.push(<option value = {type}> {this.state.buttonActions[type]} </option>);
    })

    return (<select onChange = {(e) => this.changeAction(e)} value = {this.state.selectedAction}> {choices} </select>);
  }

  render() {
    var design;
    var websitedesignbuttons = [];
    if (this.state.currentDesignState == 'website')
    {
      design = NewJsxFactory.GetJSX(this.state.websiteDesign, this.onElementClicked, null, null);
      console.log(design);
      if (this.state.selectedElementID !=null){
        switch (this.state.selectedElementType) {
          case 'div':
            websitedesignbuttons.push(<button className="btn btn-secondary" onClick = {() => this.onAddNewRow('text')}> Add New Text </button>);
            websitedesignbuttons.push(<button className="btn btn-default" onClick = {() => this.onAddNewRow('div')}> Add New Row</button>);
            websitedesignbuttons.push(<button onClick = {() => this.onAddNewRow('repeatingArea')}> Add New Repeating Unit</button>);
            break;
        }
      }
      else{
        websitedesignbuttons.push(<button className="btn btn-default" onClick = {() => this.onAddNewRow('div')}> Add New Row</button>);
        websitedesignbuttons.push(<button onClick = {() => this.onAddNewRow('repeatingArea')}> Add New Repeating Unit</button>);
      }
    }
    else {
      design = NewJsxFactory.GetJSX(this.state.repeatingDesign, this.onElementClicked, null, null);
      if (this.state.selectedElementID != null){
        switch (this.state.selectedElementType) {
          case 'text':
            websitedesignbuttons.push(<span >Add Thing Attribute:</span>);
            for (let thingattributeid in this.props.thingAttributes){
              websitedesignbuttons.push( <button className="btn btn-secondary" onClick = {() => this.onAddThingAttributeName(this.props.thingAttributes[thingattributeid].name.slice())}> {this.props.thingAttributes[thingattributeid].name.slice()} </button>);
            }
            break;
          case 'button':
            websitedesignbuttons.push(<span >Add Thing Attribute:</span>);
            for (let thingattributeid in this.props.thingAttributes){
              websitedesignbuttons.push( <button className="btn btn-secondary" onClick = {() => this.onAddThingAttributeName(this.props.thingAttributes[thingattributeid].name.slice())}> {this.props.thingAttributes[thingattributeid].name.slice()} </button>);
            }
            break;
          case 'div':
            websitedesignbuttons.push(<button className="btn btn-default" onClick = {() => this.onAddNewRow('div')}> Add New Row</button>);
            websitedesignbuttons.push(<button className="btn btn-secondary" onClick = {() => this.onAddNewRow('button')}> Add New Button </button>);
            websitedesignbuttons.push(<button className="btn btn-secondary" onClick = {() => this.onAddNewRow('text')}> Add New Text </button>);
            break;
        }
      }
      else {
        websitedesignbuttons.push(<button className="btn btn-default" onClick = {() => this.onAddNewRow('div')}> Add New Row</button>);
      }

    }

    let selects = [];
    if (this.state.selectedElementID != null){
      var divSizeOptions = [];
      for (var i = 1; i < 13; i ++){
        divSizeOptions.push(<option value ={i}> {i} </option>);
      }
      switch (this.state.selectedElementType) {
        case 'div':
          selects = this.getDesignBarSelects(this.state.divOptions);
          selects.push(<div>Width (out of 12)</div>)
          selects.push(<select onChange = {this.changeSize} value = {this.state.size}>{divSizeOptions}</select>);
          break;
        case 'button':
          selects = this.getDesignBarSelects(this.state.buttonOptions);
          selects.push(<div> Button Text </div>);
          selects.push(<input type = 'text' value ={this.state.elementInnerText} onChange = {(e) => this.changeElementInnerText(e)}></input>)
          selects.push(<div> Button Action </div>);
          selects.push(this.getActionSelects(this.state.buttonActions))
          selects.push(<div> Affected ThingAttribute </div>);
          selects.push(this.getThingAttributeSelects(this.props.thingAttributes))
          break;
        case 'text':
          selects = this.getDesignBarSelects(this.state.textOptions);
          selects.push(<div> Text Field </div>);
          selects.push(<input type = 'text' value ={this.state.elementInnerText} onChange = {(e) => this.changeElementInnerText(e)}></input>)
          break;
        default:
      }
      selects.push(<div><button className="btn btn-danger" onClick = {this.onDelete}>Delete</button></div>);
    }

    return (
        <div>
          <div style={{position: 'absolute', width: '200px', top:'0', bottom:'0', paddingTop:'54px', paddingBottom:'54px', right:'0', backgroundColor: 'gray', zIndex: 1, overflowY: 'scroll', overflowX: 'hidden'}}>
            {selects}
          </div>
          <div id="designarea" onClick = {(e) => this.onElementClicked(e, null)} style={{ marginBottom: '40px', marginRight: "210px", padding: "20px", position: 'absolute', top:'50px', bottom:'0', right: '0', left: '200px', overflowY: 'scroll', overflowX: 'hidden'}}>
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
            {websitedesignbuttons}
            <button style={{float: 'right'}} className="btn btn-default" onClick = {this.onSubmit}>Submit</button>
          </div>
        </div>
    );
  }
  }



export default Designer
