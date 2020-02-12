import {ACTIONS} from '../actions/actions'
import _ from 'lodash'

const defaultState = {
    isLoading: false,
    hasErrored: false,
    users: {},
    posts: {}
}

export function reducer(state = defaultState, action) {
    switch (action.type) {
        case ACTIONS.IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case ACTIONS.HAS_ERRORED:
            return {
                ...state,
                hasErrored: action.hasErrored
            }
        case ACTIONS.USERS_SUCCESS:
            return {
                ...state,
                users: action.users
            }
        case ACTIONS.POSTS_SUCCESS:
            return {
                ...state,
                posts: action.posts
            }
        case ACTIONS.RESET:
            return defaultState;
        default:
            return state;
    }
}
