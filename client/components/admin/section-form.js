Template.sectionForm.onCreated(function () {
	{
		var self = this;
		self.autorun(function() {
			var id = FlowRouter.getParam('id');
			self.subscribe(SubscriptionTag.ONE_SECTION, id);
			self.subscribe(SubscriptionTag.ALL_COURSES);
			self.subscribe(SubscriptionTag.ALL_SEMESTERS);
		});
	}
});

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
			return Session.get('course');
		},

		semester: function()
		{
			return Session.get('semester');
		},

		item: function() 
		{
			var id = FlowRouter.getParam('id');
			if (id == undefined)
			{
				Session.set('course', null);
				Session.set('semester', null);
			}
			return Sections.findOne(id) || { _id: 'new', isNew: true };
		}
	}
);

Template.sectionForm.events
(
	{
		'click .open-modal': function (event)
		{
	        event.preventDefault();
	        $('#course_modal').modal('show');
		},

		'click .course': function (event)
		{
			event.preventDefault();

			Session.set('course', this);
			$('#course_modal').modal('hide');
		},

		'click #semester': function (event)
		{
	        event.preventDefault();
	        $('#semester_modal').modal('show');
		},

		'click .semester': function (event)
		{
			event.preventDefault();

			Session.set('semester', this);
			$('#semester_modal').modal('hide');
		},

		'submit #frmSection': function (event)
		{
			event.preventDefault();

			var id = event.target._id.value;
			var name = event.target.name.value;
			var course = Session.get('course')._id;
			var semester = Session.get('semester')._id;;
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
			var day = [];

			for (i = 0; i < days.length; i++) { 
				if (days[i].checked){
					day.push(days[i].value); 
				}
			}


			if (name != '' && course != '' && semester != '' && day != '' && start_hour != '' && start_minutes != '')
			{
				var section = {
									name: name,
									course: course,
									semester: semester,
									day: day,
									hour: start_hour,
									minute: start_minutes,
									duration: duration
							  };

				if (id == 'new')
				{
					Meteor.call('addSection', section);
				}
				else
				{
					Meteor.call('updateSection', id, section);
				}

				Session.set('course', null);
				Session.set('semester', null);
				FlowRouter.go('/admin/section/');
			}
			else
			{
				//alert('Necessary fields must be filled..');
				console.log(name);
				console.log(course);
				console.log(semester);
				console.log(day);
				console.log(start_hour);
				console.log(start_minutes);
				console.log(duration);
			}
		}
	}
);