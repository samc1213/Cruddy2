const loggedInUser =  (state = '', action) =>{
  switch (action.type) {
    case 'USER_LOGGED_IN':
    console.log("LOGGED IN USER HAHH!@");
      localStorage.setItem('loggedinuser', action.data);
      return action.data;
    case 'USER_LOGGED_OUT':
    console.log("LOGGED OUT USER FUCK!@");
    	localStorage.setItem('loggedinuser', null);
      return null;
    case 'REHYDRATE_LOGGED_IN_USER':
    	console.log("REHYHY");
    	return localStorage.getItem('loggedinuser');
    default:
      return state;
  }
}

export default loggedInUser
