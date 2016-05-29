/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	me: function (req, res) {
		return res.ok(req.user)
	},

	changePassword: function (req, res) {
		if (!req.body || !req.body.password || !req.body.newpassword) 
			return res.badRequest('Password is required');

		User.changePassword(req.user.id, req.body.password, req.body.newpassword, function (message) {
			if (message && message.error) return res.badRequest(message.error);

			res.ok('Password was changed.');
		})
	}, 

	resetPassword: function (req, res) {
		if (!req.body || !req.body.password) 
			return res.badRequest('Password is required');

		User.resetPassword(req.user.id, req.body.password, function (message) {
			if (message && message.error) return res.badRequest(message.error);

			res.ok('Password was changed.');
		})
	}, 
};