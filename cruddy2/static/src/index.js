import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import CreateThing from './components/CreateThing'
import CraigslistView from './components/CraigslistView'
import reducer from './reducers'
import 'whatwg-fetch'
import { getThingAttributeTypes } from './actions'
import { Router, Route, Link } from 'react-router'

const store = createStore(reducer)

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
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="creatething" component={CreateThing}/>
      <Route path="viewcraigslistview" component={CraigslistView}>
        <Route path="/viewcraigslistview/:thingId" component={CraigslistView} />
      </Route>
    </Route>
  </Router>
), document.getElementById('root'))
