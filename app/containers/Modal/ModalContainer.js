import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Modal } from 'components'
import * as modalActionCreators from 'redux/modules/modal'
import * as decisionsActionCreators from 'redux/modules/decisions'

function mapStateToProps ({modal, users}) {
  const {title, first, second, isOpen} = modal
  return {
    user: users[users.authedId] ? users[users.authedId].info : {},
    title,
    first,
    second,
    isSubmitDisabled: title.length <= 0 || first.length <= 0 || second.length <= 0,
    isOpen,
  }
}

export default connect(
  mapStateToProps,
  (dispatch) => bindActionCreators({...modalActionCreators, ...decisionsActionCreators}, dispatch)
)(Modal)