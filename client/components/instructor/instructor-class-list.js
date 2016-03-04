Template.instructorClassList.onCreated(function () {
	var self = this;
	self.autorun(function () {
		var sectionId = FlowRouter.getParam('id');
		self.subscribe(SubscriptionTag.ONE_SECTION, sectionId);
		self.subscribe(SubscriptionTag.ONE_COURSE_SECTION, sectionId);
		self.subscribe(SubscriptionTag.ONE_ENROLLEE_SECTION, sectionId);
		self.subscribe(SubscriptionTag.ALL_USERS);
	});
});

Template.instructorClassList.helpers
(
	{
		section: function() {
			var result = Sections.findOne();
			if (!Helpers.isEmpty(result))
				result.course = Courses.findOne({ _id: result.course });
			return result;
		},
		users: function()
		{
		 	var enrolledIds = Enrollees.find({}).map(function (c) { return c.user; });
			var result = Users.find({ _id: { $in: enrolledIds } }).map(function (item) {
				item.state = item.profile.user_type === 1;
				return item;
			});
			return result;
		}
	}
);

Template.instructorClassList.events
(
	{
		'click #enterClass': function () {
			var result = Helpers.getCurrentClass();
			console.log(JSON.stringify(result));

			if (!Helpers.isEmpty(result)) {
				console.log("duration >> " + result.duration + "\ntime passed >> " + 
					Helpers.getDurationPast(Helpers.getTime(), result.hour, result.minute));
				Session.set('class', result._id);
				Session.set('course', result.course);
				console.log('enrolled id >> ' + Session.get('class'));
				FlowRouter.go(Helpers.getRouteGroup(Meteor.user().profile.user_type) + '/current/enter');
			} else {
				Notifications.warn('WARNING', 'No classes is currently in session', {timeout: 5000});
			}
		},
		'click .pointer-hover': function (event) {
			var currentPath = FlowRouter.current().path || '';
			var param = (Meteor.userId() === this._id) ? 'self' : this._id;
			FlowRouter.go(currentPath + '/' + param);
		}
	}
);