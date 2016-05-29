define(['react', 'react-router', './ProfileHeader'], function (React, ReactRouter, ProfileHeader) {
	const { Component } = React
	const { Link } = ReactRouter

    class Message extends Component {
        render() {
            if (!this.props.message) return <span />;
            let message = ''

            if (typeof this.props.message != 'array') message = '' + this.props.message
            else message = this.props.message[0]
            
            let className = 'alert alert-' + (this.props.type || ' danger')

            return (
                <div className={className} id='danger-message'>{message}</div>
            )
        }
    }

    class FormLine extends Component {
        render() {
            const label = this.props.label || ''
            const type = this.props.type || 'text'
            const id = this.props.id || ''
            const placeholder = this.props.placeholder || label || ''
            const is_required = !!this.props.is_required || false 
            const onChange = this.props.onChange || false
             
            return (
                <div className="form-group">
                    <label htmlFor={id} className="col-sm-2 control-label">{label} <span className='text-danger'>{is_required ? '*' : ''}</span></label>
                    <div className="col-sm-10">
                        <input type={type} className="form-control" id={id} placeholder={placeholder} onChange={onChange} />
                    </div>
                </div>
            )
        }
    }

	class Update extends Component {
        constructor(props) {
            super(props)

            this.state = {
                password: '',
                newPassword: '',
                rePassword: '',
                isSending: false,
                message: '',
                messageType: 'danger'
            }
        }

        validatePassword(password) {
            console.log('typeof password', typeof password)
            console.log('checking ', password)
            
            if (typeof password == 'object') {
                let validAll = true

                for (let i in password) {
                    if (!this.validatePassword(password[i])) return false
                }

                return true
            }

            if (!password) return false
            if (password.length < 6) return false 
            return true
        }

        submitForm(e) {
            e.preventDefault();
            this.setState({ message: '' })

            // Validate 
            if (this.state.newPassword != this.state.rePassword) {
                this.setState({ message: 'Repeat password is invalid' })
                return
            }
            if (!this.validatePassword([ this.state.password, this.state.newPassword ])) {
                this.setState({ message: 'Password is invalid' })
                return
            }

            this.setState({ isSending: true })
            this.props.actions.doChangePassword(this.state.password, this.state.newPassword, (response) => {
                this.setState({ isSending: false })
                if (!response.is_error) this.setState({ messageType: 'success' })
                this.setState({ message: response.payload.data })
            })
        }

        handleChange(type) {
          return (e) => {
            this.setState({ [type]: e.target.value });
          }
        }

		render() {
			const user = this.props.Auth.user
		  return (
			<div>
				<ProfileHeader {...this.props} />
				<div className='page-header preference-header'>
					<h1>Update account <small></small></h1>
				</div>

                <Message message={this.state.message} type={this.state.messageType} />
				
                <div classname="preference-body">
                    <form className="form-horizontal" onSubmit={this.submitForm.bind(this)}>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">Email</label>
                            <div className="col-sm-10">
                            <p className="form-control-static">{user.email}</p>
                            </div>
                        </div>
                        
                        <FormLine label='Password' type='password' id="inputPassword" is_required='true' onChange={this.handleChange('password').bind(this)} />
                        
                        <hr />
                        <div style={{ marginBottom:'1em' }}>Change your password</div>
                        <FormLine label='New password'  type='password' id="newPassword" onChange={this.handleChange('newPassword').bind(this)} />
                        <FormLine label='Repeat'        type='password' id="rePassword" onChange={this.handleChange('rePassword').bind(this)} />
                        
                        <div className="form-group">
                            <div className="col-sm-10 col-sm-offset-2">
                                <button
                                    type="submit" 
                                    className="btn btn-info"
                                    disabled={this.state.isSending}
                                    onClick={this.submitForm.bind(this)}>
                                {!this.state.isSending ? 'Submit' : 'Request ...'}</button>
                            </div>
                        </div>
                    </form>
                </div>
			</div>

		  );
		}
	}

	return Update
})