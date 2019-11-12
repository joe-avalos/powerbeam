import React from 'react';
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'connected-react-router'

import configureStore, {history} from './modules/store/configureStore'

import Content from './components/content'
import NavBar from './components/navBar'

import './stylesheets/App.css';

const store = configureStore()

function App() {
  return (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Content />
            <NavBar />
        </ConnectedRouter>
    </Provider>
  );
}

export default App;
