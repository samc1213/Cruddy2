import React from 'react'

export function GetJSX(jsxDescriptions)
{
  var result = []
	jsxDescriptions.forEach((description) => {
    switch(description.element)
    {
      case 'div':
        result.push(getDiv(description.props, description.text));
    }
  })
  return result;
}

function getDiv(props, text)
{
  var className = null;
  if (props.hasOwnProperty('className'))
  {
    className = props['className']
  }
  var style = null;
  if (props.hasOwnProperty('style'))
  {
    style = props['style']
  }
  return (<div className={className} style={style}>{text}</div>)
}
