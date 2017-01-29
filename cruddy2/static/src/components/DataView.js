import React, { PropTypes } from 'react'

class DataView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {websiteName: ''}
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getWebsites(localStorage.getItem('loggedinuser'));
    document.title = 'Dashboard - Cruddy2';
  }

  handleChange(event) {
    this.setState({websiteName: event.target.value});
    console.log(event.target.value);
    this.props.getThingInstances(event.target.value);
  }

  render(){
    var spans = []
    console.log('proppies')
    console.log(this.props)
    if (this.props.websiteIds != null)
    {
      for (var i = 0; i < this.props.websiteIds.length; i ++) {
        spans.push(<option value={this.props.websiteNames[i]}> {this.props.websiteNames[i]} </option>)
      }
    }
      return(
        <div>
          <select value={this.state.websiteName} onChange={this.handleChange}>
            {spans}
          </select>
          {console.log(this.props.thingInstances)}
        </div>
    );
    }
}

export default DataView
