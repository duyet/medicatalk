define([
  'react',
  'react-redux',
  'react-router',
  '../Store',
  '../containers/Header',
  './Footer',
  './NotFound',
  '../containers/Home',
  '../containers/Explore',
  '../containers/Topics',
  '../containers/Auth'
],
function (
  React,
  ReactRedux,
  ReactRouter,
  Store,
  Header,
  Footer,
  NotFound,
  Home,
  Explore,
  Topics,
  Auth
) {
  const { Component, PropTypes } = React
  const { Provider } = ReactRedux
  const { Router, Route, IndexRoute } = ReactRouter

  class App extends Component {

    render () {
      return (
        <div className='wrapper-page'>
          <Header />
          
          <Provider store={this.props.store}>
            <Router>
              <IndexRoute component={Home} />
              <Route path='/' component={Home} />
              <Route path='/explore' component={Explore} />
              <Route path='/topics' component={Topics} />
              <Route path='/auth*' component={Auth} />
              <Route path='*' component={NotFound} />
            </Router>
          </Provider>

          <Footer />
        </div>
      )
    }
  }

  App.propTypes = {
    store: PropTypes.object
  }

  return App
})
