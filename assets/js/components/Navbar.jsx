define(['react', 'react-redux', 'react-router'], function(React, ReactRedux, ReactRouter) {
  const { Component } = React
  const { connect } = ReactRedux
  const { Link } = ReactRouter

  class Navbar extends Component {
    doLogout() {
      this.props.actions.doLogout('/auth/logout_success')
    }
    
    render () {      
      return (
        <nav className='collapse navbar-collapse navigation' id='bs-example-navbar-collapse-1' role='navigation'>
          <ul className='nav navbar-nav navbar-right '>
            <li><Link to={`/topics`}>Topics</Link> </li>
            <li><Link to='/explore'>Explore</Link> </li>
            <li><Link to='/help'>Help</Link> </li>
            <li><Link to='/about'>About </Link> </li>
            { this.props.Auth.isAuthenticated == true
              ? (
                  <li><Link to='/me'>{this.props.Auth.user.username}</Link> 
                  <a href='javascript:;'>(Logout)</a></li>
              ) : <li><Link to='/auth'>Login / Register</Link> </li>
            }
          </ul>
        </nav>
      )
    }
  }

  return Navbar
})
