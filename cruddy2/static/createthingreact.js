function OptionThing(props) {
  return (<option value={props.optionthingnumber}>{props.optionthingname}</option>);
}


class Fieldset extends React.Component{
  render(){
    const listItems = this.props.typenumbers.map((typenumber, i) =>
      <OptionThing key = {typenumber} optionthingnumber = {typenumber}  optionthingname = {this.props.typenames[i]} />
    );
    return (
      <fieldset className="thingattr" id={this.props.number}>
        Thing Attribute Name:
        <input name="thingattributename[]" className="thingattributename" id={this.props.number} type="text"/><br/>
        Thing Attribute Type:
        <select name="thingattributetypeid[]" className="thingattributetypeid" id={this.props.number}>
          {listItems}
        </select><br/>
      </fieldset>);
  }
}

class Form extends React.Component {
  constructor(){
    super();
    this.state = {
      numberattributes : 1,
      typenumbers : [],
      typenames : []
    }
    this.handleNewRowClick = this.handleNewRowClick.bind(this);
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
    for (var i = 1; i <= this.state.numberattributes; i++) {
      rows.push(<Fieldset number = {i} key = {i} typenumbers = {this.state.typenumbers} typenames = {this.state.typenames}/>);
    }
    return (
        <div>
        <form action="/postnewthing" method="post">
          Thing name:
          <input name="thingname" type="text"/>
          {rows}
          <button type="button" onClick={this.handleNewRowClick}>
            New Row
          </button>
          <button type="submit">
            Submit
          </button>
          </form>
        </div>
    );
  }

  handleNewRowClick() {
    this.setState(prevNumber =>({
      numberattributes: prevNumber.numberattributes + 1
    }));
  }
}


ReactDOM.render(
  <Form />,
  document.getElementById('container')
);
