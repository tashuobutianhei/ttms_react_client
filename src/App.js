import { BrowserRouter} from 'react-router-dom'
import React from 'react';

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import appStore from './reducers'

import RootRoute from './router'

let store = createStore(appStore)


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RootRoute></RootRoute>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
