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