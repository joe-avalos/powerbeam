import React, {useEffect} from 'react'
//Import Material UI components individually to limit load
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core'
//Import necessary redux functions
import {useDispatch, useSelector} from 'react-redux'

import ButtonMenu from '../components/buttons'
import {cardFetchData, cardReset} from '../modules/actions/cardActions'
import {printCard, WonDialog} from '../components/functions'
import {values} from '../components/constants'

const PlayBox = withStyles({
    root: {
        width: '100%',
        height: '50%',
        display: 'flex',
        alignItems: 'center',
        '& div:first-of-type': {
            marginBottom: 15
        },
        '& div:last-of-type': {
            textAlign: 'center'
        }
    }
})(Box)


export default function () {
    const dispatch = useDispatch()
    //Get redux state
    const dealerCards = useSelector(state => state.card.dealerCards)
    const playerCards = useSelector(state => state.card.playerCards)
    const isLoading = useSelector(state => state.card.isLoading)
    //Define local state variables
    const [stand, setStand] = React.useState(true)
    const [dealerSum, setDealerSum] = React.useState(0)
    const [playerSum, setPlayerSum] = React.useState(0)
    const [alert, setAlert] = React.useState(false)
    const [msg, setMsg] = React.useState('')
    const [won, setWon] = React.useState()
    
    //Check if dealer cards have changed
    useEffect(() => {
        dealerCards.map(i => {
            setDealerSum(dealerSum + values[i])
        })
    }, [dealerCards])
    //Check if dealer has lost
    useEffect(() => {
        if (!stand) {
            if (dealerSum < 21) {
                dispatch(cardFetchData('dealer'))
            }
            handleResult()
        }
    }, [dealerSum])
    //Check if player cards have changed
    useEffect(() => {
        playerCards.map(i => {
            setPlayerSum(playerSum + values[i])
        })
    }, [playerCards])
    //Check if player won/lost
    useEffect(() => {
        handleResult()
    }, [playerSum])
    //Check win/lose status
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
        if (dealerSum > 21) {
            setMsg('You Won!')
            setWon(true)
            setAlert(true)
            return
        }
        if (dealerSum === 21) {
            setMsg('You Lost!')
            setWon(false)
            setAlert(true)
        }
    }
    //Add another card to player
    function handleHitMe() {
        dispatch(cardFetchData('player'))
    }
    //Reset game
    function handleReset() {
        setPlayerSum(0)
        setDealerSum(0)
        setStand(true)
        setAlert(false)
        setWon('')
        dispatch(cardReset())
    }
    //Start giving cards to dealer until player wins/loses
    function handleStand() {
        setStand(false)
        dispatch(cardFetchData('dealer'))
    }
    //Reset game and start dealing
    function handleStart() {
        handleReset()
        startGame()
    }
    //Start dealing 4 cards, 2 to player and dealer
    function startGame() {
        for (let i = 0; i < 4; i++) {
            if (i % 2 === 0) {
                dispatch(cardFetchData('player'))
            } else {
                dispatch(cardFetchData('dealer'))
            }
        }
    }
    //Close win/lose dialog
    function closeAlert() {
        handleReset()
        setAlert(false)
    }
    
    return (
      <Container maxWidth={'lg'} className="centralContainer">
          <WonDialog open={alert} msg={msg} won={won} closeAlert={closeAlert} handleStart={handleStart}/>
          <PlayBox>
              <Grid container justify={'center'}>
                  {/*Print dealer cards*/}
                  {dealerCards.map((i, k) => {
                      let dealSecond = false
                      if (k === 1) {
                          dealSecond = true
                      }
                      return (
                        printCard(i, k, dealSecond, stand)
                      )
                  })}
                  <Grid item xs={12}>
                      {/*Print dealer card sum if player is standing*/}
                      <Typography variant={'h5'}>
                          {!stand && dealerSum}
                      </Typography>
                  </Grid>
              </Grid>
          </PlayBox>
          <PlayBox>
              <Grid container justify={'center'}>
                  {/*Print player cards*/}
                  {playerCards.map((i, k) => {
                      return (
                        printCard(i, k)
                      )
                  })}
                  <Grid item xs={12}>
                      {/*Show player card sum */}
                      <Typography variant={'h5'}>
                          {playerSum}
                      </Typography>
                  </Grid>
              </Grid>
          </PlayBox>
          <ButtonMenu isLoading={isLoading} handleStart={handleStart} handleHitMe={handleHitMe}
                      handleReset={handleReset} handleStand={handleStand} />
      </Container>
    )
}
