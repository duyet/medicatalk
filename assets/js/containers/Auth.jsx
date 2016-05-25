define(['redux', 'react-redux', '../Actions', '../components/Auth/Index'], 
function(Redux, ReactRedux, Actions, Auth) {
  const { connect } = ReactRedux
  const { bindActionCreators } = Redux

  const mapStateToProps = (state, ownProps) => {
    return state
  }

  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      actions : bindActionCreators(Actions, dispatch),
      doRegister:  (email, username = '', password, cb = () => {}) => {
        dispatch(Actions.doRegister(email, username, password, cb))
      },
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Auth)
})
