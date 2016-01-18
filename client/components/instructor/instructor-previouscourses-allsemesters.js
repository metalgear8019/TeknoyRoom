Template.instructorAllSemesters.onCreated(function () {
	var self = this;
	self.autorun(function () {
		self.subscribe(SubscriptionTag.ALL_SEMESTERS);
	});
});

Template.instructorAllSemesters.helpers
(
	{
		semesters: function ()
		{
			return Semesters.find({});
		}
	}
);