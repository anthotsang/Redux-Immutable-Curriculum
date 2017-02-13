const OPEN_MODAL = 'OPEN_MODAL'
const CLOSE_MODAL = 'CLOSE_MODAL'
const UPDATE_TITLE = 'UPDATE_TITLE'
const UPDATE_FIRST_DECISION = 'UPDATE_FIRST_DECISION'
const UPDATE_SECOND_DECISION = 'UPDATE_SECOND_DECISION'

export function openModal () {
  return {
    type: OPEN_MODAL,
  }
}

export function closeModal () {
  return {
    type: CLOSE_MODAL,
  }
}

export function updateTitle (newTitleText) {
  return {
    type: UPDATE_TITLE,
    newTitleText,
  }
}

export function updateFirstDecision (newFirstText) {
  return {
    type: UPDATE_FIRST_DECISION,
    newFirstText,
  }
}

export function updateSecondDecision (newSecondText) {
  return {
    type: UPDATE_SECOND_DECISION,
    newSecondText,
  }
}

const initialState = {
  isOpen: false,
  title: '',
  first: '',
  second: '',
}

export default function modal (state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isOpen: true,
      }
    case CLOSE_MODAL:
      return {
        ...state,
        isOpen: false,
      }
    case UPDATE_TITLE:
      return {
        ...state,
        title: action.newTitleText,
      }
    case UPDATE_FIRST_DECISION:
      return {
        ...state,
        first: action.newFirstText,
      }
    case UPDATE_SECOND_DECISION:
      return {
        ...state,
        second: action.newSecondText,
      }
    default:
      return state
  }
}