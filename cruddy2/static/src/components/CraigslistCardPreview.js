import React, { PropTypes } from 'react'


const CraigslistCardPreview = ({ thingAttributeNames, thingAttributeExamples, thingAttributeTypeIds, isPreview }) => {
  var rows = [];
  var file;
  var imgStyle = {maxWidth: "100%", display:"none"};
  var weHaveAnImg = false;
  var src="/images/car.jpg";

  for (var i = 0; i < thingAttributeNames.length; i++)
  {
    if (thingAttributeTypeIds[i] != "3")
    {
      rows.push(<li className="list-group-item" key={i}><b>{thingAttributeNames[i]}</b>: {thingAttributeExamples[i]}</li>);
    }
    else
    {
      imgStyle.display = "inline-block";


      if (thingAttributeExamples[i] != null && thingAttributeExamples[i][0] && isPreview == true)
      //this is preview
      {
        var reader = new FileReader();
        var preview = document.querySelector('img');
        reader.readAsDataURL(thingAttributeExamples[i][0]);
        reader.addEventListener("load", function () {
          preview.src = reader.result;
        }, false);
      }

      if (thingAttributeExamples[i][0] && isPreview == false)
      //this is from the DB
      {
        var preview = document.querySelector('img');
        src = "data:image/png;base64," + thingAttributeExamples[i][0];
      }
    }
  }

  return (
    <div className="card" style={{textAlign:'left'}} >
      <div className="card-block">
        <img className="card-img-top" src={src} alt="Card image cap" style={imgStyle}/>
        <ul className="list-group list-group-flush">
          {rows}
        </ul>
      </div>
    </div>
  )
}

export default CraigslistCardPreview
