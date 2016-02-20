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
		},
		image: function()
		{
			var result = Meteor.user();
			var source;
			if(result.profile.image != null)
			{
				source = result.profile.image;
			}
			else
			{
				if (result.profile.gender == 'Male')
					source = "/assets/profile-picture3.png";
				else
					source = "/assets/profile-picture2.png";
			}
			return source;
		}
	}
);