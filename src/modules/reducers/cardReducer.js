import {CARD_ACTIONS} from '../actions/cardActions'
import _ from 'lodash'

const defaultState = {
    isLoading: false,
    hasErrored: false,
    dealerCards: [],
    playerCards: []
}

export function cardReducer(state = defaultState, action) {
    switch (action.type) {
        case CARD_ACTIONS.CARD_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case CARD_ACTIONS.CARD_HAS_ERRORED:
            return {
                ...state,
                hasErrored: action.hasErrored
            }
        case CARD_ACTIONS.CARD_DEALER_SUCCESS:
            //Get card "value" from random int % 52
            let dealerCards = _.cloneDeep(state.dealerCards)
            let dealCard = action.card % 52
            dealerCards.push(dealCard)
            return {
                ...state,
                dealerCards: dealerCards
            }
        case CARD_ACTIONS.CARD_PLAYER_SUCCESS:
            //Get card "value" from random int % 52
            let playerCards = _.cloneDeep(state.playerCards)
            let playCard = action.card % 52
            playerCards.push(playCard)
            return {
                ...state,
                playerCards: playerCards
            }
        case CARD_ACTIONS.CARD_RESET:
            return defaultState;
        default:
            return state;
    }
}
