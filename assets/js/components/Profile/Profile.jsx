define(['react', 'react-router', './ProfileHeader'], function (React, ReactRouter, ProfileHeader) {
	const { Component } = React
	const { Link } = ReactRouter

	class Profile extends Component {
		render() {
			const user = this.props.Auth.user
			return (
				<div>
					<ProfileHeader {...this.props} />
					
					<div className='col-md-12 post-list'>

					</div>
				</div>
			)
		}
	}

	return Profile
})