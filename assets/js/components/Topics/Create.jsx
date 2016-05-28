define(['react', 'react-router'], function (React, ReactRouter) {
	const { Component } = React
	const { Link } = ReactRouter

	class Head extends Component {
		render() {
			return (
			    <div className='row topics-head text-right'>
			    	<br />
				</div>
			)
		}
	}

	class FormBody extends Component {
		constructor(props) {
			super(props)

			// this.state = { editorState: EditorState.createEmpty() }
			// this.onChange = (editorState) => this.setState({editorState})
		}

		doSubmit() {

		}

		render() {
			return (
		      <form onSubmit={this.doSubmit}>
		        <div className="form-group">
		          <label htmlFor="title">Post title</label>
		          <input type="text" className="form-control" id="title" placeholder="Post title" />
		        </div>

		        <div className="form-group">
		        	
		        </div>

		        <button type="submit" className="btn btn-info">Create new</button>
		      </form>
			)
		}
	}

	class CreateForm extends Component {
		componentDidMount() {

		}

		render() {
		  return (
			<div>
				<h1>Topics</h1>
				<Head {...this.props} />
				<FormBody {...this.props} />
			</div>

		  );
		}
	}

	return CreateForm
})