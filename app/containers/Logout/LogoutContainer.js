import React, { PropTypes } from 'react'
import { Logout } from 'components'
import { connect } from 'react-redux'
import { logoutAndUnauthUser } from 'redux/modules/users'

const LogoutContainer = React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired
  },
  componentDidMount () {
    this.props.dispatch(logoutAndUnauthUser())
  },
  render () {
    return (
      <Logout />
    )
  },
})

export default connect()(LogoutContainer)