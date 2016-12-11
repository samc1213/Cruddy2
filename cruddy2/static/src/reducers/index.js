import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import thingAttributeTypes from './thingAttributeTypes'
import thingInstances from './thingInstances'
import thingAttributeIdsToNamesAndTypes from './thingAttributeIdsToNamesAndTypes'
import thingAttributes from './thingAttributes'

const todoApp = combineReducers({
  thingAttributeTypes,
  thingInstances,
  thingAttributeIdsToNamesAndTypes,
  thingAttributes,
  form: formReducer
})

export default todoApp
