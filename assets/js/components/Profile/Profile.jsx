define(['react', 'react-router'], function (React, ReactRouter) {
	const { Component } = React
	const { Link } = ReactRouter

	class ProfileHeader extends Component {
		render() {
			const user = this.props.Auth.user

			return (
			    <div className='row profile-header'>
					<div className='col-sm-4 col-md-2 text-center'>
						<img className='img-circle avatar img-responsive' style={{WebkitUserSelect: 'none', display: 'block', margin: 'auto'}} src='http://robohash.org/sitsequiquia.png?size=120x120' />
					</div>

					<div className='col-sm-8 col-md-10'>
						<div className='row'>
							<div className='col-md-10'>
								<div className='username-line'>
									<span className='only-bottom-margin username'>{user.username} </span>
									{user.is_verified 
										? <span className='label label-success'>verified</span> 
										: <span className='label label-default'>none verify</span>
									}
								</div>

								<span className='text-muted'>Email:</span> {user.email} <a href='javascript:;'>Change email</a><br />
								<small className='text-muted'>Created: {user.createdAt}</small>
							</div>
							<div className='col-md-2 actions'>
								<div>
									<Link to='/profile/update'>Update account</Link>
								</div>
								{ !user.is_verified
									?	<div>
											<Link to='/profile/active'>Active your account</Link>
										</div>
									: 	''
								}
								<div>
									<Link to='/auth/logout'>Logout</Link>
								</div>
							</div>
						</div>
					</div>

					<div className='col-md-12 post-list'>

					</div>
				</div>
			)
		}
	}

	class Profile extends Component {
		componentDidMount() {

		}

		render() {
		  return (
			<div>
				<ProfileHeader {...this.props} />
			</div>

		  );
		}
	}

	return Profile
})