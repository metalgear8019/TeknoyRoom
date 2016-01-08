Template.sectionList.helpers
(
	{
		sections: function ()
		{
			var result = [];
			Sections.find({}).forEach(function (item) {
				//result.course = course;
				console.log("course id: " + item.course);
				item.course = Courses.findOne(item.course).title || '';
				item.semester = Semesters.findOne(item.semester).name || '';
				console.log("course: " + item.course);
				//result.course = Courses.findOne(result.course).title || '';
				//result.semester = Semesters.findOne(result.semester).name || '';
				console.log("item: " + JSON.stringify(item));
				result.push(item);
			});
			console.log("results: " + JSON.stringify(result));
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