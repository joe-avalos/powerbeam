import React from 'react'
//Import Material UI components individually to limit load
import AppBar from '@material-ui/core/AppBar'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import Container from '@material-ui/core/Container'
import HomeIcon from '@material-ui/icons/Home'
import Cars from '@material-ui/icons/EmojiTransportation'
import {withStyles} from '@material-ui/core'
//Import necessary functions for navigation and redux store
import {push} from 'connected-react-router'
import {useDispatch, useSelector} from 'react-redux'

const BottomNavBar = withStyles({
    root: {
        top: 'auto',
        bottom: 0,
        backgroundColor: 'white'
    }
})(AppBar)

export default function () {
    const dispatch = useDispatch()
    //Get pathname for correct menu selection
    const pathName = useSelector(state => state.router.location.pathname)
    const [value, setValue] = React.useState(pathName)
    
    function handleChange(e, v) {
        setValue(v)
        dispatch(push(v))
    }
    return (
          <BottomNavBar position={'fixed'}>
              <Container maxWidth={'lg'}>
                <BottomNavigation
                  value={value}
                  onChange={handleChange}
                  showLabels
                >
                    <BottomNavigationAction label={'Home'} icon={<HomeIcon />} value={'/'} />
                    <BottomNavigationAction label={'Cars'} icon={<Cars />} value={'/cars'} />
                </BottomNavigation>
              </Container>
          </BottomNavBar>
    )
}
