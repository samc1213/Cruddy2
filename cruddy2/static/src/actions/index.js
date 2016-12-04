let nextTodoId = 0
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text: text
})

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})

export const addThingAttribute = () => ({
  type: 'ADD_THING_ATTRIBUTE'
})

export const getThingAttributeTypes = (data) => ({
  type: "GET_THING_ATTRIBUTE_TYPES",
  data
})
