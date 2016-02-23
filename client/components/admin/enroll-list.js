Template.enrollList.onCreated(function () {
	var self = this;
	Session.set('searchTerm', '');
	self.autorun(function () {
		self.subscribe(SubscriptionTag.ALL_ENROLLEES);
		self.subscribe(SubscriptionTag.ALL_USERS);
		self.subscribe(SubscriptionTag.ALL_SECTIONS);
		self.subscribe(SubscriptionTag.ALL_COURSES);
		self.subscribe(SubscriptionTag.ALL_SEMESTERS);
	});
});

Template.enrollList.helpers
(
	{
		enrollees: function ()
		{
			var ses = Session.get('searchTerm');
			var result = [];

			Enrollees.find({}).forEach(function (item) {
				item.section = Sections.findOne(item.section);
				item.section.semester = Semesters.findOne(item.section.semester);
				item.section.course = Courses.findOne(item.section.course);
				item.user = Users.findOne(item.user);

				if (ses == undefined || ses == '' 
					|| (item.section.name.indexOf(ses) > -1) 
					|| (item.section.semester.school_year.indexOf(ses) > -1)
					|| (item.section.course.subject_number.indexOf(ses) > -1)
					|| (item.section.course.title.indexOf(ses) > -1)
					|| (item.user.profile.id_number.indexOf(ses) > -1)  
					|| (item.user.profile.last_name.indexOf(ses) > -1))
				{
					result.push(item);
				}
			});
			return result;
		}
	}
);

Template.enrollList.events
(
	{
		'keyup #search': function(event)
		{
			event.preventDefault();
			var value = event.target.value;
			Session.set("searchTerm", value);
		},

		'click #delete': function (event)
		{
			event.preventDefault();
			Meteor.call('deleteEnrollee', this._id, function(err){
				if(err)
					Notifications.error('ERROR', err.reason, {timeout: 5000});
				else
					Notifications.success('SUCCESS', 'Enrollee successfully deleted', {timeout: 5000});
			});
		}
	}
);