Template.courseForm.helpers
(
	{
		item: function() {
			id = FlowRouter.getParam('id');
			return Courses.findOne(id) || { _id: 'new', isNew: true };
		}
	}
);

Template.courseForm.events
(
	{
		'submit #frmCourse': function (event)
		{
			event.preventDefault();

			var id = event.target._id.value;
			var subject_number = event.target.subject_number.value;
			var title = event.target.title.value;
			var unit = event.target.unit.value;

			console.log('Subject number: ' + subject_number + '\nTitle: ' + title + '\nUnit: ' + unit);

			if (subject_number != '' && title != '' && unit != '') 
			{
				var course = {
								subject_number: subject_number,
								title: title,
								unit: unit
							 };

				if (id == 'new')
				{
					Meteor.call('addCourse', course);
				}
				else 
				{
					Meteor.call('updateCourse', id, course);
				}

				FlowRouter.go('/admin/course/');
			}
			else
			{
				alert('Necessary fields must be filled..');
			}
		}
	}
);