define(['react-redux', '../Actions', '../components/Header'], function(ReactRedux, Actions, Header) {
  const { connect } = ReactRedux
  const { setVisibilityFilter } = Actions

  const mapStateToProps = (state, ownProps) => {
    return {
      title: 'Medica Talk',
      logoText: '[m]',
      isAuthenticated: (!!state.auth && !!state.auth.isAuthenticated)
    }
  }

  const mapDispatchToProps = (dispath, ownProps) => {
    return {

    }
  }

  const HeaderContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)

  return HeaderContainer
})
