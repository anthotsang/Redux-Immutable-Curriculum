import React, { PropTypes } from 'react'
import { Authenticate } from 'components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as usersActionCreators from 'redux/modules/users'

const AuthenticateContainer = React.createClass({
  propTypes:{
    error: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchAuthandHandleUser: PropTypes.func.isRequired,
  },
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  handleAuth (e) {
    e.preventDefault()
    this.props.fetchAuthandHandleUser()
      .then((results) => this.context.router.replace('/results'))
  },
  render () {
    return (
      <Authenticate
        isFetching={this.props.isFetching}
        error={this.props.error}
        onAuth={this.handleAuth} />
    )
  },
})

function mapStateToProps (state) {
  return {
    error: state.users.error,
    isFetching: state.users.isFetching,
  }
}

export default connect(
  mapStateToProps,
  (dispatch) => bindActionCreators(usersActionCreators, dispatch)
)(AuthenticateContainer)