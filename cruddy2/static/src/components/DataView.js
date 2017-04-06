import React, { PropTypes } from 'react'
import ReactTable from 'react-table'
import * as TableMaker from '../TableMaker'

class DataView extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.websiteIds.length > 0) {
      this.state = {websiteName: this.props.websiteIds[0]}
    }
    else {
      this.state = {websiteName: ''}
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getWebsites(localStorage.getItem('loggedinuser'));
    document.title = 'Dashboard - Cruddy2';
    if (this.props.websiteIds.length > 0) {
      this.state = {websiteName: this.props.websiteIds[0]}
    }
    else {
      this.state = {websiteName: ''}
    }
  }

  handleChange(event) {
    this.setState({websiteName: event.target.value});
    this.props.getThingInstances(event.target.value);
  }

  render(){
    var spans = []
    if (this.props.websiteNames != null)
    {
        // this.props.getThingInstances(this.props.websiteNames[0]);
        for (var i = 0; i < this.props.websiteIds.length; i ++) {
        spans.push(<option value={this.props.websiteNames[i]}> {this.props.websiteNames[i]} </option>)
      }
    }
    var headers = []
    if (this.props.thingInstances != null && this.props.thingInstances.length > 0)
    {
      for (var i = 0; i < this.props.thingInstances[0].keys; i++)
      {
        headers.push({header: this.props.thingInstances[0].keys[i], accessor: this.props.thingInstances[0].keys[i]});
      }
    }

    if (this.props.thingInstances.length > 0)
    {
      var tab = TableMaker.GetTable(this.props.thingInstances);
    }

      return(
        <div>
          <select value={this.state.websiteName} onChange={this.handleChange}>
            {spans}
          </select>
          <div>{this.state.websiteName}</div>
          {tab}
        </div>
    );
    }
}

export default DataView
