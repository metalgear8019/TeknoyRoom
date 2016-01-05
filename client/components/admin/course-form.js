Template.courseForm.events
(
	{
		'submit #frmCourse': function (event)
		{
			event.preventDefault();

			var subject_number = event.target.subject_number.value;
			var title = event.target.title.value;
			var unit = event.target.unit.value;

			console.log('Subject number: ' + subject_number + '\nTitle: ' + title + '\nUnit: ' + unit);

			if (subject_number != '' || title != '' || unit != '') 
			{
				var course = {
								subject_number: subject_number,
								title: title,
								unit: unit
							 };

				Meteor.call('addCourse', course);

				event.target.subject_number.value = '';
				event.target.title.value = '';
				event.target.unit.value = '';
			}
			else
			{
				alert('Necessary fields must be filled..');
			}
		}
	}
);