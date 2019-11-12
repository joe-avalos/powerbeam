import React from 'react';
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'connected-react-router'

import configureStore, {history} from './modules/store/configureStore'
import './stylesheets/App.css';
import Content from './components/content'

const store = configureStore()

function App() {
  return (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Content />
        </ConnectedRouter>
    </Provider>
  );
}

export default App;
