Template.enrollStudent.onCreated(function () {

	var self = this;
	self.autorun(function () {
		self.subscribe(SubscriptionTag.ALL_USERS);
		self.subscribe(SubscriptionTag.ALL_SECTIONS);
		self.subscribe(SubscriptionTag.ALL_COURSES);
		self.subscribe(SubscriptionTag.ALL_SEMESTERS);
		self.subscribe(SubscriptionTag.ALL_ENROLLEES);
	});
});

var user = {
	_id: 'new',
		profile: {
			id_number: '',
			first_name: '',
			middle_name: '',
			last_name: '',
			gender:'',
			user_type:'',
			department:'',
			program: '',
			year: 0
		}
};

var userDependency = new Tracker.Dependency();

var sections = [{
	_id: 'new',
	name: '',
	semester: '',
	course: '',
	day: [],
	hour: 0,
	minute: 0,
	duration: 0,
	isChecked: false,
	isEnrolled: false
}];

var sectionDependency = new Tracker.Dependency();

var enrollee = {
		_id: 'new',
		section: [],
		user: ''
	};

var enrolleeDependency = new Tracker.Dependency();

var flagSection = false;
var flagSection2 = false;
var section = {
	_id: 'new',
	name: '',
	semester: '',
	course: '',
	day: [],
	hour: 0,
	minute: 0,
	duration: 0,
	isChecked: false,
	isEnrolled: false
};

Tracker.autorun(function(){
	var id = FlowRouter.getParam('id');

	if (id == 'students')
	{
		console.log('tracker 2');
		sections = [{
			_id: 'new',
			name: '',
			semester: '',
			course: '',
			day: [],
			hour: 0,
			minute: 0,
			duration: 0,
			isChecked: false,
			isEnrolled: false
		}];

		user = {
			_id: 'new',
				profile: {
					id_number: '',
					first_name: '',
					middle_name: '',
					last_name: '',
					gender:'',
					user_type:'',
					department:'',
					program: '',
					year: 0
				}
		};

		enrollee = {
			_id: 'new',
			section: [],
			user: ''
		};

		section = {
			_id: 'new',
			name: '',
			semester: '',
			course: '',
			day: [],
			hour: 0,
			minute: 0,
			duration: 0,
			isChecked: false,
			isEnrolled: false
		};

		flagSection = false;
		flagSection2 = false;
	}
});

Template.enrollStudent.helpers
(
	{
		users: function()
		{
			return Users.find({'profile.user_type': { '$ne': 0 }, 'profile.banned': false});
		},

		user: function()
		{
			userDependency.depend();
			return user;
		},

		sections: function()
		{
			sectionDependency.depend();
			var cursorSections = Sections.find({}).fetch();
			if (cursorSections.length > 0)
			{
				if (enrollee._id != 'new')
				{
					if (!flagSection2)
					{
						//console.log(enrollee._id);
						for (var i = 0; i < cursorSections.length; i ++)
						{
							sections[i] = {
								_id: cursorSections[i]._id,
								name: cursorSections[i].name,
								semester: Semesters.findOne(cursorSections[i].semester),
								course: Courses.findOne(cursorSections[i].course),
								day: cursorSections[i].day,
								hour: cursorSections[i].hour,
								minute: cursorSections[i].minute,
								duration: cursorSections[i].duration,
								isChecked: false,
								isEnrolled: false
							}
						}
						//console.log(enrollee.section.length);
						for (var i = 0; i < enrollee.section.length; i++)
						{
							//console.log('condition: ' + sections[i]._id + '=' + enrollee.section[i]._id);
							for (var j = 0; j < sections.length; j++)
							if (sections[j]._id == enrollee.section[i]._id)
							{
								sections[j].isChecked = true;
								sections[j].isEnrolled = true;
								continue;
							}
						}
						flagSection2 = true;
					}
					else
					{
						if (flagSection)
						{
							for (var j = 0; j < sections.length; j++)
							{
								if (sections[j]._id == section._id)
								{
									sections[j].isChecked = !section.isChecked;
									i = j;
									break;
								}
							}
							flagSection = false;
						}
					}
				}
				else
				{
					if (!flagSection2)
					{
						for (var i = 0; i < cursorSections.length; i ++)
						{
							sections[i] = {
								_id: cursorSections[i]._id,
								name: cursorSections[i].name,
								semester: Semesters.findOne(cursorSections[i].semester),
								course: Courses.findOne(cursorSections[i].course),
								day: cursorSections[i].day,
								hour: cursorSections[i].hour,
								minute: cursorSections[i].minute,
								duration: cursorSections[i].duration,
								isChecked: false,
								isEnrolled: false
							}

							//console.log('course: ' + '[' + sections[i].course._id + ']' + sections[i].course.subject_number);
							//console.log('semester: ' + '[' + sections[i].semester._id + ']' + sections[i].semester.school_year);
						}
						flagSection2 = true;
					}
					else
					{
						if (flagSection)
						{
							for (var j = 0; j < sections.length; j++)
							{
								if (sections[j]._id == section._id)
								{
									sections[j].isChecked = !section.isChecked;
									i = j;
									break;
								}
							}
							flagSection = false;
						}
					}
				}
			}
			else
			{
				sections = [];
			}

			return sections;
		},

		enrollee: function()
		{
			enrolleeDependency.depend();
			if (user._id != 'new')
			{
				var enrollees = Enrollees.find({'user': user._id}).fetch();
				enrollee._id = 'not new';
				enrollee.user = user._id;
				var sections = enrollees.map(function (item) { return item.section; });
				enrollee.section = Sections.find({ '_id': { '$in': sections } }).fetch();
				flagSection2 = false;
				sectionDependency.changed();
			}
			else
			{
				enrollee = {
					_id: 'new',
					section: [],
					user: ''
				};
				flagSection2 = false;
				sectionDependency.changed();
			}

			return enrollee;
		}
	}
);

Template.enrollStudent.events
(
	{
		'click #user': function(event)
		{
			event.preventDefault();
			$('#user_modal').modal('show');
		},

		'click .user': function(event)
		{
			event.preventDefault();
			user = this;
			userDependency.changed();
			enrolleeDependency.changed();
			$('#user_modal').modal('hide');
		},

		'change .sectionsCheckbox': function(event)
		{
			event.preventDefault();
			section = this;
			//console.log(section);
			flagSection = true;
			sectionDependency.changed();;
		},

		'submit #frmEnrollStudent': function(event)
		{
			event.preventDefault();
			var user = event.target.userId.value;
			var enrollees = [];

			if (user != '')
			{
				if (user != 'new')
				{
					for (var i = 0; i < sections.length; i++)
					{
						console.log('length: ' + sections.length);
						if (sections[i].isChecked)
						{
							if (!sections[i].isEnrolled)
							{
								var isAlreadyEnrolledInThatCourse = false;

								for (var j = 0; j < sections.length; j++)
								{
									if (i == j)
									{
										continue;
									}
									
									//console.log('conditon: ' + sections[i].course._id + '=' + sections[j].course._id + '&&' + sections[i].semester._id + '=' + sections[j].semester._id);
									if (sections[i].course._id == sections[j].course._id && sections[i].semester._id == sections[j].semester._id)
									{
										console.log('i: ' + i + ' j: ' + j);
										console.log('conditon: ' + sections[i].course.subject_number + '=' + sections[j].course.subject_number + 
													'&&' + sections[i].semester.school_year + '=' + sections[j].semester.school_year + 
													'&&' + sections[i]._id + '!=' + sections[j]._id);

										if (sections[j].isChecked)
										{
											isAlreadyEnrolledInThatCourse = true;
											break;
										}
									}
								}

								console.log('already: ' + isAlreadyEnrolledInThatCourse);

								if (!isAlreadyEnrolledInThatCourse)
								{
									enrollees.push({user: user, section: sections[i]._id, attendance: [{ time_in: new Date(), time_out: new Date() }]});
								}
							}
						}
						else
						{
							if (sections[i].isEnrolled)
							{
								var enrolleeId = Enrollees.findOne({'user': user, 'section': sections[i]._id});
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
			}
		}
	}
);