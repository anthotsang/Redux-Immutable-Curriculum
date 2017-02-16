import { ref } from 'config/constants'

export function saveUser (user) {
  return ref.child(`users/${user.uid}`)
    .update(user)
    .then(() => user)
}

export function saveDecision (decision) {
  const decisionId = ref.child('decisions').push().key
  const decisionWithId = {...decision, decisionId}
  return ref.child(`decisions/${decisionId}`).set(decisionWithId)
    .then(() => decisionWithId)
}

export function listenToFeed (cb, errorCB) {
  ref.child('decisions').on('value', (snapshot) => {
    const feed = snapshot.val() || {}
    cb(feed)
  }, errorCB)
}

export function stopListeningToFeed () {
  ref.child('decisions').off()
}

export function fetchUsersVotes (uid) {
  return ref.child(`users/${uid}/usersVotes`).once('value')
    .then((snapshot) => snapshot.val() || {})
}

export function fetchDecision(decisionId) {
  return ref.child(`decisions/${decisionId}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}

export function saveUserVote(uid, decisionId, vote) {
  return ref.child(`users/${uid}/usersVotes`)
    .update({[decisionId]: vote})
}

export function saveDecisionCount(decisionId, firstOption, secondOption) {
  return ref.child(`decisions/${decisionId}`)
    .transaction((currentData = {firstChoice: {count: 0}, secondChoice: {count: 0}}) => {
      if (currentData === null) {
        return 0
      }

      return {
        ...currentData,
        firstChoice: {
          ...currentData.firstChoice,
          count: currentData.firstChoice.count + firstOption,
        },
        secondChoice: {
          ...currentData.secondChoice,
          count: currentData.secondChoice.count + secondOption,
        },
      }
    }, () => 0, false)
}