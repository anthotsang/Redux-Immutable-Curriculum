export function formatUserInfo (uid, name) {
  return {
    uid,
    name
  }
}

export function formatDecision (author, {title, firstChoice, secondChoice}) {
  return {
    author,
    title,
    firstChoice: {
      text: firstChoice,
      count: 0,
    },
    secondChoice: {
      text: secondChoice,
      count: 0,
    },
    timestamp: Date.now(),
  }
}

export function formatTimestamp (timestamp) {
  const date = new Date(timestamp)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}