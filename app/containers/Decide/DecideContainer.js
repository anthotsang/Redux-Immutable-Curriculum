import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Decide } from 'components'
import * as decisionActionCreators from 'redux/modules/decisions'

const DecideContainer = React.createClass({
  propTypes: {
    decision: PropTypes.object.isRequired,
    decisionId: PropTypes.string.isRequired,
    decisionNeedsFetching: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    userVotes: PropTypes.object.isRequired,
    fetchAndHandleDecision: PropTypes.func.isRequired,
    voteFanout: PropTypes.func.isRequired,
  },
  componentDidMount () {
    if (this.props.decisionNeedsFetching === true) {
      this.props.fetchAndHandleDecision(this.props.decisionId)
    }
  },
  handleChoice (decisionId, choice, previousChoice = '') {
    this.props.voteFanout(decisionId, choice, previousChoice)
  },
  render () {
    const {decision, decisionId, isFetching, userVotes} = this.props
    const userVoted = userVotes.hasOwnProperty(decisionId)
    const userVote = userVoted === true ? userVotes[decisionId] : ''

    return (
      <Decide
        decision={decision}
        isFetching={isFetching}
        userVoted={userVoted}
        userVote={userVote}
        submitChoice={(choice) => this.handleChoice(decisionId, choice, userVote)} />
    )
  },
})

function mapStateToProps({decisions, users}, {routeParams}) {
  const decision = decisions.decisions[routeParams.decisionId]
  const user = users[users.authedId]

  return {
    decision: decision || {},
    decisionId: routeParams.decisionId,
    decisionNeedsFetching: typeof decision === 'undefined',
    isFetching: decisions.isFetching,
    userVotes: typeof user === 'undefined' ? {} : users[users.authedId].userVotes
  }
}

export default connect(
  mapStateToProps,
  (dispatch) => bindActionCreators(decisionActionCreators, dispatch)
)(DecideContainer)