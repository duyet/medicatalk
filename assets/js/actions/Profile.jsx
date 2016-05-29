define([], function () {
	const SENDING_REQUEST = 'SENDING_REQUEST'
	return {
		SENDING_REQUEST, 


	    /**
	     * Change password
	     * @param  {string}          Old password
	     * @param  {string}          New password to change
	     * @return {object}          
	     */
	    doChangePassword (password, newpassword, cb = () => {}) {
	        return (dispatch) => {
	          dispatch({ type: SENDING_REQUEST })

	          $.ajax({
	            type: 'POST',
	            url: window._medica.api + '/user/changePassword', 
	            data: { password, newpassword }
	          }).done(response => {
				cb({ is_error: false, payload: response })
	          }).fail((xhr, response) => {
				cb({ is_error: true, payload: xhr.responseJSON })
	          })
	        }
	    },
	}
})