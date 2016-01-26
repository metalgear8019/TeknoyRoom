Template.semesterList.onCreated(function () {
	var self = this;
	self.autorun(function () {
		self.subscribe(SubscriptionTag.ALL_SEMESTERS);
	});
});

Template.semesterList.helpers
(
	{
		semesters: function ()
		{
			return Semesters.find({});
		}
	}
);

Template.semesterList.events
(
	{
		'click #delete': function (event)
		{
			event.preventDefault();
			Meteor.call('deleteSemester', this._id);
		},

		'click .pointer-hover': function (event)
		{
			FlowRouter.go('/admin/section/' + this._id);
		},

		'click #addSemester': function (event)
		{
			FlowRouter.go('/admin/course/new');
		},

		'click #addSemesterCSV': function (event)
		{
			event.preventDefault();
			$('#semesterCSV_modal').modal('show');
		}
	}
);