import React from 'react'

export function GetJSX(websitelayout, repeatinglayout, thinginstances)
{
  var result = []
	websitelayout.forEach((description) => {
    var newElement = getElement(result, description.element, description.props, description.text, repeatinglayout, thinginstances, null);
    result = result.slice().concat(newElement);
  })
  return result;
}

function getElement(result, element, props, text, repeatinglayout, thinginstances, thingInstance)
{
  switch(element)
  {
    case 'div':
      return getDiv(props, text, repeatinglayout, thinginstances, thingInstance);
  }
}

function getDiv(props, text, repeatinglayout, thinginstances, thingInstance)
{
  var className = null;
  if (props.hasOwnProperty('className'))
  {
    className = props['className']
    if (className.includes('repeatingArea') && repeatinglayout != null && thinginstances != null) {
      var repLayout = getRepeatingLayout(repeatinglayout, thinginstances);
    }
  }
  var style = null;
  if (props.hasOwnProperty('style'))
  {
    style = props['style']
  }
  var replacedString = text.slice(0);
  if (repeatinglayout == null && thinginstances == null)
  {
        var thingAttributeNames = Object.keys(thingInstance)
        thingAttributeNames.forEach((thingAttributeName) => {
            var thingAttributeValue = thingInstance[thingAttributeName].value;
            var magicBracketString = '{' + thingAttributeName + '}';
            replacedString = replacedString.replace(new RegExp(magicBracketString, 'g'), thingAttributeValue);
          })
  }
  var finalstring = []
  replacedString.split('\n').map((item, key) =>{
    finalstring.push(<span key={key}>{item}<br/></span>);
  })



  if (repLayout == null)
  {
    return (<div className={className} style={style}>{finalstring}</div>)
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
