import { ref, firebaseAuth } from 'config/constants'
import firebase from 'firebase'

export default function auth () {
  return firebaseAuth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
}

export function logout () {
  return firebaseAuth().signOut()
}

export function checkIfAuthed (store) {
  // What about firebase?
  return store.getState().users.isAuthed
}