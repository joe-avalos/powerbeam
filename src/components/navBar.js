import React from 'react'
import {push} from 'connected-react-router'
import {useDispatch, useSelector} from 'react-redux'

import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import HomeIcon from '@material-ui/icons/Home'
import CardIcon from '@material-ui/icons/Games'
import {withStyles} from '@material-ui/core'

const BottomNavBar = withStyles({
    root: {
        top: 'auto',
        bottom: 0
    }
})(AppBar)

export default function () {
    const pathName = useSelector(state => state.router.location.pathname)
    const [value, setValue] = React.useState(pathName)
    const dispatch = useDispatch()
    function handleChange(e, v) {
        setValue(v)
        dispatch(push(v))
    }
    return (
          <BottomNavBar position={'fixed'} color={'secondary'}>
              <Container maxWidth={'lg'}>
                <BottomNavigation
                  value={value}
                  onChange={handleChange}
                  showLabels
                >
                    <BottomNavigationAction label={'Home'} icon={<HomeIcon />} value={'/'} />
                    <BottomNavigationAction label={'Blackjack'} icon={<CardIcon />} value={'/blackjack'} />
                </BottomNavigation>
              </Container>
          </BottomNavBar>
    )
}
