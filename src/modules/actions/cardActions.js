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
export function cardFetchSuccess(card) {
    return {
        type: 'CARD_FETCH_SUCCESS',
        card
    };
}

export function cardFetchData(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        fetch(url)
          .then((response) => {
              if (!response.ok) {
                  throw Error(response.statusText);
              }
              dispatch(itemsIsLoading(false));
              return response;
          })
          .then((response) => response.json())
          .then((items) => dispatch(itemsFetchDataSuccess(items)))
          .catch(() => dispatch(itemsHasErrored(true)));
    };
}
