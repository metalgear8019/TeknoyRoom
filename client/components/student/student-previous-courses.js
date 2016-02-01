Template.studentPreviousCourses.onCreated(function () {
	var self = this;
	self.autorun(function () {
		self.subscribe(SubscriptionTag.ALL_ENROLLEES);
		self.subscribe(SubscriptionTag.ALL_SECTIONS);
		self.subscribe(SubscriptionTag.ALL_COURSES);
		self.subscribe(SubscriptionTag.ALL_SEMESTERS);
	});
});

Template.studentPreviousCourses.helpers
(
	{
		sections: function()
		{
		 	var result = [];
		 	var enrolledSubjects = Enrollees.find({ user: Meteor.userId() });
		 	var enrolledIds = enrolledSubjects.map(function (c) { return c.section; });
			Sections.find({ _id: { $in: enrolledIds } }).forEach(function (item) {
				item.course = Courses.findOne(item.course) || '';
				item.semester = Semesters.findOne(item.semester) || '';
				item.time = Helpers.scheduleToString(item);
				result.push(item);
			});
			console.log("results >> " + JSON.stringify(result));
			return result;
		},

		courses: function ()
		{
			return Courses.find({});
		},

		semesters: function ()
		{
			return Semesters.find({});
		}
	}
);
