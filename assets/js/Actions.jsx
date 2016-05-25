// Actions are payloads of information that send data from your application to your store.
// They are the only source of information for the store. You send them to the store
// using store.dispatch().
// See: http://redux.js.org/docs/basics/Actions.html

define([], function () {
  // ACTION TYPE
  // For a small project, it might be easier to just use
  // string literals for action types. However, there are
  // some benefits to explicitly declaring constants in
  // larger codebases.

  // Auth 
  const CHANGE_FORM = 'CHANGE_FORM'
  const SET_AUTH = 'SET_AUTH'
  const SENDING_REQUEST = 'SENDING_REQUEST'
  const TOKEN_KEY = 'TOKEN'
  const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST'
  const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS' // Login success
  const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE' // Login fail
  const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE' // Login fail
  const REGISTER_USER = 'REGISTER_USER' // Register
  const LOGOUT_USER = 'LOGOUT_USER'

  const RECEIVE_PROTECTED_DATA = 'RECEIVE_PROTECTED_DATA'
  const FETCH_PROTECTED_DATA_REQUEST = 'FETCH_PROTECTED_DATA_REQUEST'

  return {

    TOKEN_KEY,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    REGISTER_USER_FAILURE,

    REGISTER_USER,

    LOGOUT_USER,
    CHANGE_FORM,
    SET_AUTH,
    SENDING_REQUEST,
    RECEIVE_PROTECTED_DATA,
    FETCH_PROTECTED_DATA_REQUEST,

    /**
     * Sets the authentication state of the application
     * @param {boolean} newState True means a user is logged in, false means no user is logged in
     */
    setAuthState(newState) {
      return { type: SET_AUTH, newState };
    },

    /**
     * Sets the form state
     * @param  {object} newState          The new state of the form
     * @param  {string} newState.username The new text of the username input field of the form
     * @param  {string} newState.password The new text of the password input field of the form
     * @return {object}                   Formatted action for the reducer to handle
     */
    changeForm(newState) {
      return { type: CHANGE_FORM, newState };
    },

    /**
     * Sets the requestSending state, which displays a loading indicator during requests
     * @param  {boolean} sending The new state the app should have
     * @return {object}          Formatted action for the reducer to handle
     */
    sendingRequest() {
      return { type: SENDING_REQUEST };
    }, 

    /**
     * Set state login success, and set token to localStoreage
     * @param  {string}          User token
     * @return {object}          Formatted action for the reducer to handle
     */
    loginUserSuccess(token) {
      localStorage.setItem(TOKEN_KEY, token);
      return {
        type: LOGIN_USER_SUCCESS,
        token
      }
    },
    
    /**
     * Set state login success from access_token
     * @param  {string}          User token
     * @return {object}          Formatted action for the reducer to handle
     */
    intialAuthStatus() {
      let token = localStorage.getItem(TOKEN_KEY)
      let name = localStorage.getItem('name')
      if (token !== null && name !== '' && token !== '') {
        return {
          type: LOGIN_USER_SUCCESS,
          payload: {
            token,
            name
          }
        } 
      }
    },
    

    /**
     * Set state login failure, and remove token to localStoreage
     * @param  {string}          User token
     * @return {object}          Formatted action for the reducer to handle
     */
    loginUserFailure(error) {
      localStorage.removeItem(TOKEN_KEY);
      return {
        type: LOGIN_USER_FAILURE,
        payload: {
          status: error.response.status,
          statusText: error.response.statusText
        }
      }
    },

    loginUser (email, password, redirect="/") {
        return (dispatch) => {
            return fetch('http://localhost:3000/auth/getToken/', {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                    body: JSON.stringify({email: email, password: password})
                })
                .then(checkHttpStatus)
                .then(parseJSON)
                .then(response => {
                    try {
                        let decoded = jwtDecode(response.token);
                        dispatch(loginUserSuccess(response.token));
                        dispatch(pushState(null, redirect));
                    } catch (e) {
                        dispatch(loginUserFailure({
                            response: {
                                status: 403,
                                statusText: 'Invalid token'
                            }
                        }));
                    }
                })
                .catch(error => {
                    dispatch(loginUserFailure(error));
                })
        }
    },

    registerFail(response) {
      return {
        type: REGISTER_USER_FAILURE,
        payload: response
      }
    },

    /**
     * Registers a user in the system
     * @param  {string}   email    The email of the user
     * @param  {string}   username The username of the user
     * @param  {string}   password The password of the user
     */
    doRegister (email, username, password, cb = () => {}) {
        return (dispatch) => {
          dispatch({ type: SENDING_REQUEST })

          $.ajax({
            type: 'POST',
            url: window._medica.api + '/auth/signup', 
            data: { email, username, password }
          }).done(response => {
              dispatch({ type: LOGIN_USER_SUCCESS, payload: response.data })
              cb({ type: LOGIN_USER_SUCCESS, payload: response.data })
          }).fail((xhr, response) => {
              dispatch({ type: REGISTER_USER_FAILURE, payload: xhr.responseJSON })
              cb({ type: REGISTER_USER_FAILURE, payload: xhr.responseJSON })
          })
        }
    },

    registerSuccess(data) {
      console.log('registerSuccess', data)
      
      
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem('user_info', data.user);
      return {
        type: LOGIN_USER_SUCCESS,
        payload: {
          token: data.token
        }
      }
    }
  }
})
