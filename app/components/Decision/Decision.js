import React, { PropTypes } from 'react'
import { formatTimestamp } from 'helpers/utils'
import { container, details, title } from './styles.css'

Decision.propTypes = {
  decision: PropTypes.object.isRequired,
  userVoted: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default function Decision ({decision, userVoted, onClick}) {
  return (
    <div
      className={container}
      style={{borderLeftColor: userVoted === true ? 'rgb(102, 200, 235)' : 'rgb(231, 49, 48)'}}
      onClick={onClick}>
      <div className={details}>
        <div className={title}>{decision.title}</div>
        <div>
          {`${formatTimestamp(decision.timestamp)} by ${decision.author}`}
        </div>
      </div>
      <div>{userVoted === true ? 'O' : 'X'}</div>
    </div>
  )
}