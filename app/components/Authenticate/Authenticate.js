import React, { PropTypes } from 'react'
import { container, title, button } from './styles.css'
import { errorMsg } from 'styles/styles.css'

Authenticate.propTypes = {
  error: PropTypes.string.isRequired,
  onAuth: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
}

function FacebookButton ({onAuth, isFetching}) {
  return (
    <button className={button} onClick={onAuth}>
      {isFetching === false
        ? 'Login with Facebook'
        : 'Fetching ...'
      }
    </button>
  )
}

export default function Authenticate ({error, onAuth, isFetching}) {
  return (
    <div className={container}>
      <p className={title}>{'Authenticate'}</p>
      <FacebookButton onAuth={onAuth} isFetching={isFetching} />
      {error ? <p className={errorMsg}>{error}</p> : null}
    </div>
  )
}