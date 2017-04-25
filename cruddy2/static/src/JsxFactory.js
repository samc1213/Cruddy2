import React from 'react'

export function GetJSX(websitelayout, repeatinglayout, thinginstances)
{
  console.log("BEGINNING OF JSX BITCH")
  console.log(websitelayout);
  console.log(repeatinglayout);
  var result = []
	websitelayout.forEach((description) => {
    var newElement = getElement(result, description.element, description.props, description.text, repeatinglayout, thinginstances);
    result = result.slice().concat(newElement);
  })
  return result;
}

function getElement(result, element, props, text, repeatinglayout, thinginstances)
{
  switch(element)
  {
    case 'div':
      return getDiv(props, text, repeatinglayout, thinginstances);
  }
}

function getDiv(props, text, repeatinglayout, thinginstances)
{
  var className = null;
  if (props.hasOwnProperty('className'))
  {
    className = props['className']
    if (className.includes('repeatingArea') && repeatinglayout != null && thinginstances != null) {
      return getRepeatingLayout(repeatinglayout, thinginstances);
    }
  }
  var style = null;
  if (props.hasOwnProperty('style'))
  {
    style = props['style']
  }

  return (<div className={className} style={style}>{text}</div>)
}

function getRepeatingLayout(repeatinglayout, thinginstances)
{
  var result = [];
  repeatinglayout.forEach((description) => {
    console.log(description)

    var newElement = getElement(result, description.element, description.props, description.text, null, null);
    console.log(newElement)
    result = result.slice().concat(newElement);
  })
  return result;
}
