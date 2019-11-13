import React from 'react'
//Import Material UI components individually to limit load
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core'

const CenteredGrid = withStyles({
    root: {
        textAlign: 'center'
    }
})(Grid)
//Return game button menu
export default function ({isLoading, handleStart, handleHitMe, handleStand, handleReset}) {
    return(
      <Grid container>
          <Grid item xs={3}/>
          <CenteredGrid item xs={6}>
              {isLoading ?
                <CircularProgress color={'secondary'}/>
                :
                <ButtonGroup variant={'contained'}>
                    <Button variant={'contained'} onClick={handleStart}>
                        START
                    </Button>
                    <Button variant={'contained'} onClick={handleHitMe}>
                        HIT ME
                    </Button>
                    <Button variant={'contained'} onClick={handleStand}>
                        STAND
                    </Button>
                    <Button variant={'contained'} onClick={handleReset}>
                        RESET
                    </Button>
                </ButtonGroup>
              }
          </CenteredGrid>
      </Grid>
    )
}
