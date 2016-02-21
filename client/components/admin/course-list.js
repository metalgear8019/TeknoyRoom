Template.courseList.onCreated(function () {
	Session.set('searchTerm', '');
	var self = this;
	self.autorun(function () {
		self.subscribe(SubscriptionTag.ALL_COURSES);
	});
});

Template.courseList.helpers
(
	{
		courses: function()
		{
			var ses = Session.get('searchTerm');

			if (ses == undefined || ses == '')
			{
			 	var results = Courses.find({});
		 	} 
		 	else 
		 	{
		 		var results = Courses.find({
			 		'$or': [
			 			{ 'subject_number': { $regex: '.*' + ses + '.*' } },
			 			{ 'title': { $regex: '.*' + ses + '.*' } }
				 	]
			 	});
		 	}

			return results;  
		}
	}
);

Template.courseList.events
(
	{
		'click #delete': function (event)
		{
			event.preventDefault();
			Meteor.call('deleteCourse', this._id, function(err){
				if(err)
					Notifications.error('ERROR', err.reason, {timeout: 5000});
				else
					Notifications.success('SUCCESS', 'Course successfully deleted', {timeout: 5000});
			});
		},

		'click .pointer-hover': function (event)
		{
			FlowRouter.go('/admin/course/' + this._id);
		},

		'keyup #search': function(event)
		{
			event.preventDefault();
			var value = event.target.value;
			Session.set('searchTerm', value);
		},

		'click #addCourse': function (event)
		{
			FlowRouter.go('/admin/course/new');
		},

		'click #addCourseCSV': function (event)
		{
			event.preventDefault();
			$('#courseCSV_modal').modal('show');
		}
	}
);