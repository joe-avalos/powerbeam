import React from 'react';
import {Provider} from 'react-redux'

import configureStore from './modules/store/configureStore'
import './App.css';
import Content from './components/content'

const store = configureStore()

function App() {
  return (
    <Provider store={store}>
      <Content />
    </Provider>
  );
}

export default App;
