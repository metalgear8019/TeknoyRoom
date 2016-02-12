Template.studentDashboard.events
(
	{
		'click #notes': function (event)
		{
			event.preventDefault();
			$('#notes_modal').modal('show');
		}
	}
);