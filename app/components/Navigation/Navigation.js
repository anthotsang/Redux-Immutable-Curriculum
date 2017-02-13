import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { container, navContainer, link } from './styles.css'
import { ModalContainer } from 'containers'

function HomeLink () {
  return (
    <li><Link to='/' className={link}>{'Home'}</Link></li>
  )
}

function NavLinks ({isAuthed}) {
  return isAuthed === true
  ? <ul>
    <HomeLink />
  </ul>
  : <ul>
    <HomeLink />
    <li><Link to='/auth' className={link}>{'Authenticate'}</Link></li>
  </ul>
}

function SecondaryLinks ({isAuthed}) {
  return isAuthed === true
  ? <ul>
    <li><ModalContainer /></li>
    <li><Link to='/logout' className={link}>{'Logout'}</Link></li>
  </ul>
  : null
}

export default function Navigation ({isAuthed, isFetching}) {
  if (isFetching === true) return <div className={container}></div>

  return (
    <div className={container}>
      <nav className={navContainer}>
        <NavLinks isAuthed={isAuthed} />
        <SecondaryLinks isAuthed={isAuthed} />
      </nav>
    </div>
  )
}