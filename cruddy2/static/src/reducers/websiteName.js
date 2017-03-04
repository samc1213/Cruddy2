const websiteName =  (state = '', action) =>{
  switch (action.type) {
    case 'SET_CURRENT_WEBSITE':
      return action.data;
    default:
      return state;
  }
}

export default websiteName
