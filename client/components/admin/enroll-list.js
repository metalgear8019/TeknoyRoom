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

			if (ses == undefined || ses == '')
			{
				Enrollees.find({}).forEach(function (item) {
					item.section = Sections.findOne(item.section);
					item.section.semester = Semesters.findOne(item.section.semester);
					item.section.course = Courses.findOne(item.section.course);
					item.user = Users.findOne(item.user);
					result.push(item);
				});
			}
			else
			{
				Enrollees.find({}).forEach(function (item) {
					item.section = Sections.findOne(item.section);
					item.section.semester = Semesters.findOne(item.section.semester);
					item.section.course = Courses.findOne(item.section.course);
					item.user = Users.findOne(item.user);
					result.push(item);
				});	
			}

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
			Meteor.call('deleteEnrollee', this._id);
		}
	}
);