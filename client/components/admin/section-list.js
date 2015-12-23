Template.sectionList.helpers
(
	{
		sections: function ()
		{
			return Sections.find({});
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