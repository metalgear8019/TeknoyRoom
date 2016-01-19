Template.instructorCurrentCourses.onCreated(function () {
	var self = this;
	self.autorun(function () {
		self.subscribe(SubscriptionTag.ALL_COURSES);
	});
});

Template.instructorCurrentCourses.helpers
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