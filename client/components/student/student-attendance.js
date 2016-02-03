Template.studentAttendance.onCreated(function () {
	var self = this;
	self.autorun(function () {
		var id = FlowRouter.getParam('id');
		self.subscribe(SubscriptionTag.ALL_ENROLLEES);
	});
});

Template.studentAttendance.helpers
(
	{
		records: function () {
			var id = FlowRouter.getParam('id');
			var result = Enrollees.findOne({ section: id });
			return result.attendance;
		}
	}
);