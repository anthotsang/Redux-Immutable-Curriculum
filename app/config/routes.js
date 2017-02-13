import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import {
  MainContainer, HomeContainer, AuthenticateContainer,  ResultsContainer,
  LogoutContainer, DecideContainer
} from 'containers'

export default function getRoutes (checkAuth, history) {
  return (
    <Router history={history}>
      <Router path='/' component={MainContainer}>
        <Route path='/auth' component={AuthenticateContainer} onEnter={checkAuth} />
        <Route path='/results' component={ResultsContainer} onEnter={checkAuth} />
        <Route path='/decide/:decisionId' component={DecideContainer} onEnter={checkAuth} />
        <Route path='/logout' component={LogoutContainer} />
        <IndexRoute component={HomeContainer} onEnter={checkAuth} />
      </Router>
    </Router>
  )
}