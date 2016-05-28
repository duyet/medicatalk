define(['react', 'react-router', './Profile', './Preferences', './Update', './Verify'], 
function(React, ReactRouter, Profile, Preferences, Update, Verify) {
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
            <Route path='/profile/preferences' component={(props, state) => <Preferences {...this.props} />}></Route>
            <Route path='/profile/update' component={(props, state) => <Update {...this.props} />}></Route>
            <Route path='/profile/verify' component={(props, state) => <Verify {...this.props} />}></Route>
            <Route path='/profile/edit' component={Profile}></Route>
          </Router>
          
        </div>

      );
    }
  }

  return ProfileContainer
})
