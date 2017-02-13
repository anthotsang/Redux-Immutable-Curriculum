import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Decision } from 'components'

const DecisionContainer = React.createClass({
  propTypes: {
    userVotes: PropTypes.object.isRequired,
    decision: PropTypes.object.isRequired,
  },
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  handleClick (e) {
     e.stopPropagation()
     this.context.router.push('/decide/' + this.props.decision.decisionId)
  },
  render () {
    const userVoted = this.props.userVotes.hasOwnProperty(this.props.decision.decisionId)

    return (
      <Decision
        onClick={this.handleClick}
        decision={this.props.decision}
        userVoted={userVoted} />
    )
  },
})

function mapStateToProps (state) {
  return {
    userVotes: !!state.users[state.users.authedId].userVotes ? state.users[state.users.authedId].userVotes : {},
  }
}

export default connect(
  mapStateToProps
)(DecisionContainer)