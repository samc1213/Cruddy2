export const getThingAttributeTypes = (data) => ({
  type: "GET_THING_ATTRIBUTE_TYPES",
  data
})

export const thingInstancesFetch = (isTrue) => ({
  type: "THING_INSTANCES_FETCH",
  isTrue
})

export const thingInstancesReceived = (data) => ({
  type: "THING_INSTANCES_RECEIVED",
  data
})


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