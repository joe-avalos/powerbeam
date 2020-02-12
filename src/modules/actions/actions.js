//Define random int generator api address
const urlPosts = 'https://jsonplaceholder.typicode.com/posts'
const urlUsers = 'https://jsonplaceholder.typicode.com/users'
//Set constants for consistency across app
export const ACTIONS = {
    IS_LOADING: 'IS_LOADING',
    HAS_ERRORED: 'HAS_ERRORED',
    USERS_SUCCESS: 'USERS_SUCCESS',
    POSTS_SUCCESS: 'POSTS_SUCCESS',
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

export function successUsers(users) {
    return {
        type: 'USERS_SUCCESS',
        users: users
    };
}

export function successPosts(posts) {
    return {
        type: 'POSTS_SUCCESS',
        posts: posts
    };
}

export function reset() {
  return {
    type: 'RESET'
  }
}

export function fetchUsers() {
    return (dispatch) => {
        //Set loading to true
        dispatch(isLoading(true))
        fetch(urlUsers)
          .then((response) => {
              if (!response.ok) {
                  //Throw error if response not ok
                  throw Error(response.statusText)
              }
              dispatch(isLoading(false))
              return response;
          })//Decode response and await promise
          .then(response => response.json())
          .then(users => {
              //Allocate received successful response
              dispatch(successUsers(users))
          })
          .catch(() => {
              //Handle errors
              dispatch(isLoading(false))
              dispatch(hasErrored(true))
          });
    };
}

export function fetchPosts() {
    return (dispatch) => {
        //Set loading to true
        dispatch(isLoading(true))
        fetch(urlPosts)
          .then((response) => {
              if (!response.ok) {
                  //Throw error if response not ok
                  throw Error(response.statusText)
              }
              dispatch(isLoading(false))
              return response;
          })//Decode response and await promise
          .then(response => response.json())
          .then(posts => {
              //Allocate received successful response
              dispatch(successPosts(posts))
          })
          .catch(() => {
              //Handle errors
              dispatch(isLoading(false))
              dispatch(hasErrored(true))
          });
    };
}
