Template.userList.helpers
(
	{
		users: function()
		{
			console.log("users");
			return Users.find({});
		}
	}
);

Template.userList.events
(
	{
		"click #edit": function (event)
		{
			event.preventDefault();
			var user = {
							username: "username",
							password: "password",
							first_name: "first_name",
							middle_name: "middle_name",
							last_name: "last_name",
							user_type: 1,
							department: "department",
							program: "program",
							year: 1
					   };
			Meteor.call("updateUser", this._id, user);
			console.log("update");
		},

		"click #delete": function (event)
		{
			event.preventDefault();
			Meteor.call("deleteUser", this._id);
		}
	}
);