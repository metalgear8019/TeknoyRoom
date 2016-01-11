Meteor.startup(function () {
	// code to run on server at startup
	Meteor.users.find({}).forEach(function (userData) {
		console.log(userData);
		// Roles.addUsersToRoles(userData.id, userData.roles);
	});
});

Meteor.publish(CollectionName.USERS, function() {
	return Users.find({});
});

/*Meteor.publish('singleUser', function(id) {
	check(id, String);
	return Users.find(id);
});*/

Meteor.publish(CollectionName.COURSES, function() {
	return Courses.find({});
});

Meteor.publish('singleCourse', function(id) {
	check(id, String);
	return Courses.find(id);
});

Meteor.publish(CollectionName.SEMESTERS, function() {
	return Semesters.find({});
});

Meteor.publish('singleSemester', function(id) {
	check(id, String);
	return Semesters.find(id);
});

Meteor.publish(CollectionName.SECTIONS, function() {
	return Sections.find({});
});

Meteor.publish('singleSection', function(id) {
	check(id, String);
	return Sections.find(id);
});