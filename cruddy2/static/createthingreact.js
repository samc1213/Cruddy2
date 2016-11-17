function OptionThing(props) {
    return (
      <option value={props.optionthingnumber}>{props.optionthingname}</option>
    );
}

class Fieldset extends React.Component {
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }
  handleNameChange(){
    this.props.changeInAttributeName(
      this.refs.thingattributename.value,
      this.props.number
    );
  }
  handleTypeChange(){
    this.props.changeInAttributeType(
      this.refs.thingattributetypeid.value,
      this.props.number
    );
  }
  render() {
    const listItems = this.props.typenumbers.map((typenumber, i) =>
      <OptionThing key = {typenumber} optionthingnumber = {typenumber}  optionthingname = {this.props.typenames[i]} />
    );
    return (
      <fieldset className="thingattr" id={this.props.number}>
        Thing Attribute Name:
        <input
          name="thingattributename[]"
          className="thingattributename"
          value = {this.props.thingattributename}
          ref="thingattributename"
          id={this.props.number}
          type="text"
          onChange={this.handleNameChange}
        />
        <br/>
        Thing Attribute Type:
        <select
          value = {this.props.thingattributetype}
          name="thingattributetypeid[]"
          className="thingattributetypeid"
          ref="thingattributetypeid"
          id={this.props.number}
          onChange = {this.handleTypeChange}>
          {listItems}
        </select><br/>
      </fieldset>);
  }
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



class Page extends React.Component{
  constructor(){
    super();
    this.state = {
      thingattributenames : [""],
      thingattributetypes : [1],
    }
    this.handleNewRowClick = this.handleNewRowClick.bind(this);
    this.changeInAttributeName = this.changeInAttributeName.bind(this);
    this.changeInAttributeType = this.changeInAttributeType.bind(this);
  }
  changeInAttributeName(newName, index){
    var newArray = this.state.thingattributenames.slice();
    newArray[index] = newName;
    this.setState({
      thingattributenames : newArray
    })
  }
  changeInAttributeType(newAttribute, index){
    var newArray = this.state.thingattributetypes.slice();
    newArray[index] = newAttribute;
    this.setState({
      thingattributetypes : newArray
    })
  }
  handleNewRowClick() {
    this.setState(prevState =>(
      {
        thingattributenames: prevState.thingattributenames.concat([""]),
        thingattributetypes: prevState.thingattributetypes.concat([1])
      }));
    }
  render(){
    //in the end this div should just have Form & CardView
    return(
      <div>
        <FormDiv thingattributenames
        = {this.state.thingattributenames} thingattributetypes = {this.state.thingattributetypes}
        handleNewRowClick = {this.handleNewRowClick} changeInAttributeName = {this.changeInAttributeName}
        changeInAttributeType = {this.changeInAttributeType}/>
        <CraigslistCard />
        <div>
        Hello<br/>
        {this.state.thingattributetypes}<br/>
        {this.state.thingattributenames}
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('pagecontainer')
);
