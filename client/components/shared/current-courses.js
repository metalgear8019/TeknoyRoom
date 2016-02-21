Template.currentCourses.onCreated(function () {
	var self = this;
	var time = new Date(Session.get('time'));
	self.autorun(function () {
		self.subscribe(SubscriptionTag.ALL_ENROLLEES_USER, Meteor.userId());
		self.subscribe(SubscriptionTag.CURRENT_SEMESTER, time);
		self.subscribe(SubscriptionTag.ALL_SECTIONS);
		self.subscribe(SubscriptionTag.ALL_COURSES);
	});
});

Template.currentCourses.helpers
(
	{
		sections: function()
		{
			var result = [];
		 	var enrolledIds = Enrollees.find().map(function (c) { return c.section; });
		 	var currentSemester = Semesters.findOne() || { _id: null };
			Sections.find({ _id: { $in: enrolledIds }, semester: currentSemester._id }).forEach(function (item) {
				/*if (Helpers.isClassOngoing(item, time))
					item.state = true;
				else*/
				// item.state = false;
				item.course = Courses.findOne(item.course) || '';
				item.semester = currentSemester;
				item.time = Helpers.scheduleToString(item);
				// item.state = Helpers.isClassOngoing(item, time);
				result.push(item);
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