import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Home from '../pages/home'

export default function () {
    
    return(
      <Switch>
          <Route exact path="/" component={Home} />
      </Switch>
    )
}
