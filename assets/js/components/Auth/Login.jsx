define(['react', 'react-router', '../../Actions'], function(React, ReactRouter, Actions) {
  const { PropTypes, Component } = React
  const { History } = ReactRouter
  const { changeForm, register } = Actions

  class ErrorMessage extends Component {
    render() {
      if (!this.props.message) return <span />;

      return (
        <div className='alert alert-danger' id='danger-message'>{this.props.message}</div>
      )
    }
  }

  class LoginForm extends Component {
    constructor(props) {
      super(props);
      // this.onChange = this.onChange.bind(this)
      const redirectRoute = this.props.location.query.next || '/auth/login';
      this.state = {
        email: '',
        password: '',
        remember: true,
        redirectTo: redirectRoute
      }
    }

    submitForm(e) {
      e.preventDefault();

      if (!this.state.email || !this.state.email) {
        this.setState({ message: 'Email/Password is required!' });
        return;
      }

      if (!this.state.password || this.state.password.length < 6) {
        this.setState({ message: 'Password invalid!' });
        return;
      }

      this.props.actions.loginUser(this.state.email, this.state.password, this.state.redirectTo);
    }

    handleChange(type) {
      return (e) => {
        this.setState({ [type]: e.target.value });
      }
    }

    render() {
      return(
          <form className='form login'>
            <h4 className='form-heading'>Please sign in</h4>
            <ErrorMessage message={this.state.message} />

            {this.props.statusText ? <div className='alert alert-info'>{this.props.statusText}</div> : ''}
            
            <label htmlFor='inputEmail' className='sr-only'>Email address</label>
            <input type='email' 
              id='inputEmail' 
              className='form-control' 
              placeholder='Email address' 
              onChange={this.handleChange('email').bind(this)}
              required 
              autofocus />

            <label htmlFor='inputPassword' className='sr-only'>Password</label>
            <input type='password' 
              id='inputPassword' 
              className='form-control' 
              placeholder='Password' 
              onChange={this.handleChange('password').bind(this)}
              required />

            <div className='checkbox'>
              <label>
                <input type='checkbox' defaultValue='remember-me' /> Remember me
              </label>
            </div>
            <button  
              className='btn btn-lg btn-primary btn-block' 
              type='submit'
              disabled={this.props.isAuthenticating}
              onClick={this.submitForm.bind(this)}>Sign in</button>
          </form>
      );
    }
  }

  LoginForm.propTypes = {
    // onSubmit: React.PropTypes.func.isRequired,
    // data: React.PropTypes.object.isRequired
  }

return LoginForm
})
