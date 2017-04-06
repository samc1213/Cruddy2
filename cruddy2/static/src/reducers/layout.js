const layout =  (state = {}, action) =>{
  switch (action.type) {
    case 'LAYOUT_RECEIVED':
      console.log(action)
      return action.data;
    default:
      return state;
  }
}

export default layout
