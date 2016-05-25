define(['react', 'react-router', './AuthMessage', 'Actions', '../../utils/ErrorParser'], 
function(React, ReactRouter, AuthMessage, Actions, ErrorParser) {
  const { PropTypes, Component } = React
  const { History } = ReactRouter
  const { changeForm, register } = Actions

  class LoginForm extends Component {
    constructor(props) {
      super(props);

      const redirectRoute = this.props.location.query.next || '/'
      
      this.state = {
        email: '',
        password: '',
        remember: true,
        redirectTo: redirectRoute,
        isSending: false
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

      this.setState({ isSending: true })
      this.props.actions.doLogin(this.state.email, this.state.password, this.state.redirectTo, (response) => {
        this.setState({ message: null })
        this.setState({ isSending: false })
        
        if (response.type == 'LOGIN_USER_SUCCESS') {
          
        } else {
          this.setState({ message: ErrorParser(response.payload) })
        }
      });
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
            <AuthMessage message={this.state.message} />

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
              disabled={this.state.isSending}
              onClick={this.submitForm.bind(this)}>
                {!this.state.isSending ? 'Sign in ' : 'Request ...'}
            </button>
          </form>
      );
    }
  }
  
  return LoginForm
})
