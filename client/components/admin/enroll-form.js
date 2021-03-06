Template.enrollForm.onCreated(function () {

	var self = this;
	self.autorun(function () {
		self.subscribe(SubscriptionTag.ALL_USERS);
		self.subscribe(SubscriptionTag.ALL_SECTIONS);
		self.subscribe(SubscriptionTag.ALL_COURSES);
		self.subscribe(SubscriptionTag.ALL_SEMESTERS);
		self.subscribe(SubscriptionTag.ALL_ENROLLEES);
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



var enrollee = {
	_id: 'new',
	section: '',
	instructor: '',
	user: []
};

var enrolleeDependency = new Tracker.Dependency();

var students = [{
		_id: '',
		profile: {
			id_number: '',
			first_name: '',
			middle_name: '',
			last_name: '',
			gender:'',
			program: '',
			year: 0
		},
		isChecked: false,
		isEnrolled: false
	}];

var studentsDependency = new Tracker.Dependency();

var flaginstructor = false;
var flagStudent = false;
var flagStudent2 = false;
var student = {
			_id: '',
			profile: {
				id_number: '',
				first_name: '',
				middle_name: '',
				last_name: '',
				gender:'',
				program: '',
				year: 0
			},
			isChecked: false,
			isEnrolled: false
		};

Tracker.autorun(function(){
	var id = FlowRouter.getParam('id');

	if (id == 'students')
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
			}
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

		enrollee = {
			_id: 'new',
			section: '',
			instructor: '',
			user: []
		};

		students = [{
			_id: '',
			profile: {
				id_number: '',
				first_name: '',
				middle_name: '',
				last_name: '',
				gender:'',
				program: '',
				year: 0
			},
			isChecked: false,
			isEnrolled: false
		}];

		flaginstructor = false;
		flagStudent = false;
		flagStudent2 = false;
		student = {
			_id: '',
			profile: {
				id_number: '',
				first_name: '',
				middle_name: '',
				last_name: '',
				gender:'',
				program: '',
				year: 0
			},
			isChecked: false,
			isEnrolled: false
		};
	}
});

Template.enrollForm.helpers
(
	{
		students: function()
		{
			studentsDependency.depend();
			var cursorArray = Users.find({'profile.user_type': 2, 'profile.banned': false}).fetch();

			if (cursorArray.length > 0)
			{
				if (enrollee._id != 'new')
				{
					if (!flagStudent2)
					{
						for (var i = 0; i < cursorArray.length; i++)
						{
							students[i] = ({
								_id: cursorArray[i]._id,
								profile : {
									id_number: cursorArray[i].profile.id_number,
									first_name: cursorArray[i].profile.first_name,
									middle_name: cursorArray[i].profile.middle_name,
									last_name: cursorArray[i].profile.last_name,
									gender: cursorArray[i].profile.gender,
									program: cursorArray[i].profile.program,
									year: cursorArray[i].profile.year
								},
								isChecked: false,
								isEnrolled: false
							});
						}

						for (var i = 0; i < enrollee.user.length; i++)
						{
							for (var j = 0; j < students.length; j++)
							{
								if (students[j]._id == enrollee.user[i]._id)
								{
									students[j].isChecked = true;
									students[j].isEnrolled = true;
									continue;
								}
							}
						}
						flagStudent2 = true;
					}
					else
					{
						if (flagStudent)
						{
							for (var j = 0; j < students.length; j++)
							{
								if (students[j]._id == student._id)
								{
									students[j].isChecked = !student.isChecked;
									i = j;
									break;
								}
							}
							flagStudent = false;
						}
					}
				}
				else
				{
					if (!flagStudent2)
					{
						for (var i = 0; i < cursorArray.length; i++)
						{
							students[i] = ({
								_id: cursorArray[i]._id,
								profile : {
									id_number: cursorArray[i].profile.id_number,
									first_name: cursorArray[i].profile.first_name,
									middle_name: cursorArray[i].profile.middle_name,
									last_name: cursorArray[i].profile.last_name,
									gender: cursorArray[i].profile.gender,
									program: cursorArray[i].profile.program,
									year: cursorArray[i].profile.year
								},
								isChecked: false,
								isEnrolled: false
							});
						}

						flagStudent2 = true;
					}
					else
					{
						if (flagStudent)
						{
							for (var j = 0; j < students.length; j++)
							{
								if (students[j]._id == student._id)
								{
									students[j].isChecked = !student.isChecked;
									i = j;
									break;
								}
							}
							flagStudent = false;
						}
					}
				}
			}
			else
			{
				students = [];
			}

			return students;
		},

		instructors: function()
		{
			return Users.find({'profile.user_type': 1, 'profile.banned': false});	
		},

		instructor: function()
		{
			instructorDependency.depend();
			if (enrollee._id != 'new')
			{
				console.log(enrollee.instructor._id);
				if (!flaginstructor)
				{
					instructor = enrollee.instructor;
				}
			}
			else
			{ 
				if (enrollee.instructor == 'new' && !flaginstructor)
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
						}
					};
				}
			}
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
				section._id = section._id;
				section.course = Courses.findOne(section.course);
				section.semester = Semesters.findOne(section.semester);
				flaginstructor = false;
			}
			return section;
		},

		enrollee: function()
		{
			enrolleeDependency.depend();
			if (section._id != 'new')
			{
				var enrollees = Enrollees.find({'section': section._id}).fetch();

				if (enrollees.length)
				{
					enrollee._id = enrollees[0]._id;
					var users = enrollees.map(function (item) { return item.user; });
					enrollee.section = section._id;
					enrollee.instructor =  Users.findOne({ '_id': { '$in': users } , 'profile.user_type': 1}) || {
						_id: 'new',
						profile: 
						{
							id_number: '',
							first_name: '',
							middle_name: '',
							last_name: '',
							department: ''
						}
					};
					enrollee.user = Users.find({ '_id': { '$in': users } , 'profile.user_type': 2}).fetch();
					flagStudent2 = false;
					studentsDependency.changed();
					instructorDependency.changed();
				}
				else
				{
					enrollee = {
						_id: 'new',
						section: '',
						instructor: 'new',
						user: []
					};
					flagStudent2 = false;
					studentsDependency.changed();
					instructorDependency.changed();
				}
			}
			return enrollee;
		},
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
			enrolleeDependency.changed();
	        $('#section_modal').modal('hide');	
		},

		'click .instructor': function(event)
		{
			event.preventDefault();
			instructor = this;
			flaginstructor = true;
			instructorDependency.changed();
	        $('#instructor_modal').modal('hide');	
		},

		'change .studentsCheckbox': function(event)
		{
			event.preventDefault();
			student = this;
			flagStudent = true;
			studentsDependency.changed();
		},

		'submit #frmEnrollStudents': function(event, template)
		{
			event.preventDefault();
			var section = event.target.sectionId.value;
			var assignedInstructor = event.target.instructorId.value;
			var enrollees = [];

			if (section != '' && assignedInstructor != '')
			{
				if (section != 'new' && assignedInstructor != 'new')
				{
					if (assignedInstructor != enrollee.instructor._id)
					{
						if (enrollee.instructor._id != undefined)
						{
							var cursor = Enrollees.findOne({'user': enrollee.instructor._id});
							Meteor.call('deleteEnrollee', cursor._id, function(err){
								if(err)
									Notifications.error('ERROR', err.reason, {timeout: 5000});
								else
									Notifications.success('SUCCESS', 'Enrollee successfully deleted', {timeout: 5000});
							});
						}

						enrollees.push({user: assignedInstructor, section: section});
					}

					for (var i = 0; i < students.length; i++)
					{
						if (students[i].isChecked)
						{
							if (!students[i].isEnrolled)
							{
								var sectionCursor = Sections.findOne(section);
								var enrolleeCursor = Enrollees.find({'user': students[i]._id}).fetch();
								var isAlreadyEnrolledInThatCourse = false;

								for (var j = 0; j < enrolleeCursor.length; j++)
								{
									var enrolleeSectionCursor = Sections.findOne(enrolleeCursor[j].section);
									if (sectionCursor.course == enrolleeSectionCursor.course && sectionCursor.semester == enrolleeSectionCursor.semester)
									{
										isAlreadyEnrolledInThatCourse = true;
										break;
									}
								}

								if (!isAlreadyEnrolledInThatCourse)
								{
									enrollees.push({ user: students[i]._id, section: section});
								}
							}
						}
						else
						{
							if (students[i].isEnrolled)
							{
								var enrolleeId = Enrollees.findOne({'user': students[i]._id, 'section': section});
								Meteor.call('deleteEnrollee', enrolleeId._id, function(err){
									if(err)
										Notifications.error('ERROR', err.reason, {timeout: 5000});
									else
										Notifications.success('SUCCESS', 'Enrollees successfully deleted', {timeout: 5000});
								});
							}
						}
					}

					Meteor.call('addEnrollee', enrollees, function(err){
						if(err)
							Notifications.error('ERROR', err.reason, {timeout: 5000});
						else
							Notifications.success('SUCCESS', 'Enrolle succesfully added', {timeout: 5000});
					});
					FlowRouter.go('/admin/enroll/');
				}
				else
				{
					Notifications.warn('WARNING', 'Please fill out the necessary fields.', {timeout: 5000});
				}
			}
			else
			{
				Notifications.warn('WARNING', 'Please fill out the necessary fields.', {timeout: 5000});
			}
		}
	}
);