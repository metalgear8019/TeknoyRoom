Template.userForm.created = function () {
	Session.set('isStudent', true);
};

Template.userForm.helpers
(
	{
		isStudent: function () {
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

			var username = event.target.username.value;
			var password = event.target.password.value;
			var first_name = event.target.first_name.value;
			var middle_name = event.target.middle_name.value;
			var last_name = event.target.last_name.value;
			var user_type = event.target.user_type.value;
			var department = event.target.department.value;
			var program = event.target.program.value;
			var year = event.target.year.value;
			var gender = event.target.gender.value;
			console.log('Gender: ' + gender);

			if (username != '' || password != ''|| first_name != '' || middle_name != '' || last_name != '') 
			{
				if (user_type == 1 && department != '')
				{
					var user = {
									username: username,
									password: password,
									first_name: first_name,
									middle_name: middle_name,
									last_name: last_name,
									user_type: user_type,
									department: department
							   };
					Meteor.call('addUser', user);
				} 
				else if (user_type == 2 && (program != '' && year != '')) 
				{
					var user = {
									username: username,
									password: password,
									first_name: first_name,
									middle_name: middle_name,
									last_name: last_name,
									user_type: user_type,
									program: program,
									year: year
							   };
					Meteor.call('addUser', user)
				}
				else
				{
					alert('Necessary fields must be filled..');
				}

				event.target.username.value = '';
				event.target.password.value = '';
				event.target.first_name.value = '';
				event.target.middle_name.value = '';
				event.target.last_name.value = '';
				event.target.user_type.selectedIndex = 0;
				event.target.department.value = '';
				event.target.program.value = '';
				event.target.year.value = '';
			} 
			else 
			{
				alert('Necessary fields must be filled..');
			}
		},
		'change #type': function (event) {
			Session.set('isStudent', (event.target.value == 2));
		}
	}
);