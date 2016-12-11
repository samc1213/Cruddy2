import React, { PropTypes } from 'react'


const CraigslistCardPreview = ({ thingAttributeNames, thingAttributeExamples, thingAttributeTypeIds }) => {
	var rows = [];
  var file;
  var imgStyle = {maxWidth: "100%", display:"none"};
  var weHaveAnImg = false;
  
  console.log(thingAttributeExamples);
  console.log('examples');

  for (var i = 0; i < thingAttributeNames.length; i++)
  {
	  if (thingAttributeTypeIds[i] != "3")
	  {
		  rows.push(<li className="list-group-item" key={i}><b>{thingAttributeNames[i]}</b>: {thingAttributeExamples[i]}</li>);
	  }
    else
    {
      imgStyle.display = "inline-block";
      if (thingAttributeExamples[i][0])
      {
        var reader = new FileReader();
        var preview = document.querySelector('img');
        reader.readAsDataURL(thingAttributeExamples[i][0]);
        reader.addEventListener("load", function () {
          preview.src = reader.result;
        }, false);
      }
    }
  }

  return (
    <div className="card">
      <div className="card-block">
        <img className="card-img-top" src="/exampleimage" alt="Card image cap" style={imgStyle}/>
        <ul className="list-group list-group-flush">
          {rows}
        </ul>
      </div>
    </div>
  )
}

export default CraigslistCardPreview
