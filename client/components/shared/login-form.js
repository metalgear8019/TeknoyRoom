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
			Session.set('isCredentialsCorrect', true);
			Meteor.loginWithPassword(event.target.username.value, event.target.password.value);
			Session.set('isCredentialsCorrect', Meteor.userId() !== null);
		}
	}
);