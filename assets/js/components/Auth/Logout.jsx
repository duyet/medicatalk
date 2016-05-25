define(['react', 'react-router', '../../Actions'], 
function(React, ReactRouter, Actions) {
  const { Component } = React
  const { Link } = ReactRouter

  class LogoutSuccess extends Component {
    componentDidMount() {
        this.props.actions.doLogout('/auth/logout_success')
    }
    
    render() {
      return (
        <span />
      )
    }
  }
  
  return LogoutSuccess
})
