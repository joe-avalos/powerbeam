import React, {useEffect} from 'react'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied'
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import {Heart, Club, Diamond, Spade} from '../components/icons'
import {useDispatch, useSelector} from 'react-redux'
import {cardFetchData, cardReset} from '../modules/actions/cardActions'
import {withStyles} from '@material-ui/core'

const PlayBox = withStyles({
    root:{
        width: '100%',
        height: '50%',
        display: 'flex',
        alignItems: 'center',
        '& div:first-of-type':{
            marginBottom: 15
        },
        '& div:last-of-type':{
            textAlign: 'center'
        }
    }
})(Box)

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

const suits = {
    'S': <Spade />,
    'H': <Heart />,
    'D': <Diamond />,
    'C': <Club />
}

const cards = {
    0:  'AS', 1:  '2S', 2:  '3S', 3:  '4S', 4:  '5S', 5:  '6S', 6:  '7S', 7:  '8S', 8:  '9S', 9:  '10S', 10: 'JS', 11: 'QS', 12: 'KS',
    13: 'AC', 14: '2C', 15: '3C', 16: '4C', 17: '5C', 18: '6C', 19: '7C', 20: '8C', 21: '9C', 22: '10C', 23: 'JC', 24: 'QC', 25: 'KC',
    26: 'AD', 27: '2D', 28: '3D', 29: '4D', 30: '5D', 31: '6D', 32: '7D', 33: '8D', 34: '9D', 35: '10D', 36: 'JD', 37: 'QD', 38: 'KD',
    39: 'AH', 40: '2H', 41: '3H', 42: '4H', 43: '5H', 44: '6H', 45: '7H', 46: '8H', 47: '9H', 48: '10H', 49: 'JH', 50: 'QH', 51: 'KH'
}
const values = {
    0:  11, 1:  2, 2:  3, 3:  4, 4:  5, 5:  6, 6:  7, 7:  8, 8:  9, 9:  10, 10: 10, 11: 10, 12: 10,
    13: 11, 14: 2, 15: 3, 16: 4, 17: 5, 18: 6, 19: 7, 20: 8, 21: 9, 22: 10, 23: 10, 24: 10, 25: 10,
    26: 11, 27: 2, 28: 3, 29: 4, 30: 5, 31: 6, 32: 7, 33: 8, 34: 9, 35: 10, 36: 10, 37: 10, 38: 10,
    39: 11, 40: 2, 41: 3, 42: 4, 43: 5, 44: 6, 45: 7, 46: 8, 47: 9, 48: 10, 49: 10, 50: 10, 51: 10
}

export default function () {
    const dispatch = useDispatch()
    const dealerCards = useSelector(state => state.card.dealerCards)
    const playerCards = useSelector(state => state.card.playerCards)
    const isLoading = useSelector(state => state.card.isLoading)
    const [stand, setStand] = React.useState(true)
    const [dealerSum, setDealerSum] = React.useState(0)
    const [playerSum, setPlayerSum] = React.useState(0)
    const [alert, setAlert] = React.useState(false)
    const [msg, setMsg] = React.useState('')
    const [won, setWon] = React.useState()
    
    useEffect(() => {
        dealerCards.map(i => {
            setDealerSum(dealerSum + values[i])
        })
    },[dealerCards])
    useEffect(()=>{
        if (!stand) {
            if (dealerSum < 21) {
                dispatch(cardFetchData('dealer'))
            }
        }
        handleResult()
    },[dealerSum])
    useEffect(() => {
        playerCards.map(i => {
            setPlayerSum(playerSum + values[i])
        })
    },[playerCards])
    useEffect(()=>{
        handleResult()
    },[playerSum])
    
    function printCard(i, k, dealerSecond = false) {
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
    
    function handleResult() {
        if (playerSum > 21) {
            setMsg('You lost!')
            setWon(false)
            setAlert(true)
            return
        }
        if (playerSum === 21) {
            setMsg('You Won!')
            setWon(true)
            setAlert(true)
            return
        }
        if (dealerSum > 21 ) {
            setMsg('You Won!')
            setWon(true)
            setAlert(true)
            return
        }
        if (dealerSum === 21){
            setMsg('You Lost!')
            setWon(false)
            setAlert(true)
        }
    }
    
    function handleHitMe() {
        dispatch(cardFetchData('player'))
    }
    function handleReset() {
        setPlayerSum(0)
        setDealerSum(0)
        setStand(true)
        setAlert(false)
        setWon('')
        dispatch(cardReset())
    }
    function handleStand() {
        setStand(false)
        dispatch(cardFetchData('dealer'))
    }
    function handleStart(){
        handleReset()
        startGame()
    }
    function startGame(){
        for (let i = 0; i < 4; i++) {
            if (i % 2 === 0) {
                dispatch(cardFetchData('player'))
            }else{
                dispatch(cardFetchData('dealer'))
            }
        }
    }
    
    function closeAlert() {
        handleReset()
        setAlert(false)
    }
    
    return(
      <Container maxWidth={'lg'} className="centralContainer">
          <Dialog
            open={alert}
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
          <PlayBox>
              <Grid container justify={'center'}>
              {dealerCards.map((i,k)=>{
                  let dealSecond = false
                  if (k === 1) {
                      dealSecond = true
                  }
                  return (
                    printCard(i, k, dealSecond)
                  )
              })}
                  <Grid item xs={12}>
                      <Typography variant={'h5'}>
                          {!stand && dealerSum}
                      </Typography>
                  </Grid>
              </Grid>
          </PlayBox>
          <PlayBox>
              <Grid container justify={'center'}>
              {playerCards.map((i,k)=>{
                  return (
                    printCard(i, k)
                  )
              })}
                  <Grid item xs={12}>
                      <Typography variant={'h5'}>
                          {playerSum}
                      </Typography>
                  </Grid>
              </Grid>
          </PlayBox>
              <Grid container>
                  <Grid item xs={4} />
                  <Grid item xs={6}>
          {isLoading ?
            <CircularProgress />
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
                  </Grid>
              </Grid>
      </Container>
    )
}
