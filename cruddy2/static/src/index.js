import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'
import 'whatwg-fetch'
import { getThingAttributeTypes } from './actions'

const store = createStore(reducer)

fetch('/getthingattributetypes')
  .then(function(response) {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return response.json();
  }).then(function(data) {
    store.dispatch(getThingAttributeTypes(data));
  });

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
