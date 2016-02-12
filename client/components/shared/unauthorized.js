Template.unauthorized.events
(
	{
		'click #redirect': function (event) 
		{
			event.preventDefault();
			var user_type = Meteor.user().profile.user_type;
			if(user_type == 2)
			{
				window.location.href = '/student';	
			}
			else if (user_type == 1)
			{
				window.location.href = '/instructor';
			}
			else
			{
				window.location.href = '/admin';				
			}
		}
	}
);