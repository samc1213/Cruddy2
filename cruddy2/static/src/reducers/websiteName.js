const websiteName =  (state = '', action) =>{
  switch (action.type) {
    case 'GET_CURRENT_WEBSITE':
    	console.log(action.data);
      return action.data;
    default:
      return state;
  }
}

export default websiteName
