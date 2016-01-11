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

			if (id_number != ''  && first_name != '' && middle_name != '' && last_name != '') 
			{
				if (user_type == 1)
				{
					var department = event.target.department.value;

					if (department != '')
					{
						var user = {
										id_number: id_number,
										username: "cit" + id_number,
										password: id_number,
										first_name: first_name,
										middle_name: middle_name,
										last_name: last_name,
										user_type: user_type,
										gender: gender,
										department: department
								   };
						
						Meteor.call('addUser', user);
					}
				} 
				else if (user_type == 2) 
				{
					var program = event.target.program.value;
					var year = event.target.year.value;

					if (program != '' && year != '')
					{

						var user = {
										id_number: id_number,
										username: "cit" + id_number,
										password: id_number,
										first_name: first_name,
										middle_name: middle_name,
										last_name: last_name,
										user_type: user_type,
										gender: gender,
										program: program,
										year: year
								   };
						
						Meteor.call('addUser', user)
					}
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