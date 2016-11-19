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
