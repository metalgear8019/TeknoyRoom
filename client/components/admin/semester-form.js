hotKey = new Hotkeys();
hotKey.add({
	combo : "shift+x",
	callback : function()
	{	
		$('#course_modal').modal('show');
	}
})

hotKey.add({
	combo : "shift+y",
	callback : function()
	{
		$('#semester_modal').modal('show');
	}
})


Template.semesterForm.onCreated(function () {
	{
		var self = this;
		self.autorun(function() {
			var id = FlowRouter.getParam('id');
			self.subscribe(SubscriptionTag.ONE_SEMESTER, id);
		});
	}
});

Template.semesterForm.helpers
(
	{
		item: function() {
			var id = FlowRouter.getParam('id');
			var result = Semesters.findOne(id) || { _id: 'new', isNew: true }
			if (result._id != 'new')
			{
				//attendance[a].time_in.getFullYear()) + '-' + (((attendance[a].time_in.getMonth()+1) < 10)? '0'+(attendance[a].time_in.getMonth()+1): (attendance[a].time_in.getMonth()+1)) + '-' + (attendance[a].time_in.getDate()
				//result.start_date = (((result.start_date.getMonth()+1) < 10)? '0'+(result.start_date.getMonth()+1): (result.start_date.time_in.getMonth()+1)) + '/' + ((result.start_date.getDate()) < 10? '0'+result.start_date.getDate(): result.start_date.getDate()) + '/' + result.start_date.getFullYear();
				result.start_date = result.start_date.getFullYear() + '-' + (((result.start_date.getMonth()+1) < 10)? '0'+(result.start_date.getMonth()+1): (result.start_date.time_in.getMonth()+1)) + '-' + ((result.start_date.getDate()) < 10? '0'+result.start_date.getDate(): result.start_date.getDate());
				result.end_date = result.end_date.getFullYear() + '-' + (((result.end_date.getMonth()+1) < 10)? '0'+(result.end_date.getMonth()+1): (result.end_date.time_in.getMonth()+1)) + '-' + ((result.end_date.getDate()) < 10? '0'+result.end_date.getDate(): result.end_date.getDate());
			}

			return result;
		}
	}
);

Template.semesterForm.events
(
	{
		'submit #frmSemester': function (event)
		{
			event.preventDefault();

			var id = event.target._id.value;
			var school_year = event.target.school_year.value;
			var start_date = event.target.start_date.value;
			var end_date = event.target.end_date.value;
			var name = event.target.name.value;

			if (school_year != '' && name != '' && start_date != "" && end_date != "")
			{
				var semester = {
									school_year: school_year,
									start_date: start_date,
									end_date: end_date,
									name: name
							   };
				
				if (id == 'new')
				{
					Meteor.call('addSemester', semester);
				}
				else 
				{
					Meteor.call('updateSemester', id, semester);
				}

				FlowRouter.go('/admin/semester/');
			}
			else
			{
				alert('Necessary fields must be filled..');
			}
		}
	}
);