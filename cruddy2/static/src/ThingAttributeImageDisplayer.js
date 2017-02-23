import React from 'react'

class ThingAttributeImageDisplayer extends React.Component {

  render() {
	var imgStyle = {maxWidth: "100%"};
  	var src = "data:image/png;base64," + this.props.value;
    return (<img className="card-img-top" src={src} alt="Card image cap" style={imgStyle} />);
  }
}

export default ThingAttributeImageDisplayer
