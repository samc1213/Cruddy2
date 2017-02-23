const websites =  (state = {}, action) =>{
  switch (action.type) {
    case 'WEBSITES_RECEIVED':
    	console.log("inwebsitesreceived");
      return action.data;
    default:
      return state;
  }
}

export default websites
