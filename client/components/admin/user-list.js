Template.userList.onCreated(function () {
	Session.set('searchTerm', '');
	var self = this;
	self.autorun(function () {
		self.subscribe(SubscriptionTag.ALL_USERS);
	});
});

Template.userList.helpers
(
	{
		users: function()
		{
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

Template.userList.events
(
	{
		'click #edit': function (event)
		{
			event.preventDefault();
			var user = {
							username: 'username',
							password: 'password',
							first_name: 'first_name',
							middle_name: 'middle_name',
							last_name: 'last_name',
							user_type: 1,
							department: 'department',
							program: 'program',
							year: 1
					   };
			Meteor.call('updateUser', this._id, user);
			console.log('update');
		},

		'click #delete': function (event)
		{
			event.preventDefault();
			Meteor.call('deleteUser', this._id);
		},

		'keyup #search': function(event)
		{
			event.preventDefault();
			 var value = event.target.value;
			 Session.set("searchTerm", value);
		},

		'submit form': function (event, template)
		{
			event.preventDefault();
			var selected = template.findAll('input[type=checkbox]:checked');
			selected.forEach(function (user) {
				Meteor.call('setBanned', user.id, true);
			});
		}
	}
);