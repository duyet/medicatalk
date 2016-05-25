define([], function () {
	const REDIRECT_TO = 'REDIRECT_TO'

	return {
		REDIRECT_TO,


		/**
		 * Sets the requestSending state, which displays a loading indicator during requests
		 * @param  {boolean} sending The new state the app should have
		 * @return {object}		  Formatted action for the reducer to handle
		 */
		redirect (to = '/') {
		  return { type: REDIRECT_TO, to };
		}, 

	}
})