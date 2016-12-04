export default class Page extends React.Component{
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
