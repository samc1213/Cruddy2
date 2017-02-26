import { connect } from 'react-redux'
import ThingInstanceViewPreview from '../components/ThingInstanceViewPreview'


function mapStateToProps(state) {
  if (state.form.newThingForm.values == null) {
    return {thingAttributes: []};
  }
  else {
    var results = {};
    for (var i = 0; i < state.form.newThingForm.values.members.length; i++)
    {
      var value = state.form.newThingForm.values.members[i];
      results[value.thingattributename] = {'typeid': parseInt(value.thingattributetypeid), 'value': value.thingattributeexample };
    }
    return {thingAttributes: results};
  }
}


const ThingInstanceViewPreviewContainer = connect(
  mapStateToProps,
  null
)(ThingInstanceViewPreview)

export default ThingInstanceViewPreviewContainer
