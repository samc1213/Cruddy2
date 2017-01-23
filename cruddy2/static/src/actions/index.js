import {browserHistory} from 'react-router'
import 'whatwg-fetch'


export const getThingAttributeTypes = (data) => ({
  type: "GET_THING_ATTRIBUTE_TYPES",
  data
})

export const getCurrentWebsiteName = (data) => ({
  type: "GET_CURRENT_WEBSITE",
  data
})

export const thingInstancesFetch = (isTrue) => ({
  type: "THING_INSTANCES_FETCH",
  isTrue
})

export const thingAttributesFetch = (isTrue) =>({
  type: "THING_ATTRIBUTES_FETCH",
  isTrue
})

export const thingInstancesReceived = (data) => ({
  type: "THING_INSTANCES_RECEIVED",
  data
})

export const thingAttributesReceived = (data) => ({
  type: "THING_ATTRIBUTES_RECEIVED",
  data
})

export const userLoggedIn = (data) => ({
  type: "USER_LOGGED_IN",
  data
})

export const userLoggedOut = () => ({
  type: "USER_LOGGED_OUT"
})

export const websitesFetch = (isTrue) =>({
  type: "WEBSITES_FETCH",
  isTrue
})

export const websitesReceived = (data) => ({
  type: "WEBSITES_RECEIVED",
  data
})

export const selectDashboardTab = (data) => ({
  type: "DASHBOARD_TAB_SELECTED",
  data
})

export const rehydrateLoggedInUser = () => ({
  type: "REHYDRATE_LOGGED_IN_USER"
})

export function rehydrateAndGetWebsites(username) {
  return function (dispatch) {
      dispatch(rehydrateLoggedInUser())

      return dispatch(getWebsites(username))
  }
}


export function getThingInstances(websiteName) {
  return function (dispatch) {
      dispatch(thingInstancesFetch(true))

      return fetch(`/api/getthinginstances/${websiteName}`)
        .then(response => response.json())
        .then(json =>
          dispatch(thingInstancesReceived(json))
        )
        .catch(err => console.log(err))
  }
}

export function getThingAttributes(websiteName) {
  return function (dispatch) {
      dispatch(thingAttributesFetch(true))

      return fetch(`/api/getthingattributes/${websiteName}`)
        .then(response => response.json())
        .then(json =>
          dispatch(thingAttributesReceived(json))
        )
        .catch(err => console.log(err))
  }
}

export function getWebsites(username) {
  return function (dispatch) {
      dispatch(websitesFetch(true))

      return fetch(`/api/getwebsites/${username}`)
        .then(response => response.json())
        .then(json =>
          dispatch(websitesReceived(json))
        )
        .catch(err => console.log(err))
  }
}


export function submitCreateAccount(firstname, lastname, username, password) {
  function doFetch(data, dispatch) {
    return fetch('/api/postnewaccount', {
      method: 'POST',
      body: data
    }).then(response => response.json())
      .then((json) => {
        if (json.success == true) {
          dispatch(userLoggedIn(json['username']));
          browserHistory.push('/admin/dashboard');
        }
        else {
          console.log("bad new account");
        }
      })
      .catch(err => console.log(err))
  }

  return function(dispatch) {
    var data = new FormData();
    data.append('firstname', firstname);
    data.append('lastname', lastname);
    data.append('username', username);
    data.append('password', password);

    return doFetch(data, dispatch);
  }
}

export function submitCreateWebsite(websitetypeid, websitename, username) {
  console.log('lskf')
  function doFetch(data, dispatch) {
    return fetch('/api/postnewwebsite', {
      method: 'POST',
      body: data
    }).then(response => response.json())
      .then((json) => {
        if (json.success == true) {
          dispatch(selectDashboardTab('Apps'));
        }
        else {
          console.log("bad new website");
        }
      })
      .catch(err => console.log(err))
  }

  return function(dispatch) {
    console.log("inthisbitch")
    var data = new FormData();
    data.append('websitetypeid', websitetypeid);
    data.append('websitename', websitename);
    data.append('username', username);
    console.log("inthisbitch")
    return doFetch(data, dispatch);
  }
}


export function submitLogin(username, password) {
  function doFetch(data, dispatch) {
    return fetch('/api/postloginuser', {
      method: 'POST',
      body: data
    }).then(response => response.json())
      .then((json) => {
        if (json.success == true) {
          dispatch(userLoggedIn(json['username']));
          browserHistory.push('/admin/dashboard');
        }
        else {
          console.log("bad login");
        }
      })
      .catch(err => console.log(err))
  }

  return function(dispatch) {
    var data = new FormData();
    data.append('username', username);
    data.append('password', password);

    return doFetch(data, dispatch);
  }
}

export function submitNewThing(form) {
  return function (dispatch) {
      return fetch(`/postnewthing`, {
        method: 'POST',
        body: new FormData(form)
      })
        .then(response => response.json())
        .then(json =>
        browserHistory.push(`/admin/dashboard`)
        )
        .catch(err => console.log(err))
  }
}


export function submitNewThingInstance(form) {
  return function (dispatch) {
      return fetch(`/api/postnewthinginstance`, {
        method: 'POST',
        body: new FormData(form)
      })
        .then(response => response.json())
        .then(json =>
        browserHistory.push(`/${json.websitename}`)
        )
        .catch(err => console.log(err))
  }
}
