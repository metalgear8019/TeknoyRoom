Template.userItem.helpers
(
	{
		isStudent: function () {
			return null;
		}
	}
);

Template.userItem.events
(
	{
		'check .user': function(event)
		{
			console.log("hel");
		}
	}
);