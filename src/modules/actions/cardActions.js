const url = 'https://www.random.org/integers/?num=1&min=0&max=16777216&col=1&base=10&format=plain&rnd=new'

export const CARD_ACTIONS = {
    CARD_IS_LOADING: 'CARD_IS_LOADING',
    CARD_HAS_ERRORED: 'CARD_HAS_ERRORED',
    CARD_DEALER_SUCCESS: 'CARD_DEALER_SUCCESS',
    CARD_PLAYER_SUCCESS: 'CARD_PLAYER_SUCCESS',
    CARD_RESET: 'CARD_RESET'
}

export function cardHasErrored(bool) {
    return {
        type: 'CARD_HAS_ERRORED',
        hasErrored: bool
    };
}
export function cardIsLoading(bool) {
    return {
        type: 'CARD_IS_LOADING',
        isLoading: bool
    };
}
export function cardDealerSuccess(card) {
    return {
        type: 'CARD_DEALER_SUCCESS',
        card: card
    };
}
export function cardPlayerSuccess(card) {
    return {
        type: 'CARD_PLAYER_SUCCESS',
        card: card
    };
}
export function cardReset() {
    return {
        type: 'CARD_RESET'
    }
}

export function cardFetchData(user) {
    return (dispatch) => {
        dispatch(cardIsLoading(true))
        fetch(url)
          .then((response) => {
              if (!response.ok) {
                  throw Error(response.statusText)
              }
              dispatch(cardIsLoading(false))
              return response;
          })
          .then((response) => response.json())
          .then((card) => {
              if (user === 'player') {
                  dispatch(cardPlayerSuccess(card))
              }else{
                  dispatch(cardDealerSuccess(card))
              }
          })
          .catch(() => dispatch(cardHasErrored(true)));
    };
}
