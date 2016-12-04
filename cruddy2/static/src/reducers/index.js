import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import thingAttributeTypes from './thingAttributeTypes'


const todoApp = combineReducers({
  thingAttributeTypes,
  form: formReducer
})

export default todoApp
