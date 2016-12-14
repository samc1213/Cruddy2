const websites =  (state = {}, action) =>{
  switch (action.type) {
    case 'WEBSITES_RECEIVED':
      return action.data.websites;
    default:
      return state;
  }
}

export default websites
