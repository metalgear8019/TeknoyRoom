Template.studentCurrentCourses.onCreated(function () {
	var self = this;
	self.autorun(function () {
		self.subscribe(SubscriptionTag.ALL_ENROLLEES);
		self.subscribe(SubscriptionTag.ALL_SECTIONS);
		self.subscribe(SubscriptionTag.ALL_COURSES);
		self.subscribe(SubscriptionTag.ALL_SEMESTERS);
	});
});

Template.studentCurrentCourses.helpers
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
		}
	}
);

Template.studentCurrentCourses.events
(
	{
		'click #enterClass': function (event) {
			var time = Session.get('time');
			var result = Sections.find({
				hour: { $gte: time.getHours() },
				minute: { $gte: time.getMinutes() }
			});

			var result = Sections.find({
				hour: { $gte: time.getHours() },
				minute: { $gte: time.getMinutes() },
				$filter: {
					input: $duration,
					as: 'duration',
					cond: { $gt: time }
				}
			});

			console.log("class >> " + JSON.stringify(result));
			if (result != null || result != undefined)
				FlowRouter.go('/student/current/enter');
			else
				alert('No classes currently held.');
		}
	}
);