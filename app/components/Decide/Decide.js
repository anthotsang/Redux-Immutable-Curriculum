import React, { PropTypes } from 'react'
import {
  container, choiceContainer, choice, header, subHeader, blueBackground,
  redBackground, circle, top, main, percentageText, countText, bottom, question
} from './styles.css'

function Choice ({text, order, submitChoice, selected, displayVotes, count, percent}) {
  const backgroundClass = order === "first" ? blueBackground : redBackground
  if (displayVotes === true) {
    return (
      <div className={[choice, backgroundClass].join(' ')} onClick={submitChoice}>
        <div className={top}>{selected === true ? 'O' : ' '}</div>
        <div className={main}>
          <div className={percentageText}>{`${percent}%`}</div>
          <div className={countText}>{count} {selected === true ? ' agree' : ' disagree'}</div>
        </div>
        <div className={bottom}>{text}</div>
      </div>
    )
  } else {
    return (
      <div className={[choice, backgroundClass].join(' ')} onClick={submitChoice}>
        <div className={question}>{text}</div>
      </div>
    )
  }

}

Decide.propTypes = {
  decision: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  userVoted: PropTypes.bool.isRequired,
  userVote: PropTypes.string.isRequired,
  submitChoice: PropTypes.func.isRequired,
}

export default function Decide ({isFetching, decision, userVoted, userVote, submitChoice}) {
    if (isFetching === true) {
      return <h1 className={subHeader}>{'Fetching'}</h1>
    }

    const total = decision.firstChoice.count + decision.secondChoice.count

    return (
      <div className={container}>
        <p className={header}>{'Would you rather...'}</p>
        <div className={choiceContainer}>
          <Choice
            text={decision.firstChoice.text}
            order='first'
            displayVotes={userVoted}
            selected={userVoted === true && userVote === 'first' ? true : false}
            count={decision.firstChoice.count}
            percent={total === 0 ? 0 : parseInt(decision.firstChoice.count/total*100)}
            submitChoice={() => submitChoice('first')} />
          <p className={circle}>OR</p>
          <Choice
            text={decision.secondChoice.text}
            order='second'
            displayVotes={userVoted}
            selected={userVoted === true && userVote === 'second' ? true : false}
            count={decision.secondChoice.count}
            percent={total === 0 ? 0 : parseInt(decision.secondChoice.count/total*100)}
            submitChoice={() => submitChoice('second')} />
        </div>
      </div>
    )
}