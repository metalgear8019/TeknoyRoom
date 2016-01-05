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
		'click #edit':function (event)
		{
			event.preventDefault();

			var course = {
							subject_number: 'subject_number',
							title: 'title',
							unit: 'unit'
						 };

			Meteor.call('updateCourse', this._id, course);

		},

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