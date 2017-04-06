const thingInstances =  (state = {}, action) =>{
  switch (action.type) {
    case 'THING_INSTANCES_RECEIVED':
      console.log(action.data.thingInstances);
      return action.data.thingInstances;
    default:
      return state;
  }
}

export default thingInstances
