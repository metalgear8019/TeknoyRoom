Template.sectionForm.helpers
(
	{
		courses: function ()
		{
			return Courses.find({});
		},

		semesters: function ()
		{
			return Semesters.find({});
		}
	}
);

Template.sectionForm.events
(
	{
		'click .open-modal': function (event)
		{
	        event.preventDefault();
	        	$("#myModal").modal("show");
		}
	}
);