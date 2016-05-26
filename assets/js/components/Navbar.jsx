define(['react', 'react-redux', 'react-router', 'jquery', 'bootstrap'], function(React, ReactRedux, ReactRouter, $, bootstrap) {
  const { Component } = React
  const { connect } = ReactRedux
  const { Link } = ReactRouter

  // Auto collapse 
  $(document).on('click', function(e) {
    $('#medica-navbar').collapse('hide')
  })

  class Navbar extends Component {
    doLogout() {
      this.props.actions.doLogout('/auth/logout_success')
    }
    
    render () {      
      return (
        <nav className='collapse navbar-collapse navigation' id='medica-navbar' role='navigation'>
          <ul className='nav navbar-nav navbar-right '>
            { this.props.Auth.isAuthenticated == true ? <li><Link to={`/topics`}><span className='lnr lnr-bubble'></span> Topics</Link> </li> : '' }
            
            <li>
              { this.props.Auth.isAuthenticated == true ? <Link to='/explore'><span className='lnr lnr-chart-bars'></span> Explore</Link> : '' }
              <Link to='/pages/about'><span className='lnr lnr-apartment'></span> About </Link>
              <Link to='/pages/help'><span className='lnr lnr-question-circle'></span> Help</Link>
             </li>
            
            { this.props.Auth.isAuthenticated == true
              ? <li><Link to='/profile'><span className='lnr lnr-user'></span> {this.props.Auth.user.username}</Link> <Link to='/auth/logout'>(Logout)</Link></li>
              : <li><Link to='/auth'>Login / Register</Link> </li>
            }
          </ul>
        </nav>
      )
    }
  }

  return Navbar
})
