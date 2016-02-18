
Template.studentDashboard.onCreated(function () {
	var self = this;
	self.autorun(function () {
		self.subscribe(SubscriptionTag.ALL_NOTES);
		self.subscribe(SubscriptionTag.ALL_COURSES);
	});
});

var note = {
	_id: 'new',
	course: '',
	content: ''
};

var noteDependency = new Tracker.Dependency();

Tracker.autorun(function(){
	note = {
		_id: 'new',
		owner:'',
		course: '',
		content: ''
	};	
});

Template.studentDashboard.helpers
(
	{
		name: function() 
		{
			var result = Meteor.user();
			return result.profile.first_name;
		},

		notes: function()
		{
			var id = Meteor.userId();
			var result = [];
			Notes.find({'owner': id}).forEach(function(item){
				item.course = Courses.findOne(item.course);
				result.push(item);
			});

			return result;
		},

		note: function()
		{
			noteDependency.depend();
			return note;
		}
	}
);

Template.studentDashboard.events
(
	{
		'click .notes': function (event)
		{
			event.preventDefault();
			$('#notes_modal').modal('show');
			note = this;
			note.course = Courses.findOne(this.course);
			$('#content').val(note.content);
			noteDependency.changed();
		},

		'click #close_notes_modal': function(event)
		{
			event.preventDefault();
			note = {
				_id: 'new',
				owner:'',
				course: '',
				content: ''
			};
			noteDependency.changed();
		},

		'click #clearContent': function(event)
		{
			event.preventDefault();
			$('#content').val('');
		},

		'submit #frmUpdateNote': function(event)
		{
			event.preventDefault();
			var content = event.target.content.value;
			var updatedNote = {
				owner: note.owner,
				course: note.course._id,
				content: content
			};

			Meteor.call('updateNote', note._id, updatedNote);
			$('#notes_modal').modal('hide');
			note = {
				_id: 'new',
				owner:'',
				course: '',
				content: ''
			};
			noteDependency.changed();
		}
	}
);