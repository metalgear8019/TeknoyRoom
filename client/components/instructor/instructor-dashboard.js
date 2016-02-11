Template.instructorDashboard.events
(
	{
		'click #notes': function (event)
		{
			event.preventDefault();
			$('#notes_modal').modal('show');
		},
		'click #addnote': function (event)
		{
			event.preventDefault();
			$("#container").append('<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title"><a id="notes" name="notes">CCS323</a></h3></div><div class="panel-body">  Computer Fundamentals </div></div>');
		}
	}
);