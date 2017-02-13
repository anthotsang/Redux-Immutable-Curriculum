import {
  saveDecision, listenToFeed, stopListeningToFeed, fetchDecision,
  saveUserVote, saveDecisionCount } from 'helpers/api'
import { closeModal } from './modal'
import { addListener, deleteListener } from './listeners'
import { addUserVote } from './users'

const SETTING_DECISIONS_LISTENER = 'SETTING_DECISIONS_LISTENER'
const SETTING_DECISIONS_LISTENER_FAILURE = 'SETTING_DECISIONS_LISTENER_FAILURE'
const SETTING_DECISIONS_LISTENER_SUCCESS = 'SETTING_DECISIONS_LISTENER_SUCCESS'
const ADD_DECISION = 'ADD_DECISION'
const ADD_DECISION_ERROR = 'ADD_DECISION_ERROR'

function settingDecisionsListener () {
  return {
    type: SETTING_DECISIONS_LISTENER,
  }
}

function settingDecisionsListenerFailure (error) {
  console.warn(error)
  return {
    type: SETTING_DECISIONS_LISTENER_FAILURE,
    error: 'Error setting decisions listener'
  }
}

function settingDecisionsListenerSuccess (decisions) {
  return {
    type: SETTING_DECISIONS_LISTENER_SUCCESS,
    decisions,
  }
}

export function setAndHandleDecisionsListener () {
  return function (dispatch, getState) {
    if (getState().listeners.decisions === true) {
      return
    }

    dispatch(addListener('decisions'))
    dispatch(settingDecisionsListener())

    listenToFeed(
      (feed) => dispatch(settingDecisionsListenerSuccess(feed)),
      (error) => dispatch(settingDecisionsListenerFailure(error))
    )
  }
}

export function removeListener () {
  return function (dispatch, getState) {
    if (getState().listeners.decisions === false) {
      return
    }

    dispatch(deleteListener('decisions'))
    stopListeningToFeed()
  }
}

function addDecision (decision) {
  return {
    type: ADD_DECISION,
    decision,
  }
}

function addDecisionError (error) {
  console.warn(error)
  return {
    type: ADD_DECISION_ERROR,
    error: 'Error adding decision'
  }
}

export function fetchAndHandleDecision (decisionId) {
  return function (dispatch) {
    fetchDecision(decisionId)
      .then((decision) => dispatch(addDecision(decision)))
      .catch((error) => dispatch(addDecisionError(error)))
  }
}

export function handleAddDecision (decision) {
  return function (dispatch) {
    addDecision
      .catch((error) => addDecisionError(error))
  }
}

export function voteFanout (decisionId, vote, previousChoice) {
  return function (dispatch, getState) {
    const uid = getState().users.authedId
    const firstChoice = vote === 'first' && previousChoice !== 'first' ? 1 : (vote === 'second' && previousChoice === 'first' ? -1 : 0)
    const secondChoice = vote === 'second'  && previousChoice !== 'second' ? 1 : (vote === 'first' && previousChoice === 'second' ? -1 : 0)

    Promise.all([
      saveUserVote(uid, decisionId, vote),
      saveDecisionCount(decisionId, firstChoice, secondChoice)
    ])
      .then((results) => {
        const decision = results[1].snapshot.val()

        dispatch(addUserVote(uid, decisionId, vote))
        dispatch(addDecision(decision))
      })
      .catch((error) => dispatch(addDecisionError(error)))
  }
}

const initialState = {
  isFetching: true,
  error: '',
  lastUpdated: 0,
  decisions: {},
}

export default function decisions (state = initialState, action) {
  switch (action.type) {
    case SETTING_DECISIONS_LISTENER:
      return {
        ...state,
        isFetching: true,
        error: ''
      }
    case SETTING_DECISIONS_LISTENER_FAILURE:
    case ADD_DECISION_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case SETTING_DECISIONS_LISTENER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        lastUpdated: Date.now(),
        decisions: {...state.decisions, ...action.decisions},
      }
    case ADD_DECISION:
      return {
        ...state,
        isFetching: false,
        lastUpdated: Date.now(),
        decisions: {...state.decisions, [action.decision.decisionId]: action.decision},
      }
    default:
      return state
  }
}