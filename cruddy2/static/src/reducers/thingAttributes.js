const thingAttributes = (state = [''], action) => {
  switch (action.type) {
    case 'ADD_THING_ATTRIBUTE':
      return state.concat([''])
    default:
      return state
  }
}

export default thingAttributes
