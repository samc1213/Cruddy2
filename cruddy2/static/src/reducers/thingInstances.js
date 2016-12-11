const thingInstances =  (state = {}, action) =>{
  switch (action.type) {
    case 'THING_INSTANCES_RECEIVED':
      return action.data.thingInstances;
    default:
      return state;
  }
}

export default thingInstances
