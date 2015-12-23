// collection declarations go here

//-----------------------------------------------------
//users collection and methods
Users = new Mongo.Collection('users');


Meteor.methods
(
	{
		addUser: function (user) 
		{
			if (user.user_type == 1) 
			{
				Users.insert
				(
					{
						username: user.username,
						password: user.password,
						first_name: user.first_name,
						last_name: user.last_name,
						middle_name: user.middle_name,
						state: false,
						banned: false,
						user_type: user.user_type,
						department: user.department
					}
				);
			} 
			else if (user.user_type == 2)
			{
				Users.insert
				(
					{
						username: user.username,
						password: user.password,
						first_name: user.first_name,
						last_name: user.last_name,
						middle_name: user.middle_name,
						state: false,
						banned: false,
						user_type: user.user_type,
						program: user.program,
						year: user.year
					}
				);
			}
		},

		updateUser: function (user_id, user) 
		{
			var cursor = Users.findOne(user_id);
			
			if (user.user_type === 1) {
				Users.update
				(
					user_id,
					{
						$set: 
						{ 
							username: user.username,
							password: user.password,
							first_name: user.first_name,
							last_name: user.last_name,
							middle_name: user.middle_name,
							user_type: user.user_type,
							department: user.department 
						}
				 	}
				);
			} 
			else if (user.user_type === 2) 
			{
				Users.update
				(
					user_id, 
					{ 
						$set: 
						{ 
							username: user.username, 
							password: user.password,
							first_name: user.first_name,
							last_name: user.last_name,
							middle_name: user.middle_name,
							user_type: user.user_type,
							program: user.program,
							year: user.year
						}
					 }
				);
			}
		},

		deleteUser: function (user_id)
		{
			var cursor = Users.findOne(user_id);

			Users.remove(user_id);
		},

		setBanned: function (user_id, setBan)
		{
			var cursor = Users.findOne(user_id);

			Users.update
			(
				user_id,
				{
					$set: { banned: setBan }
				}
			);
		},

		setState: function (user_id, setState)
		{
			var cursor = Users.findOne(user_id);

			Users.update
			(
				user_id,
				{
					$set: { state: setState }
				}
			);
		}
	}
);

//-----------------------------------------------------
//course collections and methods
Courses = new Mongo.Collection('courses');

Meteor.methods
(
	{
		addCourse: function(course)
		{
			Courses.insert
			(
				{
					subject_number: course.subject_number,
					title: course.title,
					unit: course.unit
				}
			);
		},

		updateCourse: function(course_id, course)
		{
			Courses.update
			(
				course_id,
				{
					$set: 
					{
						subject_number: course.subject_number,
						title: course.title,
						unit: course.unit
					}
				}
			);
		},

		deleteCourse: function(course_id)
		{
			Courses.remove(course_id);
		}
	}
);


//-----------------------------------------------------
//Section collections and methods
Sections = new Mongo.Collection('sections');

Meteor.methods
(
	{
		addSection: function (section)
		{
			Sections.insert
			(
				{
					name: section.name,
					course: section.course,
					semester: section.semester,
					schedule: section.schedule
				}
			);
		},

		updateSection: function (section_id, section)
		{
			Sections.update
			(
				section_id,
				{
					$set:
					{
						name: section.name,
						course: section.course,
						semester: section.semester,
						schedule: section.schedule		
					}
				}
			);
		},

		deleteSection: function (section_id)
		{
			Sections.remove(section_id);
		}
	}
);

//-----------------------------------------------------
//Semester collections and methods
Semesters = new Mongo.Collection('semesters');

Meteor.methods
(
	{
		addSemester: function (semester)
		{
			Semesters.insert
			(
				{
					school_year: semester.school_year,
					start_date: semester.start_date,
					end_date: semester.end_date,
					name: semester.name
				}
			);
		},

		updateSemester: function (semester_id, semester)
		{
			Semesters.update
			(
				semester_id,
				{
					$set: 
					{
						school_year: semester.school_year,
						start_date: semester.start_date,
						end_date: semester.end_date,
						name: semester.name
					}
				}
			);
		},

		deleteSemester: function (semester_id)
		{
			Semesters.remove(semester_id);
		}
	}
);

//-----------------------------------------------------
//Enrollee collections and methods
Enrollees = new Mongo.Collection('enrollees');

Meteor.methods
(
	{
		addEnrollee: function (enrollee)
		{
			Enrollees.insert
			(
				{
					user: enrollee.user,
					section: enrollee.section,
					attendance: enrollee.attendance
				}
			);
		},

		updateEnrollee: function (enrollee_id, enrollee)
		{
			Enrollees.update
			(
				enrollee_id,
				{
					$set:
					{
						user: enrollee.user,
						section: enrollee.section,
						attendance: enrollee.attendance		
					}
				}
			);
		},

		deleteEnrollee: function (enrollee_id)
		{
			Enrollees.remove(enrollee_id);
		}
	}
);

//-----------------------------------------------------
//Note collections and methods
Notes = new Mongo.Collection('notes');

Meteor.methods
(
	{
		addNote: function (note)
		{
			Notes.insert
			(
				{
					owner: note.owner,
					course: note.course,
					content: note.content
				}
			);
		},

		updateNote: function (note_id, note)
		{
			Notes.update
			(
				note_id,
				{
					$set:
					{
						owner: note.owner,
						course: note.course,
						content: note.content		
					}
				}
			);
		},

		deleteNote: function (note_id)
		{
			Notes.remove(note_id);
		}
	}
);