import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Home from '../pages/home'
import Cars from '../pages/cars'
import CarPage from './carPage'

export default function () {
    
    return(
      <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cars" component={Cars} />
          <Route path="/:UID" component={CarPage} />
      </Switch>
    )
}
