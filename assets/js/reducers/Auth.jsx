define (['jquery', 'redux', 'jwt-decode', '../Actions'], 
function ($, Redux, jwtDecode, Actions) {
  const { SENDING_REQUEST } = Actions
  const { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_SUCCESS } = Actions
  const { REGISTER_USER_FAILURE } = Actions

  const initialState = {
    token: null,
    userName: null,
    isSending: false,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: ''
  }

    return (state = initialState, action)  => {
        switch (action.type) {
            case SENDING_REQUEST:
                return Object.assign({}, state, {
                    'isSending': true
                })

            case REGISTER_USER_FAILURE:
                return Object.assign({}, state, {
                    'isRegistered': false,
                    'isSending': false,
                    'token': null,
                    'statusText': `Register error!`
                })
                
            case LOGIN_USER_FAILURE:
                return Object.assign({}, state, {
                    'isLogined': false,
                    'isSending': false,
                    'token': null,
                    'statusText': `Login error!`
                })
                
             case LOGIN_USER_SUCCESS:
                return Object.assign({}, state, {
                    'isAuthenticating': false,
                    'isAuthenticated': true,
                    'isSending': false,
                    'token': action.payload.token, //action.payload.token,
                    'user': action.payload.user || {}, // jwtDecode(action.payload.token).userName,
                    'statusText': 'You have been successfully logged in.'
                })
                
             case LOGOUT_SUCCESS:
                return Object.assign({}, state, {
                    'isAuthenticating': false,
                    'isAuthenticated': false,
                    'token': false,
                    'user': {},
                    'statusText': 'You have been successfully logged out.'
                })

            default:
                return state
            }
    }

  // return createReducer(initialState, {
  //   [LOGIN_USER_REQUEST]: (state, payload) => {
  //       return Object.assign({}, state, {
  //           'isAuthenticating': true,
  //           'statusText': null
  //       });
  //   },
  //   [LOGIN_USER_SUCCESS]: (state, payload) => {
  //       return Object.assign({}, state, {
  //           'isAuthenticating': false,
  //           'isAuthenticated': true,
  //           'isSending': false,
  //           'token': payload.token,
  //           'userName': jwtDecode(payload.token).userName,
  //           'statusText': 'You have been successfully logged in.'
  //       });

  //   },
  //   [LOGIN_USER_FAILURE]: (state, payload) => {
  //       return Object.assign({}, state, {
  //           'isAuthenticating': false,
  //           'isAuthenticated': false,
  //           'isSending': false,
  //           'token': null,
  //           'userName': null,
  //           'statusText': `Authentication Error: ${payload.status} ${payload.statusText}`
  //       });
  //   },


  //   [REGISTER_USER_FAILURE]: (state, payload) => {
  //       return Object.assign({}, state, {
  //           'isRegistered': false,
  //           'isSending': false,
  //           'token': null,
  //           'statusText': `Register error!`
  //       });
  //   },

  //   [LOGOUT_USER]: (state, payload) => {
  //       return Object.assign({}, state, {
  //           'isAuthenticated': false,
  //           'token': null,
  //           'userName': null,
  //           'statusText': 'You have been successfully logged out.'
  //       });
  //   }, 

  //   [SENDING_REQUEST]: (state) => {
  //       return Object.assign({}, state, {
  //           'isSending': true
  //       })
  //   }

  // })
})
