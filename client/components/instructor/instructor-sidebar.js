
Template.instructorSidebar.events
(
	{
		'click #menu-toggle': function (event)
		{
			event.preventDefault();
			$("#wrapper").toggleClass("active");
		}
	}
);

/*$("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("active");
});*/