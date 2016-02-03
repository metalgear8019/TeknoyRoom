// collection declarations go here

SubscriptionTag = {
	ONE_USER: 'user',
	ALL_USERS: 'users',
	ONE_COURSE: 'course',
	ALL_COURSES: 'courses',
	ONE_SECTION: 'section',
	ALL_SECTIONS: 'sections',
	ONE_SEMESTER: 'semester',
	ALL_SEMESTERS: 'semesters',
	ONE_ENROLLEE: 'enrollee',
	ALL_ENROLLEES: 'enrollees',
	ONE_NOTE: 'note',
	ALL_NOTES: 'notes',
	PRESENCES: 'presences'
};

CollectionName = {
	ROLES: 'roles',
	USERS: 'users',
	COURSES: 'courses',
	SECTIONS: 'sections',
	SEMESTERS: 'semesters',
	ENROLLEES: 'enrollees',
	NOTES: 'notes'
};

//-----------------------------------------------------
//users collection and methods
Users = Meteor.users;// new Mongo.Collection('users');
//-----------------------------------------------------
//course collections and methods
Courses = new Mongo.Collection(CollectionName.COURSES);
Courses.attachSchema(Schema.Course);
//-----------------------------------------------------
//Section collections and methods
Sections = new Mongo.Collection(CollectionName.SECTIONS);
Sections.attachSchema(Schema.Section);
//-----------------------------------------------------
//Semester collections and methods
Semesters = new Mongo.Collection(CollectionName.SEMESTERS);
Semesters.attachSchema(Schema.Semester);
//-----------------------------------------------------
//Enrollee collections and methods
Enrollees = new Mongo.Collection(CollectionName.ENROLLEES);
Enrollees.attachSchema(Schema.Enrollee);
//-----------------------------------------------------
//Note collections and methods
Notes = new Mongo.Collection(CollectionName.NOTES);
Notes.attachSchema(Schema.Note);
