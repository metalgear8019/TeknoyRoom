hotKey = new Hotkeys({
	autoLoad : true
});

hotKey.add({
	combo : "shift+c",
	callback: function()
	{
		sections.push(newSection);
		sectionsDependency.changed();
		console.log("h");
	}
})

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

var newSection = {
	_id: '',
	name: '',
	course: '',
	semester: '',
	day: [],
	hour: '',
	minute: '',
	duration: 0
};

var sections = [newSection];
var sectionsDependency = new Tracker.Dependency();

/*Template.sectionForm.sections = function() {
  sectionsDependency.depend();
  return sections;
};*/


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

		sections: function()
		{
			sectionsDependency.depend();
  			return sections;
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
		'click #course': function (event)
		{
			event.preventDefault();
			$('#course_modal').modal('show');
		},

		'click .course':  function (event)
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
			var course = Session.get('course')._id;
			var semester = Session.get('semester')._id;
			var j = 1;


			if (sections.length != 1)
			{

				for (i = 0; i < sections.length; i++)
				{

					var name = event.target.name[i].value;
					var days = event.target.days;
					var start_time = event.target.start_time[i].value;
					var end_time = event.target.end_time[i].value;

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

					/*for (i = 0; i < days.length; i++) { 
						if (days[i].checked){
							day.push(days[i].value); 
						}
					}*/

					for (;j <= days.length; j++)
					{
						if (j % 7 == 0)
						{
							j+=1;
							break;
						}

						if (days[j].checked)
						{
							day.push(days[j].value);
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
					}
				}
			}
			else
			{

				var name = event.target.name.value;
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

				for (i = 0; i < days.length; i++)
				{ 
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
				}
			}

			Session.set('course', null);
			Session.set('semester', null);
			FlowRouter.go('/admin/section/');
		},

		'click #addSection': function(event)
		{
			event.preventDefault();
			sections.push(newSection);
			sectionsDependency.changed();
			// Blaze.renderWithData(Template.addSection, $( '#addSection' )[0], $( '#content' )[0]);
		},

		'click #removeSection': function(event)
		{
			event.preventDefault();
			sections.pop();
			sectionsDependency.changed();
		}
	}
);

