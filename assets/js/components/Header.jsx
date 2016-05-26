define(['react', 'react-router', './Navbar'], function (React, ReactRouter, Navbar) {
  const { Link } = ReactRouter
  const { Component } = React 

  class Header extends Component {
    
    render() {
      return (
        <header id='section_header' className='navbar-fixed-top main-nav' role='banner'>
          <div className='container'>

            <div className='navbar-header'>
              <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='#medica-navbar'>
                <span className='sr-only'>Toggle navigation</span>
                <span className='lnr lnr-menu'></span>
              </button>
              <Link className='navbar-brand' to='/'>
                <span className='lnr lnr-heart-pulse'></span>
              </Link>
            </div>
            <Navbar {...this.props} />
          </div>
        </header>
      )
    }
  }

  return Header
})
