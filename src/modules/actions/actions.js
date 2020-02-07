//Define random int generator api address
const url = 'https://www.random.org/integers/?num=1&min=0&max=16777216&col=1&base=10&format=plain&rnd=new'
//Set constants for consistency across app
export const ACTIONS = {
    IS_LOADING: 'IS_LOADING',
    HAS_ERRORED: 'HAS_ERRORED',
    SUCCESS: 'SUCCESS',
    RESET: 'RESET'
}

export function hasErrored(bool) {
    return {
        type: 'HAS_ERRORED',
        hasErrored: bool
    };
}
export function isLoading(bool) {
    return {
        type: 'IS_LOADING',
        isLoading: bool
    };
}

export function success(item) {
    return {
        type: 'SUCCESS',
        item: item
    };
}

export function reset() {
  return {
    type: 'RESET'
  }
}

export function fetchData(user) {
    return (dispatch) => {
        //Set loading to true
        dispatch(isLoading(true))
        fetch(url)
          .then((response) => {
              if (!response.ok) {
                  //Throw error if response not ok
                  throw Error(response.statusText)
              }
              dispatch(isLoading(false))
              return response;
          })//Decode response and await promise
          .then(response => response.json())
          .then(item => {
              //Allocate received successful response
              dispatch(success(item))
          })
          .catch(() => {
              //Handle errors
              dispatch(isLoading(false))
              dispatch(hasErrored(true))
          });
    };
}
