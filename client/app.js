Session.setDefault('counter', 0);

Template.body.events
(
	{
		'click .menu-toggle': function (event)
		{
			// event.preventDefault();
			// $("#wrapper").toggleClass("toggled");
			alert('toggle class');
		},
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

		'submit #frmSemester': function (event)
		{
			event.preventDefault();

			var school_year = event.target.school_year.value;
			var start_date = event.target.start_date.value;
			var end_date = event.target.end_date.value;
			var name = event.target.name.value;


			if (school_year != '' || start_date != '' || end_date != '' || name != '')
			{
				var semester = {
									school_year: school_year,
									start_date: start_date,
									end_date: end_date,
									name: name
							   };
				
				Meteor.call('addSemester', semester);

				 event.target.school_year.value = '';
				 event.target.start_date.value= this.defaultValue;
				 event.target.end_date.value= this.defaultValue;
				 event.target.start_date.value= '';
			}
			else
			{
				alert('Necessary fields must be filled..');
			}
		},

		'submit #frmSection': function (event)
		{
			event.preventDefault();

			var name = event.target.name.value;
			var course = event.target.course.value;
			var semester = event.target.semester.value;
			var schedule = event.target.schedule.value;

			if (name != '' || course != '' || semester != '' || schedule != '')
			{
				var section = {
									name: name,
									course: course,
									semester: semester,
									schedule: schedule
							  };

				Meteor.call('addSection', section);

				event.target.name.value = '';
				event.target.course.selectedIndex = 0;
				event.target.semester.selectedIndex = 0;
				event.target.schedule.value = '';
			}
			else
			{
				alert('Necessary fields must be filled..');
			}
		}
	}
);