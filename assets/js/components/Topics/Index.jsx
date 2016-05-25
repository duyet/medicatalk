define(['react', 'react-router', './Topics', './Create'], 
function(React, ReactRouter, Topics, Create) {
  const { PropTypes, Component } = React
  const { Router, Route, browserHistory, Link } = ReactRouter

  class TopicsContainer extends Component {
    componentDidMount() {
      if (!this.props.Auth.isAuthenticated) {
        this.props.actions.redirect('/auth/login')
        return;
      }
    }

    render() {
      const parent_props = this.props
      return (
        <div className='wrap container topics'>

          <Router>
            <Route path='/topics' component={() => <Topics {...this.props} />}></Route>
            <Route path='/topics/new' component={() => <Create {...this.props} />}></Route>
          </Router>
          
        </div>

      );
    }
  }

  return TopicsContainer
})