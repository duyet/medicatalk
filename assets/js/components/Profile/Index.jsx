define(['react', 'react-router', './Profile'], 
function(React, ReactRouter, Profile) {
  const { PropTypes, Component } = React
  const { Router, Route, browserHistory, Link } = ReactRouter

  class ProfileContainer extends Component {
    componentDidMount() {
      if (!this.props.Auth.isAuthenticated) {
        this.props.actions.redirect('/auth/login')
        return;
      }
    }

    render() {
      const parent_props = this.props
      return (
        <div className='wrap container profile'>

          <Router>
            <Route path='/profile' component={(props, state) => <Profile {...this.props} />}></Route>
            <Route path='/profile/password' component={Profile}></Route>
            <Route path='/profile/verify' component={Profile}></Route>
            <Route path='/profile/edit' component={Profile}></Route>
          </Router>
          
        </div>

      );
    }
  }

  return ProfileContainer
})
