import {browserHistory} from 'react-router'


export const getThingAttributeTypes = (data) => ({
  type: "GET_THING_ATTRIBUTE_TYPES",
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

export const rehydrateLoggedInUser = () => ({
	type: "REHYDRATE_LOGGED_IN_USER"
})

export function rehydrateAndGetWebsites(username) {
	return function (dispatch) {
    	dispatch(rehydrateLoggedInUser())

	    return dispatch(getWebsites(username))
	}
}


export function getThingInstances(thingId) {
	return function (dispatch) {
    	dispatch(thingInstancesFetch(true))

	    return fetch(`/api/getthinginstances/${thingId}`)
	      .then(response => response.json())
	      .then(json =>
	        dispatch(thingInstancesReceived(json))
	      )
	      .catch(err => console.log(err))
	}
}

export function getThingAttributes(thingId) {
	return function (dispatch) {
    	dispatch(thingAttributesFetch(true))

	    return fetch(`/api/getthingattributes/${thingId}`)
	      .then(response => response.json())
	      .then(json =>
	        dispatch(thingAttributesReceived(json))
	      )
	      .catch(err => console.log(err))
	}
}

export function getWebsites(username) {
	console.log("GETWEB");
	console.log(username);
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
		  		browserHistory.push('/dashboard');
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
	
export function submitLogin(username, password) {
	function doFetch(data, dispatch) {
		return fetch('/api/postloginuser', {
			method: 'POST',
			body: data
		}).then(response => response.json())  
		  .then((json) => {
		  	if (json.success == true) {
		  		dispatch(userLoggedIn(json['username']));
		  		browserHistory.push('/creatething');
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
