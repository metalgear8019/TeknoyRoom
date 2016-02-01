Template.currentCourses.onCreated(function () {
	var self = this;
	self.autorun(function () {
		self.subscribe(SubscriptionTag.ALL_ENROLLEES);
		self.subscribe(SubscriptionTag.ALL_SECTIONS);
		self.subscribe(SubscriptionTag.ALL_COURSES);
		self.subscribe(SubscriptionTag.ALL_SEMESTERS);
	});
});

Template.currentCourses.helpers
(
	{
		sections: function()
		{
		 	var result = [];
		 	var enrolledSubjects = Enrollees.find({ user: Meteor.userId() });
		 	var enrolledIds = [];//enrolledSubjects.map(function (c) { return c.section; });
			Sections.find({ /*_id: { $in: enrolledIds }*/ }).forEach(function (item) {
				item.course = Courses.findOne(item.course) || '';
				item.semester = Semesters.findOne(item.semester) || '';
				item.time = Helpers.scheduleToString(item);
				result.push(item);
			});
			console.log("results >> " + JSON.stringify(result));
			return result;
		},
		type: function ()
		{
			var result = Meteor.user().profile.user_type;
			if (result == 0)
				result = 'admin';
			else if (result == 1)
				result = 'instructor';
			else if (result == 2)
				result = 'student';
			return result;
		}
	}
);

Template.currentCourses.events
(
	{
		'click #enterClass': function (event) {
			var time = Session.get('time');
			var enrolledSubjects = Enrollees.find({ user: Meteor.userId() });
		 	var enrolledIds = enrolledSubjects.map(function (c) { return c.section; });
		 	console.log(Meteor.user());
			var result = Sections.find({
				_id: ( $in: enrolledIds ),
				day: { $in: (time.getDay() + 1) },
				hour: { $gte: time.getHours() },
				minute: { $gte: time.getMinutes() }
			});

			result.sort({ hour: 1, minute: 1 });
			
			/*var result = Sections.find({
				hour: { $gte: time.getHours() },
				minute: { $gte: time.getMinutes() },
				$filter: {
					input: $duration,
					as: 'duration',
					cond: { $gt: time }
				}
			});*/

			console.log("class >> " + JSON.stringify(result));
			if (result != null || result != undefined || 
					result[0].duration < Helpers.getDurationPast(time, result[0].hour, result[0].minute)) {
				FlowRouter.go('/student/current/enter');
			} else {
				alert('No classes currently held.');
			}
		}
	}
);