const thingAttributeIdsToNames =  (state = {}, action) =>{
  switch (action.type) {
    case 'THING_INSTANCES_RECEIVED':
      return action.data.thingAttributes;
    default:
      return state;
  }
}

export default thingAttributeIdsToNames
