Meteor.startup(function () {
	/*SSLProxy({
		port: 6000, //or 443 (normal port/requires sudo)
		ssl : {
			key: Assets.getText("server.key"),
			cert: Assets.getText("server.crt"),

			//Optional CA
			//Assets.getText("ca.pem")
		}
	});*/

	// code to run on server at startup
	Accounts.onCreateUser(function (options, user) {
		if (options.profile) {
			// include the user profile
			user.profile = options.profile
			Roles.setRolesOnUserObj(user, Role.generatePermissions(user.profile.user_type));
		}
		return user;
	});

	var adminList = Users.find({ 'profile.user_type': 0 }).fetch();
	if (adminList.length === 0) {
		var user = {
			username: 'admin',
			password: 'abcde12345',
			profile: {
				user_type: 0,
				banned: false
			},
			roles: [
				Role.Group.ADMIN,
				Role.Permission.READ_USERS,
				Role.Permission.READ_COURSES,
				Role.Permission.READ_SECTIONS,
				Role.Permission.READ_SEMESTERS,
				Role.Permission.WRITE_USERS,
				Role.Permission.WRITE_COURSES,
				Role.Permission.WRITE_SECTIONS,
				Role.Permission.WRITE_SEMESTERS
			]
		};
		Accounts.createUser(user);
	}
});

Meteor.publish(SubscriptionTag.PRESENCES, function() {
	return Meteor.users.find({ 'status.online': true });
});

Meteor.publish(SubscriptionTag.ALL_USERS, function() {
	return Users.find({});
});

Meteor.publish(SubscriptionTag.ONE_USER, function(id) {
	check(id, String);
	return Users.find(id);
});

Meteor.publish(SubscriptionTag.ALL_COURSES, function() {
	return Courses.find({});
});

Meteor.publish(SubscriptionTag.ONE_COURSE, function(id) {
	check(id, String);
	return Courses.find({ _id: id });
});

Meteor.publish(SubscriptionTag.ALL_SEMESTERS, function() {
	return Semesters.find({});
});

Meteor.publish(SubscriptionTag.ONE_SEMESTER, function(id) {
	check(id, String);
	return Semesters.find({ _id: id });
});

Meteor.publish(SubscriptionTag.CURRENT_SEMESTER, function(time) {
	check(time, Date);
	return Semesters.find({
		start_date: { $lte: time },
		end_date: { $gte: time }
	});
});

Meteor.publish(SubscriptionTag.PREVIOUS_SEMESTERS, function(time) {
	check(time, Date);
	return Semesters.find({
		end_date: { $lt: time }
	});
});

Meteor.publish(SubscriptionTag.ALL_SECTIONS, function() {
	return Sections.find({});
});

Meteor.publish(SubscriptionTag.ONE_SECTION, function(id) {
	check(id, String);
	return Sections.find({ _id: id });
});

Meteor.publish(SubscriptionTag.ALL_ENROLLEES, function() {
	return Enrollees.find();
});

Meteor.publish(SubscriptionTag.ALL_ENROLLEES_USER, function(userId) {
	check(userId, String);
	return Enrollees.find({
		user: userId
	});
});

Meteor.publish(SubscriptionTag.ONE_ENROLLEE, function(id) {
	check(id, String);
	return Enrollees.find({ _id: id });
});

Meteor.publish(SubscriptionTag.ALL_NOTES, function() {
	return Notes.find();
});

Meteor.publish(SubscriptionTag.ONE_NOTE, function(id) {
	check(id, String);
	return Notes.find({ _id: id });
});

Meteor.publish(SubscriptionTag.ONE_ENROLLEE_SECTION, function(id){
	check(id, String);
	return Enrollees.find({ section: id });
});

Meteor.publish(SubscriptionTag.ALL_USER_NOTES, function(id){
	check(id, String);
	return Notes.find({'owner': id});
});

Meteor.publish(SubscriptionTag.CURRENT_CLASS, function (time, userId) {
	check(time, Date);
	check(userId, String);
	var enrolledSubjects = Enrollees.find({ user: userId });
 	var enrolledIds = enrolledSubjects.map(function (c) { return c.section; });
	return Sections.find({
		_id: { $in: enrolledIds },
		day: ( time.getDay() + 1 ),
		hour: { $lte: time.getHours() }
	}, { sort: { hour: -1, minute: -1 }});
});