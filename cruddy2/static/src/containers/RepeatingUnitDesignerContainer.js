import { connect } from 'react-redux'
import RepeatingUnitDesigner from '../components/RepeatingUnitDesigner'

import * as facade from '../facade'

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

 const mapDispatchToProps = (dispatch) => (
  {
    getWebsites: (username) => {
      dispatch(facade.getWebsites(username))
    }
  }
)


const RepeatingUnitDesignerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RepeatingUnitDesigner)

export default RepeatingUnitDesignerContainer
