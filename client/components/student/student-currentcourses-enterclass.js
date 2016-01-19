
Template.studentEnterClass.events
(
	{
		'click #share-screen': function (event)
		{
			event.preventDefault();
			$('#share-camera').removeAttr('disabled');
			$('#share-screen').attr('disabled', 'disabled');
		},
		'click #share-camera': function (event)
		{
			event.preventDefault();
			$('#share-screen').removeAttr('disabled');
			$('#share-camera').attr('disabled', 'disabled');
		}
	}
);

/*$("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("active");
});*/