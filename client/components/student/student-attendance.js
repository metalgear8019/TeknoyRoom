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
			var result = Enrollees.findOne({ section: id }) || { 
				attendance: {
					date: new Date(),
					time_in: new Date(),
					time_out: new Date()
				}
			};
			console.log(JSON.stringify(result));
			return result.attendance;
		}
	}
);