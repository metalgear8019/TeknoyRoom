Session.setDefault('counter', 0);

Template.body.events
(
	{
		"submit #frmUser": function (event)
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

			var user = {
							username: username,
							password: password,
							first_name: first_name,
							middle_name: middle_name,
							last_name: last_name,
							user_type: user_type,
							department: department,
							program: program,
							year: year
					   };

			Meteor.call("addUser", user);

			event.target.username.value = "";
			event.target.password.value = "";
			event.target.first_name.value = "";
			event.target.middle_name.value = "";
			event.target.last_name.value = "";
			event.target.user_type.selectedIndex = 0;
			event.target.department.value = "";
			event.target.program.value = "";
			event.target.year.value = "";
		},

		"submit #frmCourse": function (event)
		{
			event.preventDefault();

			var subject_number = event.target.subject_number.value;
			var title = event.target.title.value;
			var unit = event.target.unit.value;

			var course = {
							subject_number: subject_number,
							title: title,
							unit: unit
						 };

			Meteor.call("addCourse", course);

			event.target.subject_number.value = "";
			event.target.title.value = "";
			event.target.unit.value = "";
		}
	}
);