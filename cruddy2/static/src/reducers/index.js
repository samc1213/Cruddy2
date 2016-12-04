import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import todos from './todos'
import thingAttributeTypes from './thingAttributeTypes'
import visibilityFilter from './visibilityFilter'


const todoApp = combineReducers({
  todos,
  visibilityFilter,
  thingAttributeTypes,
  form: formReducer
})

export default todoApp
