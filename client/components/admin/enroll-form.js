Template.enrollForm.onCreated(function () {
	var self = this;
	self.autorun(function () {
		self.subscribe(SubscriptionTag.ALL_USERS);
		self.subscribe(SubscriptionTag.ALL_SECTIONS);
		self.subscribe(SubscriptionTag.ALL_COURSES);
		self.subscribe(SubscriptionTag.ALL_SEMESTERS);
	});
});

/*
var section = {
	_id: '',
	name: '',
	semester: '',
	course: '',
	day: [],
	hour: 0,
	minute: 0,
	duration: 0
}

var sectionDependency = new Tracker.Dependency();
*/

Template.enrollForm.helpers
(
	{
		students: function()
		{
			return Users.find({'profile.user_type': 2, 'profile.banned': false}); 
		},

		instructors: function()
		{
			return Users.find({'profile.user_type': 1, 'profile.banned': false});	
		},

		sections: function ()
		{
			var result = [];
			Sections.find({}).forEach(function (item) {
				item.course = Courses.findOne(item.course) || '';
				item.semester = Semesters.findOne(item.semester) || '';
				result.push(item);
			});
			return result;
		}
	}
);

Template.enrollForm.events
(
	{
		'click #instructor': function (event)
		{
			event.preventDefault();
			console.log('hey');
			$('#instructor_modal').modal('show');
		},

		'click #section': function (event)
		{
	        event.preventDefault();
	        $('#section_modal').modal('show');
		},

		'click .section': function(event)
		{
			event.preventDefault();
	        $('#section_modal').modal('hide');	
		},

		'click .instructor': function(event)
		{
			event.preventDefault();
	        $('#instructor_modal').modal('hide');	
		}
	}
);