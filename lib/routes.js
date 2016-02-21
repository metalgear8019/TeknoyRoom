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
			BlazeLayout.render('adminLayout', layouts.admin);
		},
		triggersEnter: [function () {
			layouts.admin.main = 'adminDashboard';
		}]
	});

	var users = admin.group({
		prefix: '/user'
	});

		users.route('/:id', {
			name: 'adminAddEditUser',
			action: function (params) {
				BlazeLayout.render('adminLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'userForm';
			}]
		});

		users.route('/', {
			name: 'adminViewUsers',
			action: function () {
				BlazeLayout.render('adminLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'userList';
			}]
		});

		users.route('/list/banned', {
			name: 'adminViewBannedUsers',
			action: function () {
				BlazeLayout.render('adminLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'userList';
			}]
		});

	var courses = admin.group({
		prefix: '/course'
	});

		courses.route('/:id', {
			name: 'adminAddEditCourse',
			action: function (params) {
				BlazeLayout.render('adminLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'courseForm';
			}]
		});

		courses.route('/', {
			name: 'adminViewCourses',
			action: function () {
				BlazeLayout.render('adminLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'courseList';
			}]
		});

	var semesters = admin.group({
		prefix: '/semester'
	});

		semesters.route('/:id', {
			name: 'adminAddEditSemester',
			action: function (params) {
				BlazeLayout.render('adminLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'semesterForm';
			}]
		});

		semesters.route('/', {
			name: 'adminViewSemesters',
			action: function () {
				BlazeLayout.render('adminLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'semesterList';
			}]
		});

	var enroll = admin.group({
			prefix: '/enroll'
	});

		enroll.route('/', {
			name: 'adminEnrollList',
			action: function () {
				BlazeLayout.render('adminLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'enrollList';
			}]
		});

		enroll.route('/:id', {
		name: 'adminAddEditEnroll',
		action: function (params) {
				BlazeLayout.render('adminLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'enroll'
			}]
		});

	var sections = admin.group({
		prefix: '/section'
	});

	sections.route('/', {
		name: 'adminViewSections',
		action: function () {
			BlazeLayout.render('adminLayout', layouts.admin);
		},
		triggersEnter: [function () {
			layouts.admin.main = 'sectionList';
		}]
	});

	sections.route('/:id', {
		name: 'adminAddEditSection',
		action: function (params) {
			BlazeLayout.render('adminLayout', layouts.admin);
		},
		triggersEnter: [function () {
			layouts.admin.main = 'sectionForm';
		}]
	});

// -------------------------------- INSTRUCTOR ROUTES ----------------------------

var instructor = FlowRouter.group({
	prefix: '/instructor'
});

	instructor.route('/', {
		name: 'instructorHome',
		action: function () {
			BlazeLayout.render('instructorLayout', layouts.instructor);
		},
		triggersEnter: [function () {
			layouts.instructor.main = 'instructorDashboard';
		}]
	});

	instructor.route('/profile', {
		name: 'instructorProfile',
		action: function (params) {
			BlazeLayout.render('instructorLayout', layouts.instructor);
		},
		triggersEnter: [function () {
			layouts.instructor.main = 'instructorProfile';
		}]
	});

	var currentcourses = instructor.group({
		prefix: '/current'
	});

		currentcourses.route('/', {
			name: 'instructorCurrentCourses',
			action: function (params) {
				BlazeLayout.render('instructorLayout', layouts.instructor);
			},
			triggersEnter: [function () {
				layouts.instructor.main = 'currentCourses';
			}]
		});

		currentcourses.route('/enter', {
			name: 'instructorEnterClass',
			action: function (params) {
				BlazeLayout.render('instructorLayout', layouts.instructor);
			},
			triggersEnter: [function () {
				layouts.instructor.main = 'instructorEnterClass';
			}]
		});

		currentcourses.route('/:id', {
			name: 'instructorAttendance',
			action: function (params) {
				BlazeLayout.render('instructorLayout', layouts.instructor);
			},
			triggersEnter: [function () {
				layouts.instructor.main = 'instructorAttendance';
			}]
		});

	var previouscourses = instructor.group({
		prefix: '/previous'
	});

		previouscourses.route('/', {
			name: 'instructorPreviousCourses',
			action: function (params) {
				BlazeLayout.render('instructorLayout', layouts.instructor);
			},
			triggersEnter: [function () {
				layouts.instructor.main = 'previousCourses';
			}]
		});

		currentcourses.route('/:id', {
			name: 'instructorAttendance',
			action: function (params) {
				BlazeLayout.render('instructorLayout', layouts.instructor);
			},
			triggersEnter: [function () {
				layouts.instructor.main = 'instructorAttendance'
			}]
		});


	var previouscourses = instructor.group({
		prefix: '/previous'
	});

		previouscourses.route('/', {
			name: 'instructorPreviousCourses',
			action: function (params) {
				BlazeLayout.render('instructorLayout', layouts.student);
			},
			triggersEnter: [function () {
				layouts.student.main = 'previousCourses';
			}]
		});

		previouscourses.route('/:sectionId', {
			name: 'instructorPreviousEnrollees',
			action: function (params) {
				BlazeLayout.render('instructorLayout', layouts.student);
			},
			triggersEnter: [function () {
				// TODO: create layout for list of students
				layouts.student.main = 'instructorEnrollees';
			}]
		});

		previouscourses.route('/:sectionId/:id', {
			name: 'instructorPreviousAttendance',
			action: function (params) {
				BlazeLayout.render('instructorLayout', layouts.student);
			},
			triggersEnter: [function () {
				// TODO: update this template that it supports this route params too
				layouts.student.main = 'studentAttendance';
			}]
		});

		previouscourses.route('/:id', {
			name: 'instructorPreviousAttendance',
			action: function (params) {
				BlazeLayout.render('instructorLayout', layouts.instructor);
			},
			triggersEnter: [function () {
				layouts.instructor.main = 'instructorAttendance'
			}]
		});

// -------------------------------- STUDENT ROUTES ----------------------------

var student = FlowRouter.group({
	prefix: '/student'
});

	student.route('/', {
		name: 'studentHome',
		action: function () {
			BlazeLayout.render('studentLayout', layouts.student);
		},
		triggersEnter: [function () {
			layouts.student.main = 'studentDashboard';
		}]
	});

	student.route('/profile', {
		name: 'studentProfile',
		action: function (params) {
			BlazeLayout.render('studentLayout', layouts.student);
		},
		triggersEnter: [function () {
			layouts.student.main = 'studentProfile';
		}]
	});

	var currentcourses = student.group({
		prefix: '/current'
	});

		currentcourses.route('/', {
			name: 'studentCurrentCourses',
			action: function (params) {
				BlazeLayout.render('studentLayout', layouts.student);
			},
			triggersEnter: [function () {
				layouts.student.main = 'currentCourses';
			}]
		});

		currentcourses.route('/enter', {
			name: 'studentEnterClass',
			action: function (params) {
				BlazeLayout.render('studentLayout', layouts.student);
			},
			triggersEnter: [function () {
				layouts.student.main = 'studentEnterClass';
			}]
		});

		currentcourses.route('/:id', {
			name: 'studentAttendance',
			action: function (params) {
				BlazeLayout.render('studentLayout', layouts.student);
			},
			triggersEnter: [function () {
				layouts.student.main = 'studentAttendance';
			}]
		});

	var previouscourses = student.group({
		prefix: '/previous'
	});

		previouscourses.route('/', {
			name: 'studentPreviousCourses',
			action: function (params) {
				BlazeLayout.render('studentLayout', layouts.student);
			},
			triggersEnter: [function () {
				layouts.student.main = 'previousCourses';
			}]
		});

		previouscourses.route('/:id', {
			name: 'studentPreviousAttendance',
			action: function (params) {
				BlazeLayout.render('studentLayout', layouts.student);
			},
			triggersEnter: [function () {
				layouts.student.main = 'studentAttendance';
			}]
		});

// TODO: loginForm still renders, fix later
FlowRouter.notFound = {
	action: function () {
		BlazeLayout.render('pageLayout', layouts.default);
	},
	triggersEnter: [function () {
		layouts.default.header = 'notFound';
	}]
}
