const loggedInUser =  (state = '', action) =>{
  switch (action.type) {
    case 'USER_LOGGED_IN':
      localStorage.setItem('loggedinuser', action.data);
      return action.data;
    case 'USER_LOGGED_OUT':
      localStorage.setItem('loggedinuser', null);
      return null;
    case 'REHYDRATE_LOGGED_IN_USER':
      return localStorage.getItem('loggedinuser');
    default:
      return state;
  }
}

export default loggedInUser
