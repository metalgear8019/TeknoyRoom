Session.setDefault('counter', 0);

Template.body.events
(
	{
		'click .menu-toggle': function (event)
		{
			// event.preventDefault();
			// $("#wrapper").toggleClass("toggled");
			alert('toggle class');
		}
	}
);