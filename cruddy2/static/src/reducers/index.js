import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import thingAttributeTypes from './thingAttributeTypes'
import thingInstances from './thingInstances'
import loggedInUser from './loggedInUser'
import thingAttributes from './thingAttributes'
import selectedDashboardTab from './selectedDashboardTab'
import websites from './websites'
import websiteName from './websiteName'
import newThingInstances from './newThingInstances'
import selectedCurrentState from './selectedCurrentState'
import newThingId from './newThingId'
import layout from './layout'

const todoApp = combineReducers({
  thingAttributeTypes,
  thingInstances,
  thingAttributes,
  loggedInUser,
  websites,
  websiteName,
  selectedDashboardTab,
  newThingInstances,
  selectedCurrentState,
  newThingId,
  layout,
  form: formReducer
})

export default todoApp
