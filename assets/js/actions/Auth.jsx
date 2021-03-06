define([], function () {
	
	// Auth 
	const CHANGE_FORM = 'CHANGE_FORM'
	const SET_AUTH = 'SET_AUTH'
	const SENDING_REQUEST = 'SENDING_REQUEST'
	const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST'
	const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS' // Login success
	const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE' // Login fail
	const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE' // Login fail
	const REGISTER_USER = 'REGISTER_USER' // Register
	const LOGOUT_USER = 'LOGOUT_USER'
	const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
	const REDIRECT_TO = 'REDIRECT_TO'

	const Const = {
		TOKEN: '__access_token',
		USER: '__user_info'
	}

	return {
		Const,

		LOGIN_USER_REQUEST,
		LOGIN_USER_SUCCESS,
		LOGIN_USER_FAILURE,
		REGISTER_USER_FAILURE,

		REGISTER_USER,

		LOGOUT_USER,
		LOGOUT_SUCCESS, 

		CHANGE_FORM,
		SET_AUTH,
		SENDING_REQUEST,


		/**
		 * Sets the authentication state of the application
		 * @param {boolean} newState True means a user is logged in, false means no user is logged in
		 */
		setAuthState(newState) {
		  return { type: SET_AUTH, newState };
		},

		/**
		 * Sets the form state
		 * @param  {object} newState		  The new state of the form
		 * @param  {string} newState.username The new text of the username input field of the form
		 * @param  {string} newState.password The new text of the password input field of the form
		 * @return {object}				   Formatted action for the reducer to handle
		 */
		changeForm(newState) {
		  return { type: CHANGE_FORM, newState };
		},

		/**
		 * Sets the requestSending state, which displays a loading indicator during requests
		 * @param  {boolean} sending The new state the app should have
		 * @return {object}		  Formatted action for the reducer to handle
		 */
		sendingRequest() {
		  return { type: SENDING_REQUEST };
		}, 


	    /**
	     * Set state login success, and set token to localStoreage
	     * @param  {string}          User token
	     * @return {object}          Formatted action for the reducer to handle
	     */
	    loginUserSuccess(payload) {
	      localStorage.setItem(Actions.Const.TOKEN, payload.token);
	      localStorage.setItem(Actions.Const.USER, JSON.stringify(payload.user));
	     
	      return {
	        type: LOGIN_USER_SUCCESS,
	        payload
	      }
	    },
	    
	    /**
	     * Set state login success from access_token
	     * @param  {string}          User token
	     * @return {object}          Formatted action for the reducer to handle
	     */
	    intialAuthStatus() {
	      return dispatch => {
	        let token = localStorage.getItem(Const.TOKEN)
	        let user = localStorage.getItem(Const.USER)
	        
	        try {
				// Parse User from localStorage
				user = JSON.parse(user)

				// Setup Authorization token
				$.ajaxSetup({headers: {'Authorization': 'JWT ' + token}})
	        } catch (e) {
	          console.error('Parse user from localStorage: ', e)
	          user = {}
	        }
	        
	        if (token !== null && user !== null && token !== '') {
	          dispatch({
	            type: LOGIN_USER_SUCCESS,
	            payload: { token, user }
	          })
	          
	          // dispatch({
	          //   type: REDIRECT_TO,
	          //   to: '/'
	          // })
	          
	        } else {
	          dispatch({
	            type: 'NOT_AUTHENTICATED'
	          }) 
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

	    doLogin (email, password, redirectTo='/', cb = () => {}) {
	        return (dispatch) => {
	          dispatch({ type: SENDING_REQUEST })

	          $.ajax({
	            type: 'POST',
	            url: window._medica.api + '/auth/signin', 
	            data: { email, password }
	          }).done(response => {
	              // TODO: Call dispatch => loginUserSuccess()
	              
	              localStorage.setItem(Const.TOKEN, response.data.token)
	              localStorage.setItem(Const.USER, JSON.stringify(response.data.user))
	              $.ajaxSetup({headers: {'Authorization': 'JWT ' + response.data.token}})

	              dispatch({ type: LOGIN_USER_SUCCESS, payload: response.data })
	              dispatch({ type: 'REDIRECT_TO', to: redirectTo })
	     
	              // cb({ type: LOGIN_USER_SUCCESS, payload: response.data })
	          }).fail((xhr, response) => {
	              dispatch({ type: LOGIN_USER_FAILURE, payload: xhr.responseJSON })
	              cb({ type: 'LOGIN_USER_FAILURE', payload: xhr.responseJSON })
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
	    doRegister (email, username, password, redirectTo, cb = () => {}) {
	        return (dispatch) => {
	          dispatch({ type: SENDING_REQUEST })

	          $.ajax({
	            type: 'POST',
	            url: window._medica.api + '/auth/signup', 
	            data: { email, username, password }
	          }).done(response => {
	              // TODO: Call dispatch => loginUserSuccess()
	              
	              localStorage.setItem(Const.TOKEN, response.data.token);
	              localStorage.setItem(Const.USER, JSON.stringify(response.data.user));
	              dispatch({ type: LOGIN_USER_SUCCESS, payload: response.data })
	              dispatch({ type: REDIRECT_TO, to: redirectTo })

	              // cb({ type: LOGIN_USER_SUCCESS, payload: response.data })
	          }).fail((xhr, response) => {
	              dispatch({ type: REGISTER_USER_FAILURE, payload: xhr.responseJSON })
	              cb({ type: REGISTER_USER_FAILURE, payload: xhr.responseJSON })
	          })
	        }
	    },

	    registerSuccess(data) {
	      return {
	        type: LOGIN_USER_SUCCESS,
	        payload: {
	          token: data.token
	        }
	      }
	    },
	    
	    doLogout(redirect = '/') {
	      return (dispatch) => {
	        // Remove localStorage
	        localStorage.removeItem(Const.TOKEN)
	        localStorage.removeItem(Const.USER)
	        
	        dispatch({ type: 'LOGOUT_SUCCESS' })
	        dispatch({ type: REDIRECT_TO, to: redirect })
	      }
	    },
	}
})