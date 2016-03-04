Template.previousCourses.onCreated(function () {
	var self = this;
	var time = new Date(Session.get('time'));
	self.autorun(function () {
		self.subscribe(SubscriptionTag.ALL_ENROLLEES_USER, Meteor.userId());
		self.subscribe(SubscriptionTag.PREVIOUS_SEMESTERS, time);
		self.subscribe(SubscriptionTag.ALL_SECTIONS);
		self.subscribe(SubscriptionTag.ALL_COURSES);
	});
});

Template.previousCourses.helpers
(
	{
		sections: function()
		{
		 	var enrolledIds = Enrollees.find().map(function (c) { return c.section; });
		 	var semesterIds = Semesters.find().map(function (sem) { return sem._id; });
		 	console.log(semesterIds);
			var result = Sections.find({ _id: { $in: enrolledIds }, semester: { $in: semesterIds } }).map(function (item) {
				item.course = Courses.findOne(item.course) || '';
				item.semester = Semesters.findOne(item.semester) || '';
				item.time = Helpers.scheduleToString(item);

				/*var currentDate = new Date();

				if (!((currentDate.valueOf() >= item.semester.start_date.valueOf()) && (currentDate.valueOf() < item.semester.end_date.valueOf())))
				{
					result.push(item);
				}*/
				return item;
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
			var param = (this._id === Meteor.userId())? 'self' : this._id;
			FlowRouter.go(result + '/previous/' + param);
		}
	}
);