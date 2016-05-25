// The Store is the object that brings them together. The store has the following responsibilities:
//
//  - Holds application state;
//  - Allows access to state via getState();
//  - Allows state to be updated via dispatch(action);
//  - Registers listeners via subscribe(listener);
//  - Handles unregistering of listeners via the function returned by subscribe(listener).

// See: http://redux.js.org/docs/basics/Store.html

define(['redux', 'redux-thunk', 'redux-logger', './reducers/Index', './reducers/InitialState' ],
function (Redux, thunkMiddleware, loggerMiddleware, Reducers, InitialState) {
  const { createStore, applyMiddleware, combineReducers } = Redux

  const crashReporter = store => next => action => {
    try {
      return next(action)
    } catch (err) {
      console.error('Caught an exception!', err)
      alert('Something went wrong! Please try again later.')
      throw err
    }
  }

  const logger = loggerMiddleware()

  // let store = createStore(
  //   combineReducers(Reducers),
  //   InitialState,
  //   applyMiddleware(logger, thunkMiddleware.default, crashReporter)
  // )
  let store =  applyMiddleware(logger, thunkMiddleware.default, crashReporter)(createStore)(Reducers);

  return store
})
