Template.userItem.onCreated(function () {
	Session.set('selected', false);
});

Template.userItem.helpers
(
	{
		isStudent: function () {
			return null;
		},
		selected: function () {
			if (Session.get('selected'))
				return 'SELECTED';
			else
				return 'CLICK TO SELECT';
		}
	}
);

Template.userItem.events
(
	{
		'click .user': function () {
			Session.set('selected', !Session.get('selected'));
		}
	}
);