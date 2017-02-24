// LETS MOVE ALL API CALLS INTO THIS!
import * as actions from './actions/index'


export function getThingInstances(websiteName) {
  return function (dispatch) {
      dispatch(actions.thingInstancesFetch(true))

      // return fetch(`/api/getthinginstances/${websiteName}`)
      //   .then(function(response) {
      //     return response.json()
      //   })
      //   .then(json =>
      //     dispatch(actions.thingInstancesReceived(json))
      //   )
      //   .catch(err => console.log(err))
        return fetch(`/api/getthinginstances/${websiteName}`)
          .then(function(response) {
            return response.json()
          })
          .then(json =>
            dispatch(actions.thingInstancesReceived(json))
          )
          .catch(err => console.log(err))
  }
}

export function getThingAttributes(websiteName) {
  return function (dispatch) {
      dispatch(actions.thingAttributesFetch(true))

      return fetch(`/api/getthingattributes/${websiteName}`)
        .then(function(response) {
          console.log(response);
          return response.json()
        })
        .then(json =>
          dispatch(actions.thingAttributesReceived(json))
        )
        .catch(err => console.log(err))
  }
}

export function getWebsites(username) {
  return function (dispatch) {
      dispatch(actions.websitesFetch(true))
      return fetch(`/api/getwebsites/${username}`)
        .then(response => response.json())
        .then(json =>
          dispatch(actions.websitesReceived(json))
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
          dispatch(actions.userLoggedIn(json['username']));
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
          dispatch(getWebsites(localStorage.getItem('loggedinuser')));
          console.log('aftergetwebsites')
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
          dispatch(actions.userLoggedIn(json['username']));
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