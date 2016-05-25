define(['react', 'react-router', '../../Rest', '../../Store', './Login', './Register'], 
function(React, ReactRouter, Rest, Store, Login, Register) {
  const { PropTypes, Component } = React
  const { Router, Route, browserHistory, Link } = ReactRouter

  class Home extends Component {
    componentDidMount() {

    }

    render() {
      const parent_props = this.props
      return (
        <div className='auth wrap'>

          <Router>
            <Route path='/auth/register' component={(props, state) => <Register {...parent_props} />}></Route>
            <Route path='/auth*' component={(props, state) => <Login {...parent_props} />}></Route>
          </Router>

          <div className='row text-center' style={{ marginTop: 60 }}>
            <Link to='/auth/login'>Login</Link> or <Link to='/auth/register'>Register</Link> 
          </div>
          
        </div>

      );
    }
  }

  return Home
})
