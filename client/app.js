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