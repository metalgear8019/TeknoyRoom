Template.userForm.created = function () {
	Session.set('isStudent', true);
};

Template.userForm.helpers
(
	{
		isStudent: function () 
		{
			return Session.get('isStudent');
		}
	}
);

Template.userForm.events
(
	{
		'submit #frmUser': function (event)
		{
			event.preventDefault();

			var id_number = event.target.id_number.value;
			var first_name = event.target.first_name.value;
			var middle_name = event.target.middle_name.value;
			var last_name = event.target.last_name.value;
			var user_type = event.target.user_type.value;
			var gender = event.target.gender.value;

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
					banned: false
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
						user.department = department;
						Meteor.call('addUser', user);
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
						user.program = program;
						user.year = year;
						console.log("program: " + user.program);
						console.log("year: " + user.year);
						Meteor.call('addUser', user);
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
					Meteor.call('addUser', user);
					FlowRouter.go('/admin/user/');
				}
				else
				{
					alert('Necessary fields must be filled..');
				}
			}
			else
			{
				alert('Necessary fields must be filled..');
			}
		},

		'change #user_type': function (event) 
		{
			Session.set('isStudent', (event.target.value == 2));
		}
	}
);