define(['react', 'react-router'], function (React, ReactRouter) {
	const { Component } = React
	const { Link } = ReactRouter

	class Head extends Component {
		render() {
			return (
			    <div className='col-md-12 topics-head'>
					<div class="page-header">
						<h1>Topics</h1>
					</div>
					
					<br />
					<Link to='/topics/new' className='btn btn-primary btn-small'><span className='lnr lnr-pencil'></span> Create</Link>
				</div>
			)
		}
	}

	class Posts extends Component {
		render() {
			return (
				<div className='row'>
				
				</div>
			)
		}
	}

	class Profile extends Component {
		componentDidMount() {

		}

		render() {
		  return (
			<div className='row'>
				<Head {...this.props} />
				<Posts {...this.props} />
			</div>

		  );
		}
	}

	return Profile
})