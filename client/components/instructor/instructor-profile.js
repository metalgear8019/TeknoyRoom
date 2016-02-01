Template.instructorProfile.events
(
	{
		'click #menu-toggle': function (event)
		{
			event.preventDefault();
			$("#wrapper").toggleClass("active");
		}
	}
);

Template.instructorProfile.helpers
(
	{
		name: function() {
			var result = Meteor.user();
			return result.profile.first_name + ' ' + result.profile.middle_name + ' ' + result.profile.last_name;
		},
		department: function() {
			var result = Meteor.user();
			return result.profile.department;
		},
		gender: function() {
			var result = Meteor.user();
			return result.profile.gender;
		}
	}
);