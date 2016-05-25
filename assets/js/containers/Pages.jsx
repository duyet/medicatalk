define(['redux', 'react-redux', 'Actions', '../components/Pages/Index'], 
function(Redux, ReactRedux, Actions, Pages) {
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
  )(Pages)
})
