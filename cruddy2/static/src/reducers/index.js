import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import thingAttributeTypes from './thingAttributeTypes'
import thingInstances from './thingInstances'
import thingAttributeIdsToNamesAndTypes from './thingAttributeIdsToNamesAndTypes'
import loggedInUser from './loggedInUser'
import thingAttributes from './thingAttributes'
import websites from './websites'

const todoApp = combineReducers({
  thingAttributeTypes,
  thingInstances,
  thingAttributeIdsToNamesAndTypes,
  thingAttributes,
  loggedInUser,
  websites,
  form: formReducer
})

export default todoApp
