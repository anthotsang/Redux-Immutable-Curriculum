{
  users: {
    isAuthed,
    isFetching,
    error,
    authedId,
    [uid]: {
      lastUpdated,
      info: {
        name,
        uid,
      }
      votes: [decisionId, decisionId],
    }
  },
  decisions: {
    isFetching,
    error,
    [decisionId]: {
      decisionId,
      author,
      timestamp,
      title,
      lastUpdated,
      firstChoice: {
        text,
        count
      },
      secondChoice: {
        text,
        count
      }
    }
  },
  usersVotes: {
    isFetching,
    error,
    [uid]: {
      [voteId]: {
        choice
      }
    }
  }
  modal: {
    title,
    first,
    second,
    isOpen
  },
  listeners:{
    [listenerid]: true
  }
}