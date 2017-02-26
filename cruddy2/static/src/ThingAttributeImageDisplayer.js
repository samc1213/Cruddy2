import React from 'react'

class ThingAttributeImageDisplayer extends React.Component {

  render() {
    var imgStyle = {maxWidth: "100%"};
    if (typeof this.props.value == "string")
    {
      var src = "data:image/png;base64," + this.props.value;
      return (<img className="card-img-top" src={src} alt="Image" style={imgStyle} />);
    }
    else if (this.props.value instanceof FileList && this.props.value[0] instanceof Blob)
    {
        var reader = new FileReader();
        var preview = document.querySelector('img');
        var id = (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        reader.addEventListener("load", function () {
          preview.src = reader.result;
        }, false);
        reader.readAsDataURL(this.props.value[0]);
        // var preview = document.querySelector('#' + id);

        return (<img className="card-img-top" id={id} alt="Image" style={imgStyle} />);
    }
    else {
      return (<img className="card-img-top" alt="Failure" style={imgStyle} />)
    }
  }
}

export default ThingAttributeImageDisplayer
