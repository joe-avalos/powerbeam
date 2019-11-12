import React from 'react';
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'connected-react-router'

import configureStore, {history} from './modules/store/configureStore'

import Content from './components/content'
import NavBar from './components/navBar'

import {ThemeProvider} from '@material-ui/core/styles'
import {createMuiTheme, responsiveFontSizes} from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const store = configureStore()

function App() {
    return (
      <Provider store={store}>
          <ThemeProvider theme={theme}>
              <ConnectedRouter history={history}>
                  <Content/>
                  <NavBar/>
              </ConnectedRouter>
          </ThemeProvider>
      </Provider>
    );
}

export default App;
