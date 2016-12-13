import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import CreateThing from './components/CreateThing'
import CraigslistViewContainer from './containers/CraigslistViewContainer'
import App from './components/App'
import Home from './components/Home'
import reducer from './reducers'
import 'whatwg-fetch'
import { getThingAttributeTypes } from './actions'
import { Router, Route, Link, browserHistory } from 'react-router'
import CreateThingInstanceViewContainer from './containers/CreateThingInstanceViewContainer'
import CreateWebsite from './components/CreateWebsite'


const store = createStore(reducer,
  applyMiddleware(thunkMiddleware)
  )

fetch('/api/getthingattributetypes')
  .then(function(response) {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return response.json();
  }).then(function(data) {
    store.dispatch(getThingAttributeTypes(data));
  });

render((
  <Provider store = {store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="createwebsite" component={CreateWebsite} />
        <Route path="creatething" component={CreateThing} />
        <Route path="viewcraigslistview" component={CraigslistViewContainer }>
          <Route path="/viewcraigslistview/:thingId" component={CraigslistViewContainer} />
        </Route>
        <Route path="createthinginstance" component={CreateThingInstanceViewContainer}>
          <Route path="/createthinginstance/:thingId" component={CreateThingInstanceViewContainer} />
        </Route>
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'))
