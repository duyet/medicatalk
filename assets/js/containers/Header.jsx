define(['redux', 'react-redux', 'Actions', '../components/Header'], 
function(Redux, ReactRedux, Actions, Header) {
  
  const { connect } = ReactRedux
  const { setVisibilityFilter } = Actions
  const { bindActionCreators } = Redux

  const mapStateToProps = (state, ownProps) => {
    return Object.assign({}, state, {
      title: 'Medica Talk',
      logoText: '[m]',
    })
  }

  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      actions : bindActionCreators(Actions, dispatch),
    }
  }

  const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)

  return HeaderContainer
})
