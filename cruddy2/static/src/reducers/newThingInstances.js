const newThingInstances =  (state = {}, action) =>{
  switch (action.type) {
    case 'THING_INSTANCES_RECEIVED':
      return action.data;
    default:
      return state;
  }
}

export default newThingInstances
