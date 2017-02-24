const selectedCurrentState =  (state = 'websiteName', action) =>{
  switch (action.type) {
    case 'CURRENT_STATE_SELECTED':
      return action.data;
    default:
      return state;
  }
}

export default selectedCurrentState
