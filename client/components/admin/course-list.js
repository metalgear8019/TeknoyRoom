Template.courseList.helpers
(
	{
		courses: function()
		{
			return Courses.find();
		}
	}
);

Template.courseList.events
(
	{
		'click #delete': function (event)
		{
			event.preventDefault();
			Meteor.call('deleteCourse', this._id);
		},

		'click .pointer-hover': function (event)
		{
			FlowRouter.go('/admin/course/' + this._id);
		}
	}
);