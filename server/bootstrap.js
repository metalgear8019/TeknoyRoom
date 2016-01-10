Meteor.startup(function () {
	// code to run on server at startup
	/*Meteor.users.find({}).forEach(function (userData) {
		console.log(userData);
		Roles.addUsersToRoles(userData.id, userData.roles);
	});*/
});

Meteor.publish('users', function() {
	return Users.find({});
});

/*Meteor.publish('singleUser', function(id) {
	check(id, String);
	return Users.find(id);
});*/

Meteor.publish('courses', function() {
	return Courses.find({});
});

Meteor.publish('singleCourse', function(id) {
	check(id, String);
	return Courses.find(id);
});

Meteor.publish('semesters', function() {
	return Semesters.find({});
});

Meteor.publish('singleSemester', function(id) {
	check(id, String);
	return Semesters.find(id);
});

Meteor.publish('sections', function() {
	return Sections.find({});
});

Meteor.publish('singleSection', function(id) {
	check(id, String);
	return Sections.find(id);
});