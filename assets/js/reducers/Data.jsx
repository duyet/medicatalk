define (['redux', '../Actions', '../utils/createReducer'], function (Redux, Actions, createReducer) {
  const { RECEIVE_PROTECTED_DATA, FETCH_PROTECTED_DATA_REQUEST } = Actions
  const initialState = {
    data: null,
  	isFetching: false,
  }
  
  const data = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_PROTECTED_DATA:
            return Object.assign({}, state, {
              'data': payload.data,
              'isFetching': false
            })

        case FETCH_PROTECTED_DATA_REQUEST:
            return Object.assign({}, state, {
              'isFetching': true
            })
        default:
            return state
        }
  }

  return data
})
