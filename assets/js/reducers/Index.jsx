define(['redux', './Default', './Data', './Auth'], function (Redux, Default, Data, Auth) {
  const { combineReducers } = Redux

  const Reducers = combineReducers({
    Default,
    Data,
    Auth
  })

  return Reducers
})
