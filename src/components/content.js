import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Home from '../pages/home'
import BlackJack from '../pages/game'

export default function () {
    
    return(
      <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/blackjack" component={BlackJack} />
      </Switch>
    )
}
