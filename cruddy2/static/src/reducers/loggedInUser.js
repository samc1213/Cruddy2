const loggedInUser =  (state = '', action) =>{
  switch (action.type) {
    case 'USER_LOGGED_IN':
    console.log("LOGGED IN USER HAHH!@");
      return action.data;
    case 'USER_LOGGED_OUT':
    console.log("LOGGED OUT USER FUCK!@");
      return null;
    default:
      return state;
  }
}

export default loggedInUser
