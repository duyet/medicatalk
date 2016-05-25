define(['react', 'react-router'], function (React, ReactRouter) {
	const { Component } = React
	const { Link } = ReactRouter

	class About extends Component {
		componentDidMount() {

		}

		render() {
		  return (
			<div className='about about-auther text-center'>
				<section>
					<h1>Medica Talk</h1>
					<center>
						<img src='/images/medical.jpg' className='img-responsive' />
					</center>
				</section>

				<section id='value'>
					<h1>What we value</h1>
					<p>We create products that are easy to use and are built on trust.</p>
				</section>
			</div>

		  );
		}
	}

	return About
})