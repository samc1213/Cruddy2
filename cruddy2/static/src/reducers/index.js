import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import todos from './todos'
import visibilityFilter from './visibilityFilter'


const todoApp = combineReducers({
  todos,
  visibilityFilter,
  form: formReducer
})

export default todoApp
