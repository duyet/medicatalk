define(['redux', 'react-redux', 'Actions', '../components/Profile/Index'], 
function(Redux, ReactRedux, Actions, Profile) {
  const { connect } = ReactRedux
  const { bindActionCreators } = Redux

  const mapStateToProps = (state, ownProps) => {
    return state
  }

  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      actions : bindActionCreators(Actions, dispatch),
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Profile)
})
