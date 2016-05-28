define(['react', 'react-router', './AccountLinks'], function (React, ReactRouter, AccountLinks) {
	const { Component } = React
	const { Link } = ReactRouter
    
	class ProfileHeader extends Component {
		render() {
			const user = this.props.Auth.user

			return (
			    <div className='row profile-header'>
					<div className='col-sm-4 col-md-1 text-center'>
						<img className='img-circle avatar img-responsive' style={{display: 'block', margin: 'auto'}} src='https://avatars0.githubusercontent.com/u/5009534?v=3&s=120' />
					</div>

					<div className='col-sm-8 col-md-11'>
						<div className='row'>
							<div className='col-md-10'>
								<div className='username-line'>
									<span className='only-bottom-margin username'>{user.username} </span>
									{user.is_verified 
										? <span className='label label-success'>verified</span> 
										: <span className='label label-default'>none verify</span>
									}
								</div>

								<span className='text-muted'>Email:</span> {user.email} <Link to='/profile/update'>Change email</Link><br />
								<small className='text-muted'>Created: {user.createdAt}</small>
							</div>
							<div className='col-md-2'>
								<AccountLinks {...this.props} />
							</div>
						</div>
					</div>

				</div>
			)
		}
	}
    
    return ProfileHeader
})