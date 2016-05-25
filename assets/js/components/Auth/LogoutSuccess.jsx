define(['react', 'react-router', 'Actions'], 
function(React, ReactRouter, Actions) {
  const { Component } = React
  const { Link } = ReactRouter

  class LogoutSuccess extends Component {
    render() {
      return (
        <div className='row text-center'>
            Logout successfully! <br /><br />
            <Link to='/'>Go to homepage</Link>
        </div>
      )
    }
  }
  
  return LogoutSuccess
})
