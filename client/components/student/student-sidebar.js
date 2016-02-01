Template.studentSidebar.events
(
	{
		'click #menu-toggle': function (event)
		{
			event.preventDefault();
			$("#wrapper").toggleClass("active");
		}
	}
);

Template.studentSidebar.helpers
(
	{
		name: function() {
			var result = Meteor.user();
			return result.profile.first_name.toUpperCase() + ' ' + result.profile.last_name.toUpperCase();
		}
	}
);