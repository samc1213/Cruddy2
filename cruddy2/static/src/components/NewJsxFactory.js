import React from 'react'

export function GetJSX(websitelayout, onDivClicked, repeatinglayout, thinginstances)
{
  var result = []
  websitelayout.forEach((description) => {

    var newElement = getElement(onDivClicked, description.id, description.className, description.element, description.style,  description.text, description.children, repeatinglayout, thinginstances, null);
    result = result.slice().concat(newElement);
  })
  return result;
}

function convertString(text, thingInstance){
  var replacedString = text.slice(0)
  var thingAttributeNames = Object.keys(thingInstance)
  console.log("yello");
  thingAttributeNames.forEach((thingAttributeName) => {
      var thingAttributeValue = thingInstance[thingAttributeName].value;
      var magicBracketString = '{' + thingAttributeName + '}';
      replacedString = replacedString.replace(new RegExp(magicBracketString, 'g'), thingAttributeValue);
    })
  return replacedString;

}

function getElement(onDivClicked, id, className, element, style, text, children, repeatinglayout, thinginstances, thingInstance)
{
  switch(element)
  {
    case 'div':
      console.log("indiv")
      return getDiv(id, onDivClicked, className, style, text, children, repeatinglayout, thinginstances, thingInstance);
    case 'repeatingArea':
      console.log("inRepeatingArea")
      return getDiv(id, onDivClicked, className, style, text, children, repeatinglayout, thinginstances, thingInstance);
    case 'button':
      console.log("inbutton")
      return getButton(id, onDivClicked, className, style, text, thingInstance);
    case 'text':
      return getSpan(id, onDivClicked, style, text, thingInstance)
  }
}

function getButton(id, onDivClicked, className, style, text, thingInstance){
  var replacedString = text.slice(0);
  console.log(thingInstance);
  console.log("please");
  if (thingInstance != null)
  {
    console.log("hey");
    replacedString = convertString(replacedString, thingInstance);
  }

  console.log("BUTTONTEXT" + text)
  return(<button id ={id} className ={className} onClick = {(e) => onDivClicked(e, id, true)} style={style}>{replacedString}</button>)

}

function getSpan(id, onDivClicked, style, text, thingInstance){
  var replacedString = text.slice(0)
  if (thingInstance != null)
  {
    replacedString = convertString(replacedString, thingInstance);
  }

  return(<span id = {id} onClick = {(e) => onDivClicked(e, id, true)} style={style}> {replacedString} </span>)
}

function getDiv(id, onDivClicked, className, style, text, children, repeatinglayout, thinginstances, thingInstance)
{
  if (className != null)
  {
    if (className.includes('repeatingArea')){
      if (repeatinglayout != null && thinginstances != null) {
        console.log("inheredoh");
        var repLayout = getRepeatingLayout(repeatinglayout, thinginstances);
      }
      else{
        return (<div className={className} id={id} style={style}>{text}</div>)
      }
    }
    var replacedString = text.slice(0);
    var childrenElements = [];
    if (children != null && children.length >0){
      children.forEach((child) => {
        var newChildElement = getElement(onDivClicked, child.id, child.className, child.element, child.style, child.text, child.children, repeatinglayout, thinginstances, thingInstance);
        childrenElements.push(newChildElement);
      })
    }

    if (repLayout == null)
    {
        return (<div className={className} id={id} onClick = {(e) => onDivClicked(e, id)} style={style}>{childrenElements}</div>)

    }
    else {
       return (<div className={className}>{repLayout}</div>)
    }

  }
}


function getRepeatingLayout(repeatinglayout, thinginstances)
{
  var result = [];
  for (var index in thinginstances)
  {
    console.log("SAMYOUFUCKER")
      var thingInstance = thinginstances[index];
      repeatinglayout.forEach((description) => {
        var newElement = getElement(null, description.id, description.className, description.element, description.style, description.text, description.children, null, null, thingInstance);
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
