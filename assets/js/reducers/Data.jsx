define (['redux', 'Actions', '../utils/createReducer'], function (Redux, Actions, createReducer) {
  const { RECEIVE_PROTECTED_DATA, FETCH_PROTECTED_DATA_REQUEST } = Actions
  const initialState = {
    data: null,
  	isFetching: false,
  }
  
  const data = (state = initialState, action) => {
    switch (action.type) {
      case 'DATA_FETCH_BEGIN': {
        return [...state, { isFetching: true } ]
      }
      case 'DATA_FETCH_SUCCESS': {
        return { isFetching: false, data: [ ...state.data, action.payload ] };
      }
      case 'DATA_FETCH_ERROR': {
        return [ ...state, { isFetching: false } ]
      }
      default:
          return state
      }
  }

  return data
})
