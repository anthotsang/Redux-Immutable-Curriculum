import { saveUser, fetchUsersVotes } from 'helpers/api'
import auth, { logout } from 'helpers/auth'
import { formatUserInfo } from 'helpers/utils'
import { removeListener } from 'redux/modules/decisions'

const AUTH_USER = 'AUTH_USER'
const UNAUTH_USER = 'UNAUTH_USER'
const FETCHING_USER = 'FETCHING_USER'
const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE'
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'
const REMOVE_FETCHING_USER = 'REMOVE_FETCHING_USER'
const ADD_USERS_VOTES = 'ADD_USERS_VOTES'
const ADD_USER_VOTE = 'ADD_USER_VOTE'

function fetchingUser () {
  return {
    type: FETCHING_USER,
  }
}

export function removeFetchingUser () {
  return {
    type: REMOVE_FETCHING_USER,
  }
}

export function authUser (uid) {
  return {
    type: AUTH_USER,
    uid,
  }
}

function unauthUser () {
  return {
    type: UNAUTH_USER,
  }
}

function addUsersVotes (uid, votes) {
  return {
    type:ADD_USERS_VOTES,
    uid,
    votes,
  }
}

export function addUserVote (uid, voteId, voteData) {
  return {
    type:ADD_USER_VOTE,
    uid,
    voteId,
    voteData,
  }
}

function fetchingUserFailure (error) {
  console.warn(error)
  return {
    type: FETCHING_USER_FAILURE,
    error: 'Error fetching user'
  }
}

export function fetchingUserSuccess (uid, userInfo, timestamp) {
  return {
    type: FETCHING_USER_SUCCESS,
    uid,
    userInfo,
    timestamp,
  }
}

export function logoutAndUnauthUser () {
  return function (dispatch) {
    dispatch(removeListener())
    logout()
    dispatch(unauthUser())
  }
}


export function fetchAndAddUsersVotes (uid) {
  return function (dispatch) {
    return fetchUsersVotes(uid)
      .then((votes) => dispatch(addUsersVotes(uid, votes)))
      .catch((err) => console.warn(err))
  }
}

export function fetchAuthandHandleUser () {
  return function (dispatch) {
    console.log('fetching user')
    dispatch(fetchingUser())
    return auth()
      .then(({user, credential}) => {
        const userInfo = formatUserInfo(user.uid, user.providerData[0].displayName)
        dispatch(fetchAndAddUsersVotes(user.uid))
        return {
          uid: user.uid,
          userInfo,
          timestamp: Date.now(),
        }
      })
      .then(({uid, userInfo, timestamp}) => {
        const authUserPromise = dispatch(authUser(uid))
        return {
          uid,
          userInfo,
          timestamp,
        }
      })
      .then(({uid, userInfo, timestamp}) => dispatch(fetchingUserSuccess(uid, userInfo, timestamp)))
      .then(({userInfo}) => saveUser(userInfo))
      .catch((error) => dispatch(fetchingUserFailure(error)))
  }
}

const initialUserState = {
  lastUpdated: 0,
  info: {
    name: '',
    uid: '',
  },
  userVotes: {},
}

function user (state = initialUserState, action) {
  switch (action.type) {
    case FETCHING_USER_SUCCESS :
      return {
        ...state,
        info: action.userInfo,
        lastUpdated: action.timestamp,
      }
    default :
      return state
  }
}

const initialState = {
  isAuthed: false,
  isFetching: true,
  loginChecked: false,
  error: '',
  authedId: '',
}

export default function users (state = initialState, action)
{
  switch (action.type) {
    case FETCHING_USER:
      return {
        ...state,
        isFetching: true,
        loginChecked: true,
        error: ''
      }
    case REMOVE_FETCHING_USER:
      return {
        ...state,
        isFetching: false,
      }
    case AUTH_USER:
      return {
        ...state,
        isAuthed: true,
        loginChecked: true,
        authedId: action.uid
      }
    case UNAUTH_USER:
      return {
        ...state,
        isAuthed: false,
        authedId: '',
      }
    case FETCHING_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        loginChecked: true,
        error: action.error,
      }
    case FETCHING_USER_SUCCESS:
      return action.user === null
        ? {
          ...state,
          isFetching: false,
          loginChecked: true,
          error: '',
        }
        : {
          ...state,
          isFetching: false,
          loginChecked: true,
          error: '',
          [action.uid]: user(state[action.uid], action),
        }
    case ADD_USERS_VOTES:
      return {
        ...state,
        [action.uid]: {
          ...state[action.uid],
          userVotes: action.votes,
        },
      }
    case ADD_USER_VOTE:
    return {
      ...state,
      [action.uid]: {
        ...state[action.uid],
        userVotes: {
           ...state[action.uid].userVotes,
           [action.voteId]: action.voteData,
        },
      },
    }
    default:
      return state
  }
}