/*routing for both client and server side URL patterns*/

var layouts = {
	admin: {
		header: 'adminBanner',
		sidebar: 'adminSidebar',
		main: 'notFound'
	},
	student: {
		header: 'studentBanner',
		sidebar: 'studentSidebar',
		main: 'notFound'
	},
	instructor: {
		header: 'instructorBanner',
		sidebar: 'instructorSidebar',
		main: 'notFound'
	}
};

// -------------------------------- ADMIN ROUTES --------------------------------

var admin = FlowRouter.group({
	prefix: '/admin'
});

	admin.route('/', {
		action: function () {
			BlazeLayout.render('pageLayout', layouts.admin);
		},
		triggersEnter: [function () {
			layouts.admin.main = 'adminDashboard'
		}]
	});

	var users = admin.group({
		prefix: '/user'
	});

		users.route('/:id', {
			action: function () {
				BlazeLayout.render('pageLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'userForm'
			}]
		});

		users.route('/', {
			action: function () {
				BlazeLayout.render('pageLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'userList'
			}]
		});

	var courses = admin.group({
		prefix: '/course'
	});

		courses.route('/:id', {
			action: function () {
				BlazeLayout.render('pageLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'courseForm'
			}]
		});

		courses.route('/', {
			action: function () {
				BlazeLayout.render('pageLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'courseList'
			}]
		});

	var semesters = admin.group({
		prefix: '/semester'
	});

		courses.route('/:id', {
			action: function () {
				BlazeLayout.render('pageLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'semesterForm'
			}]
		});

		courses.route('/', {
			action: function () {
				BlazeLayout.render('pageLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'semesterList'
			}]
		});

	var sections = admin.group({
		prefix: '/section'
	});

		sections.route('/', {
			action: function () {
				BlazeLayout.render('pageLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'sectionList'
			}]
		});

		sections.route('/enroll', {
			action: function () {
				BlazeLayout.render('pageLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'sectionList'
			}]
		});

		sections.route('/enroll/:id', {
			action: function () {
				BlazeLayout.render('pageLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'userList'
			}]
		});

		sections.route('/:id', {
			action: function () {
				BlazeLayout.render('pageLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'sectionForm'
			}]
		});

// -------------------------------- USER ROUTES --------------------------------
