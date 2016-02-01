Template.enrollForm.onCreated(function () {
	var self = this;
	self.autorun(function () {
		var id = FlowRouter.getParam('id');
		self.subscribe(SubscriptionTag.ONE_ENROLLEE, id);
		self.subscribe(SubscriptionTag.ALL_USERS);
		self.subscribe(SubscriptionTag.ALL_SECTIONS);
		self.subscribe(SubscriptionTag.ALL_COURSES);
		self.subscribe(SubscriptionTag.ALL_SEMESTERS);
	});
});

var section = {
	_id: 'new',
	name: '',
	semester: '',
	course: '',
	day: [],
	hour: 0,
	minute: 0,
	duration: 0
}

var sectionDependency = new Tracker.Dependency();

var instructor = {
	_id: 'new',
	profile: {
		id_number: '',
		first_name: '',
		middle_name: '',
		last_name: '',
		department: ''
	}
};

var instructorDependency = new Tracker.Dependency();

Tracker.autorun(function(){
	var id = FlowRouter.getParam('id');
	if (id == 'new')
	{
		instructor = {
			_id: 'new',
			profile: 
			{
				id_number: '',
				first_name: '',
				middle_name: '',
				last_name: '',
				department: ''
			},


		};

		section = {
			_id: 'new',
			name: '',
			semester: '',
			course: '',
			day: [],
			hour: 0,
			minute: 0,
			duration: 0
		};
	}
});

Template.enrollForm.helpers
(
	{
		students: function()
		{
			return Users.find({'profile.user_type': 2, 'profile.banned': false}); 
		},

		instructors: function()
		{
			return Users.find({'profile.user_type': 1, 'profile.banned': false});	
		},

		instructor: function()
		{
			instructorDependency.depend();
			return instructor;
		},

		sections: function ()
		{
			var result = [];
			Sections.find({}).forEach(function (item) {
				item.course = Courses.findOne(item.course) || '';
				item.semester = Semesters.findOne(item.semester) || '';
				result.push(item);
			});
			return result;
		},

		section: function()
		{
			sectionDependency.depend();
			if (section._id != 'new')
			{
				section.course = Courses.findOne(section.course);
				section.semester = Semesters.findOne(section.semester); 
				return section;
			}
			return section;
		},

		item: function()
		{
			var id = FlowRouter.getParam('id');
			return Enrollees.findOne(id) || { _id: 'new', isNew: true };
		}
	}
);

Template.enrollForm.events
(
	{
		'click #instructor': function (event)
		{
			event.preventDefault();
			$('#instructor_modal').modal('show');
		},

		'click #section': function (event)
		{
	        event.preventDefault();
	        $('#section_modal').modal('show');
		},

		'click .section': function(event)
		{
			event.preventDefault();
			section = this;
			sectionDependency.changed();
	        $('#section_modal').modal('hide');	
		},

		'click .instructor': function(event)
		{
			event.preventDefault();
			instructor = this;
			instructorDependency.changed();
	        $('#instructor_modal').modal('hide');	
		},

		'submit #frmEnrollStudents': function(event)
		{
			event.preventDefault();
			var section = event.target.sectionId.value;
			var assignedInstructor = event.target.instructorId.value;
			var students = event.target.students;
			var users = [];

			users.push(assignedInstructor);

			for (var i = 0; i < students.length; i++)
			{
				if (students[i].checked)
				{
					users.push(students[i].value);
				}
			}

			var enrollees = [];

			for(var i = 0; i < users.length; i++)
			{
				enrollees.push({user: users[i], section: section});
			}

			/*for (var i = 0; i < enrollees.length; i++)
			{
				console.log('user: ' + enrollees[i].user);
				console.log('section: ' + enrollees[i].section);
			}*/

			Meteor.call('addEnrollee', enrollees);
			
			FlowRouter.go('/admin/enroll/');
		}
	}
);