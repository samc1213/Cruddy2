import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import thingAttributeTypes from './thingAttributeTypes'
import thingInstances from './thingInstances'
import thingAttributeIdsToNames from './thingAttributeIdsToNames'

const todoApp = combineReducers({
  thingAttributeTypes,
  thingInstances,
  thingAttributeIdsToNames,
  form: formReducer
})

export default todoApp
