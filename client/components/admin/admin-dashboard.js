Template.adminDashboard.onCreated(function () {
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

Template.adminDashboard.helpers
(
	{
		users: function()
		{
			return Users.find({}).count();
		},

		sections: function()
		{
			return Sections.find({}).count();
		},

		courses: function()
		{
			return Courses.find({}).count();
		},

		semesters: function()
		{
			return Semesters.find({}).count();
		},

		enrollees: function()
		{
			return Enrollees.find({}).count();
		}
	}
);