import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Results } from 'components'
import * as decisionsActionCreators from 'redux/modules/decisions'

const ResultsContainer = React.createClass({
  propTypes: {
    decisions: PropTypes.object.isRequired,
    error: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    setAndHandleDecisionsListener: PropTypes.func.isRequired,
  },
  componentDidMount () {
    this.props.setAndHandleDecisionsListener()
  },
  render () {
    return (
      <Results
        decisions={this.props.decisions.decisions}
        error={this.props.error}
        isFetching={this.props.isFetching} />
    )
  },
})

function mapStateToProps (state) {
  return {
    decisions: state.decisions,
    error: state.decisions.error,
    isFetching: state.decisions.isFetching || state.users.isFetching,
  }
}

export default connect(
  mapStateToProps,
  (dispatch) => bindActionCreators(decisionsActionCreators, dispatch)
)(ResultsContainer)