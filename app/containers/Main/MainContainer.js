import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Navigation } from 'components'
import * as usersActionCreators from 'redux/modules/users'
import { formatUserInfo } from 'helpers/utils'
import { firebaseAuth } from 'config/constants'
import { container, innerContainer } from './styles.css'

const MainContainer = React.createClass({
  propTypes: {
    isAuthed: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    authUser: PropTypes.func.isRequired,
    fetchingUserSuccess: PropTypes.func.isRequired,
    removeFetchingUser: PropTypes.func.isRequired,
    fetchAndAddUsersVotes: PropTypes.func.isRequired,
  },
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  componentDidMount () {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user && !this.props.isAuthed) {
        const userInfo = formatUserInfo(user.uid, user.providerData[0].displayName)
        this.props.authUser(user.uid)
        this.props.fetchAndAddUsersVotes(user.uid)
          .then(() => this.props.fetchingUserSuccess(user.uid, userInfo, Date.now()))
          .then(() => {
            if (this.props.location.pathname == '/' || this.props.location.pathname == 'auth' || this.props.location.pathname == '/logout') {
              this.context.router.replace('results')
            }
          })
      } else {
        this.props.removeFetchingUser()
      }
    })
  },
  render () {
    return (
      <div className={container}>
        <Navigation isAuthed={this.props.isAuthed} isFetching={this.props.isFetching} />
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
    )
  },
})

function mapStateToProps(state) {
  return {
    isAuthed: state.users.isAuthed,
    isFetching: state.users.isFetching,
  }
}

export default connect(
  mapStateToProps,
  (dispatch) => bindActionCreators(usersActionCreators, dispatch)
)(MainContainer)