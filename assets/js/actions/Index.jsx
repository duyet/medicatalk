// Actions are payloads of information that send data from your application to your store.
// They are the only source of information for the store. You send them to the store
// using store.dispatch().
// See: http://redux.js.org/docs/basics/Actions.html

define(['./actions/Global', './actions/Auth', './actions/Profile' ], function (Global, Auth, Profile) {
	return Object.assign(
		{}, Global, Auth, Profile
	)
})