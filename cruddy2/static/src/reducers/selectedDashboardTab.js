const selectedDashboardTab =  (state = 'Apps', action) =>{
  switch (action.type) {
    case 'DASHBOARD_TAB_SELECTED':
      return action.data;
    default:
      return state;
  }
}

export default selectedDashboardTab
