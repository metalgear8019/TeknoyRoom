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
		}
	}
);