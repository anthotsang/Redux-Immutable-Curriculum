import React, { PropTypes } from 'react'
import { DecisionContainer } from 'containers'
import { container, header, subHeader } from './styles.css'
import { errorMsg } from 'styles/styles.css'

Results.propTypes = {
  decisions: PropTypes.object.isRequired,
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
}

export default function Results (props) {
  const sortedIds = props.isFetching === false && !!props.decisions ? Object.keys(props.decisions).sort((a,b) => {
    return props.decisions[b].timestamp - props.decisions[a].timestamp
  }) : []

  return props.isFetching === true
    ? <h1 className={subHeader}>{'Fetching'}</h1>
    : <div className={container}>
      <p className={header}>{'Decisions'}</p>
      {sortedIds.size === 0
        ? <p className={header}>{'There are no decisions. Be the first to add a decision!'}</p>
        : sortedIds.map((decisionId) => (
          <DecisionContainer key={decisionId} decision={props.decisions[decisionId]} />
        ))
      }
      {props.error ? <p className={errorMsg}>{props.error}</p> : null}
    </div>
}