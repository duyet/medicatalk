define(['react', 'react-router'], function (React, ReactRouter) {
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

				<div className='row'>
					<div className='col-md-4 nav-links'>
						<ul>
							<li><a href='#'>Sign-in help</a></li>
							<li><a href='#'>Manage account</a></li>
							<li><a href='#'>lorem lorem</a></li>
							<li><a href='#'>lorem lorem</a></li>
							<li><a href='#'>lorem lorem</a></li>
							<li><a href='#'>lorem lorem</a></li>
						</ul>
					</div>
					<div className='col-md-8'>

					</div>
				</div>
			</div>

		  );
		}
	}

	return Help
})