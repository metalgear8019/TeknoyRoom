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

FlowRouter.route('/login', {
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
			layouts.admin.main = 'adminDashboard'
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
				layouts.admin.main = 'userForm'
			}]
		});

		users.route('/', {
			name: 'adminViewUsers',
			action: function () {
				BlazeLayout.render('adminLayout', layouts.admin);
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
				BlazeLayout.render('adminLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'courseForm'
			}]
		});

		courses.route('/', {
			name: 'adminViewCourses',
			action: function () {
				BlazeLayout.render('adminLayout', layouts.admin);
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
				BlazeLayout.render('adminLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'semesterForm'
			}]
		});

		semesters.route('/', {
			name: 'adminViewSemesters',
			action: function () {
				BlazeLayout.render('adminLayout', layouts.admin);
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
					BlazeLayout.render('adminLayout', layouts.admin);
				},
				triggersEnter: [function () {
					layouts.admin.main = 'semesterList'
				}]
			});

			enroll.route('/:semesterId/:courseId', {
				name: 'adminEnrollStudentsCourseList',
				action: function (params) {
					BlazeLayout.render('adminLayout', layouts.admin);
				},
				triggersEnter: [function () {
					layouts.admin.main = 'courseList'
				}]
			});

			enroll.route('/:semesterId/:courseId/:id', {
				name: 'adminEnrollStudentsList',
				action: function (params) {
					BlazeLayout.render('adminLayout', layouts.admin);
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
					BlazeLayout.render('adminLayout', layouts.admin);
				},
				triggersEnter: [function () {
					layouts.admin.main = 'semesterList'
				}]
			});

			assign.route('/:semesterId/:courseId', {
				name: 'adminAssignInstructorCourseList',
				action: function (params) {
					BlazeLayout.render('adminLayout', layouts.admin);
				},
				triggersEnter: [function () {
					layouts.admin.main = 'courseList'
				}]
			});

			assign.route('/:semesterId/:courseId/:id', {
				name: 'adminAssignInstructorList',
				action: function (params) {
					BlazeLayout.render('adminLayout', layouts.admin);
				},
				triggersEnter: [function () {
					layouts.admin.main = 'userList'
				}]
			});

		sections.route('/new', {
			name: 'adminAddSection',
			action: function () {
				BlazeLayout.render('adminLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'sectionForm'
			}]
		});

		sections.route('/', {
			name: 'adminEditSectionSemesterList',
			action: function () {
				BlazeLayout.render('adminLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'sectionList'
			}]
		});

		sections.route('/:id', {
			name: 'adminEditSection',
			action: function (params) {
				BlazeLayout.render('adminLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'sectionForm'
			}]
		});

		/*sections.route('/:semesterId', {
			name: 'adminEditSectionCourseList',
			action: function (params) {
				BlazeLayout.render('adminLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'courseList'
			}]
		});

		sections.route('/:semesterId/:courseId', {
			name: 'adminEditSectionList',
			action: function (params) {
				BlazeLayout.render('adminLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'sectionList'
			}]
		});

		sections.route('/:semesterId/:courseId/:id', {
			name: 'adminEditSection',
			action: function (params) {
				BlazeLayout.render('adminLayout', layouts.admin);
			},
			triggersEnter: [function () {
				layouts.admin.main = 'sectionForm'
			}]
		});*/

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
			layouts.instructor.main = 'instructorDashboard'
		}]
	});

	instructor.route('/profile', {
		name: 'instructorProfile',
		action: function (params) {
			BlazeLayout.render('instructorLayout', layouts.instructor);
		},
		triggersEnter: [function () {
			layouts.instructor.main = 'instructorProfile'
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
				layouts.instructor.main = 'currentCourses'
			}]
		});

		currentcourses.route('/ccs123/', {
			name: 'instructorCCS123',
			action: function (params) {
				BlazeLayout.render('instructorLayout', layouts.instructor);
			},
			triggersEnter: [function () {
				layouts.instructor.main = 'instructorCCS123'
			}]
		});

		currentcourses.route('/jacque/', {
			name: 'instructorJacque',
			action: function (params) {
				BlazeLayout.render('instructorLayout', layouts.instructor);
			},
			triggersEnter: [function () {
				layouts.instructor.main = 'instructorJacque'
			}]
		});

		currentcourses.route('/enter', {
			name: 'instructorEnterClass',
			action: function (params) {
				BlazeLayout.render('instructorLayout', layouts.instructor);
			},
			triggersEnter: [function () {
				layouts.instructor.main = 'instructorEnterClass'
			}]
		});

	var previouscourses = instructor.group({
		prefix: '/previous'
	});

		previouscourses.route('/allsemesters', {
			name: 'instructorAllSemesters',
			action: function (params) {
				BlazeLayout.render('instructorLayout', layouts.instructor);
			},
			triggersEnter: [function () {
				layouts.instructor.main = 'instructorAllSemesters'
			}]
		});

		previouscourses.route('/allcourses', {
			name: 'instructorAllCourses',
			action: function (params) {
				BlazeLayout.render('instructorLayout', layouts.instructor);
			},
			triggersEnter: [function () {
				layouts.instructor.main = 'instructorAllCourses'
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
			layouts.student.main = 'studentDashboard'
		}]
	});

	student.route('/profile', {
		name: 'studentProfile',
		action: function (params) {
			BlazeLayout.render('studentLayout', layouts.student);
		},
		triggersEnter: [function () {
			layouts.student.main = 'studentProfile'
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
				layouts.student.main = 'currentCourses'
			}]
		});

		currentcourses.route('/enter', {
			name: 'studentEnterClass',
			action: function (params) {
				BlazeLayout.render('studentLayout', layouts.student);
			},
			triggersEnter: [function () {
				layouts.student.main = 'studentEnterClass'
			}]
		});

		currentcourses.route('/:id', {
			name: 'studentAttendance',
			action: function (params) {
				BlazeLayout.render('studentLayout', layouts.student);
			},
			triggersEnter: [function () {
				layouts.student.main = 'studentAttendance'
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
				layouts.student.main = 'studentPreviousCourses'
			}]
		});

		previouscourses.route('/:id', {
			name: 'studentPreviousAttendance',
			action: function (params) {
				BlazeLayout.render('studentLayout', layouts.student);
			},
			triggersEnter: [function () {
				layouts.student.main = 'studentAttendance'
			}]
		});