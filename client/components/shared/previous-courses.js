Template.previousCourses.onCreated(function () {
	var self = this;
	self.autorun(function () {
		self.subscribe(SubscriptionTag.ALL_ENROLLEES);
		self.subscribe(SubscriptionTag.ALL_SECTIONS);
		self.subscribe(SubscriptionTag.ALL_COURSES);
		self.subscribe(SubscriptionTag.ALL_SEMESTERS);
	});
});

Template.previousCourses.helpers
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

				var currentDate = new Date();

				if (!((currentDate.valueOf() >= item.semester.start_date.valueOf()) && (currentDate.valueOf() < item.semester.end_date.valueOf())))
				{
					result.push(item);
				}
			});
			console.log("results >> " + JSON.stringify(result));
			return result;
		},
	}
);

Template.previousCourses.events
(
	{
		'click .pointer-hover': function (event) {
			console.log('clicked row');
			var result = Meteor.user().profile.user_type;
			if (result == 0)
				result = '/admin';
			else if (result == 1)
				result = '/instructor';
			else if (result == 2)
				result = '/student';
			FlowRouter.go(result + '/previous/' + this._id);
		}
	}
);