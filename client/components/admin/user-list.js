Template.userList.onCreated(function () {
	Session.set('searchTerm', '');
	Session.set('filter', 'FILTER BY');
	var self = this;
	self.autorun(function () {
		self.subscribe(SubscriptionTag.ALL_USERS);
	});
	Template.instance().uploading = new ReactiveVar(false);
});

Template.userList.helpers
(
	{
		users: function()
		{
			var routeName = FlowRouter.getRouteName();
			var ses = Session.get('searchTerm');
			var filter = Session.get('filter');
			var results;

			if (routeName == 'adminViewUsers')
			{
				if (ses == undefined || ses == '')
				{
					if (filter == 'FILTER BY')
					{
				 		results = Users.find({'profile.banned': false});
					}
					else if (filter == 'Student')
					{
						results = Users.find({'profile.user_type': 2, 'profile.banned': false});
					}
					else if (filter == 'Instructor')
					{
						var results = Users.find({'profile.user_type': 1, 'profile.banned': false});
					}
			 	}
			 	else
			 	{
			 		if (filter == 'FILTER BY')
			 		{
				 		results = Users.find({'profile.banned': false,
					 		'$or': [
					 			{ 'username': { $regex: '.*' + ses + '.*' } },
					 			{ 'profile.id_number': { $regex: '.*' + ses + '.*' } },
						 		{ 'profile.first_name': { $regex: '.*' + ses + '.*' } },
						 		{ 'profile.middle_name': { $regex: '.*' + ses + '.*' } },
						 		{ 'profile.last_name': { $regex: '.*' + ses + '.*' } },
						 		{ 'profile.program': { $regex: '.*' + ses + '.*' } },
						 		{ 'profile.department': { $regex: '.*' + ses + '.*' } }
						 	]
					 	});
				 	}
				 	else if (filter == 'Student')
				 	{
				 		results = Users.find({'profile.user_type': 2, 'profile.banned': false,
					 		'$or': [
					 			{ 'username': { $regex: '.*' + ses + '.*' } },
					 			{ 'profile.id_number': { $regex: '.*' + ses + '.*' } },
						 		{ 'profile.first_name': { $regex: '.*' + ses + '.*' } },
						 		{ 'profile.middle_name': { $regex: '.*' + ses + '.*' } },
						 		{ 'profile.last_name': { $regex: '.*' + ses + '.*' } },
						 		{ 'profile.program': { $regex: '.*' + ses + '.*' } },
						 		{ 'profile.department': { $regex: '.*' + ses + '.*' } }
						 	]
					 	});	
				 	}
				 	else if (filter == 'Instructor')
				 	{
				 		results = Users.find({'profile.user_type': 1, 'profile.banned': false,
					 		'$or': [
					 			{ 'username': { $regex: '.*' + ses + '.*' } },
					 			{ 'profile.id_number': { $regex: '.*' + ses + '.*' } },
						 		{ 'profile.first_name': { $regex: '.*' + ses + '.*' } },
						 		{ 'profile.middle_name': { $regex: '.*' + ses + '.*' } },
						 		{ 'profile.last_name': { $regex: '.*' + ses + '.*' } },
						 		{ 'profile.program': { $regex: '.*' + ses + '.*' } },
						 		{ 'profile.department': { $regex: '.*' + ses + '.*' } }
						 	]
					 	});	
				 	}
			 	}
		 	}
		 	else
		 	{
		 		if (ses == undefined || ses == '')
				{
					if (filter == 'FILTER BY')
					{
				 		results = Users.find({'profile.banned': true});
					}
					else if (filter == 'Student')
					{
						results = Users.find({'profile.user_type': 2, 'profile.banned': true});
					}
					else if (filter == 'Instructor')
					{
						var results = Users.find({'profile.user_type': 1, 'profile.banned': true});
					}
			 	}
			 	else
			 	{
			 		if (filter == 'FILTER BY')
			 		{
				 		results = Users.find({'profile.banned': true,
					 		'$or': [
					 			{ 'username': { $regex: '.*' + ses + '.*' } },
					 			{ 'profile.id_number': { $regex: '.*' + ses + '.*' } },
						 		{ 'profile.first_name': { $regex: '.*' + ses + '.*' } },
						 		{ 'profile.middle_name': { $regex: '.*' + ses + '.*' } },
						 		{ 'profile.last_name': { $regex: '.*' + ses + '.*' } },
						 		{ 'profile.program': { $regex: '.*' + ses + '.*' } },
						 		{ 'profile.department': { $regex: '.*' + ses + '.*' } }
						 	]
					 	});
				 	}
				 	else if (filter == 'Student')
				 	{
				 		results = Users.find({'profile.user_type': 2, 'profile.banned': true,
					 		'$or': [
					 			{ 'username': { $regex: '.*' + ses + '.*' } },
					 			{ 'profile.id_number': { $regex: '.*' + ses + '.*' } },
						 		{ 'profile.first_name': { $regex: '.*' + ses + '.*' } },
						 		{ 'profile.middle_name': { $regex: '.*' + ses + '.*' } },
						 		{ 'profile.last_name': { $regex: '.*' + ses + '.*' } },
						 		{ 'profile.program': { $regex: '.*' + ses + '.*' } },
						 		{ 'profile.department': { $regex: '.*' + ses + '.*' } }
						 	]
					 	});	
				 	}
				 	else if (filter == 'Instructor')
				 	{
				 		results = Users.find({'profile.user_type': 1, 'profile.banned': true,
					 		'$or': [
					 			{ 'username': { $regex: '.*' + ses + '.*' } },
					 			{ 'profile.id_number': { $regex: '.*' + ses + '.*' } },
						 		{ 'profile.first_name': { $regex: '.*' + ses + '.*' } },
						 		{ 'profile.middle_name': { $regex: '.*' + ses + '.*' } },
						 		{ 'profile.last_name': { $regex: '.*' + ses + '.*' } },
						 		{ 'profile.program': { $regex: '.*' + ses + '.*' } },
						 		{ 'profile.department': { $regex: '.*' + ses + '.*' } }
						 	]
					 	});	
				 	}
			 	}	
		 	}

			return results;  
		},

		filter: function()
		{
			return Session.get('filter');
		},

		uploading()
		{
			return  Template.instance().uploading.get();
		}
	}
);

Template.userList.events
(
	{
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
			var routeName = FlowRouter.getRouteName();
			var selected = template.findAll('input[type=checkbox]:checked');
			selected.forEach(function (user) {
				if (routeName == 'adminViewUsers')
				{
					Meteor.call('setBanned', user.id, true);
				}
				else
				{
					Meteor.call('setBanned', user.id, false);	
				}
			});
		},

		'click .pointer-hover': function (event)
		{
			FlowRouter.go('/admin/user/' + this._id);
		},

		'click #addUser': function (event)
		{
			FlowRouter.go('/admin/user/new');
		},

		'click #addUserCSV': function (event)
		{
			event.preventDefault();
			$('#userCSV_modal').modal('show');
		},

		'click #none': function(event)
		{
			event.preventDefault();
			Session.set('filter', 'FILTER BY');
		},

		'click #student': function(event)
		{
			event.preventDefault();
			Session.set('filter', 'Student');
		},

		'click #instructor': function(event)
		{
			event.preventDefault();
			Session.set('filter', 'Instructor');
		},

		'change [name="uploadCSV"]' (event)
		{
		    //template.uploading.set(true);

		    Papa.parse(event.target.files[0],{
		      header : true,
		      complete(results, file ){
		        Meteor.call('parseUpload', results.data, (error, response) => {
		          if(error){
		            console.log(error.reason);
		          }//else{
		            //template.uploading.set(false);
		            //Bert.alert('Upload complete', 'success', 'growl-top-right');
		          //}
		        });
		      }
		    });
		}
	}
);
