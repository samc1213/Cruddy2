import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import thingAttributes from './thingAttributes'

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  thingAttributes
})

export default todoApp
