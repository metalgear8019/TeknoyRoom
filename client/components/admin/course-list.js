Template.courseList.helpers
(
	{
		courses: function()
		{
			var ses = Session.get("searchTerm");
			return Courses.find({subject_number: {$regex: new RegExp('^'+ ses + '$', 'i')}});  
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
		},

		"keyup #search": function(event)
		{
			event.preventDefault();
			 var value = event.target.value;
			 Session.set("searchTerm", value);
		}
	}
);