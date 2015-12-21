/*routing for both client and server side URL patterns*/

// -------------------------------- ADMIN ROUTES --------------------------------

/*var admin = FlowRouter.group({
	prefix = '/admin'
});

var users = admin.group({
	prefix = '/user'
});*/

FlowRouter.route('/test', {
	action: function() {
		BlazeLayout.setRoot('body');
		BlazeLayout.render('hello', { content: 'userForm' });
	}
});

// -------------------------------- USER ROUTES --------------------------------