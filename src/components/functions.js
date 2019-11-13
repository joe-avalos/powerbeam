import React from 'react'
//Import Material UI components individually to limit load
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied'
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core'
//Import card svg icons
import {Club, Diamond, Heart, Spade} from './icons'
import {cards} from './constants'

const suits = {
    'S': <Spade />,
    'H': <Heart />,
    'D': <Diamond />,
    'C': <Club />
}

const CardPaper = withStyles({
    root:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        '&.red':{
            color: 'red'
        }
    }
})(Paper)

const CenterContent = withStyles({
    root:{
        textAlign: 'center'
    }
})(DialogContent)
//Return card paper with card value and suit
export function printCard(i, k, dealerSecond = false, stand) {
    let card = cards[i];
    let cardValue = card.slice(0, -1)
    let suit = card.substr(-1)
    let red = ''
    if (suit === 'D' || suit === 'H'){
        red = 'red'
    }
    suit = suits[suit]
    if (dealerSecond && stand) {
        return (
          <Grid item xs={1} key={k}>
              <CardPaper square={true} >
                  <Typography variant={'h3'}>
                      &nbsp;
                  </Typography>
              </CardPaper>
          </Grid>
        )
    }
    return (
      <Grid item xs={1} key={k}>
          <CardPaper square={true} className={red}>
              <Typography variant={'h3'}>
                  {cardValue}
              </Typography>
              {suit}
          </CardPaper>
      </Grid>
    )
}
//Return dialog with win/lose message
export function WonDialog({open, won, msg, closeAlert, handleStart}) {
    return (
      <Dialog
        open={open}
        onClose={closeAlert}
      >
          <DialogTitle>Do you want to play again?</DialogTitle>
          <CenterContent>
              <Typography variant={'h5'}>
                  {msg}
              </Typography>
              {won ? <SentimentVerySatisfiedIcon /> : <SentimentVeryDissatisfiedIcon />}
          </CenterContent>
          <DialogActions>
              <Button onClick={closeAlert} color="primary">
                  No
              </Button>
              <Button onClick={handleStart} color="primary" autoFocus>
                  Yes
              </Button>
          </DialogActions>
      </Dialog>
    )
}
