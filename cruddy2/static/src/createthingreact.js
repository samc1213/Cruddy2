function OptionThing(props) {
    return (
      <option value={props.optionthingnumber}>{props.optionthingname}</option>
    );
}

class FormDiv extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      typenumbers : [],
      typenames : []
    }
  }
  componentDidMount() {
    var that = this;
    var url = '/getthingattributetypes';
    fetch(url)
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(function(data) {
      that.setState({ typenames: Object.keys(data), typenumbers: Object.values(data) });
    });
  }
  render(){
    var that = this;
    var rows = [];
    for (var i = 0; i < this.props.thingattributenames.length; i++) {
      rows.push(<Fieldset number = {i} key = {i} typenumbers = {this.state.typenumbers}
        typenames = {this.state.typenames} thingattributename = {this.props.thingattributenames[i]}
        thingattributetype = {this.props.thingattributetypes[i]}
        changeInAttributeName = {this.props.changeInAttributeName}
        changeInAttributeType = {this.props.changeInAttributeType}
        />);
    }
    return (
        <div className="container">
        <form action="/postnewthing" method="post">
          Thing name:
          <input name="thingname" type="text"/>
          {rows}
          <button type="button" onClick={this.props.handleNewRowClick}>
            New Row
          </button>
          <button type="submit">
            Submit
          </button>
          </form>
        </div>
    );
  }
}
//static rn
class ViewCard extends React.Component{
  constructor(props){
    super(props);
  };
  render(){
    var rows = [];
    var CardRow = "CardRow";
    for (var i = 0; i < 4; i++) {
      rows.push(<div key = {CardRow.concat(i)} className="incard">{this.props.contents[i]}</div>);
    }
    return(
      <div className="square">
        {rows}
      </div>
    )
  }
}

export default class Divvy extends React.Component{
  render() {
    return (
      <div>
      divvy
      </div>
    )
  }
}

class CraigslistCard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      examples : ["", "", "", ""]
    }
    this.handleExampleChange = this.handleExampleChange.bind(this);
  };

  handleExampleChange(event) {
    var newExamples = this.state.examples.slice();
    newExamples[event.target.id] = event.target.value;
    this.setState({examples: newExamples});
  }

  render() {
    var exampleInputs = [];
    for (var i = 0; i < this.state.examples.length; i++) {
      exampleInputs.push(<input
        value = {this.state.examples[i]}
        ref="exampleinput"
        id={i}
        type="text"
        onChange={this.handleExampleChange}
        key = {"exampleInput" + i}
        type="text" />);
    }
    return(
      <div className="container">
        <div className ="rightcontainer">
          <ViewCard contents = {this.state.examples}/>
        </div>
        <div className="leftcontainer">
          {exampleInputs}
        </div>

      </div>
    );
  };
}
