define(['react'], function (React) {
	const { Component } = React

	class ProfileHeader extends Component {
		render() {
			const user = this.props.Auth.user

			return (
		      <div className="row">
				<div className="col-md-2 text-center">
					<img className="img-circle avatar avatar-original img-responsive" style={{WebkitUserSelect: 'none', display: 'block', margin: 'auto'}} src="http://robohash.org/sitsequiquia.png?size=120x120" />
				</div>

				<div className="col-md-8">
					<div className="row">
						<div className="col-md-12">
							<span className="only-bottom-margin username">{user.username}</span>
						</div>
					</div>
					<div className="row">
						<div className="col-md-6">
							<span className="text-muted">Email:</span> {user.email}<br />
							<span className="text-muted">Birth date:</span> 01.01.2001<br />
							<span className="text-muted">Status:</span>
								{user.is_verified 
									? <span className='label label-success'>verified</span> 
									: <span className='label label-default'>none verify</span>
								}<br /><br />
							<small className="text-muted">Created: {user.createdAt}</small>
						</div>
						<div className="col-md-6">
							<div className="activity-mini">
								<a href='#'>Edit</a>
							</div>
						</div>
					</div>
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