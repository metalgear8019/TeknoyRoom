Template.loginForm.created = function () {
	Session.set('isCredentialsCorrect', true);
};

Template.loginForm.events
(
	{
		'submit #frmLogin' : function (event)
		{
			event.preventDefault();
			Meteor.loginWithPassword(event.target.username.value, event.target.password.value);

			/*if (Meteor.userId() == null)
			{
				Notifications.error('Failed to login', 'username or password is incorrect.', {timeout: 5000});
			}
			else
			{
				Notifications.success('success', 'Welcome to TeknoyRoom, ' + Meteor.user().profile.first_name , {timeout: 5000});
			}*/
		}
	}
);