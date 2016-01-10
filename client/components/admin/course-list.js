Template.courseList.onCreated(function () {
	var self = this;
	self.autorun(function () {
		self.subscribe('courses');
	});
});

Template.courseList.helpers
(
	{
		courses: function()
		{
			var ses = Session.get('searchTerm');

			if (ses == undefined || ses == ''){
			 	var results = Courses.find({
			 		//username: {$regex: new RegExp('^'+ searchTerm + '$', 'i')},
			 		//subject_number: {$regex: new RegExp('^'+ ses + '$', 'i')}
			 		/*middle_name: { $regex:  new RegExp('^' + searchTerm + '$', 'i')},
			 		last_name: {$regex: new RegExp('^'+ searchTerm + '$', 'i')}*/
			 	});
		 	} else {
		 		var results = Courses.find({
			 		//username: {$regex: new RegExp('^'+ searchTerm + '$', 'i')},
			 		subject_number: {$regex: new RegExp('^'+ ses + '$', 'i')}
			 		/*middle_name: { $regex:  new RegExp('^' + searchTerm + '$', 'i')},
			 		last_name: {$regex: new RegExp('^'+ searchTerm + '$', 'i')}*/
			 	});
		 	}
			//console.log(searchTerm + ' >> ' + JSON.stringify(results));
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
			Meteor.call('deleteCourse', this._id);
		},

		'click .pointer-hover': function (event)
		{
			FlowRouter.go('/admin/course/' + this._id);
		},

		"keyup #search": function(event)
		{
			event.preventDefault();
			 var value = event.target.value;
			 Session.set('searchTerm', value);
		}
	}
);