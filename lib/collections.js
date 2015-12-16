// collection declarations go here
Users = new Mongo.Collection('users');


Meteor.methods
(
	{
		addUser: function (user) 
		{
			if (user.user_type == 1) 
			{
				Users.insert
				(
					{
						username: user.username,
						password: user.password,
						first_name: user.first_name,
						last_name: user.last_name,
						middle_name: user.middle_name,
						state: false,
						banned: false,
						user_type: user.user_type,
						department: user.department
					}
				);
			} 
			else if (user.user_type == 2)
			{
				Users.insert
				(
					{
						username: user.username,
						password: user.password,
						first_name: user.first_name,
						last_name: user.last_name,
						middle_name: user.middle_name,
						state: false,
						banned: false,
						user_type: user.user_type,
						program: user.program,
						year: user.year
					}
				);
			}
		},

		updateUser: function (user_id, user) 
		{
			var cursor = Users.findOne(user_id);
			
			if (user.user_type === 1) {
				Users.update
				(
					user_id,
					{
						$set: 
						{ 
							username: user.username,
							password: user.password,
							first_name: user.first_name,
							last_name: user.last_name,
							middle_name: user.middle_name,
							user_type: user.user_type,
							department: user.department 
						}
				 	}
				);
			} 
			else if (user.user_type === 2) 
			{
				Users.update
				(
					user_id, 
					{ 
						$set: 
						{ 
							username: user.username, 
							password: user.password,
							first_name: user.first_name,
							last_name: user.last_name,
							middle_name: user.middle_name,
							user_type: user.user_type,
							program: user.program,
							year: user.year
						}
					 }
				);
			}
		},

		deleteUser: function (user_id)
		{
			var cursor = Users.findOne(user_id);

			Users.remove(user_id);
		},

		setBanned: function (user_id, setBan)
		{
			var cursor = Users.findOne(user_id);

			Users.update
			(
				user_id,
				{
					$set: { banned: setBan }
				}
			);
		},

		setState: function (user_id, setState)
		{
			var cursor = Users.findOne(user_id);

			Users.update
			(
				user_id,
				{
					$set: { state: setState }
				}
			);
		}
	}
);