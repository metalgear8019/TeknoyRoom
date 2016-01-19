Template.studentAllSemesters.onCreated(function () {
	var self = this;
	self.autorun(function () {
		self.subscribe(SubscriptionTag.ALL_SEMESTERS);
	});
});

Template.studentAllSemesters.helpers
(
	{
		semesters: function ()
		{
			return Semesters.find({});
		}
	}
);