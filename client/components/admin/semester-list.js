Template.semesterList.helpers
(
	{
		semsters: function ()
		{
			return Semesters.find({});
		}
	}
);

Template.semesterList.events
(
	{
		'click #edit': function (event)
		{
			event.preventDefault();

			var semester = {
								school_year: 'school_year',
								start_date: new Date('Mar 25 2015'),
								end_date: new Date('Mar 25 2015'),
								name: 'name'
						   };

			Meteor.call('updateSemester', this._id, semester);
		},

		'click #delete': function (event)
		{
			event.preventDefault();
			Meteor.call('deleteSemester', this._id);
		}
	}
);