Template.sectionForm.helpers
(
	{
		courses: function ()
		{
			return Courses.find({});
		},

		semesters: function ()
		{
			return Semesters.find({});
		},

		course: function()
		{
			return Session.get("course");
		},

		semester: function()
		{
			return Session.get("semester");
		}
	}
);

Template.sectionForm.events
(
	{
		'click .open-modal': function (event)
		{
	        event.preventDefault();
	        $("#course_modal").modal("show");
		},

		'click .course': function (event)
		{
			event.preventDefault();

			Session.set("course", this);
			$("#course_modal").modal("hide");
		},

		'click #semester': function (event)
		{
	        event.preventDefault();
	        $("#semester_modal").modal("show");
		},

		'click .semester': function (event)
		{
			event.preventDefault();

			Session.set("semester", this);
			$("#semester_modal").modal("hide");
		},

		'submit #frmSection': function (event)
		{
			event.preventDefault();

			var name = event.target.name.value;
			var course = Session.get("course")._id;
			var semester = Session.get("semester")._id;;
			var days = event.target.days;
			var start_time = event.target.start_time.value;
			var end_time = event.target.end_time.value;

			var getHour = start_time.split(':')[0];
			var getMinutes = start_time.split(':')[1].split(' ')[0];
			var getMeridiem = start_time.split(' ')[1];

			var start_hour = parseInt(getHour);
			var start_minutes = getMinutes;

			if (getMeridiem == 'PM')
			{
				start_hour += 12;
			}

			getHour = end_time.split(':')[0];
			getMinutes = end_time.split(':')[1].split(' ')[0];
			getMeridiem = end_time.split(' ')[1];

			var end_hour = parseInt(getHour);
			var end_minutes = parseInt(getMinutes);

			if (getMeridiem == 'PM')
			{
				end_hour += 12;
			}

			var duration = ((end_hour - start_hour) * 60) + end_minutes - start_minutes;

			var schedule = [];

			for (i = 0; i < days.length; i++) { 
				if (days[i].checked){
					schedule.push
					(
						{
							day: days[i].value,
							hour: start_hour,
							minute: start_minutes,
							duration: duration
						}
					); 
				}
			}


			if (name != '' && course != '' && semester != '' && schedule != '')
			{
				var section = {
									name: name,
									course: course,
									semester: semester,
									schedule: schedule
							  };

				Meteor.call('addSection', section);

				FlowRouter.go('/admin/section/');
			}
			else
			{
				alert('Necessary fields must be filled..');
			}
		}
	}
);