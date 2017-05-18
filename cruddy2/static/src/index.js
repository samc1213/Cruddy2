import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import {persistStore, autoRehydrate} from 'redux-persist'
import CreateThingContainer from './containers/CreateThingContainer'
import CraigslistViewContainer from './containers/CraigslistViewContainer'
import AppContainer from './containers/AppContainer'
import Home from './components/Home'
import LoginFormContainer from './containers/LoginFormContainer'
import CreateAccountFormContainer from './containers/CreateAccountFormContainer'
import FourOhFour from './components/FourOhFour'
import DashboardContainer from './containers/DashboardContainer'
import reducer from './reducers'
import 'whatwg-fetch'
import { getThingAttributeTypes } from './actions'
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import CreateThingInstanceViewContainer from './containers/CreateThingInstanceViewContainer'
import CreateWebsiteViewContainer from './containers/CreateWebsiteViewContainer'
import Designer from './components/NewDesigner'

const store = createStore(reducer,
  applyMiddleware(thunkMiddleware),
  autoRehydrate()
  )

persistStore(store, {whitelist: ['loggedInUser']})

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
      <Route path="/" component={AppContainer}>
        <IndexRoute component={Home} />
        <Route path="admin/createwebsite" component={CreateWebsiteViewContainer} />
        <Route path=":websiteName/creatething" component={CreateThingContainer} />
        <Route path="createaccount" component={CreateAccountFormContainer} />
        <Route path="login" component={LoginFormContainer} />
        <Route path="design" component={Designer} />
        <Route path=":websiteName" component={CraigslistViewContainer } />
        <Route path=":websiteName/createthinginstance" component={CreateThingInstanceViewContainer} />
        <Route path="admin/dashboard" component={DashboardContainer} />
        <Route path="*" component={FourOhFour} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('root'))
