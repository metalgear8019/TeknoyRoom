Template.userForm.onCreated(function () {
	Session.set('gender', true);
	Session.set('isStudent', true);

	var self = this;
	self.autorun(function() {
		var id = FlowRouter.getParam('id');
		self.subscribe(SubscriptionTag.ONE_USER, id);
	});
});

Template.userForm.helpers
(
	{
		isStudent: function () 
		{
			return Session.get('isStudent');
		},

		isGenderMale: function()
		{
			//console.log(Session.get('gender'));
			return Session.get('gender');
		},

		item: function() 
		{
			var id = FlowRouter.getParam('id');
			var user = Users.findOne(id) || { _id: 'new', isNew: true };

			if (id != 'new')
			{
				Session.set('gender', user.profile.gender  == 'Male');
				Session.set('isStudent', user.profile.user_type  == 2);
			}

			return user;
		},

		userTypes: function()
		{
			var id = FlowRouter.getParam('id');
			var user = Users.findOne(id, {'profile.id_number': 0, 'profile.first_name': 0, 'profile.middle_name': 0, 'profile.last_name': 0, 'profile.user_type': 1, 'profile.year': 0, 'profile.program': 0, 'profile.department': 0, 'profile.gender': 0 }) || { _id: 'new', isNew: true };
			var userTypes = [
				{ 
					name: 'Student',
					value: 2,
					selected: 'selected'
				},
				
				{
					name: 'Instructor',
					value: 1,
					selected: ''
				},

				{
					name: 'Admin',
					value: 0,
					selected: ''
				}
			];

			if (id != 'new')
			{
				for (var i = 0; i < userTypes.length; i++)
				{
					if (userTypes[i].value == user.profile.user_type)
					{
						userTypes[i].selected = 'selected';
					}
				}
			}

			return userTypes;
		},

		Programs: function()
		{
			var id = FlowRouter.getParam('id');
			var user = Users.findOne(id) || { _id: 'new', isNew: true };
			var programs = [
				{
					value: 'BSIT',
					selected: 'selected'
				},

				{
					value: 'BSCS',
					selected: ''
				},

				{
					value: 'BSCPE',
					selected: ''
				},

				{
					value: 'BSIE',
					selected: ''
				},

				{
					value: 'BSME',
					selected: ''
				},

				{
					value: 'BSCHE',
					selected: ''
				},

				{
					value: 'BSEM',
					selected: ''
				},

				{
					value: 'BSEE',
					selected: ''
				},

				{
					value: 'BSECE',
					selected: ''
				},

				{
					value: 'BSARCH',
					selected: ''
				},
			];

			if (id != 'new')
			{
				for (var i = 0; i < programs.length; i++)
				{
					if (programs[i].value == user.profile.program)
					{
						programs[i].selected = 'selected';
					}
				}
			}

			return programs;
		},

		Years: function()
		{
			var id = FlowRouter.getParam('id');
			var user = Users.findOne(id) || { _id: 'new', isNew: true };
			var years = [
				{
					value: 1,
					selected: 'selected'
				},

				{
					value: 2,
					selected: ''
				},

				{
					value: 3,
					selected: ''
				},

				{
					value: 4,
					selected: ''
				},

				{
					value: 5,
					selected: ''
				}
			];

			if (id != 'new')
			{
				for (var i = 0; i < years.length; i++)
				{
					if (years[i].value == user.profile.year)
					{
						years[i].selected = 'selected';
					}
				}
			}

			return years;
		},

		Departments: function()
		{
			var id = FlowRouter.getParam('id');
			var user = Users.findOne(id) || { _id: 'new', isNew: true };
			var departments = [
				{
					value: 'Information Technology',
					selected: 'selected'
				},

				{
					value: 'Computer Science',
					selected: ''
				}
			];

			if (id != 'new')
			{
				for (var i = 0; i < departments.length; i++)
				{
					if (departments[i].value == user.profile.department)
					{
						departments[i].selected = 'selected';
					}
				}
			}

			return departments;
		}
	}
);

Template.userForm.events
(
	{
		'submit #frmUser': function (event)
		{
			event.preventDefault();

			var id = event.target._id.value;
			var id_number = event.target.id_number.value;
			var first_name = event.target.first_name.value;
			var middle_name = event.target.middle_name.value;
			var last_name = event.target.last_name.value;
			var user_type = event.target.user_type.value;
			var gender = event.target.gender.value;
			var banned = event.target.banned.value;

			if (banned == '')
			{
				banned = false;
			}

			var user = {
				username: "cit" + id_number,
				password: id_number,
				profile: {
					id_number: id_number,
					first_name: first_name,
					middle_name: middle_name,
					last_name: last_name,
					user_type: user_type,
					gender: gender,
					banned: banned
				},
				roles: [
					'default',
					Role.Permission.READ_USERS,
					Role.Permission.READ_COURSES,
					Role.Permission.READ_SECTIONS,
					Role.Permission.READ_SEMESTERS
				]
			};

			if (id_number != ''  && first_name != '' && middle_name != '' && last_name != '') 
			{
				if (user_type == 1)
				{
					var department = event.target.department.value;

					if (department != '')
					{
						user.roles[0] = Role.Group.INSTRUCTOR;
						user.profile.department = department;
						if (id == 'new')
						{
							Meteor.call('addUser', user, function(err){
								if(err)
									Notifications.error('ERROR', err.reason, {timeout: 5000});
								else
									Notifications.success('SUCCESS', 'Instructor successfully added', {timeout: 5000});
							});
						}
						else
						{
							Meteor.call('updateUser', id, user, function(err){
								if(err)
									Notifications.error('ERROR', err.reason, {timeout: 5000});
								else
									Notifications.success('SUCCESS', 'Instructor successfully updated', {timeout: 5000});
							});
						}
						FlowRouter.go('/admin/user/');
					}
				} 
				else if (user_type == 2) 
				{
					var program = event.target.program.value;
					var year = event.target.year.value;

					if (program != '' && year != '')
					{
						user.roles[0] = Role.Group.STUDENT;
						user.profile.program = program;
						user.profile.year = year;
						//console.log("program: " + user.profile.program);
						//console.log("year: " + user.profile.year);
						console.log(id);

						if (id == 'new')
						{
							Meteor.call('addUser', user, function(err){
								if(err)
									Notifications.error('ERROR', err.reason, {timeout: 5000});
								else
									Notifications.success('SUCCESS', 'Student successfully added')
							});
						}
						else
						{
							console.log('updating');
							Meteor.call('updateUser', id, user, function(err){
								if(err)
									Notifications.error('ERROR', err.reason, {timeout: 5000});
								else
									Notifications.success('SUCCESS', 'Student successfully updated', {timeout: 5000});
							});
						}

						FlowRouter.go('/admin/user/');
					}
				}
				else if(user_type == 0)
				{
					user = {
						username: id_number,
						password: id_number,
						profile: {
							user_type: user_type,
							banned: false
						},
						roles: [
							Role.Group.ADMIN,
							Role.Permission.READ_USERS,
							Role.Permission.READ_COURSES,
							Role.Permission.READ_SECTIONS,
							Role.Permission.READ_SEMESTERS,
							Role.Permission.WRITE_USERS,
							Role.Permission.WRITE_COURSES,
							Role.Permission.WRITE_SECTIONS,
							Role.Permission.WRITE_SEMESTERS
						]
					};
					
					Meteor.call('addUser', user, function(err){
						if(err)
							Notifications.error('ERROR', err.reason, {timeout: 5000});
						else
							Notifications.success('SUCCESS', 'Admin successfully added', {timeout: 5000});
					});
					FlowRouter.go('/admin/user/');
				}
				else
				{
					$('.toast').text('Please fill in the necessary fields.');
					$('.toast').fadeIn(400).delay(3000).fadeOut(400);
				}
			}
			else
			{
				$('.toast').text('Please fill in the necessary fields.');
				$('.toast').fadeIn(400).delay(3000).fadeOut(400);
			}
		},

		'change #user_type': function (event) 
		{
			event.preventDefault();
			Session.set('isStudent', (event.target.value == 2));
		},

		'change .gender': function (event)
		{
			event.preventDefault();
			Session.set('gender', (event.target.value == 'Male'));
		},
	}
);