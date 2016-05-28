define(['react', 'react-router'], function (React, ReactRouter) {
	const { Component } = React
	const { Link } = ReactRouter
    
	class AccountLinks extends Component {
		render() {
			const user = this.props.Auth.user
			
			return (
				<div className='actions'>
					<div>
						<Link to='/profile/update'>Update account</Link>
					</div>
					<div>
						<Link to='/profile/preferences'>Preferences</Link>
					</div>
					{ !user.is_verified
						?	<div>
								<Link to='/profile/verify'>Active your account</Link>
							</div>
						: 	''
					}
					<div>
						<Link to='/auth/logout'>Logout</Link>
					</div>
				</div>
			)
		}
	}
    
    return AccountLinks
})