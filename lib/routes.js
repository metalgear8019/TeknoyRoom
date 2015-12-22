/*routing for both client and server side URL patterns*/

// -------------------------------- ADMIN ROUTES --------------------------------

var adminLayout = {
	header: 'adminBanner',
	sidebar: 'adminSidebar',
	main: 'hello'
};

var admin = FlowRouter.group({
	prefix: '/admin'
});

var users = admin.group({
	prefix: '/user'
});

users.route('/:id', {
	action: function() {
		BlazeLayout.render('pageLayout', adminLayout);
	},
	triggersEnter: [function (context, redirect) {
		adminLayout.main = 'userForm';
	}]
});

users.route('/', {
	action: function() {
		BlazeLayout.render('pageLayout', adminLayout);
	},
	triggersEnter: [function (context, redirect) {
		adminLayout.main = 'userList';
	}]
});

var courses = admin.group({
	prefix: '/course'
});

courses.route('/:id', {
	action: function() {
		BlazeLayout.render('pageLayout', adminLayout);
	},
	triggersEnter: [function (context, redirect) {
		adminLayout.main = 'courseForm';
	}]
});

courses.route('/', {
	action: function() {
		BlazeLayout.render('pageLayout', adminLayout);
	},
	triggersEnter: [function (context, redirect) {
		adminLayout.main = 'courseList';
	}]
});

var sections = admin.group({
	prefix: '/section'
});

sections.route('/:id', {
	action: function() {
		BlazeLayout.render('pageLayout', adminLayout);
	},
	triggersEnter: [function (context, redirect) {
		adminLayout.main = 'sectionForm';
	}]
});

sections.route('/', {
	action: function() {
		BlazeLayout.render('pageLayout', adminLayout);
	},
	triggersEnter: [function (context, redirect) {
		adminLayout.main = 'sectionList';
	}]
});

// -------------------------------- USER ROUTES --------------------------------