const thingAttributes =  (state = [], action) =>{
  switch (action.type) {
    case 'THING_ATTRIBUTES_RECEIVED':
      return action.data;
    default:
      return state;
  }
}

export default thingAttributes
