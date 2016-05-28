define(['react', 'react-router', './ProfileHeader', '../Utils/ComingSoon'], function (React, ReactRouter, ProfileHeader, ComingSoon) {
	const { Component } = React
	const { Link } = ReactRouter

	class Verify extends Component {
		render() {
            const user = this.props.Auth.user
            return (
                <div>
                    <ProfileHeader {...this.props} />
                    <div className='page-header preference-header'>
                        <h1>Verify your account <small>Coming soon</small></h1>
                    </div>

                    <div className='preference-body'>
                        <ComingSoon />
                    </div>
                </div>
            )
		}
	}

	return Verify
})