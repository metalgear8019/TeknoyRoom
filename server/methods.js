Meteor.methods
(
	{
		addUser: function (user) 
		{
			check(user, Object);
			try 
			{
				Accounts.createUser(user);
			} 
			catch(e)
			{
				console.log(e);	
				return new Meteor.Error(500, 'exception in add user', e);
			}
		},
		updateImage : function(user_id, img)
		{
			check(user_id, String);
			check(img, String);

			try
			{
				Users.update({_id : user_id},{
					$set: {
						"profile.image": img
					}
				});
			}
			catch(e)
			{
				console.log(e);
				throw new Meteor.Error(500, 'error in uploading image', e);
			}
		},

		updatePeerStatus: function (user_id, peer_status)
		{
			check(user_id, String);
			check(peer_status, Object);
			try
			{
				Users.update({ _id: user_id }, {
					$set: { peer: peer_status }
				});
			}
			catch (e)
			{
				console.log(e);
				throw new Meteor.Error(500, 'exception in updating class', e);
			}
		},

		logAttendance: function (user_id, user_attendance)
		{
			check(user_id, String);
			check(user_attendance, Object);
			try
			{
				Users.update({ _id: user_id }, {
					$set: { 
						peer: {
							_id: null,
							room_id: null
						}
					}
				});

				Enrollee.update({ user: user_id }, {
					$push: {
						attendance: user_attendance
					}
				});
			}
			catch (e)
			{
				console.log(e);
				throw new Meteor.Error(500, 'exception in logging attendance', e);
			}
		},

		updateUser: function (user_id, user) 
		{
			check(user_id, String);
			check(user, Object);
			try
			{
				console.log(user.profile.user_type);
				if (user.profile.user_type == 1) {
					Users.update
					(
						user_id,
						{
							$set: 
							{
								profile:  
                            	{ 
                            		id_number: user.profile.id_number,
	                                first_name: user.profile.first_name,
	                                last_name: user.profile.last_name,
	                                middle_name: user.profile.middle_name,
	                                user_type: user.profile.user_type,
	                                gender: user.profile.gender,
	                                banned: user.profile.banned,
	                                department: user.profile.department,
	                                image: user.profile.image
                            	}
                        	}
					 	}
					);
				} 
				else if (user.profile.user_type == 2) 
				{
					Users.update
					(
						user_id, 
						{ 
							$set: 
							{
								profile:  
                            	{ 
                            		id_number: user.profile.id_number,
	                                first_name: user.profile.first_name,
	                                last_name: user.profile.last_name,
	                                middle_name: user.profile.middle_name,
	                                banned: user.profile.banned,
	                                gender: user.profile.gender,
	                                user_type: user.profile.user_type,
	                                program: user.profile.program,
	                                year: user.profile.year,
	                                image: user.profile.image
                            	}
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
			check(user_id, String);
			try
			{
				Users.remove(user_id);
				Notes.remove({'owner': user_id});
				Enrollees.remove({'user': user_id});
			} 
			catch(e)
			{
				console.log(e);
				throw new Meteor.Error(500, 'exception in delete user', e);
			}
		},

		setBanned: function (user_id, setBan)
		{
			check(user_id, String);
			check(setBan, Boolean);

			var cursor = Users.findOne(user_id);

			Users.update
			(
				user_id,
				{ 
					$set: 
					{
						profile:  
                    	{ 
                    		id_number: cursor.profile.id_number,
                            first_name: cursor.profile.first_name,
                            last_name: cursor.profile.last_name,
                            middle_name: cursor.profile.middle_name,
                            banned: setBan,
                            gender: cursor.profile.gender,
                            user_type: cursor.profile.user_type,
                            program: cursor.profile.program,
                            year: cursor.profile.year,
                            department: cursor.profile.department,
                            image: cursor.profile.image
                    	}
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
			check(course, Object);
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
			check(course_id, String);
			check(course, Object);
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
			check(course_id, String);
			try
			{
				Courses.remove(course_id);
				var sections = Sections.find({'course': course_id}).map(function(section){return section._id;});
				Notes.remove({'course': course_id});
				Enrollees.remove({'section': { '$in': sections}});
				Sections.remove({'_id': { '$in': sections}});
			} 
			catch(e)
			{
				console.log(e);
				throw new Meteor.Error(500, 'exception in delete course', e);
			}
		},

		addSection: function (section)
		{
			check(section, Object);
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
			check(section_id, String);
			check(section, Object);
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
			check(section_id, String);
			try
			{
				Sections.remove(section_id);
				Enrollees.remove({'section': section_id});
			} 
			catch(e)
			{
				console.log(e);
				throw new Meteor.Error(500, 'exception in delete section', e);
			}
		},

		addSemester: function (semester)
		{
			check(semester, Object);
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
			check(semester_id, String);
			check(semester, Object);
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
			check(semester_id, String);
			try
			{
				Semesters.remove(semester_id);
				var sections = Sections.find({'semester': semester_id}).map(function(section){return section._id;});
				Enrollees.remove({'section': { '$in': sections}});
				Sections.remove({'_id': { '$in': sections}});
			} 
			catch(e)
			{
				console.log(e);
				throw new Meteor.Error(500, 'exception in delete semester', e);
			}
		},

		addEnrollee: function (enrollees)
		{
			check(enrollees, Array);
			try
			{
				_.each(enrollees, function(enrollees){
					Enrollees.insert(enrollees);
					var user = Users.findOne(enrollees.user);
					if (user.profile.user_type == 2)
					{	
						var section = Sections.findOne(enrollees.section);
						Notes.insert
						(
							{
								owner: user._id,
								course: section.course,
								content: ''
							}
						);
					}
				});
			} 
			catch(e)
			{
				console.log(e);
				throw new Meteor.Error(500, 'exception in add enrollee', e);
			}
		},

		updateEnrollee: function (enrollee_id, enrollee)
		{
			check(enrollee_id, String);
			check(enrollee, Object);
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
			check(enrollee_id, String);
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
			check(note, Object);
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
			check(note_id, String);
			check(note, Object);
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
			check(note_id, String);
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

		getServerTime: function () 
		{
			var time = (new Date()).getTime();
			//console.log('server time >> ' + time);
			return time;
		},

		parseUpload: function (data) 
		{
	    	check( data, Array );


		    for(let i = 0; i < data.length; i++)
		    {
		    	let item = data[i],
		    		exists = Users.findOne({id_number : item.id_number});

		    	if(! exists)
		    	{

		    		item.banned = (item.banned == null || item.banned == undefined)? false: item.banned;
		    		item.middle_name = (item.middle_name == "" || item.middle_name == undefined)? '':item.middle_name;
		    		item.gender = (item.gender == undefined || item.gender == null)? "Male":item.gender;
		    		item.user_type = (item.department == null || item.department == undefined)? 2:1;


		    		var user = {
		    			username: 'cit' + item.id_number,
		    			password: item.id_number,
		    			emails: [],
		    			profile:  
                    	{ 
                    		id_number: item.id_number,
                            first_name: item.first_name,
                            last_name: item.last_name,
                            middle_name: item.middle_name,
                            banned: item.banned,
                            gender: item.gender,
                            user_type: item.user_type,
                            program: item.program,
                            year: item.year
                    	}
		    		};
		    		Accounts.createUser(user);
		    	}
		    	else
		    	{
		    		console.log("Rejected, account is already in used");
		    	}
		    }
	    },
	    
	    parseSectionUpload: function (data)
	    {
		    	check( data, Array );

				for(let i = 0; i < data.length; i++)
				{
					let item = data[i];
						exists = Sections.findOne({semester: item.semester, course: item.course});

				if( ! exists)
				{
					Sections.insert
					(
						{
							section_name: item.section_name,
							course: item.course,
							semester: item.semester,
							day: item.day,
							hour: item.hour,
							minute: item.minute,
							duration: item.duration
						}
					);
				}
				else
				{
					console.log("Rejected!");
				}
		    }
		}
	}
);

//for the section's CSV upload
/*Meteor.methods
({
	parseSectionUpload(data){
		check( data, Array );

		for(let i = 0; i < data.length; i++)
		{
			let item = data[i];
				exists = Sections.findOne({semester: item.semester, course: item.course});

			if( ! exists)
			{
				Sections.insert
				(
					{
						section_name: item.section_name,
						course: item.course,
						semester: item.semester,
						day: item.day,
						hour: item.hour,
						minute: item.minute,
						duration: item.duration
					}
				);
			}
			else
			{
				console.log("Rejected!");
			}
		}
	}
});*/

