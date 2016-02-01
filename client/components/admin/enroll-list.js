Template.enrollList.onCreated(function () {
	var self = this;
	self.autorun(function () {
		self.subscribe(SubscriptionTag.ALL_ENROLLEES);
		self.subscribe(SubscriptionTag.ALL_USERS);
		self.subscribe(SubscriptionTag.ALL_SECTIONS);
		self.subscribe(SubscriptionTag.ALL_COURSES);
		self.subscribe(SubscriptionTag.ALL_SEMESTERS);
	});
});

Template.enrollList.helpers
(
	{
		enrollees: function ()
		{
			var result = [];
			Enrollees.find({}).forEach(function (item) {
				item.section = Sections.findOne(item.section) || '';
				item.user = Users.findOne(item.user);
				result.push(item);
			});

			return result;
		}
	}
);

Template.enrollList.events
(
	{

		'click #delete': function (event)
		{
			event.preventDefault();
			Meteor.call('deleteEnrollee', this._id);
		}
	}
);