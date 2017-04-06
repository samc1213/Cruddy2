const newThingId =  (state = '', action) =>{
  switch (action.type) {
    case 'NEW_THING_RECEIVED':
      return action.thingid;
    default:
      return state;
  }
}

export default newThingId
