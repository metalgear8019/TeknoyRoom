// collection declarations go here

//-----------------------------------------------------
//users collection and methods
Users = new Mongo.Collection('users');

Meteor.methods
(
	{
		addUser: function (user) 
		{
			try {
				if (user.user_type == 1) 
				{
					Users.insert
					(
						{
							id_number: user.id_number,
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
							id_number: user.id_number,
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
			} 
			catch(e)
			{
				console.log(e);
				throw new Meteor.Error(500, 'exception in add user', e);
			}
		},

		updateUser: function (user_id, user) 
		{
			try
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
			} 
			catch(e)
			{
				console.log(e);
				throw new Meteor.Error(500, 'exception in update user', e);
			}	
		},

		deleteUser: function (user_id)
		{
			try
			{
				var cursor = Users.findOne(user_id);
				Users.remove(user_id);
			} 
			catch(e)
			{
				console.log(e);
				throw new Meteor.Error(500, 'exception in delete user', e);
			}
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
			try
			{
				Courses.insert
				(
					{
						subject_number: course.subject_number,
						title: course.title,
						unit: course.unit
					}
				);
			} 
			catch(e)
			{
				console.log(e);
				throw new Meteor.Error(500, 'exception in add course', e);
			}
		},

		updateCourse: function(course_id, course)
		{
			try
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
			} 
			catch(e)
			{
				console.log(e);
				throw new Meteor.Error(500, 'exception in update course', e);
			}
		},

		deleteCourse: function(course_id)
		{
			try
			{
				Courses.remove(course_id);
			} 
			catch(e)
			{
				console.log(e);
				throw new Meteor.Error(500, 'exception in delete course', e);
			}
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
			try
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
			} 
			catch(e)
			{
				console.log(e);
				throw new Meteor.Error(500, 'exception in add section', e);
			}
		},

		updateSection: function (section_id, section)
		{
			try
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
			} 
			catch(e)
			{
				console.log(e);
				throw new Meteor.Error(500, 'exception in update section', e);
			}
		},

		deleteSection: function (section_id)
		{
			try
			{
				Sections.remove(section_id);
			} 
			catch(e)
			{
				console.log(e);
				throw new Meteor.Error(500, 'exception in delete section', e);
			}
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
			try
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
			} 
			catch(e)
			{
				console.log(e);
				throw new Meteor.Error(500, 'exception in add semester', e);
			}
		},

		updateSemester: function (semester_id, semester)
		{
			try
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
			} 
			catch(e)
			{
				console.log(e);
				throw new Meteor.Error(500, 'exception in update semester', e);
			}
		},

		deleteSemester: function (semester_id)
		{
			try
			{
				Semesters.remove(semester_id);
			} 
			catch(e)
			{
				console.log(e);
				throw new Meteor.Error(500, 'exception in delete semester', e);
			}
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
			try
			{
				Enrollees.insert
				(
					{
						user: enrollee.user,
						section: enrollee.section,
						attendance: enrollee.attendance
					}
				);
			} 
			catch(e)
			{
				console.log(e);
				throw new Meteor.Error(500, 'exception in add enrollee', e);
			}
		},

		updateEnrollee: function (enrollee_id, enrollee)
		{
			try
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
			} 
			catch(e)
			{
				console.log(e);
				throw new Meteor.Error(500, 'exception in update enrollee', e);
			}
		},

		deleteEnrollee: function (enrollee_id)
		{
			try
			{
				Enrollees.remove(enrollee_id);
			} 
			catch(e)
			{
				console.log(e);
				throw new Meteor.Error(500, 'exception in delete enrollee', e);
			}
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
			try
			{
				Notes.insert
				(
					{
						owner: note.owner,
						course: note.course,
						content: note.content
					}
				);
			} 
			catch(e)
			{
				console.log(e);
				throw new Meteor.Error(500, 'exception in add note', e);
			}
		},

		updateNote: function (note_id, note)
		{
			try
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
			} 
			catch(e)
			{
				console.log(e);
				throw new Meteor.Error(500, 'exception in update note', e);
			}
		},

		deleteNote: function (note_id)
		{
			try
			{
				Notes.remove(note_id);
			} 
			catch(e)
			{
				console.log(e);
				throw new Meteor.Error(500, 'exception in delete note', e);
			}
		}
	}
);