Template.instructorSidebar.events
(
	{
		'click #menu-toggle': function (event)
		{
			event.preventDefault();
			$("#wrapper").toggleClass("active");
		}
	}
);

Template.instructorSidebar.helpers
(
	{
		name: function() {
			var result = Meteor.user();
			console.log(result);
			return result.profile.first_name.toUpperCase() + ' ' + result.profile.last_name.toUpperCase();
		}
	}
);