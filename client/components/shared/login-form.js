Template.loginForm.created = function () {
	Session.set('isCredentialsCorrect', true);
};

Template.loginForm.helpers
(
	{
		isCredentialsCorrect: function()
		{
			return !Session.get('isCredentialsCorrect');
		}			
	}
);

Template.loginForm.events
(
	{
		'submit #frmLogin' : function (event)
		{
			event.preventDefault();
			Meteor.loginWithPassword(event.target.username.value, event.target.username.value);
		}
	}
);