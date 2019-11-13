//Define random int generator api address
const url = 'https://www.random.org/integers/?num=1&min=0&max=16777216&col=1&base=10&format=plain&rnd=new'
//Set constants for consistency across app
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
        //Set loading to true
        dispatch(cardIsLoading(true))
        fetch(url)
          .then((response) => {
              if (!response.ok) {
                  //Throw error if response not ok
                  throw Error(response.statusText)
              }
              dispatch(cardIsLoading(false))
              return response;
          })//Decode response and await promise
          .then((response) => response.json())
          .then((card) => {
              //Check where to allocate received card dealer||player
              if (user === 'player') {
                  dispatch(cardPlayerSuccess(card))
              }else{
                  dispatch(cardDealerSuccess(card))
              }
          })
          .catch(() => {
              //Handle errors
              dispatch(cardIsLoading(false))
              dispatch(cardHasErrored(true))
          });
    };
}
