define(['react', 'react-router', '../Utils/ComingSoon'], function (React, ReactRouter, ComingSoon) {
	const { Component } = React
	const { Link } = ReactRouter

	class Help extends Component {
		componentDidMount() {
			this.state = {
				navLinks: [

				]
			}
		}

		render() {
		  return (
			<div className='help'>
				<h1>Help center</h1>

				<div className='row' style={{ minHeight: 300 }}>
					<div className='col-md-3 nav-links'>
						<ul>
							<li><a href='#'>Sign-in help</a></li>
							<li><a href='#'>Manage account</a></li>
						</ul>
					</div>
					<div className='col-md-9'>
						<ComingSoon />
					</div>
				</div>
			</div>

		  );
		}
	}

	return Help
})