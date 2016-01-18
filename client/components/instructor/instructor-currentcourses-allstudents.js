/*Template.userItem.onCreated(function () {
	Session.set('selected', false);
});
*/

Template.instructorCCS123.onCreated(function () {
	Session.set('searchTerm', '');
	var self = this;
	self.autorun(function () {
		self.subscribe(SubscriptionTag.ALL_USERS);
	});
});

Template.instructorCCS123.helpers
(
	{
		/*isStudent: function () {
			return null;
		},
		selected: function () {
			if (Session.get('selected'))
				return 'SELECTED';
			else
				return 'CLICK TO SELECT';
		},*/

		users: function(){
			var ses = Session.get('searchTerm');
			if (ses == undefined || ses == '')
			{
			 	var results = Users.find({});
		 	}
		 	else
		 	{
		 		var results = Users.find({
			 		/*$or: {*/
				 		username: {$regex: '.*' + ses + '.*'},
				 		/*profile: { $or: {
				 			id_number: {$regex: '.*' + ses + '.*'},
					 		first_name: {$regex: '.*' + ses + '.*'},
					 		middle_name: {$regex: '.*' + ses + '.*'},
					 		last_name: {$regex: '.*' + ses + '.*'}
					 	}}
			 		}*/
			 	});
		 	}
			//console.log(searchTerm + ' >> ' + JSON.stringify(results));
			return results;  
		}
	}
);

/*Template.userItem.events
(
	{
		'click .user': function () {
			Session.set('selected', !Session.get('selected'));
		}
	}
);*/