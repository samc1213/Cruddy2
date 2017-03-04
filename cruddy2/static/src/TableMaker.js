import React from 'react'
import ReactTable from 'react-table'
// ES5

export function GetTable(thingInstances)
{
  console.log(thingInstances);
  let columns = [];
  // for (var i = 0; i < thingInstances[0].keys; i++){
  //   columns.push({header: capitalizeFirstLetter(thingInstances[0].keys[i]), accessor: lowerCaseWords(thingInstances[0].keys[i])});
  // }
  for (var thingAttributeName in thingInstances[0]){
     columns.push({header: thingAttributeName, accessor: thingAttributeName});
  }
  let data = [];

  for (var i in thingInstances)
  {
    var thingInstance = thingInstances[i];
    var thingInstanceRow = {}
    for (var thingAttributeName in thingInstance) {
      thingInstanceRow[[thingAttributeName]] = thingInstance[thingAttributeName].value;
    }
    data.push(thingInstanceRow)
  }

  console.log("printthattablemaker")
  console.log(data);
  console.log(columns);
  return (<ReactTable data={data} columns={columns} />);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerCaseWords(string){
  return string.toLowerCase();
}
