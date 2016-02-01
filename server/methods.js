Meteor.methods
(
	{
		addUser: function (user) 
		{
			try {
				Accounts.createUser(user);
				// Roles.addUserInRoles(id, user.roles);
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
								gender: user.gender,
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
								gender: user.gender,
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
					profile: {
						$set: { banned: setBan }
					}
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
		},

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
		},

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
						day: section.day,
						hour: section.hour,
						minute: section.minute,
						duration: section.duration
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
							day: section.day,
							hour: section.hour,
							minute: section.minute,
							duration: section.duration		
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
		},

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
		},

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
							section: enrollee.section
						},
						$addToSet:
						{
							attendance: { $each: enrollee.attendance }
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
		},

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
		},

		getServerTime: function () {
			var time = (new Date()).toTimeString();
			console.log('server time >> ' + time);
			return time;
		}
	}
);

Meteor.methods
({
	parseUpload( data ) {
	    check( data, Array );


	    for(let i = 0; i < data.length; i++)
	    {
	    	let item = data[i],
	    		exists = Users.findOne({id_number : item.id_number});

	    	if(! exists)
	    	{
	    		Accounts.createUser(item);
	    	}
	    	else
	    	{
	    		console.log("Rejected, account is already in used");
	    	}
	    }
	}
});

