Meteor.startup(function () {
	// code to run on server at startup
	Meteor.users.find({}).forEach(function (userData) {
		console.log(userData);
		Meteor.users.update(userData.id, {
			$set: {
				roles: Role.generatePermissions(userData.profile.user_type)
			}
		});
		// Roles.addUsersToRoles(userData.id, Role.generatePermissions(userData.profile.user_type));
	});
});

Meteor.publish(SubscriptionTag.ALL_USERS, function() {
	return Users.find({});
});

/*Meteor.publish(SubscriptionTag.ONE_USER, function(id) {
	check(id, String);
	return Users.find(id);
});*/

Meteor.publish(SubscriptionTag.ALL_COURSES, function() {
	return Courses.find({});
});

Meteor.publish(SubscriptionTag.ONE_COURSE, function(id) {
	check(id, String);
	return Courses.find(id);
});

Meteor.publish(SubscriptionTag.ALL_SEMESTERS, function() {
	return Semesters.find({});
});

Meteor.publish(SubscriptionTag.ONE_SEMESTER, function(id) {
	check(id, String);
	return Semesters.find(id);
});

Meteor.publish(SubscriptionTag.ALL_SECTIONS, function() {
	return Sections.find({});
});

Meteor.publish(SubscriptionTag.ONE_SECTION, function(id) {
	check(id, String);
	return Sections.find(id);
});