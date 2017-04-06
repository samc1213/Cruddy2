import {browserHistory} from 'react-router'
import 'whatwg-fetch'


export const getThingAttributeTypes = (data) => ({
  type: "GET_THING_ATTRIBUTE_TYPES",
  data
})

export const setCurrentWebsiteName = (data) => ({
  type: "SET_CURRENT_WEBSITE",
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

export const newThingReceived = (thingid) => ({
  type: "NEW_THING_RECEIVED",
  thingid
})

export const selectDashboardTab = (data) => ({
  type: "DASHBOARD_TAB_SELECTED",
  data
})

export const rehydrateLoggedInUser = () => ({
  type: "REHYDRATE_LOGGED_IN_USER"
})

export const selectCurrentState = (data) => ({
  type: "CURRENT_STATE_SELECTED",
  data
})
