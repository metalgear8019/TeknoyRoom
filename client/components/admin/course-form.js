Template.courseForm.onCreated(function () {
	var self = this;
	self.autorun(function() {
		var id = FlowRouter.getParam('id');
		self.subscribe(SubscriptionTag.ONE_COURSE, id);
	});
});

Template.courseForm.helpers
(
	{
		item: function() 
		{
			var id = FlowRouter.getParam('id');
			return Courses.findOne(id) || { _id: 'new', isNew: true };
		},

		Units: function()
		{
			var id = FlowRouter.getParam('id');
			var course = Courses.findOne(id) || { _id: 'new', isNew: true };
			var units = [
				{
					value: 1,
					selected: ''
				},

				{
					value: 2,
					selected: ''
				},

				{
					value: 3,
					selected: 'selected'
				},

				{
					value: 4,
					selected: ''
				},

				{
					value: 6,
					selected: ''
				}
			];

			if (id != 'new')
			{
				for (var i = 0; i < units.length; i++)
				{
					if (units[i].value == course.unit)
					{
						units[i].selected = 'selected';
					}
				}
			}

			return units;
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
				$('.toast').text('Please fill in the necessary fields.');
				$('.toast').fadeIn(400).delay(3000).fadeOut(400);
			}
		}
	}
);