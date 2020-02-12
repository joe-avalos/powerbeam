import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Home from '../pages/home'
import Posts from '../pages/posts'

export default function () {
    
    return(
      <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/posts" component={Posts} />
      </Switch>
    )
}
