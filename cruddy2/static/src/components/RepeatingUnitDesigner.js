import React from 'react'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import * as ThingAttributeDisplayerFactory from '../ThingAttributeDisplayerFactory'
import ThingAttributeTextDisplayer from '../ThingAttributeTextDisplayer'

const SortableItem = SortableElement(({i, onChangeText, value}) =>
  <li className="SortableItem">
    <input value={value} onChange={(e) => onChangeText(e.nativeEvent.target.value, i)}/>
  </li>
);

const SortableList = SortableContainer(({items, onChangeText}) => {
    return (
        <ul className="SortableList">
            {items.map((value, index) =>
                <SortableItem key={`item-${index}`} index={index} i={index} value={value} onChangeText={onChangeText} />
            )}
        </ul>
    );
});


class RepeatingUnitDesigner extends React.Component {
  constructor(props) {
    super(props);
    this.onBtnClick = this.onBtnClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    for (var thingAttributeName in this.props.thingAttributes)
    {
      this.state.rows.push(ThingAttributeDisplayerFactory.GetThingAttributeDisplayer(this.props.thingAttributes[thingAttributeName].value, this.props.thingAttributes[thingAttributeName].typeid));
    }
  }

  state = {
    rows: [],
    items: [''],
  };
   handleChangeText(text, index) {
        this.state.items[index] = text;
        this.forceUpdate();
    };

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  };

  onBtnClick = () =>
  {
    var oldItems = this.state.items.slice();
    oldItems.push('' );
    this.setState({
      items: oldItems,
    });
  }

  onSubmit = () =>
  {
    this.props.submitCardData({'layout': this.state.items, 'thingid':this.props.thingId})
  }

  render() {

    return (
      <div className="col-md-12">
        repeatingUnits wooo :D xddD yay
        <div>
        <SortableList items={this.state.items} onSortEnd={this.onSortEnd.bind(this)}
          helperClass="SortableHelper" onChangeText={(text, index) => this.handleChangeText(text, index)} />
        </div>
        <button onClick = {this.onBtnClick}> Add New Row</button>
        <button onClick = {this.onSubmit}>Submit</button>
      </div>
    );
  }
  }



export default RepeatingUnitDesigner
