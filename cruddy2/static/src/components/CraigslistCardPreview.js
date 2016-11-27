import React, { PropTypes } from 'react'


const CraigslistCardPreview = ({ thingAttributes }) => {
  var rows = []
  var file;

  if (thingAttributes != null) {
    rows = thingAttributes.map((thingAttribute, index) =>
    <li className="list-group-item" key={index}><b>{thingAttribute.thingattributename}</b>: {thingAttribute.thingattributeexample}</li>
    )
  }

  for (var i = 0; i < thingAttributes.length; i++)
  {
    console.log(i);
    if(thingAttributes[i].thingattributeexamplefile != null && thingAttributes[i].thingattributeexamplefile[0] != null)
    {
      var reader = new FileReader();
      var preview = document.querySelector('img');
      reader.readAsDataURL(thingAttributes[i].thingattributeexamplefile[0]);
      reader.addEventListener("load", function () {
        preview.src = reader.result;
      }, false);
    }
  }

  return (
    <div className="card">
      <div className="card-block">
        <img className="card-img-top" src="/exampleimage" alt="Card image cap" style={{maxWidth: "100%"}}/>
        <ul className="list-group list-group-flush">
          {rows}
        </ul>
      </div>
    </div>
  )
}

export default CraigslistCardPreview
