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
		 	var enrolledIds = enrolledSubjects.map(function (c) { return c.section; });
			Sections.find({ _id: { $in: enrolledIds } }).forEach(function (item) {
				item.course = Courses.findOne(item.course) || '';
				item.semester = Semesters.findOne(item.semester) || '';
				item.time = Helpers.scheduleToString(item);
				item.state = false;

				var currentDate = new Date();
				
				if (((currentDate.valueOf() >= item.semester.start_date.valueOf()) && (currentDate.valueOf() < item.semester.end_date.valueOf())))
				{
					if (Helpers.getDurationPast(new Date(Session.get('time')), item.hour, item.minute) < item.duration)
					{
						item.state = true;
					}

					result.push(item);
				}
			});
			// console.log("results >> " + JSON.stringify(result));
			return result;
		}
	}
);

Template.currentCourses.events
(
	{
		'click #enterClass': function () {
			var result = Helpers.getCurrentClass();
			console.log(JSON.stringify(result));

			if (result != null && result != undefined && 
					Helpers.getDurationPast(Helpers.getTime(), result.hour, result.minute) < result.duration) {
				console.log("duration >> " + result.duration + "\ntime passed >> " + 
					Helpers.getDurationPast(Helpers.getTime(), result.hour, result.minute));
				Session.set('class', result._id);
				console.log('enrolled id >> ' + Session.get('class'));
				FlowRouter.go(getRouteGroup() + '/current/enter');
			} else {
				alert('No classes currently held.');
			}
		},
		'click .pointer-hover': function (event) {
			FlowRouter.go(getRouteGroup() + '/current/' + this._id);
		}
	}
);

var getRouteGroup = function () {
	var result = Meteor.user().profile.user_type;
	if (result == 0)
		result = '/admin';
	else if (result == 1)
		result = '/instructor';
	else if (result == 2)
		result = '/student';
	return result;
}