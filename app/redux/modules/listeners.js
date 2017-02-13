const ADD_LISTENER = 'ADD_LISTENER'
const DELETE_LISTENER = 'DELETE_LISTENER'

export function addListener (listenerId) {
  return {
    type: ADD_LISTENER,
    listenerId,
  }
}

export function deleteListener (listenerId) {
  return {
    type: DELETE_LISTENER,
    listenerId,
  }
}

export default function listeners (state = {}, action) {
  switch (action.type) {
    case ADD_LISTENER :
      return {
        ...state,
        [action.listenerId]: true,
      }
    case DELETE_LISTENER :
      return {
        ...state,
        [action.listenerId]: false,
      }
    default :
      return state
  }
}