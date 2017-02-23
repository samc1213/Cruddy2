import React from 'react'
import ThingAttributeTextDisplayer from './ThingAttributeTextDisplayer'
import ThingAttributeImageDisplayer from './ThingAttributeImageDisplayer'


export function GetThingAttributeDisplayer(value, thingAttributeTypeId)
{
	if (thingAttributeTypeId != 3)
	{
		return (<ThingAttributeTextDisplayer value={value}/>);
	}
	else
	{
		return (<ThingAttributeImageDisplayer value={value}/>);
	}
}