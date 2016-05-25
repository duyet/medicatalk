requirejs.config({
    paths: {
      'react': '../lib/react/react-with-addons',
      'redux': '../lib/redux/index',
      'react-redux': '../lib/react-redux/index',
      'redux-thunk': '../lib/redux-thunk/index',
      'redux-logger': '../lib/redux-logger/index',
      'react-router': '../lib/react-router/index',
      'redux-api': '../lib/redux-api/dist/redux-api.min',
      'reactdom': '../lib/react/react-dom',
      'history': '../lib/history/index',
      'jquery': '../lib/jquery/dist/jquery',
      'jquery.timeago': '../lib/jquery-timeago/jquery.timeago',
      'showdown': '../lib/showdown/compressed/Showdown',
      'bootstrap': '../lib/bootstrap/dist/js/bootstrap',
      'jwt-decode': '../lib/jwt-decode/build/jwt-decode.min',

      'app': '/js',
      'lib': '../lib'
    },

    shim: {
      'react-redux': ['react'],
      'jquery.timeago': ['jquery'],
      'bootstrap': ['jquery']
    },

    baseUrl: '/js'
})

require(['react', 'reactdom', 'react-redux', 'react-router', './Store', './Actions', './components/App'],
  function (React, ReactDOM, ReactRedux, ReactRouter, Store, Actions, App) {
    const { Provider } = ReactRedux
    const { intialAuthStatus } = Actions
    const { Router, Route, IndexRoute } = ReactRouter

    // Authenticate status 
    Store.dispatch(intialAuthStatus());
    
    ReactDOM.render(
      <Provider store={Store}>
        <Router>
          <Route path='*' component={(state, props) => <App {...props} store={Store} />} />
        </Router>
      </Provider>,
      document.getElementById('main')
    )

    // as soon as this file is loaded, connect automatically,
    // var socket = io.sails.connect();

    // Expose connected `socket` instance globally so that it's easy
    // to experiment with from the browser console while prototyping.
    // window.socket = socket;
})

require.onError = function (err) {
    let message = 'Something went wrong!'
    if (err.requireType === 'timeout') {
       message = 'Loading timeout, please refresh your webpage.'
    }

    let messageBlock = document.createElement('div')
    messageBlock.innerHTML = `<div style='height: 48px;text-align:center;position: fixed;top: 0;left: 0;right: 0;background: #ff9300;width: auto;color: #fff;line-height: 48px;'>${message}</div>`

    document.body.appendChild(messageBlock)
    var loading = document.getElementsByClassName('loading')[0]
    if (loading) loading.innerHTML = ''

    throw err
};
