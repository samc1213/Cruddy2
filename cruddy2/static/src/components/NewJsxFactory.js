import React from 'react'

export function GetJSX(websitelayout, onDivClicked, repeatinglayout, thinginstances)
{
  var result = []
  websitelayout.forEach((description) => {
    var newElement = getElement(result, onDivClicked, description.id, description.className, description.element, description.contentEditable, description.style,  description.text, description.children, repeatinglayout, thinginstances, null);
    result = result.slice().concat(newElement);
  })
  return result;
}

function getElement(result, onDivClicked, id, className, element, contentEditable, style, text, children, repeatinglayout, thinginstances, thingInstance)
{
  switch(element)
  {
    case 'div':
      console.log("indiv")
      return getDiv(id, onDivClicked, className, contentEditable, style, text, children, repeatinglayout, thinginstances, thingInstance);
    case 'button':
      console.log("inbutton")
      return getButton(false, id, onDivClicked, className, style, text);
  }
}

function getButton(contentEditable, id, onDivClicked, className, style, text){
  return(<button id ={id} className ={className} contentEditable={contentEditable} onClick = {(e) => onDivClicked(e, id, true)} style={style}>{text}</button>)

}

function getDiv(id, onDivClicked, className, contentEditable, style, text, children, repeatinglayout, thinginstances, thingInstance)
{
  if (className != null)
  {
    if (className.includes('repeatingArea') && repeatinglayout != null && thinginstances != null) {
      var repLayout = getRepeatingLayout(repeatinglayout, thinginstances);
    }
  }
  var replacedString = text.slice(0);
  var childrenElements = [];
  if (children != null && children.length >0){
    children.forEach((child) => {
      var newChildElement = getElement(null, onDivClicked, child.id, child.className, child.element, null, child.style, child.text, child.children, null, null, null);
      childrenElements.push(newChildElement);
    })
  }
  if (repeatinglayout == null && thinginstances == null && thingInstance != null)
  {
        var thingAttributeNames = Object.keys(thingInstance)
        thingAttributeNames.forEach((thingAttributeName) => {
            var thingAttributeValue = thingInstance[thingAttributeName].value;
            var magicBracketString = '{' + thingAttributeName + '}';
            replacedString = replacedString.replace(new RegExp(magicBracketString, 'g'), thingAttributeValue);
          })
  }
  var finalstring = []
  if (replacedString !=''){
    replacedString.split('\n').map((item, key) =>{
      finalstring.push(<span key={key}>{item}<br/></span>);
    })
  }
  if (repLayout == null)
  {
    if (!contentEditable){
      console.log(contentEditable)
      return (<div className={className} style={style}>{finalstring}</div>)
    }
    else{
      console.log("dn1")
      return (<div className={className} id={id} contentEditable onClick = {(e) => onDivClicked(e, id)} style={style}>{finalstring}{childrenElements}</div>)

    }
  }
  else {
     return (<div className={className} style={style}>{repLayout}</div>)
  }
}


function getRepeatingLayout(repeatinglayout, thinginstances)
{
  var result = [];
  for (var index in thinginstances)
  {
      var thingInstance = thinginstances[index];
      repeatinglayout.forEach((description) => {
      var newElement = getElement(result, description.element, description.props, description.text, null, null, thingInstance);
      result = result.slice().concat(newElement);
    })
  }
  return result;
}

// if (this.props.layout.data.repeatinglayout != null && this.props.thingInstances != null )
// {
//   for (var index in this.props.thingInstances)
//   {
//     var thingInstance = this.props.thingInstances[index];
//     console.log(thingInstance);
//     var newLayoutDataInfo = []
//     var thingAttributeNames = Object.keys(thingInstance)
//
//     for (var i = 0; i < this.props.layout.data.repeatinglayout.length; i++)
//     {
//       var layoutString = this.props.layout.data.repeatinglayout[i].slice(0);
//       var replacedString = layoutString;
//       thingAttributeNames.forEach((thingAttributeName) => {
//         var thingAttributeValue = thingInstance[thingAttributeName].value;
//         var magicBracketString = '{' + thingAttributeName + '}';
//         console.log(magicBracketString)
//         replacedString = replacedString.replace(new RegExp(magicBracketString, 'g'), thingAttributeValue);
//       })
//
//       newLayoutDataInfo.push(replacedString)
//     }
//     cards.push(
//       <div className="col-md-6" key={index}>
//         <div className="col-md-2" />
//         <div className="col-md-8">
//           <CustomCard
//           cardLayout={newLayoutDataInfo} />
//         </div>
//         <div className="col-md-2" />
//       </div>
//     )
// }
//
// }
