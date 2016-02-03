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
		'click #enterClass': function (event) {
			var time = new Date(Session.get('time'));
			var enrolledSubjects = Enrollees.find({ user: Meteor.userId() });
		 	var enrolledIds = enrolledSubjects.map(function (c) { return c.section; });
		 	console.log('time >> ' + time.getHours() + ':' + time.getMinutes() + ' on day ' + time.getDay());
			var result = Sections.findOne({
				/*_id: ( $in: enrolledIds ),*/
				day: (time.getDay() + 1 + ''),
				hour: { $lte: time.getHours() }
			}, { sort: { hour: -1, minute: -1 }});
			
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

			if (result != null && result != undefined && 
					Helpers.getDurationPast(time, result.hour, result.minute) < result.duration) {
				console.log("duration >> " + result.duration + "\ntime passed >> " + 
					Helpers.getDurationPast(time, result.hour, result.minute));
				Session.set('class', Enrollees.findOne({ section: result._id, user: Meteor.userId() })._id);
				console.log('enrolled id >> ' + Session.get('class'));
				FlowRouter.go('/student/current/enter');
			} else {
				alert('No classes currently held.');
			}
		},
		'click .pointer-hover': function (event) {
			console.log('clicked row');
			var result = Meteor.user().profile.user_type;
			if (result == 0)
				result = '/admin';
			else if (result == 1)
				result = '/instructor';
			else if (result == 2)
				result = '/student';
			FlowRouter.go(result + '/current/' + this._id);
		}
	}
);