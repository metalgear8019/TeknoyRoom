Template.userList.onCreated(function () {
	Session.set('searchTerm', '');
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
			var ses = Session.get('searchTerm');
			if (ses == undefined || ses == '')
			{
			 	var results = Users.find({});
		 	}
		 	else
		 	{
		 		var results = Users.find({
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
			//console.log(searchTerm + ' >> ' + JSON.stringify(results));
			return results;  
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
			var selected = template.findAll('input[type=checkbox]:checked');
			selected.forEach(function (user) {
				Meteor.call('setBanned', user.id, true);
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
		'change [name="uploadCSV"]' (event){
		    //template.uploading.set(true);

		    Papa.parse(event.target.files[0],{
		      header : true,
		      complete(results, file ){
		        Meteor.call('parseUpload', results.data, (error, response) => {
		          if(error){
		            console.log(error.reason);
		          }else{
		            //template.uploading.set(false);
		            Bert.alert('Upload complete', 'success', 'growl-top-right');
		          }
		        });
		      }
		    });
		  }
	}
);
