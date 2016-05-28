define(['react', 'react-router', './ProfileHeader'], function (React, ReactRouter, ProfileHeader) {
	const { Component } = React
	const { Link } = ReactRouter

    class FormLine extends Component {
        render() {
            const label = this.props.label || ''
            const type = this.props.type || 'text'
            const id = this.props.id || ''
            const placeholder = this.props.placeholder || label || ''
            const is_required = !!this.props.is_required || false 
             
            return (
                <div className="form-group">
                    <label htmlFor={id} className="col-sm-2 control-label">{label} <span className='text-danger'>{is_required ? '*' : ''}</span></label>
                    <div className="col-sm-10">
                        <input type={id} className="form-control" id={id} placeholder={placeholder} />
                    </div>
                </div>
            )
        }
    }

	class Update extends Component {
		componentDidMount() {
		}

		render() {
			const user = this.props.Auth.user
		  return (
			<div>
				<ProfileHeader {...this.props} />
				<div className='page-header preference-header'>
					<h1>Update account <small></small></h1>
				</div>
				
                <div classname="preference-body">
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label className="col-sm-2 control-label">Email</label>
                            <div className="col-sm-10">
                            <p className="form-control-static">{user.email}</p>
                            </div>
                        </div>
                        
                        <FormLine label='Password' type='password' id="inputPassword" is_required='true' />
                        
                        <hr />
                        <div style={{ marginBottom:'1em' }}>Change your password</div>
                        <FormLine label='New password'  type='password' id="newPassword" />
                        <FormLine label='Repeat'        type='password' id="rePassword" />
                        
                        
                    </form>
                </div>
			</div>

		  );
		}
	}

	return Update
})