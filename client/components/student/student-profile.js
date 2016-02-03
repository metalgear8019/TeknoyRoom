Template.studentProfile.events
(
	{
		'click #menu-toggle': function (event)
		{
			event.preventDefault();
			$("#wrapper").toggleClass("active");
		}
	}
);

Template.studentProfile.helpers
(
	{
		name: function() {
			var result = Meteor.user();
			return result.profile.first_name + ' ' + result.profile.middle_name + ' ' + result.profile.last_name;
		},
		year: function() {
			var result = Meteor.user();
			return result.profile.year;
		},
		program: function() {
			var result = Meteor.user();
			return result.profile.program;
		},
		gender: function() {
			var result = Meteor.user();
			return result.profile.gender;
		}
	}
);