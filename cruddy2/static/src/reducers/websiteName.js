const websiteName =  (state = {}, action) =>{
  switch (action.type) {
    case 'GET_CURRENT_WEBSITE':
      return action.data;
    default:
      return state;
  }
}

export default websiteName
