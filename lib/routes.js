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
	},
	default: {
		header: 'loginForm'
	}
};

// --------------------------------- AUTH LOGIC ---------------------------------

FlowRouter.route('/', {
	action: function () {
		BlazeLayout.render('pageLayout', layouts.default);
	}
});

// -------------------------------- ADMIN ROUTES --------------------------------

var admin = FlowRouter.group({
	prefix: '/admin'
});

	admin.route('/', {
		name: 'adminHome',
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
			name: 'adminAddEditUser',
			action: function (params) {
				BlazeLayout.render('pageLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'userForm'
			}]
		});

		users.route('/', {
			name: 'adminViewUsers',
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
			name: 'adminAddEditCourse',
			action: function (params) {
				BlazeLayout.render('pageLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'courseForm'
			}]
		});

		courses.route('/', {
			name: 'adminViewCourses',
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

		semesters.route('/:id', {
			name: 'adminAddEditSemester',
			action: function (params) {
				BlazeLayout.render('pageLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'semesterForm'
			}]
		});

		semesters.route('/', {
			name: 'adminViewSemesters',
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

		var enroll = sections.group({
			prefix: '/enroll'
		});

			enroll.route('/', {
				name: 'adminEnrollStudentsSemesterList',
				action: function () {
					BlazeLayout.render('pageLayout', layouts.admin);
				},
				triggersEnter: [function () {
					layouts.admin.main = 'semesterList'
				}]
			});

			enroll.route('/:semesterId/:courseId', {
				name: 'adminEnrollStudentsCourseList',
				action: function (params) {
					BlazeLayout.render('pageLayout', layouts.admin);
				},
				triggersEnter: [function () {
					layouts.admin.main = 'courseList'
				}]
			});

			enroll.route('/:semesterId/:courseId/:id', {
				name: 'adminEnrollStudentsList',
				action: function (params) {
					BlazeLayout.render('pageLayout', layouts.admin);
				},
				triggersEnter: [function () {
					layouts.admin.main = 'userList'
				}]
			});

		var assign = sections.group({
			prefix: '/assign'
		});

			assign.route('/', {
				name: 'adminAssignInstructorSemesterList',
				action: function () {
					BlazeLayout.render('pageLayout', layouts.admin);
				},
				triggersEnter: [function () {
					layouts.admin.main = 'semesterList'
				}]
			});

			assign.route('/:semesterId/:courseId', {
				name: 'adminAssignInstructorCourseList',
				action: function (params) {
					BlazeLayout.render('pageLayout', layouts.admin);
				},
				triggersEnter: [function () {
					layouts.admin.main = 'courseList'
				}]
			});

			assign.route('/:semesterId/:courseId/:id', {
				name: 'adminAssignInstructorList',
				action: function (params) {
					BlazeLayout.render('pageLayout', layouts.admin);
				},
				triggersEnter: [function () {
					layouts.admin.main = 'userList'
				}]
			});

		sections.route('/new', {
			name: 'adminAddSection',
			action: function () {
				BlazeLayout.render('pageLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'sectionForm'
			}]
		});

		sections.route('/', {
			name: 'adminEditSectionSemesterList',
			action: function () {
				BlazeLayout.render('pageLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'sectionList'
			}]
		});

		sections.route('/:id', {
			name: 'adminEditSection',
			action: function (params) {
				BlazeLayout.render('pageLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'sectionForm'
			}]
		});

		/*sections.route('/:semesterId', {
			name: 'adminEditSectionCourseList',
			action: function (params) {
				BlazeLayout.render('pageLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'courseList'
			}]
		});

		sections.route('/:semesterId/:courseId', {
			name: 'adminEditSectionList',
			action: function (params) {
				BlazeLayout.render('pageLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'sectionList'
			}]
		});

		sections.route('/:semesterId/:courseId/:id', {
			name: 'adminEditSection',
			action: function (params) {
				BlazeLayout.render('pageLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'sectionForm'
			}]
		});*/

// -------------------------------- USER ROUTES --------------------------------

