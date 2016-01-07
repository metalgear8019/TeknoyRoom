Template.sectionList.helpers
(
	{
		sections: function ()
		{
			var result = Sections.find({});
			//result.course = course;
			console.log("course: " + result.course);
			//result.course = Courses.findOne(result.course).title || '';
			//result.semester = Semesters.findOne(result.semester).name || '';
			return result;
		},

		courseInSection: function ()
		{

		}
	}
);

Template.sectionList.events
(
	{
		'click #edit': function (event)
		{
			event.preventDefault();

			var section = {
								name: 'name',
								course: 'course',
								semester: 'semester',
								schedule: 'schedule'
						  };

			Meteor.call('updateSection', this._id, section);			
		},

		'click #delete': function (event)
		{
			event.preventDefault();
			Meteor.call('deleteSection', this._id);
		}
	}
);