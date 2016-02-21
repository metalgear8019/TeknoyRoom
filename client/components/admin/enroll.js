Template.enroll.onCreated(function(){
		Session.set('view', 'default');
	}
);

Template.enroll.helpers
(
	{
		view: function()
		{
			if (Session.get('view') == 'default')
			{
				return true;
			}
			else
			{
				return false;
			}
		}
	}
);

Template.enroll.events
(
	{
		'click #switch': function(event)
		{
			event.preventDefault();

			if (Session.get('view') == 'default')
			{
				Session.set('view', 'traditional');
			}
			else
			{
				Session.set('view', 'default');
			}
		}
	}
);