const thingAttributeTypes =  (state = {}, action) =>{
  switch (action.type) {
    case 'GET_THING_ATTRIBUTE_TYPES':
      return action.data;
    default:
      return state;
  }
}

export default thingAttributeTypes
