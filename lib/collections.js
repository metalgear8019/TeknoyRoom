// collection declarations go here
Users = Meteor.users;
Courses = new Mongo.Collection(CollectionName.COURSES);
Sections = new Mongo.Collection(CollectionName.SECTIONS);
Semesters = new Mongo.Collection(CollectionName.SEMESTERS);
Enrollees = new Mongo.Collection(CollectionName.ENROLLEES);
Notes = new Mongo.Collection(CollectionName.NOTES);