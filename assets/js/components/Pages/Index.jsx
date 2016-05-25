define(['react', 'react-router', './About', './Help'], 
function(React, ReactRouter, About, Help) {
  const { PropTypes, Component } = React
  const { Router, Route, browserHistory, Link } = ReactRouter

  class ProfileContainer extends Component {
    componentDidMount() {
    }

    render() {
      const parent_props = this.props
      return (
        <div className='wrap container pages'>

          <Router>
            <Route path='/pages/about' component={(props, state) => <About {...this.props} />}></Route>
            <Route path='/pages/help' component={(props, state) => <Help {...this.props} />}></Route>
          </Router>
          
        </div>

      );
    }
  }

  return ProfileContainer
})
