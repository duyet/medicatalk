define(['react', 'react-router', './ProfileHeader'], function (React, ReactRouter, ProfileHeader) {
	const { Component } = React
	const { Link } = ReactRouter

	class Preferences extends Component {
		componentDidMount() {
		}

		render() {
			const user = this.props.Auth.user
		  return (
			<div>
				<ProfileHeader {...this.props} />
				<div className='page-header preference-header'>
					<h1>Preferences <small></small></h1>
				</div>
				
				<div className='preference-body'>
					<dl className='dl-horizontal'>
						<dt>Language</dt> <dd>English <a href='javascript:;'>Change</a></dd>
						
						<dt>Notifications</dt> <dd>Weekly newsletter <a href='javascript:;'>Change</a></dd>
						
						<dt>Settings</dt>
						<dd>
							<ul>
								<li>Timezone: GMT +7 <a href='javascript:;'>Change</a></li>
								<li>Two-step verification: Disabled <a href='javascript:;'>Change</a></li>
							</ul>
						</dd>
					</dl>
				</div>
			</div>

		  );
		}
	}

	return Preferences
})