Template.semesterList.onCreated(function () {
	Session.set('searchTerm', '');
	var self = this;
	self.autorun(function () {
		self.subscribe(SubscriptionTag.ALL_SEMESTERS);
	});
});

Template.semesterList.helpers
(
	{
		semesters: function ()
		{
			var ses = Session.get('searchTerm');

			if (ses == undefined || ses == '')
			{
			 	var results = Semesters.find({}).map(function(item){
			 		item.start_date = Helpers.dateToString(item.start_date);
			 		item.end_date = Helpers.dateToString(item.end_date);
			 		return item;
			 	});
		 	}
		 	else
		 	{
		 		var results = Semesters.find({
			 		'$or': [
			 			{ 'school_year': { $regex: '.*' + ses + '.*' } }
				 	]
			 	}).map(function(item){
			 		item.start_date = Helpers.dateToString(item.start_date);
			 		item.end_date = Helpers.dateToString(item.end_date);
			 		return item;
			 	});;
		 	}

			return results;
		}
	}
);

Template.semesterList.events
(
	{
		'keyup #search': function(event)
		{
			event.preventDefault();
			var value = event.target.value;
			Session.set("searchTerm", value);
		},

		'click #delete': function (event)
		{
			event.preventDefault();
			Meteor.call('deleteSemester', this._id, function(err){
				if(err)
					Notifications.error('ERROR', err.reason, {timeout: 5000});
				else
					Notifications.success('SUCCESS', 'Semester successfully deleted', {timeout: 5000});
			});
		},

		'click .pointer-hover': function (event)
		{
			FlowRouter.go('/admin/semester/' + this._id);
		},

		'click #addSemester': function (event)
		{
			FlowRouter.go('/admin/semester/new');
		},

		'click #addSemesterCSV': function (event)
		{
			event.preventDefault();
			$('#semesterCSV_modal').modal('show');
		}
	}
);