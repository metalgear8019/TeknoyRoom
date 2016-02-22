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

var newSection = {
	_id: 'new',
	name: '',
	course: '',
	semester: '',
	day: [],
	hour: '',
	minute: '',
	duration: 0
};

var course = {
			_id: 'new',
			subject_number: '',
			title: ''
		};

var courseCounter = 0;
var semesterCounter  = 0;
var courseDependency = new Tracker.Dependency();

var semester ={
			_id: 'new',
			name: '',
			school_year: ''
		};

var semesterDependency = new Tracker.Dependency();

var sections = [newSection];
var sectionsDependency = new Tracker.Dependency();

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

Tracker.autorun(function(){
	var id = FlowRouter.getParam('id');
	if (id == 'new')
	{
		sections = [
			{
				_id: 'new',
				name: '',
				course: '',
				semester: '',
				day: [],
				hour: '',
				minute: '',
				duration: 0
			}
		];
		course = {
				_id: 'new',
				subject_number: '',
				title: ''
			};
			
		semester = {
				_id: 'new',
				name: '',
				school_year: ''
			};
	}
});

Template.sectionForm.helpers
(
	{
		sections: function()
		{
			sectionsDependency.depend();
  			var id = FlowRouter.getParam('id');
			if (id != 'new')
			{
				var section = Sections.findOne(id);

				sections[0]._id = section._id;
				sections[0].name = section.name;
				sections[0].day = section.day;
				sections[0].hour = section.hour;
				sections[0].minute = section.minute;
				sections[0].duration = section.duration;
			}

  			return sections;
		},

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
			courseDependency.depend();
			var id = FlowRouter.getParam('id');
				
			if (id != 'new' && courseCounter == 0)
			{
				var section = Sections.findOne(id);
				course = Courses.findOne(section.course);
			}

			return course;
		},

		semester: function()
		{
			semesterDependency.depend();
			var id = FlowRouter.getParam('id');
			if (id != 'new' && semesterCounter == 0)
			{
				var section = Sections.findOne(id);
				semester = Semesters.findOne(section.semester);
			}

			return semester;
		},

		item: function() 
		{
			var id = FlowRouter.getParam('id');
			/*if (id == undefined)
			{
				Session.set('course', null);
				Session.set('semester', null);
			}*/
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
			course = this;
			courseCounter++;
			courseDependency.changed();
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
			semester = this;
			semesterCounter++;
			semesterDependency.changed();
			$('#semester_modal').modal('hide');
		},

		'submit #frmSection': function (event)
		{
			event.preventDefault();

			var id = event.target._id.value;
			var course = event.target.courseId.value;
			var semester = event.target.semesterId.value;
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

					if (name != '' && course != '' && semester != '' && day.length != 0 && start_hour != '' && start_minutes != '')
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
							Meteor.call('addSection', section, function(err){
								if(err)
									Notifications.error('ERROR', err.reason, {timeout: 5000});
								else
									Notifications.success('SUCCESS', 'Section successfully added', {timeout: 5000});
							});
						}
						else
						{
							Meteor.call('updateSection', id, section, function(err){
								if(err)
									Notifications.error('ERROR', err.reason, {timeout: 5000});
								else
									Notifications.success('SUCCESS', 'Section updated successfully', {timeout: 5000});
							});
						}
					}
				}

				FlowRouter.go('/admin/section/');
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

				if (name != '' && course != '' && semester != '' && day.length != 0 && start_hour != '' && start_minutes != '')
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
						Meteor.call('addSection', section, function(err) {
							if (err)
								//console.log('An error occured.\n' + err);
								Notifications.error(err.reason,'There is an error',{timeout: 5000});
							else
								//alert('Work na! Do success notification here!');
								Notifications.success('Success','Section added',{timeout: 5000});
						});
					}
					else
					{
						Meteor.call('updateSection', id, section, function(err){
							if(err)
								Notifications.error('Error',err.reason,{timeout: 5000});
							else
								Notifications.success('Success','Section updated!',{timeout: 5000});
						});
					}

					Tracker.flush();
					FlowRouter.go('/admin/section/');
				}
				else
				{
					Notifications.warn('WARNING', 'Please fill out the necessary fields.', {timeout: 5000});
				}
			}
			
			  
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